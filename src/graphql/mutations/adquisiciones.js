import gql from 'graphql-tag'

const INSERT_CABECERA_OC = gql`
mutation M_INSERT_CABECERA_OC($des_tip_fk: bigint!, $doc_tip_fk: bigint!, $emp_fk: bigint!, $ent_con_fk: bigint!, $ent_fk: bigint!, $est_doc_fk: bigint!, $for_pag_fk: bigint!, $mon_fk: bigint!, $pro_fk: bigint!, $usu_fk: bigint!, $nombre: String!) {
  insert_kangusoft_oc(objects: {des_tip_fk: $des_tip_fk, desp_direccion: "", doc_tip_fk: $doc_tip_fk, emp_fk: $emp_fk, ent_con_fk: $ent_con_fk, ent_fk: $ent_fk, est_doc_fk: $est_doc_fk, for_pag_fk: $for_pag_fk, mon_fk: $mon_fk, nombre: $nombre, pro_fk: $pro_fk, usu_fk: $usu_fk}) {
    affected_rows
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
mutation M_UPDATE_CABECERA_OC($cabecera: OcCabeceraInput!) {
  update_oc_cabecera(cabecera: $cabecera) {
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
 
export {
  INSERT_CABECERA_OC,
  INSERT_DETALLE_OC,
  UPDATE_CABECERA_OC,
  DELETE_OC_DETALLE,
  UPDATE_OC_INFORMACION_GENERAL
}
