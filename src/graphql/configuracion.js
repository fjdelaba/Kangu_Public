import { apolloClient } from '../client'
<<<<<<< HEAD
import { GET_DATOS_GENERALES, GET_PROYECTO,GET_MATERIALES_PROYECTO,GET_USUARIOS_PROYECTO } from './querys/configuracion'
import { INSERT_PROYECTO_INFORMACION, INSERT_PROYECTO_ADQUISICIONES, INSERT_PROYECTO_MATERIAL } from './mutations/configuracion.js'
=======
import { GET_DATOS_GENERALES, GET_PROYECTO, GET_MATERIALES_PROYECTO, GET_APROBADORES_PROYECTO, GET_USUARIOS_PROYECTO, GET_USUARIOS_EMPRESA } from './querys/configuracion'
import { INSERT_PROYECTO_INFORMACION, INSERT_PROYECTO_ADQUISICIONES, INSERT_PROYECTO_MATERIAL, INSERT_USUARIO_EMPRESA } from './mutations/configuracion.js'
>>>>>>> e6f97663bdbf527623c77908041d91e063b0feb5

export const getDatosGenerales = async () => {
  return await apolloClient.query({
    query: GET_DATOS_GENERALES
  })
}
export const getUsuariosEmpresa = async () => {
  return await apolloClient.query({
    query: GET_USUARIOS_EMPRESA
  })
}
export const getUsuariosProyecto = async (id) => {
  console.log('idProyecto: ', id)

  return await apolloClient.query({
    query: GET_USUARIOS_PROYECTO,
    variables: {
      id
    }
  })
}
// export const getAprobadoresProyecto = async (id) => {
//   console.log('idProyecto: ', id)

//   return await apolloClient.query({
//     query: GET_APROBADORES_PROYECTO,
//     variables: {
//       id
//     }
//   })
// }
export const getMaterialesProyecto = async (id) => {
  console.log('idProyecto: ', id)

  return await apolloClient.query({
    query: GET_MATERIALES_PROYECTO,
    variables: {
      id
    }
  })
}
export const getProyecto = async (id) => {
  console.log('idProyecto: ', id)

  return await apolloClient.query({
    query: GET_PROYECTO,
    variables: {
      id
    }
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
export const postUsuarioEsmpresa = async (activo, apellidos, cargo, clave, email, nombre, rut, emp_fk, usu_per_fk) => {
  return await apolloClient.mutate({
    mutation: INSERT_USUARIO_EMPRESA,
    variables: {
      activo, apellidos, cargo, clave, email, nombre, rut, emp_fk, usu_per_fk
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