import { apolloClient } from '../client'
import { GET_FACTURAS_POR_PROCESAR } from './querys/finanzas'

export const getFacturasPorProcesar = async() => {
  return await apolloClient.query({
    query:  GET_FACTURAS_POR_PROCESAR
  })
}
