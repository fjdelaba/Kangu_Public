import { apolloClient } from '../client'
import { GET_DATOS_OC_CABECERA } from './querys/adquisiciones'

export const getDatosFormularioCabecera = async() => {
  return await apolloClient.query({
    query: GET_DATOS_OC_CABECERA
  })
}