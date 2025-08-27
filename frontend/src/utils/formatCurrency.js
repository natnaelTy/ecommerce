// utils/formatCurrency.js
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};
