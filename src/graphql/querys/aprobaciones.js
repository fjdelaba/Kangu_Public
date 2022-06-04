import gql from 'graphql-tag'

const GET_APROBADORES_PROYECTO = gql`
query Q_GET_APROBADORES_PROYECTO($_pro_fk: bigint = "2", $_flujo: Boolean = true, $_mod_fk: bigint = "3") {
  kangusoft_apr(where: {pro_fk: {_eq: $_pro_fk}, flujo: {_eq: $_flujo}, mod_fk: {_eq: $_mod_fk}}) {
    id
    monto
    pro_fk
    apro_final
    mod_fk
    usu_apro_fk
    usuByUsuAproFk{
      apellidos
      nombre
    }
  }
}
`

export { GET_APROBADORES_PROYECTO }
