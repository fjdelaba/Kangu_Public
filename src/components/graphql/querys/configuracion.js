/* eslint-disable */
import gql from 'graphql-tag'

const QUERY_FORMA_PAGO = gql`
  query {
    kangusoft_forma_pago {
      nombre
      id
      activo
    }
  }
`
const GETDESPACHO = gql`
 query MyQuery {
  
  kangusoft_desp_tipo {
    nombre
    id
    activo
  }
}
`;
const GETMONEDA = gql`
 query {
  kangusoft_moneda {
    activo
    id
    nombre
  }
}
`;
const GETCELULAS = gql`
  query {
  kangusoft_cg_unidad {
    activa
    fec_creacion
    id
    nombre
    usu_creacion_fk
    activo
  }
}
`;
const GETCGESTADO = gql`
query {
  kangusoft_cg_estado {
    id
    nombre
    activo
  }
}`
const GETBOTONES = gql`
  query {
    kangusoft_mantendores {
      icono
      id
      link
      nombre
    }
  }
`;
async function getFormaPago() {
  const data  = await this.$apollo.query({
    query: QUERY_FORMA_PAGO
  })

  return data.data.kangusoft_forma_pago
}
export { QUERY_FORMA_PAGO,GETBOTONES,GETCGESTADO,GETCELULAS,GETMONEDA,GETDESPACHO, getFormaPago }
