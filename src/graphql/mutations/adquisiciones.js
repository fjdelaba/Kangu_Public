import gql from 'graphql-tag'

const INSERT_CABECERA_OC = gql`
mutation M_INSERT_CABECERA_OC($des_tip_fk: bigint!, $doc_tip_fk: bigint!, $emp_fk: bigint!, $ent_con_fk: bigint!, $ent_fk: bigint!, $est_doc_fk: bigint!, $for_pag_fk: bigint!, $mon_fk: bigint!, $pro_fk: bigint!, $usu_fk: bigint!, $nombre: String!, $mon_val_fk: bigint!) {
  insert_kangusoft_oc(objects: {des_tip_fk: $des_tip_fk, desp_direccion: "", doc_tip_fk: $doc_tip_fk, emp_fk: $emp_fk, ent_con_fk: $ent_con_fk, ent_fk: $ent_fk, est_doc_fk: $est_doc_fk, for_pag_fk: $for_pag_fk, mon_fk: $mon_fk, nombre: $nombre, pro_fk: $pro_fk, usu_fk: $usu_fk, mon_val_fk: $mon_val_fk}) {
    affected_rows
    returning {
      id
    }
  }
}
`
const INSERT_RECEPCION_OC = gql`
mutation M_INSERT_RECEPCION_OC($oc_fk: bigint!, $rec_est_fk: smallint!, $usu_fk: bigint!, $rec_dets: kangusoft_rec_det_arr_rel_insert_input = {data: {}}, $observacion: String = "", $dte_cab_fk: bigint = null,$ref_folio_dte: String = null , $ref_tipo_dte_fk: bigint = null ,$emp_fk: bigint!) {
  insert_kangusoft_rec_cab(objects: {oc_fk: $oc_fk, usu_fk: $usu_fk, rec_est_fk: $rec_est_fk, observacion: $observacion, dte_cab_fk: $dte_cab_fk, rec_dets: $rec_dets, ref_folio_dte: $ref_folio_dte, ref_tipo_dte_fk: $ref_tipo_dte_fk, emp_fk: $emp_fk}) {
    returning {
      id
    }
  }
}
`

const INSERT_DETALLE_OC = gql`
mutation M_INSERT_DETALLE_OCN($detalle: OcDetalleInput!, $detalle_partida: [OcDetallePartidaInput]!) {
    insert_oc_detalle(detalle: $detalle, detalle_partida: $detalle_partida) {
      oc_det_id
      message
      error
    }
}
`

const UPDATE_CABECERA_OC = gql`
mutation M_UPDATE_CABECERA_OC($cabecera: OcCabeceraInput!, $flujoCompra: [FlujoCompraInput]!, $adjuntos: [AdjuntoOcInput]!) {
  update_oc_cabecera(cabecera: $cabecera, flujoCompra: $flujoCompra, adjuntos: $adjuntos,) {
    id
    identificacion
  }
}
`

const DELETE_OC_DETALLE = gql`
mutation M_DELETE_OC_DETALLE($id_det: bigint!) {
  delete_oc_detalle(id_det: $id_det) {
    message
    success
  }
}
`

const UPDATE_OC_INFORMACION_GENERAL = gql`
mutation M_UPDATE_OC_INFORMACION_GENERAL($id_oc: bigint = "", $cabecera: kangusoft_oc_set_input!) {
  update_kangusoft_oc(where: {id: {_eq: $id_oc}}, _set: $cabecera) {
    affected_rows
    returning {
      id
    }
  }
}
`

const INSERT_OC = gql`
mutation M_INSERT_OC($cabecera: CabeceraOCInput!, $lineas: [DetalleOcInput]!) {
  insert_oc(cabecera: $cabecera, lineas: $lineas) {
    error
    success
    oc_id
  }
}
`

const INSERT_PED = gql`
mutation M_INSERT_PED($cabecera: CabeceraPedidoInput!, $lineas: [DetallePedidoInput]!) {
  insert_pedido(cabecera: $cabecera, lineas: $lineas) {
    error
    success
    ped_id
  }
}
`

const UPDATE_FINALIZAR_OC = gql`
mutation M_UPDATE_FINALIZAR_OC($cabecera: OcCabeceraInput!, $flujoCompra: [FlujoCompraInput]!, $adjuntos: [AdjuntoOcInput]!) {
  update_oc_cabecera(cabecera: $cabecera, flujoCompra: $flujoCompra, adjuntos: $adjuntos,) {
    id
    identificacion
  }
}
`
 
export {
  INSERT_RECEPCION_OC,
  INSERT_CABECERA_OC,
  INSERT_DETALLE_OC,
  UPDATE_CABECERA_OC,
  DELETE_OC_DETALLE,
  UPDATE_OC_INFORMACION_GENERAL,
  INSERT_OC,
  UPDATE_FINALIZAR_OC,
  INSERT_PED
}
