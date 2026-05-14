export const formattedValue = (test: number | null) => {
  let value = test ? test : 0;
  return new Intl.NumberFormat("eu-EU", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};
