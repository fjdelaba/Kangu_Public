import { apolloClient } from '../client'
import { GET_PROVEEDORES,GET_DATOS_GENERALES, GET_PROYECTO, GET_MATERIALES_PROYECTO, GET_APROBADORES_PROYECTO, GET_USUARIOS_PROYECTO, GET_USUARIOS_EMPRESA,GET_PROYECTO_CODIGO_DUPLICADO,GET_EXISTE_USUARIO, GET_PERMISOS, GET_USUARIO_LOGIN } from './querys/configuracion'
import { INSERT_PROYECTO_INFORMACION, INSERT_PROYECTO_ADQUISICIONES, INSERT_PROYECTO_MATERIAL, INSERT_USUARIO_EMPRESA, UPDATE_ESTADO_USUARIO, UPDATE_DATOS_USUARIO, UPDATE_PERMISOS_USUARIO, UPDATE_RESET_PASSWORD } from './mutations/configuracion.js'

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
export const getProveedor = async (emp) => {
  console.log('emp: ', emp)

  return await apolloClient.query({
    query: GET_PROVEEDORES,
    variables: {
      emp
    }
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
export const getProyectoCodigoDuplicado = async (codigo) => {
  console.log('codigo: ', codigo)

  return await apolloClient.query({
    query: GET_PROYECTO_CODIGO_DUPLICADO,
    variables: {
      codigo
    }
  })
}
export const getAprobadoresProyecto = async (id) => {
  console.log('idProyecto: ', id)

  return await apolloClient.query({
    query: GET_APROBADORES_PROYECTO,
    variables: {
      id
    }
  })
}
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
export const postUsuarioEsmpresa = async (usu,modulos) => {
  console.log('USUARIO',usu)

  return await apolloClient.mutate({
    mutation: INSERT_USUARIO_EMPRESA,
    variables: {
      usu,
      modulos
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
export const getUsuarioExistente = async (email, rut) => {
  console.log('idProyecto: ', id)

  return await apolloClient.query({
    query: GET_EXISTE_USUARIO,
    variables: {
      email,
      rut
    }
  })
}

export const updateEstadoUsuario = async (id_usuario, estado) => {
  return await apolloClient.mutate({
    mutation: UPDATE_ESTADO_USUARIO,
    variables: {
      id_usuario,
      estado
    }
  })
}

export const updateDatosUsuario = async (id_usuario, datos) => {
  return await apolloClient.mutate({
    mutation: UPDATE_DATOS_USUARIO,
    variables: {
      id_usuario,
      ...datos
    }
  })
}

export const updatePermisosUsuario = async (permisos) => {
  return await apolloClient.mutate({
    mutation: UPDATE_PERMISOS_USUARIO,
    variables: {
      permisos
    }
  })
}

export const updateResetPassword = async (clave) => {
  console.log('datos: ', clave)

  return await apolloClient.mutate({
    mutation: UPDATE_RESET_PASSWORD,
    variables: {
      clave
    }
  })
}

export const getPermisos = async (id_usuario) => {
  return await apolloClient.query({
    query: GET_PERMISOS,
    variables: {
      id_usuario
    }
  })
}

export const getUsuarioLogin = async (id_usuario) => {
  return await apolloClient.query({
    query: GET_USUARIO_LOGIN,
    variables: {
      id_usuario
    }
  })
}
//paso
