import { apolloClient } from '../client'
import { GET_DATOS_OC_CABECERA,GET_DATOS_OC_CONSULTA,GET_OC_DETALLE,GET_ESTADO_OC, GET_DATOS_OC_DETALLE_EXCEL } from './querys/adquisiciones'
import { INSERT_CABECERA_OC, INSERT_DETALLE_OC, UPDATE_CABECERA_OC, DELETE_OC_DETALLE, UPDATE_OC_INFORMACION_GENERAL } from './mutations/adquisiciones'

export const getDatosFormularioCabecera = async() => {
  return await apolloClient.query({
    query: GET_DATOS_OC_CABECERA
  })
}
export const getEstadosOc = async() => {
  return await apolloClient.query({
    query: GET_ESTADO_OC
  })
}
export const getDatosOcConsulta = async() => {
  return await apolloClient.query({
    query: GET_DATOS_OC_CONSULTA
  })
}
export const getDetalleOcExcel = async() => {
  return await apolloClient.query({
    query: GET_DATOS_OC_DETALLE_EXCEL
  })
}

//Comentario
export const postCabeceraOC = async (cabecera) => {

  return await apolloClient.mutate({
    mutation: INSERT_CABECERA_OC,
    variables: {
      ...cabecera
    }
  })
}
export const postDetalleOC = async (detalle, detalle_partida) => {

  return await apolloClient.mutate({
    mutation: INSERT_DETALLE_OC,
    variables: {
      detalle,
      detalle_partida
    }
  })
}

export const getDetalleOC = async (oc_fk) => {
  console.log('oc_fk: ', oc_fk)

  return await apolloClient.query({
    query: GET_OC_DETALLE,
    variables: {
      oc_fk:{
        _eq: oc_fk
      },
      _eq:oc_fk
    },
    fetchPolicy:'network-only'
  })
}

export const updateCabeceraOC = async (cabecera) => {

  return await apolloClient.mutate({
    mutation: UPDATE_CABECERA_OC,
    variables: {
      cabecera
    }
  })
}

export const deleteDetalleOC = async (id_det) => {

  return await apolloClient.mutate({
    mutation: DELETE_OC_DETALLE,
    variables: {
      id_det
    }
  })
}

export const updateOCInformacionGeneral = async (id_oc, cabecera) => {

  return await apolloClient.mutate({
    mutation: UPDATE_OC_INFORMACION_GENERAL,
    variables: {
      id_oc,
      cabecera
    }
  })
}
