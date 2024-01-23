export function currencyFormater(priceInCents) {
  return (Math.round(priceInCents) / 100).toFixed(2);
}
