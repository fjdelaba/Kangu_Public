import gql from 'graphql-tag'

const UPDATE_EMPRESA = gql`
mutation M_UPDATE_EMPRESA($id: bigint!,$direccion: String!, $email: String!, $giro: String!, $nombre: String!, $representante: String!, $rut: String!, $telefono: String!, $com_fk: bigint!, $color: String!, $eslogan: String!, $logo: String!) {
  update_kangusoft_emp(where: {id: {_eq: $id}}, _set: {direccion: $direccion, email: $email, giro: $giro, nombre: $nombre, representante: $representante, telefono: $telefono, rut: $rut, com_fk: $com_fk, color: $color, eslogan: $eslogan, logo: $logo}) {
  returning {
    activo
    direccion
    email
    com_fk
    giro
    id
    nombre
    rut
    representante
    telefono
    color
    eslogan
    logo
  }
}
}
`
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
const INSERT_NUEVO_MAT = gql`
mutation INSERT_NUEVO_MAT($emp_fk: bigint!, $mat_fam_fk: bigint!,$mat_uni_fk:bigint!,$nombre:String!,$usu_fk:bigint!,$tipo_creacion: bpchar!) {
  insert_kangusoft_mat(objects: {activo: true, emp_fk: $emp_fk, mat_fam_fk:$mat_fam_fk, mat_uni_fk: $mat_uni_fk, nombre: $nombre, usu_fk: $usu_fk, tipo_creacion: $tipo_creacion}) {
    affected_rows
    returning {
      activo
      id
      nombre
      mat_fam_fk
      mat_uni_fk
    }
  }
}

`

export {
  UPDATE_EMPRESA,
  UPDATE_CONTACTO,
  GET_PARTIDAS,
  INSERT_CONTACTO,
  INSERT_ENT_MODAL,
  INSERT_NUEVO_MAT
}
