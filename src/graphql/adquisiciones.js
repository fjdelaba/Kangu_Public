import { apolloClient } from '../client'
import { GET_DATOS_OC_CABECERA,GET_DATOS_OC_CONSULTA,GET_OC_DETALLE,GET_ESTADO_OC } from './querys/adquisiciones'
import { INSERT_CABECERA_OC, INSERT_DETALLE_OC } from './mutations/adquisiciones'

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
      }
    },
    fetchPolicy:'network-only'
  })
}