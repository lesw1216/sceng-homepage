// public/sce-symbol.svg → src/app/favicon.ico (16/32/48 BMP + 256 PNG, 흰 배경)
//
// 실행: node scripts/generate-favicon.mjs
// sharp는 next의 전이 의존성이라 package.json에 직접 선언되어 있지 않다.
// (favicon은 산출물을 커밋해 두므로 빌드 파이프라인에서는 호출하지 않는다.)
// 배경을 흰색으로 채워 다크 테마 탭에서도 네이비 획이 보이게 한다.
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const sharp = createRequire(process.cwd() + "/package.json")("sharp");

const SRC = "public/sce-symbol.svg";
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const MARGIN = 0.94; // 아이콘 가장자리에 약간의 여백

// 16px에서는 타원 궤도가 뭉개져 판독이 불가능하므로 레터마크(SCE) 영역만 잘라 쓴다.
const LETTERMARK = { left: 108, top: 54, width: 267, height: 99 };

async function artwork(size) {
  const base = sharp(SRC, { density: 1200 });
  if (size > 16) return base;
  const { width } = await base.metadata();
  const k = width / 500; // viewBox 기준 좌표를 래스터 좌표로 환산
  return sharp(
    await base
      .extract({
        left: Math.round(LETTERMARK.left * k),
        top: Math.round(LETTERMARK.top * k),
        width: Math.round(LETTERMARK.width * k),
        height: Math.round(LETTERMARK.height * k),
      })
      .png()
      .toBuffer(),
  );
}

async function square(size) {
  const inner = Math.round(size * MARGIN);
  const art = await (await artwork(size))
    .resize(inner, inner, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: WHITE },
  })
    .composite([{ input: art, gravity: "center" }])
    .png({ compressionLevel: 9 });
}

function bmpEntry(raw, size) {
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);
  header.writeInt32LE(size, 4);
  header.writeInt32LE(size * 2, 8); // XOR + AND 마스크를 합친 높이
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  const xor = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const src = (size - 1 - y) * size * 4; // BMP는 bottom-up
    for (let x = 0; x < size; x++) {
      const s = src + x * 4;
      const d = (y * size + x) * 4;
      xor[d] = raw[s + 2];
      xor[d + 1] = raw[s + 1];
      xor[d + 2] = raw[s];
      xor[d + 3] = raw[s + 3];
    }
  }
  const maskRow = Math.ceil(size / 32) * 4;
  return Buffer.concat([header, xor, Buffer.alloc(maskRow * size)]);
}

const entries = [];
for (const size of [16, 32, 48]) {
  const raw = await (await square(size)).raw().toBuffer();
  entries.push({ size, data: bmpEntry(raw, size) });
}
entries.push({ size: 256, data: await (await square(256)).toBuffer() });

const dir = Buffer.alloc(6 + entries.length * 16);
dir.writeUInt16LE(0, 0);
dir.writeUInt16LE(1, 2);
dir.writeUInt16LE(entries.length, 4);
let offset = dir.length;
entries.forEach(({ size, data }, i) => {
  const p = 6 + i * 16;
  dir.writeUInt8(size === 256 ? 0 : size, p);
  dir.writeUInt8(size === 256 ? 0 : size, p + 1);
  dir.writeUInt16LE(1, p + 4);
  dir.writeUInt16LE(32, p + 6);
  dir.writeUInt32LE(data.length, p + 8);
  dir.writeUInt32LE(offset, p + 12);
  offset += data.length;
});

writeFileSync("src/app/favicon.ico", Buffer.concat([dir, ...entries.map((e) => e.data)]));
console.log("entries:", entries.map((e) => `${e.size}(${e.data.length}B)`).join(" "));
