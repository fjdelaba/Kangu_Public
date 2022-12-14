/* eslint-disable */
import gql from 'graphql-tag'

const QUERY_FORMA_PAGO = gql`
  query {
    kangusoft_for_pag {
      nombre
      id
      activo
      fec_creacion
    }
  }
`
const GETDESPACHO = gql`
 query MyQuery {
  
  kangusoft_des_tip {
    id
    nombre
    activo
    fec_creacion
  }
}
`;
const GETMONEDA = gql`
 query {
  kangusoft_emp_mon {
  activo
    id
    mon {
      nombre
    }
  }
}
`;
const GETCELULAS = gql`
  query {
    kangusoft_pro_uni {
    id
    nombre
    activo
    fec_creacion
  }
}
`;
const GETCATEGORIASOC = gql`
  query {
  kangusoft_fla(where: {fla_mod_fk: {_eq: "3"}}) {
    nombre
    id
    activo
    fla_mod_fk
  }
}
`;
const GETCATEGORIASPRO = gql`
  query {
  kangusoft_fla(where: {fla_mod_fk: {_eq: "7"}}) {
    nombre
    id
    activo
    fla_mod_fk
  }
}
`;
const GETCGESTADO = gql`
query {
  kangusoft_pro_est {
    id
    nombre
  }
}`
const GETBOTONES = gql`
  query Q_GET_BOTONES {
    kangusoft_man {
      icono
      id
      link
      nombre
    }
  }
`
async function getFormaPago() {
  const data  = await this.$apollo.query({
    query: QUERY_FORMA_PAGO
  })

  return data.data.kangusoft_for_pag
}
export { GETCATEGORIASPRO,GETCATEGORIASOC,QUERY_FORMA_PAGO,GETBOTONES,GETCGESTADO,GETCELULAS,GETMONEDA,GETDESPACHO, getFormaPago }
