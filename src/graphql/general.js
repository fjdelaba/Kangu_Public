import { GET_FORMAS_PAGO, GET_TIPOS_DESPACHO, GET_MONEDAS, GET_ESTADOS_PROYECTO, GET_FLAGS, GET_UNIDADES_NEGOCIO, GET_TIEMPO_APROBACION,
  GET_PROVEEDORES, GET_CONTACTOS } from './querys/general'
import { apolloClient } from '../client'

export const getFormasPago = async () => {
  return await apolloClient.query({
    query: GET_FORMAS_PAGO
  })
}

export const getTiposDespacho = async () => {
  return await apolloClient.query({
    query: GET_TIPOS_DESPACHO
  })
}

export const getMonedas = async () => {
  return await apolloClient.query({
    query: GET_MONEDAS
  })
}

export const getEstadoProyecto = async () => {
  return await apolloClient.query({
    query: GET_ESTADOS_PROYECTO
  })
}

export const getUnidadesNegocio = async () => {
  return await apolloClient.query({
    query: GET_UNIDADES_NEGOCIO
  })
}

export const getTiempoAprobacion = async () => {
  return await apolloClient.query({
    query: GET_TIEMPO_APROBACION
  })
}

export const getFlags = async () => {
  return await apolloClient.query({
    query: GET_FLAGS
  })
}

export const getProveedores = async (nombrerut) => {
  console.log('nombrerut: ', nombrerut)

  return await apolloClient.query({
    query: GET_PROVEEDORES,
    variables: {
      nombrerut
    }
  })
}

export const getContactos = async (idproveedor) => {
  console.log('idproveedor: ', idproveedor)

  return await apolloClient.query({
    query: GET_CONTACTOS,
    variables: {
      idproveedor
    }
  })
}