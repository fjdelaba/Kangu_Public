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

export { GET_FACTURAS_POR_PROCESAR }
