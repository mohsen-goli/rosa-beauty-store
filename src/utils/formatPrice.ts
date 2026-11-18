export type StoreCurrency = "USD" | "IRR";

export function formatPrice(
  amount: number,
  currency: StoreCurrency = "IRR",
  language = "en",
): string {
  const locale =
    language.startsWith("fa") ? "fa-IR" : language.startsWith("ar") ? "ar" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(amount);
}
