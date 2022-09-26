import gql from 'graphql-tag'

const SUBS_DATOS_USUARIO = gql`
 subscription S_SUBS_DATOS_USUARIO($id_usuario: bigint!) {
  kangusoft_usu(where: {id: {_eq: $id_usuario}}) {
    id
    firma
    email
    avatar
    cargo
    activo
    apellidos
    nombre
    rut
    usu_per_fk
  }
}
`
const GET_NOTIFICACIONES = gql`
subscription S_GET_NOTIFICACIONES($usu_fk: bigint!) {
  kangusoft_not(where: {usu_receptor_fk: {_eq: $usu_fk}}) {
    fec_creacion
    notTipByNotTip {
      nombre
    }
    pro {
      nombre
    }
    texto
    usu_receptor_fk
    id
    mod {
      nombre
    }
    not_tip
  }
}

`

export {
  SUBS_DATOS_USUARIO,
  GET_NOTIFICACIONES
}