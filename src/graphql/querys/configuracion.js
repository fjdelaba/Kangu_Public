import gql from 'graphql-tag'

const QUERY_FORMA_PAGO = gql`
  query {
    kangusoft_forma_pago {
      nombre
      id
      editable
    }
  }
`

async function getFormaPago() {
  const data  = await this.$apollo.query({
    query: QUERY_FORMA_PAGO
  })

  return data.data.kangusoft_forma_pago
}

export { getFormaPago }
