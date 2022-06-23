import { apolloClient } from '../client'

import { GET_APROBADORES_PROYECTO } from './querys/aprobaciones'

export const getAprobadoresProyecto = async () => {
  return await apolloClient.query({
    query: GET_APROBADORES_PROYECTO
  })
}