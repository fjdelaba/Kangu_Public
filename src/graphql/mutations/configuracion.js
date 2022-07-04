import gql from 'graphql-tag'

const INSERT_PROYECTO_INFORMACION = gql`
mutation M_INSERT_PROYECTO_INFORMACION($inf: ProInfoGeneraL!, $fla: [ProInfoFlags!]!, $uni: [ProInfoUnidades!]!) {
  insert_pro_informacion(informacion: $inf,flags: $fla,  unidades: $uni) {
    codigo_
    error_
    mensaje_
    totalreg_
    id_proyecto_
  }
}
`
const INSERT_PROYECTO_ADQUISICIONES = gql`
mutation M_INSERT_PROYECTO_ADQUISICIONES($id: bigint!,$perfiles: [PerfilesInput!]!,  $aprob_ped: AprobadoresPedInput!, $aprob_oc: [AprobadoresOcInput!]!,  $comp: [CompradoresInput!]! ){
  insert_pro_adquisiciones(id_proyecto: $id,perfiles: $perfiles,  aprobadores_ped: $aprob_ped, aprobadores_oc: $aprob_oc, compradores: $comp) {
    codigo_
    error_
    mensaje_
  }
}
`
const INSERT_PROYECTO_MATERIAL = gql`
mutation M_INSERT_PROYECTO_MATERIAL($cantidad: numeric!,  $mat_fk: bigint!, $mon_fk: bigint!,  $pro_fk: bigint!, $total:numeric!, $valor_unitario:numeric! ){
  insert_kangusoft_pro_mat(objects:{cantidad: $cantidad,  mat_fk: $mat_fk, mon_fk: $mon_fk, pro_fk: $pro_fk, total: $total, valor_unitario: $valor_unitario}) {
    affected_rows
    returning {
      pro_fk
    }
  }
}
`
const INSERT_USUARIO_EMPRESA = gql`
mutation M_INSERT_USUARIO_EMPRESA($usu: UsuarioInput!,$modulos:[UsuarioPermisoInput!]!){
  insert_usuario(usuario: $usu, modulos: $modulos) {
    id
  }
}
`

const UPDATE_ESTADO_USUARIO = gql`
mutation M_UPDATE_ESTADO_USUARIO($id_usuario: bigint!, $estado: Boolean!) {
  update_kangusoft_usu(where: {id: {_eq: $id_usuario}}, _set: {activo: $estado}) {
    affected_rows
    returning {
      id
    }
  }
}
`

export {
  INSERT_USUARIO_EMPRESA,
  INSERT_PROYECTO_INFORMACION,
  INSERT_PROYECTO_ADQUISICIONES,
  INSERT_PROYECTO_MATERIAL,
  UPDATE_ESTADO_USUARIO
}
