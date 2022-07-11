import gql from 'graphql-tag'

const INSERT_FLUJO_APROBACION = gql`
   mutation MyMutation($aprobadores: [kangusoft_apr_pro_insert_input!] = {}) {
    insert_kangusoft_apr_pro(objects: $aprobadores) {
      affected_rows
      returning {
        id
      }
    }
  }
  `
  
export {
  INSERT_FLUJO_APROBACION
}
