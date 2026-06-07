const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);

if (!files.length) {
    console.error('Usage: node check-shop-images.js <image...>');
    process.exit(1);
}

function dimensions(buffer) {
    if (buffer.toString('ascii', 1, 4) === 'PNG') {
        return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    }

    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
        let offset = 2;
        while (offset < buffer.length) {
            if (buffer[offset] !== 0xff) {
                offset++;
                continue;
            }
            const marker = buffer[offset + 1];
            const length = buffer.readUInt16BE(offset + 2);
            if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
                return {
                    width: buffer.readUInt16BE(offset + 7),
                    height: buffer.readUInt16BE(offset + 5)
                };
            }
            offset += 2 + length;
        }
    }

    return null;
}

let failed = false;

for (const file of files) {
    const filePath = path.resolve(file);
    const size = dimensions(fs.readFileSync(filePath));

    if (!size) {
        console.log(`UNKNOWN     ${file}`);
        failed = true;
        continue;
    }

    const longEdge = Math.max(size.width, size.height);
    const webReady = longEdge >= 1600;
    const printReady = longEdge >= 6000;
    const result = printReady ? 'PRINT READY' : webReady ? 'WEB ONLY' : 'TOO SMALL';

    console.log(`${result.padEnd(11)} ${size.width}x${size.height}  ${file}`);
    if (!printReady) failed = true;
}

process.exitCode = failed ? 2 : 0;
