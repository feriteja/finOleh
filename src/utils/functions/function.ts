export const moneyFormat = (number: number) => {
  const moneyFormat = number
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  return moneyFormat;
};
