import { apolloClient } from '../client'

import { GET_FLUJO_APROBADORES_PROYECTO } from './querys/aprobaciones'
import { INSERT_FLUJO_APROBACION, UPDATE_COMENTARIO_FLUJO_APROBACION, UPDATE_FLUJO_APROBACION } from './mutations/aprobaciones'

export const getFlujoAprobadoresProyecto = async (id_proyecto, id_modulo) => {
  return await apolloClient.query({
    query: GET_FLUJO_APROBADORES_PROYECTO,
    variables: {
      id_proyecto,
      id_modulo
    }
  })
}

export const insertFlujoAprobacionOC = async (aprobadores) => {

  return await apolloClient.mutate({
    mutation: INSERT_FLUJO_APROBACION,
    variables: {
      aprobadores
    }
  })
}

export const updateFlujoAprobacionOC = async (aprobacion) => {

  return await apolloClient.mutate({
    mutation: UPDATE_FLUJO_APROBACION,
    variables: {
      aprobacion
    }
  })
}

export const updateComentarioFlujoAprobacion = async (datos) => {

  return await apolloClient.mutate({
    mutation: UPDATE_COMENTARIO_FLUJO_APROBACION,
    variables: {
      ...datos
    }
  })
}