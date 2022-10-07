import { apolloClient } from '../client'
import { GET_FACTURAS_POR_PROCESAR, GET_DTE } from './querys/finanzas'

export const getFacturasPorProcesar = async() => {
  return await apolloClient.query({
    query:  GET_FACTURAS_POR_PROCESAR
  })
}
export const getDte = async(dte_id) => {
  return await apolloClient.query({
    query:  GET_DTE,
    variables: {
      dte_id     
    }
  })
}
