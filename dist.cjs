"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getNextClass_exports = {};
__export(getNextClass_exports, {
  getNextClass: () => getNextClass
});
module.exports = __toCommonJS(getNextClass_exports);
const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const dayLabels = {
  monday: "segunda-feira",
  tuesday: "ter\xE7a-feira",
  wednesday: "quarta-feira",
  thursday: "quinta-feira",
  friday: "sexta-feira"
};
function parseTime(timeRange) {
  const [start] = timeRange.split("-");
  const [hours, minutes] = start.trim().split(":").map(Number);
  return { hours, minutes };
}
function parseCell(raw) {
  const parts = raw.split("|").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0 || parts[0] === "...") return null;
  return {
    subject: parts[0],
    teacher: parts.length >= 3 ? parts[1] : parts.length === 2 && !parts[1].startsWith("Lab.") && !parts[1].startsWith("Bloco") ? parts[1] : void 0,
    room: parts.length >= 3 ? parts[2] : parts.length === 2 && (parts[1].startsWith("Lab.") || parts[1].startsWith("Bloco")) ? parts[1] : void 0
  };
}
function getNextClass(schedule, now = /* @__PURE__ */ new Date()) {
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (let offset = 0; offset < 7; offset++) {
    const checkDay = (currentDay + offset) % 7;
    const dayKey = dayKeys[checkDay];
    if (dayKey === "sunday" || dayKey === "saturday") continue;
    for (const slot of schedule) {
      const { hours, minutes } = parseTime(slot.time);
      const slotMinutes = hours * 60 + minutes;
      if (offset === 0 && slotMinutes <= currentMinutes) continue;
      const cellValue = slot[dayKey];
      if (!cellValue || typeof cellValue !== "string") continue;
      const parsed = parseCell(cellValue);
      if (!parsed) continue;
      const timeLabel = slot.time.split("-")[0].trim();
      const dayLabel = dayLabels[dayKey];
      const parts = [parsed.subject];
      if (parsed.teacher) parts.push(`com ${parsed.teacher}`);
      parts.push(offset === 0 ? `hoje \xE0s ${timeLabel}` : `${dayLabel} \xE0s ${timeLabel}`);
      if (parsed.room) parts.push(`no ${parsed.room}`);
      return parts.join(" ");
    }
  }
  return null;
}
