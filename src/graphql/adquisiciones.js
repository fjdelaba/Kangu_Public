import { apolloClient } from '../client'
import { GET_DETALLEPEDIDO,GET_PEDIDO,GET_APROBADOR_PEDIDO,GET_DATOS_OC_CABECERA,GET_DATOS_OC_CONSULTA,GET_OC_DETALLE,GET_ESTADO_OC, GET_DATOS_OC_DETALLE_EXCEL, GET_MONTO_COMPRADOR, GET_OC_CONSULTAS, GET_MATERIALES, GET_PEDIDO_CABECERA } from './querys/adquisiciones'
import { INSERT_PED, INSERT_CABECERA_OC, INSERT_DETALLE_OC, UPDATE_CABECERA_OC, DELETE_OC_DETALLE, UPDATE_OC_INFORMACION_GENERAL, INSERT_OC, UPDATE_FINALIZAR_OC } from './mutations/adquisiciones'

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
export const getPedido = async (id) => {
  console.log('PED_FK: ', id)

  return await apolloClient.query({
    query: GET_PEDIDO,
    variables: {
      id: id      
    },
    fetchPolicy:'network-only'
    
  })
}
export const getDetallePedido = async (id) => {
  console.log('PED_FK: ', id)

  return await apolloClient.query({
    query: GET_DETALLEPEDIDO,
    variables: {
      id:'23'
    }
  
  })
}
export const getPedidoCabecera = async (id) => {
  console.log('PED_CABECERA: ', id)

  return await apolloClient.query({
    query: GET_PEDIDO_CABECERA,
    variables: {
      id:id
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

export const getAprobadorPedido = async (mod_fk, pro_fk) => {

  return await apolloClient.query({
    query: GET_APROBADOR_PEDIDO,
    variables: {
      mod_fk,
      pro_fk
    },
    fetchPolicy:'network-only'
  })
}

export const getMontoComprador = async (id_usuario, id_proyecto, flujo, mod_fk) => {

  return await apolloClient.query({
    query: GET_MONTO_COMPRADOR,
    variables: {
      id_usuario,
      flujo,
      id_proyecto,
      mod_fk
    },
    fetchPolicy:'network-only'
  })
}

export const updateCabeceraOC = async (cabecera, flujoCompra, adjuntos) => {
  console.log('cabecera graph: ', cabecera)
  console.log('flujoCompra graph: ', flujoCompra)
  console.log('adjuntos graph: ', adjuntos)

  return await apolloClient.mutate({
    mutation: UPDATE_CABECERA_OC,
    variables: {
      cabecera,
      flujoCompra,
      adjuntos
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

export const getOcConsultas = async (datos) => {
  console.log('datos: ', datos)

  return await apolloClient.query({
    query: GET_OC_CONSULTAS,
    variables: {
      datos
    },
    fetchPolicy:'network-only'
  })
}

export const getMateriales = async (datos) => {
  console.log('datos: ', datos)

  return await apolloClient.query({
    query: GET_MATERIALES,
    variables: {
      datos
    },
    fetchPolicy:'network-only'
  })
}

export const insertPED = async (cabecera, lineas) => {
  console.log('cabecera: ',cabecera)
  console.log('detalle: ',lineas)

  return await apolloClient.mutate({
    mutation: INSERT_PED,
    variables: {
      cabecera,
      lineas
    }
  })
}

export const insertOC = async (cabecera, lineas) => {
  console.log('cabecera: ',cabecera)
  console.log('detalle: ',lineas)

  return await apolloClient.mutate({
    mutation: INSERT_OC,
    variables: {
      cabecera,
      lineas
    }
  })
}

export const updateFinalizarOC = async (cabecera, flujoCompra, adjuntos) => {
  console.log('cabecera graph: ', cabecera)
  console.log('flujoCompra graph: ', flujoCompra)
  console.log('adjuntos graph: ', adjuntos)

  return await apolloClient.mutate({
    mutation: UPDATE_FINALIZAR_OC,
    variables: {
      cabecera,
      flujoCompra,
      adjuntos
    }
  })
}