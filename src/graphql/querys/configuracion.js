import gql from 'graphql-tag'

export const QUERY_FORMA_PAGO = gql`
  query {
    kangusoft_forma_pago {
      nombre
      id
      editable
    }
  }
`
