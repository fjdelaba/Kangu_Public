import gql from 'graphql-tag'

const GET_FACTURAS_POR_PROCESAR = gql`
query Q_FACTURAS_POR_PROCESAR {
  kangusoft_dte_cab(where: {dte_tip_fk: {_eq: "33"}}) {
    id
    emi_nombre
    fec_emision
    neto
    iva_monto
    iva_tasa
    folio
    total
    dte_tip_fk
    dte_cab_recs {
      dte_est_fk
      dte_est {
        nombre
      }
    }
    dte_for_pag {
      nombre
    }
  }
}
`
const GET_DTE = gql`
query MyQuery($dte_id: bigint = "") {
  kangusoft_dte_cab(where: {id: {_eq: $dte_id}}) {
    id
    emi_nombre
    emi_rut
    emi_giro
    emi_direccion
    emi_correo
    emi_telefono
    emp {
      id
      nombre
    }
    dte_tip {
      id
      nombre
    }
    fec_creacion
    fec_emision
    fec_recepcion_kangu
    exento
    fec_ven
    folio
    fec_recepcion_sii
    iva_monto
    iva_tasa
    neto
    pro {
      id
      nombre
    }
    dte_dets {
      cantidad
      descripcion
      id
      monto
      nombre
      nro_linea
      precio
      unidad
    }
    dte_cab_recs {
      dte_est {
        id
        nombre
      }
      oc {
        impuestos
        iva_ajustado
        neto
        mon {
          nombre
          id
        }
        neto_ajustado
        nombre
        ent {
          id
          razon_social
        }
        est_doc {
          nombre
          id
        }
        est_lin {
          nombre
          id
        }
        id
        identificacion
        rec_cabs {
          identificacion
          fec_recepcion
          monto
          usu {
            apellidos
            nombre
            id
          }
          id
        }
      }
      dte_cab_rec__view_monto_recepciones_obra {
        monto_recibido
        id_oc_fk
        cantidad_recepciones
      }
    }
  }
}
`

export { GET_FACTURAS_POR_PROCESAR, GET_DTE }
