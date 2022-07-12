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
const UPDATE_FLUJO_APROBACION = gql`
  mutation M_UPDATE_FLUJO_APROBACION($aprobacion: UpdateFlujoAprobacionInput = {}) {
    update_flujo_aprobacion(aprobacion: $aprobacion) {
      message
      result
  }
}
  `
  
export {
  INSERT_FLUJO_APROBACION,
  UPDATE_FLUJO_APROBACION
}
