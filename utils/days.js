import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getDayTime = (sunrise, sunset) => {
  const rise = dayjs.unix(sunrise);
  const set = dayjs.unix(sunset);

  const diff = set.diff(rise, "h", true);
  const h = Math.floor(diff);
  const min = parseFloat(`${(diff - h) * 60}`).toFixed(0);

  return `${h}h ${min}m`;
};

export const getTime = (unixTime, timezone, format) => {
  return dayjs.unix(unixTime).tz(timezone).format(format);
};
