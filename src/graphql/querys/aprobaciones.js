import gql from 'graphql-tag'

const GET_FLUJO_APROBADORES_PROYECTO = gql`
query Q_GET_APROBADORES_PROYECTO($id_proyecto: bigint!, $id_modulo: bigint!) {
  kangusoft_apr(where: {pro_fk: {_eq: $id_proyecto}, flujo: {_eq: true}, mod_fk: {_eq: $id_modulo}}) {
    id
    usu_apro_fk
    monto
    usuByUsuAproFk {
      apellidos
      nombre
      id
    }
  }
}
`

export { GET_FLUJO_APROBADORES_PROYECTO }
