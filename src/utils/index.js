/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable callback-return */
// Servicio de Usuario Union Centro gestion

// Valor infinito para Aprobador Final
export const INFINITY = '∞'
export const INFINITY_NUMBER_REPRESENTATION = 2100000000

export const TIPO_APROBACION = {
  PEDIDO: 1,
  ORDEN_COMPRA: 2
}

export const validaRut = (rule, rutCompleto, callback) => {
  console.log('rut', rutCompleto)
  if (!rutCompleto) {
    return callback(new Error('Ingrese un rut'))
  }
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto )) {
    return callback(new Error('Ingrese un rut con formato válido: xxxxxxx-x'))
  }
  const tmp 	= rutCompleto.split('-')
  let digv = tmp[1] 
  const rut = tmp[0]

  if ( digv === 'K' ) {
    digv = 'k'
  }
  console.log('dv:: ', dv(rut) )
  console.log('digv:: ', digv)
  if ((dv(rut) == digv )) {
    callback()
  } else {
    callback(new Error('Rut invalido'))
  }
}
const dv = ( T ) => {
  let M = 0, S = 1

  for ( ; T; T = Math.floor( T / 10 ) ) {
    S = ( S + T % 10 * ( 9 - M++ % 6) ) % 11
  }
        
  return S ? S - 1 : 'k'
}

export const validaCorreo = (rule, correo, callback) => {
  if (!correo) {
    return callback(new Error('Ingrese correo del usuario'))
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (re.test(correo)) {
    callback()
  } else {
    callback(new Error('correo invalido'))
  }
}

export const hex_to_ascii = (str1) => {
  const hex  = str1.toString()
  let str = ''

  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }

  return str
}

export const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()

  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})
