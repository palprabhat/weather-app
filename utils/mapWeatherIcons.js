/* eslint-disable react/jsx-key */
import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiDaySunny,
  WiDust,
  WiNightAltCloudy,
  WiNightClear,
  WiNightRain,
  WiRain,
  WiSnowflakeCold,
  WiThunderstorm,
} from "react-icons/wi";

const iconMap = [
  {
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    icon: ["11d"],
    description: "thunderstorm",
    reactIcon: [<WiThunderstorm />, <WiThunderstorm />],
  },
  {
    ids: [300, 301, 302, 310, 311, 312, 313, 314, 321, 511, 520, 521, 522, 531],
    icon: ["09d"],
    description: "shower rain",
    reactIcon: [<WiRain />, <WiRain />],
  },
  {
    ids: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
    icon: ["10d", "10n"],
    description: "rain",
    reactIcon: [<WiDayRain />, <WiNightRain />],
  },
  {
    ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    icon: ["13d"],
    description: "snow",
    reactIcon: [<WiSnowflakeCold />, <WiSnowflakeCold />],
  },
  {
    ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
    icon: ["50d"],
    description: "mist",
    reactIcon: [<WiDust />, <WiDust />],
  },
  {
    ids: [800],
    icon: ["01d", "01n"],
    description: "clear sky",
    reactIcon: [<WiDaySunny />, <WiNightClear />],
  },
  {
    ids: [801],
    icon: ["02d", "02n"],
    description: "few clouds",
    reactIcon: [<WiDayCloudy />, <WiNightAltCloudy />],
  },
  {
    ids: [802],
    icon: ["03d", "03n"],
    description: "scattered clouds",
    reactIcon: [<WiCloud />, <WiCloud />],
  },
  {
    ids: [803, 804],
    icon: ["04d", "04n"],
    description: "broken clouds",
    reactIcon: [<WiCloudy />, <WiCloudy />],
  },
];

export const getweatherIcon = (id, icon) => {
  for (let i = 0; i < iconMap.length; i++)
    if (iconMap[i].ids.includes(id)) {
      const char = icon.slice(-1);
      return iconMap[i].reactIcon[char === "d" ? 0 : 1];
    }
};
