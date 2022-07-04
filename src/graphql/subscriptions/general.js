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
  }
}
`

export {
  SUBS_DATOS_USUARIO
}