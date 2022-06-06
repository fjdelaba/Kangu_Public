/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable callback-return */
// Servicio de Usuario Union Centro gestion

// Valor infinito para Aprobador Final
export const INFINITY = '∞'
export const INFINITY_NUMBER_REPRESENTATION = 2100000000
// Valida el rut con su cadena completa "XXXXXXXX-X"
export const validaRut = (rutCompleto) => {
  console.log ('rut en index: ', rutCompleto)
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
    return false
  const tmp 	= rutCompleto.split('-')
  let digv	= tmp[1] 
  const rut 	= tmp[0]

  if ( digv == 'K' ) digv = 'k'
 
  return (dv(rut) == digv )
}
const dv  = (T) => {
  let M = 0,S = 1

  for (;T;T = Math.floor(T / 10))
    S = (S + T % 10 * (9 - M++ % 6)) % 11

  return S ? S - 1 : 'k'
}