**Comparison Target**

- Source visual truth:
  - `/Users/jk/Documents/00_Screenshots/스크린샷 2026-06-15 오전 5.46.01.png`
  - `/Users/jk/Documents/00_Screenshots/스크린샷 2026-06-15 오전 6.10.51.png`
- Implementation screenshots:
  - `/Users/jk/Documents/ACA8/bad_brothers_x/qa-particle.png`
  - `/Users/jk/Documents/ACA8/bad_brothers_x/qa-archive.png`
  - `/Users/jk/Documents/ACA8/bad_brothers_x/qa-archive-accordion.png`
  - `/Users/jk/Documents/ACA8/bad_brothers_x/qa-mobile-archive.png`
- Combined comparison evidence:
  - `/Users/jk/Documents/ACA8/bad_brothers_x/qa-compare-particle.png`
  - `/Users/jk/Documents/ACA8/bad_brothers_x/qa-compare-archive.png`
- Viewports: 1280 x 900 desktop and 430 x 932 mobile.
- States: particle roster stage, expanded archive, inline exhibition detail, mobile expanded archive.

**Findings**

- No actionable P0, P1, or P2 issues remain.
- The particle stage preserves the existing BBX roster introduction above the visual statement. This is an intentional product constraint; the source screenshot is a standalone JungKing hero.
- The archive matches the source hierarchy with English-only filters, year/type/category columns, title and location copy, and restrained black gallery styling.
- Exhibition rows now reveal real source photography directly beneath the selected row, with one exhibition open at a time.

**Required Fidelity Surfaces**

- Fonts and typography: Inter/Outfit display hierarchy and monospace metadata reproduce the source contrast and archival tone.
- Spacing and layout rhythm: desktop rows use a four-column structure; mobile collapses cleanly without horizontal overflow.
- Colors and tokens: pure black, soft white, muted gray, and restrained green accents match the existing BBX system.
- Image quality and assets: original JungKing exhibition photographs are used without placeholders or generated substitutes.
- Copy and content: all visible archive content is English; the 26/12/14 labels match the rendered filter results.

**Patches Made**

- Reduced particle and portrait scale.
- Added the `ANALOG. CONCEPTUAL. ALIVE.` positioning statement over the particle canvas.
- Restored 26 exhibition records and 133 original archive images.
- Added English-only filtering, inline exhibition details, horizontal swipe/scroll galleries, and responsive layouts.
- Corrected Live Painting Special Booth to `Projects & Collabs` so filter totals are 12 and 14.

**Residual Test Gaps**

- The live Vercel deployment was not changed or tested in this pass.

final result: passed
