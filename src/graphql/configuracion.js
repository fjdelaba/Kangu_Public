import { apolloClient } from '../client'
import { GET_DATOS_GENERALES } from './querys/configuracion'
import { INSERT_PROYECTO_INFORMACION } from './mutations/configuracion.js'

export const getDatosGenerales = async() => {
  return await apolloClient.query({
    query: GET_DATOS_GENERALES
  })
}

export const postProyectoInformacion = async(inf,fla,uni) => {
  return await apolloClient.mutate({
    mutation: INSERT_PROYECTO_INFORMACION ,
    variables: {

      inf,
      fla,
      uni
    }
  })
}

//paso