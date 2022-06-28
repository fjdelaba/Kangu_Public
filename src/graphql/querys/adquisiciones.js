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

//Comentario
const GET_DATOS_OC_CONSULTA = gql`
query Q_GET_DATOS_OC_CONSULTA{
  kangusoft_oc {
    nombre
    pro {
      nombre
      fec_creacion
    }
    identificacion
    neto
    usu {
      nombre
      apellidos
    }
    fec_aprobacion
  }
}
`

const GET_OC_DETALLE = gql`
query Q_GET_OC_DETALLE($oc_fk: bigint_comparison_exp!) {
  kangusoft_oc_det(where: {oc_fk: $oc_fk}) {
    mat {
      nombre
      mat_uni {
        nombre
      }
    }
    cantidad
    id
    mat_fk
    observacion
    total
    precio_unitario
    oc_fk
    oc_det_pars {
      cantidad
      id
      oc_det_id
      par_fk
    }
  }
}
`

export { GET_DATOS_OC_CABECERA, GET_DATOS_OC_CONSULTA, GET_OC_DETALLE }
