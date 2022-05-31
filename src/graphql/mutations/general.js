import gql from 'graphql-tag'

const UPDATE_CONTACTO = gql`
mutation M_UPDATE_CONTACTO($id_contacto: bigint!, $ent_con: kangusoft_ent_con_set_input!) {
  update_kangusoft_ent_con(where: {id: {_eq: $id_contacto}}, _set: $ent_con) {
    returning {
      nombre
      email
    }
  }
}
`
const INSERT_CONTACTO = gql`
mutation M_INSERT_CONTACTO($ent_con: kangusoft_ent_con_insert_input!) {
  insert_kangusoft_ent_con_one(object: $ent_con) {
    id
    nombre
    email
  }
}
`

const GET_PARTIDAS = gql`
mutation M_GET_PARTIDAS($pro_fk: bigint!) {
  getPartidas(pro_fk: $pro_fk) {
    nombre
    id
    path
  }
}
`
const INSERT_ENT_MODAL = gql`
mutation M_INSERT_ENT_MODAL($ent: EntInput!, $ent_con: EntConInput!) {
  insert_ent_modal(ent: $ent, ent_con: $ent_con) {
    mensaje_
    id_proveedor_
    error_
    codigo_
  }
}
`

export {
  UPDATE_CONTACTO,
  GET_PARTIDAS,
  INSERT_CONTACTO,
  INSERT_ENT_MODAL
}