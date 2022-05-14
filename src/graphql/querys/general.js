import gql from 'graphql-tag'

const GET_FORMAS_PAGO = gql`
  query Q_GET_FORMAS_PAGO {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_TIPOS_DESPACHO = gql`
  query Q_GET_TIPOS_DESPACHO {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_MONEDAS = gql`
  query Q_GET_MONEDAS {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_ESTADOS_PROYECTO = gql`
  query Q_GET_ESTADOS_PROYECTO {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_UNIDADES_NEGOCIO = gql`
  query Q_GET_UNIDADES_NEGOCIO {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_TIEMPO_APROBACION = gql`
  query Q_GET_TIEMPO_APROBACION {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_FLAGS = gql`
  query Q_GET_FLAGS {
    kangusoft_fla {
      nombre
      id
    }
  }
`
const GET_PROVEEDORES = gql`
query Q_GET_PROVEEDORES($nombrerut: String) {
  kangusoft_ent(where: {_or: [{razon_social: {_ilike: $nombrerut}}, {rut: {_ilike: $nombrerut}}], activo: {_eq: true}}) {
    email_dte
    fec_creacion
    id
    razon_social
    rut
    activo
  }
}
`

const GET_CONTACTOS = gql`
query Q_GET_CONTACTOS($idproveedor: bigint) {
  kangusoft_ent_con(where: {ent_fk: {_eq: $idproveedor}}) {
    nombre
    id
  }
}
`
const GET_COMUNAS = gql`
query Q_GET_COMUNA($idRegion: bigint) {
  kangusoft_prov(where: {reg_fk: {_eq: $idRegion}}) {
    coms {
      id
      nombre
    }
  }
}
`
const GET_PROYECTOS_POR_USUARIO = gql`
query Q_GET_PROYECTOS_POR_USUARIO($id_usuario: bigint!) {
  kangusoft_apr(where: {usu_apro_fk: {_eq: $id_usuario}}) {
    pro {
      id
      nombre
      codigo
    }
  }
}
`

export {
  GET_FORMAS_PAGO,
  GET_TIPOS_DESPACHO,
  GET_MONEDAS,
  GET_ESTADOS_PROYECTO,
  GET_UNIDADES_NEGOCIO,
  GET_TIEMPO_APROBACION,
  GET_FLAGS,
  GET_PROVEEDORES,
  GET_CONTACTOS,
  GET_COMUNAS,
  GET_PROYECTOS_POR_USUARIO
}