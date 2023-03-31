import { format, isValid } from "date-fns";

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  // const date1 = isValid(d) ? format(d, "dd-MMM-yyyy") : "Invalid Date";
  const date1 = isValid(d) ? format(d, "dd MMM, yyyy") : "Invalid Date";
  return date1;
}

function formatTime(time){
  if (!time) return null;
  const t = new Date(time);
  const time1 = isValid(t) ? format(t, "hh:mm a") : "Invalid Time";
  return time1;
}

function formatDateForAPI(date) {
  if (!date) return null;
  const d = new Date(date);
  const date1 = isValid(d) ? format(d, "yyyy-MM-dd") : date;
  return date1;
}

export { formatDate,formatTime, formatDateForAPI };
