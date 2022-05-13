import gql from 'graphql-tag'

const GET_DATOS_GENERALES = gql`
    query Q_GET_DATOS_GENERALES {
    kangusoft_emp_mon(where: {activo: {_eq: true}}) {
      mon {
        nombre
        id
      }
    }
    kangusoft_pro_est {
      nombre
      id
    }
    kangusoft_pro_uni(where: {activo: {_eq: true}}) {
      nombre
      id
    }
    kangusoft_fla(where: {activo: {_eq: true}, fla_amb_fk: {_eq: "1"}}) {
      id
      nombre
    }
  }
`

export { GET_DATOS_GENERALES }