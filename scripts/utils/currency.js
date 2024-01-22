export function currencyFormater(priceInCents) {
  return (priceInCents / 100).toFixed(2);
}
