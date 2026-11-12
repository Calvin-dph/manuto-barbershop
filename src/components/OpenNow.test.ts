// Jalankan: npx tsx src/components/OpenNow.test.ts
import assert from "node:assert/strict";
import { isOpenAt } from "./OpenNow";

const wib = (hhmm: string) => new Date(`2026-11-12T${hhmm}:00+07:00`);
assert.equal(isOpenAt(wib("09:59")), false);
assert.equal(isOpenAt(wib("10:00")), true);
assert.equal(isOpenAt(wib("21:59")), true);
assert.equal(isOpenAt(wib("22:00")), false);
assert.equal(isOpenAt(new Date("2026-11-12T05:00:00Z")), true); // 12.00 WIB, meski jam server UTC
console.log("OpenNow: semua tes lulus");
