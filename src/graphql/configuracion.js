import { apolloClient } from '../client'
import { GET_DATOS_GENERALES } from './querys/configuracion'

export const getDatosGenerales = async() => {
  return await apolloClient.query({
    query: GET_DATOS_GENERALES
  })
}

//paso