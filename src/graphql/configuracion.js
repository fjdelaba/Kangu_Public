import { apolloClient } from '../client'
import { GET_USU_PER,GET_PERFIL_USUARIO,GET_MATERIALES,GET_PROVEEDOR_SELECCIONADO,GET_PROVEEDORES,GET_DATOS_GENERALES, GET_PROYECTO, GET_MATERIALES_PROYECTO, GET_APROBADORES_PROYECTO, GET_USUARIOS_PROYECTO, GET_USUARIOS_EMPRESA,GET_PROYECTO_CODIGO_DUPLICADO,GET_EXISTE_USUARIO, GET_PERMISOS, GET_USUARIO_LOGIN, GET_OC_IDENTIFICADOR } from './querys/configuracion'
import { UPDATE_ESTADO_PROVEEDOR,UPDATE_PROVEEDOR,INSERT_CONTACTO_PROVEEDOR,UPDATE_CONTACTO_PROVEEDOR, INSERT_PROYECTO_INFORMACION, INSERT_PROYECTO_ADQUISICIONES, INSERT_PROYECTO_MATERIAL, INSERT_USUARIO_EMPRESA, UPDATE_ESTADO_USUARIO, UPDATE_DATOS_USUARIO, UPDATE_PERMISOS_USUARIO, UPDATE_RESET_PASSWORD } from './mutations/configuracion.js'

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
export const getPerfilUsuario = async () => {
  return await apolloClient.query({
    query: GET_PERFIL_USUARIO
  })
}
export const getUsuPermisos = async () => {
  return await apolloClient.query({
    query: GET_USU_PER
  })
}
export const getProveedorSeleccionado = async (id) => {
  console.log('Proveedor: ', id)

  return await apolloClient.query({
    query: GET_PROVEEDOR_SELECCIONADO,
    variables: {
      id
    }
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
export const getMateriales = async (id) => {
  console.log('idEmpresa: ', id)

  return await apolloClient.query({
    query: GET_MATERIALES,
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
export const postContactoProveedor = async (email, ent_fk,nombre, usu_fk) => {
  return await apolloClient.mutate({
    mutation: INSERT_CONTACTO_PROVEEDOR,
    variables: {
      email, ent_fk, nombre, usu_fk
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

export const updateProveedor = async (direccion,email_contacto,email_dte,id,giro,razon_social,rut,usu_fk) => {
  return await apolloClient.mutate({
    mutation: UPDATE_PROVEEDOR,
    variables: {
      direccion,
      email_contacto,
      email_dte,
      id,
      giro,
      razon_social,
      rut,
      usu_fk
    }
  })
}

export const updateContactoProveedor = async (id, nombre,email) => {
  return await apolloClient.mutate({
    mutation: UPDATE_CONTACTO_PROVEEDOR,
    variables: {
      id,
      nombre,
      email
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

export const updateEstadoProveedor = async (id, activo) => {
  return await apolloClient.mutate({
    mutation: UPDATE_ESTADO_PROVEEDOR,
    variables: {
      id,
      activo
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

export const getOcIdentificador = async (_similar) => {
  console.log('identificador',_similar)
  
  return await apolloClient.query({
    query: GET_OC_IDENTIFICADOR,
    variables: {
      _similar:'%' + _similar + '%'
    }
  })
}

export const getUsuarioLogin = async (id_usuario) => {
  console.log('USU:',id_usuario)

  return await apolloClient.query({
    query: GET_USUARIO_LOGIN,
    variables: {
      id_usuario
    }
  })
}
//paso
