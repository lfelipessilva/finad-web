// export const MaskMoney = (value: any) => {
//   const number = Number(value)
//   if (isNaN(number)) {
//     return '0'
//   }
//   const maskedValue = number.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })

//   return maskedValue
// }

export function MaskMoney(valor: any) {
  const v = ((valor.replace(/\D/g, "") / 100).toFixed(2) + "").split(".")

  const m = v[0]
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)

  if (!m) {
    return "R$00,00"
  }

  for (let i = 0; i < m.length; i++)
    m[i] =
      m[i]
        .split("")
        .reverse()
        .join("") + "."

  const r = m.reverse().join("")

  return `R$${r.substring(0, r.lastIndexOf(".")) + "," + v[1]}`
}