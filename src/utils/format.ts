export const formatValue = (value: number | undefined) => {
  if(!value || isNaN(value)) return "R$0,00";

  const v = value / 100

  return v.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}