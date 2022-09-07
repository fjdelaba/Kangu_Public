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
const INSERT_CONTACTO_PROVEEDOR = gql`
mutation M_INSERT_CONTACTO_PROVEEDOR($email: String!, $ent_fk: bigint!, $nombre: String!, $usu_fk: bigint!){
  insert_kangusoft_ent_con(objects: {email: $email, ent_fk: $ent_fk, nombre: $nombre, usu_fk: $usu_fk}) {
    returning {
      email
      ent_fk
      id
      nombre
      usu_fk
    }
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

const UPDATE_DATOS_USUARIO = gql`
  mutation M_UPDATE_DATOS_USUARIO($id_usuario: bigint!, $apellidos: String!, $activo: Boolean!, $avatar: String!, $cargo: String!, $email: String!, $firma: String!, $nombre: String!, $rut: String!, $usu_per_fk: bigint!) {
  update_kangusoft_usu(where: {id: {_eq: $id_usuario}}, _set: {avatar: $avatar, cargo: $cargo, email: $email, firma: $firma, nombre: $nombre, rut: $rut, apellidos: $apellidos, activo: $activo, usu_per_fk: $usu_per_fk}) {
    returning {
      activo
      apellidos
      avatar
      cargo
      email
      firma
      id
      nombre
      rut
      usu_per_fk
    }
  }
}
`
const UPDATE_CONTACTO_PROVEEDOR = gql`
  mutation M_UPDATE_CONTACTO_PROVEEDOR($id: bigint!, $nombre: String!,$email: String! ) {
    update_kangusoft_ent_con(where: {id: {_eq: $id}}, _set: {nombre: $nombre, email: $email}) {
    returning {
      email
      id
      nombre
    }
  }
}
`
const UPDATE_PROVEEDOR = gql`
  mutation M_UPDATE_PROVEEDOR($id: bigint!,$direccion: String!, $email_contacto: String!, $email_dte: String!, $giro: String!, $razon_social: String!, $rut: String!, $usu_fk: bigint!) {
    update_kangusoft_ent(where: {id: {_eq: $id}}, _set: {direccion: $direccion, email_contacto: $email_contacto, email_dte: $email_dte, giro: $giro, razon_social: $razon_social, rut: $rut, usu_fk: $usu_fk}) {
    returning {
      direccion
      email_contacto
      email_dte
      id
      giro
      razon_social
      rut
    }
  }
}
`
const UPDATE_ESTADO_PROVEEDOR = gql`
mutation M_UPDATE_ESTADO_PROVEEDOR($id: bigint!, $activo: Boolean!) {
  update_kangusoft_ent(where: {id: {_eq: $id}}, _set: {activo: $activo}) {
    affected_rows
    returning {
      id
    }
  }
}
`
const UPDATE_PERMISOS_USUARIO = gql`
 mutation M_UPDATE_PERMISOS_USUARIO($permisos: [kangusoft_usu_mod_insert_input!]!) {
  insert_kangusoft_usu_mod(objects: $permisos, on_conflict: {constraint: key_umo_usuario_modulo, update_columns: activo}) {
    affected_rows
  }
}
`

const UPDATE_RESET_PASSWORD = gql`
mutation M_UPDATE_RESET_PASSWORD($clave: ResetPasswordInput = {clave: "", id_usuario: ""}) {
  reset_password(clave: $clave) {
    result
    message
  }
}
`

export {
  INSERT_CONTACTO_PROVEEDOR,
  INSERT_USUARIO_EMPRESA,
  INSERT_PROYECTO_INFORMACION,
  INSERT_PROYECTO_ADQUISICIONES,
  INSERT_PROYECTO_MATERIAL,
  UPDATE_ESTADO_USUARIO,
  UPDATE_DATOS_USUARIO,
  UPDATE_PERMISOS_USUARIO,
  UPDATE_RESET_PASSWORD,
  UPDATE_CONTACTO_PROVEEDOR,
  UPDATE_PROVEEDOR,
  UPDATE_ESTADO_PROVEEDOR
}
