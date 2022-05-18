import { apolloClient } from '../client'
import { GET_DATOS_GENERALES } from './querys/configuracion'
import { INSERT_PROYECTO_INFORMACION, INSERT_PROYECTO_ADQUISICIONES, INSERT_PROYECTO_MATERIAL } from './mutations/configuracion.js'

export const getDatosGenerales = async () => {
  return await apolloClient.query({
    query: GET_DATOS_GENERALES
  })
}

export const postProyectoInformacion = async (inf, fla, uni) => {
  return await apolloClient.mutate({
    mutation: INSERT_PROYECTO_INFORMACION,
    variables: {

      inf,
      fla,
      uni
    }
  })
}
export const postProyectoAdquisiciones = async (id, perfiles, aprob_ped, aprob_oc, comp) => {
  return await apolloClient.mutate({
    mutation: INSERT_PROYECTO_ADQUISICIONES,
    variables: {
      id,
      perfiles,
      aprob_ped,
      aprob_oc,
      comp

    }
  })
}
export const postProyectoMaterial = async (cantidad, mat_fk, mon_fk, pro_fk, total, valor_unitario) => {
  return await apolloClient.mutate({
    mutation: INSERT_PROYECTO_MATERIAL,
    variables: {
      cantidad, mat_fk, mon_fk, pro_fk, total, valor_unitario
    }
  })
}
//paso