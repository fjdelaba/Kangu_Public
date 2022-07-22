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
const UPDATE_COMENTARIO_FLUJO_APROBACION = gql`
  mutation M_UPDATE_COMENTARIO_FLUJO_APROBACION($id_apro: bigint!, $comentario: String!) {
  update_kangusoft_apr_pro(where: {id: {_eq: $id_apro}}, _set: {comentario: $comentario}) {
    affected_rows
  }
}

`
  
export {
  INSERT_FLUJO_APROBACION,
  UPDATE_FLUJO_APROBACION,
  UPDATE_COMENTARIO_FLUJO_APROBACION
}
