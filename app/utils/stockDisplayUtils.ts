export function formatIntoCurrency(num: number, includeSign?: boolean) {
  let formattedNum = num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  if (num >= 0 && includeSign) {
    formattedNum = `+${formattedNum}`;
  }
  return formattedNum;
}

export function formatIntoPercentDisplay(num: number, includeSign?: boolean) {
  let formattedNum = `${num.toFixed(2)}%`;
  if (num >= 0 && includeSign) {
    formattedNum = `+${formattedNum}`;
  }
  return formattedNum;
}
