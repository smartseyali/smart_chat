import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(advancedFormat);

// Date label formatter
export function formatDateLabel(dateInput) {
  const date = dayjs(dateInput);

  if (date.isToday()) {
    return "Today";
  }

  if (date.isYesterday()) {
    return "Yesterday";
  }

  const startOfWeek = dayjs().startOf("week");
  if (date.isSameOrAfter(startOfWeek) && date.year() === dayjs().year()) {
    return date.format("dddd"); // e.g., Monday
  }

  if (date.year() === dayjs().year()) {
    return date.format("dddd, DD MMM"); // e.g., Tuesday, 25 Jun
  }

  return date.format("dddd, DD MMM YYYY"); // e.g., Monday, 14 Aug 2023
}

// Time label formatter
export function formatTimeLabel(dateInput) {
  return dayjs(dateInput).format("hh:mm A");
}
