import gql from 'graphql-tag'

const GET_DATOS_OC_CABECERA = gql`
query Q_GET_DATOS_OC_CABECERA {
  kangusoft_emp_imp(where: {activo: {_eq: true}}) {
    imp {
      nombre
      id
      valor_porcentual
    }
  }
  kangusoft_emp_doctip(where: {activo: {_eq: true}}) {
    doc_tip {
      id
      nombre
      codigo_sii
    }
  }
  kangusoft_des_tip(where: {activo: {_eq: true}}) {
    id
    nombre
  }
  kangusoft_emp_mon(where: {activo: {_eq: true}}) {
    mon {
      nombre
      id
      simbolo
    }
  }
  kangusoft_fla(where: {activo: {_eq: true}, fla_amb_fk: {_eq: "1"}}) {
    nombre
    id
  }
  kangusoft_for_pag(where: {activo: {_eq: true}}) {
    id
    nombre
  }
}
`

export { GET_DATOS_OC_CABECERA }