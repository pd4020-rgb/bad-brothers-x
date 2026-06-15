import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(await readFile(join(root, "manifest.json"), "utf8"));

function safeName(name, fallback) {
  const cleaned = (name || fallback)
    .normalize("NFC")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || fallback;
}

function extensionFromUrl(url) {
  const path = new URL(url).pathname;
  return extname(basename(path)) || ".jpg";
}

async function download(url, destination) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok || !response.body) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  await pipeline(response.body, createWriteStream(destination));
}

const jobs = [];

for (const exhibition of manifest.exhibitions) {
  const folder = join(root, exhibition.folder);
  await mkdir(folder, { recursive: true });

  const lines = [
    `# ${exhibition.title}`,
    "",
    `- 원본 페이지: ${exhibition.url}`,
    `- 상태: ${exhibition.status}`,
    `- 이미지 수: ${exhibition.status === "ready" ? exhibition.assets.length : 0}`,
    "",
  ];

  if (exhibition.headings.length) {
    lines.push("## 제목", "", ...exhibition.headings.map((text) => `- ${text}`), "");
  }
  if (exhibition.paragraphs.length) {
    lines.push("## 홈페이지 내용", "", ...exhibition.paragraphs, "");
  }
  if (exhibition.status !== "ready") {
    lines.push(
      "## 확인 필요",
      "",
      "현재 홈페이지의 이 전시 주소가 2025 메인 페이지로 연결되어 있어 이미지를 자동 분류하지 않았습니다.",
      ""
    );
  }

  await writeFile(join(folder, "README.md"), `${lines.join("\n")}\n`, "utf8");

  if (exhibition.status !== "ready") continue;

  const usedNames = new Set();
  exhibition.assets.forEach((asset, index) => {
    const fallback = `${String(index + 1).padStart(3, "0")}_${asset.mediaId || "image"}${extensionFromUrl(asset.originalUrl)}`;
    let fileName = safeName(asset.fileName, fallback);
    if (!extname(fileName)) fileName += extensionFromUrl(asset.originalUrl);

    const stem = fileName.slice(0, fileName.length - extname(fileName).length);
    const extension = extname(fileName);
    let uniqueName = `${String(index + 1).padStart(3, "0")}_${fileName}`;
    let duplicate = 2;
    while (usedNames.has(uniqueName.toLowerCase())) {
      uniqueName = `${String(index + 1).padStart(3, "0")}_${stem}_${duplicate}${extension}`;
      duplicate += 1;
    }
    usedNames.add(uniqueName.toLowerCase());

    jobs.push({
      url: asset.originalUrl,
      destination: join(folder, uniqueName),
      label: `${exhibition.title} / ${uniqueName}`,
    });
  });
}

const failures = [];
let cursor = 0;
const workers = Array.from({ length: 6 }, async () => {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    try {
      await download(job.url, job.destination);
    } catch (error) {
      failures.push({ ...job, error: String(error) });
    }
  }
});

await Promise.all(workers);
await writeFile(join(root, "_source", "download_failures.json"), JSON.stringify(failures, null, 2));

console.log(JSON.stringify({ requested: jobs.length, downloaded: jobs.length - failures.length, failed: failures.length }));
