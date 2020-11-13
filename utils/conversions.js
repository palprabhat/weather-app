export const getFahrenheit = (cel) => {
  return cel * (9 / 5) + 32;
};

export const getTemp = (temp, metric) => {
  const formattedTemp = metric ? temp : getFahrenheit(temp);
  return parseFloat(formattedTemp.toString()).toFixed(0);
};
