import { GET_FORMAS_PAGO, GET_TIPOS_DESPACHO, GET_MONEDAS, GET_ESTADOS_PROYECTO, GET_FLAGS, GET_UNIDADES_NEGOCIO, GET_TIEMPO_APROBACION,
  GET_PROVEEDORES, GET_CONTACTOS,GET_COMUNAS,GET_PROYECTOS_POR_USUARIO, GET_MATERIAL, GET_EMPRESA, GET_ACCESO_MODULO, GET_PROYECTOS_USUARIO_APROBADOR, GET_VALORES_FILTROS_CONSULTA, GET_PROYECTOS_USUARIO_CONSULTA  } from './querys/general'
import { UPDATE_EMPRESA, GET_PARTIDAS, UPDATE_CONTACTO, INSERT_CONTACTO, INSERT_ENT_MODAL } from './mutations/general'
import { SUBS_DATOS_USUARIO } from './subscriptions/general'

import { apolloClient } from '../client'

export const getFormasPago = async () => {
  return await apolloClient.query({
    query: GET_FORMAS_PAGO
  })
}

export const getTiposDespacho = async () => {
  return await apolloClient.query({
    query: GET_TIPOS_DESPACHO
  })
}

export const getMonedas = async () => {
  return await apolloClient.query({
    query: GET_MONEDAS
  })
}

export const getEstadoProyecto = async () => {
  return await apolloClient.query({
    query: GET_ESTADOS_PROYECTO
  })
}

export const getUnidadesNegocio = async () => {
  return await apolloClient.query({
    query: GET_UNIDADES_NEGOCIO
  })
}

export const getTiempoAprobacion = async () => {
  return await apolloClient.query({
    query: GET_TIEMPO_APROBACION
  })
}

export const getFlags = async () => {
  return await apolloClient.query({
    query: GET_FLAGS
  })
}

export const getProveedores = async (nombrerut) => {
  console.log('nombrerut: ', nombrerut)

  return await apolloClient.query({
    query: GET_PROVEEDORES,
    variables: {
      nombrerut
    }
  })
}

export const getContactos = async (idproveedor) => {
  console.log('idproveedor: ', idproveedor)

  return await apolloClient.query({
    query: GET_CONTACTOS,
    variables: {
      idproveedor
    },
    fetchPolicy:'network-only'
  })
}
export const getComunas = async (idRegion) => {
  console.log('idRegion: ', idRegion)

  return await apolloClient.query({
    query: GET_COMUNAS,
    variables: {
      idRegion
    }
  })
}

export const getProyectosPorUsuario = async (id_usuario) => {
  // console.log('id_usuario: ', id_usuario)
  
  return await apolloClient.query({
    query: GET_PROYECTOS_POR_USUARIO,
    variables: {
      id_usuario
    }
  })
}

export const getPartidasPorPoroyecto = async (pro_fk) => {
  // console.log('pro_fk: ', pro_fk)
  
  return await apolloClient.mutate({
    mutation: GET_PARTIDAS,
    variables:{
      pro_fk
    },
    update: (data) => {
      // console.log('update data getPartidas: ',data)
    } 
  })
}

export const getMateriales = async (material) => {
  console.log('material: ', material)
  
  return await apolloClient.query({
    query: GET_MATERIAL,
    variables: {
      material
    }
  })
}
export const updateEmpresa = async (id, direccion,email,giro,nombre,representante,rut,telefono,com_fk,color,eslogan,logo) => {
  console.log('id_contacto, ent_con: ',
    direccion,
    email,
    com_fk,
    giro,
    id,
    nombre,
    rut,
    representante,
    telefono)
  
  return await apolloClient.mutate({
    mutation: UPDATE_EMPRESA,
    variables:{
      direccion,
      email,
      com_fk,
      giro,
      id,
      nombre,
      rut,
      representante,
      telefono,
      color,
      eslogan,
      logo
    },
    update: (data) => {console.log('update data updateContactos: ',data)} 
  })
}

export const updateContactos = async (id_contacto, ent_con) => {
  console.log('id_contacto, ent_con: ', id_contacto, ent_con)
  
  return await apolloClient.mutate({
    mutation: UPDATE_CONTACTO,
    variables:{
      id_contacto,
      ent_con
    },
    update: (data) => {console.log('update data updateContactos: ',data)} 
  })
}

export const insertContactos = async (ent_con) => {
  console.log('ent_con: ', ent_con)
  
  return await apolloClient.mutate({
    mutation: INSERT_CONTACTO,
    variables:{
      ent_con
    },
    update: (data) => {console.log('update data updateContactos: ',data)} 
  })
}

export const insertEntModal = async (ent,ent_con) => {
  console.log('ent: ', ent_con, ' - ent_con: ', ent_con)
  
  return await apolloClient.mutate({
    mutation: INSERT_ENT_MODAL,
    variables:{
      ent,
      ent_con
    },
    update: (data) => {console.log('update data insertEntModal: ',data)} 
  })
}

export const getDatosUsuarios = async () => {
  return await apolloClient.query({
    query: GET_UNIDADES_NEGOCIO
  })
}

export const getEmpresa = async (emp_id) => {
  // console.log('emp_id: ', emp_id)
  
  return await apolloClient.query({
    query: GET_EMPRESA,
    variables: {
      emp_id
    }
  })
}

export const subsDatosUsuario = async (id_usuario) => {
  // console.log('id_usuario subsDatosUsuario: ', id_usuario)

  return apolloClient.subscribe({
    query: SUBS_DATOS_USUARIO,
    variables: {
      id_usuario
    }
  })
}

export const getAccesoModulo = async (id_usuario, modulo_fk) => {
  
  return await apolloClient.query({
    query: GET_ACCESO_MODULO,
    variables: {
      id_usuario,
      modulo_fk
    }
  })
}

export const getProyectosUsuarioAprobador = async (usu_fk) => {
  
  return await apolloClient.query({
    query: GET_PROYECTOS_USUARIO_APROBADOR,
    variables: {
      usu_fk
    }
  })
}

export const getProyectosUsuarioConsultar = async (usu_fk) => {
  
  return await apolloClient.query({
    query: GET_PROYECTOS_USUARIO_CONSULTA,
    variables: {
      usu_fk
    }
  })
}

export const getFiltrosConsultas = async (emp_fk) => {
  
  return await apolloClient.query({
    query: GET_VALORES_FILTROS_CONSULTA,
    variables: {
      emp_fk
    }
  })
}