import gql from 'graphql-tag'

const GET_DATOS_GENERALES = gql`
  query Q_GET_DATOS_GENERALES {
    kangusoft_emp_mon(where: { activo: { _eq: true } }) {
      mon {
        nombre
        id
      }
    }
    kangusoft_pro_est {
      nombre
      id
    }
    kangusoft_pro_uni(where: { activo: { _eq: true } }) {
      nombre
      id
    }
    kangusoft_fla(where: { activo: { _eq: true }, fla_amb_fk: { _eq: "1" } }) {
      id
      nombre
    }
    kangusoft_usu {
      apellidos
      email
      nombre
      id
    }
    kangusoft_reg {
      nombre
      id
    }
    kangusoft_pro {
    id
    valor_contractual
    presupuesto
    codigo
    nombre
    fec_creacion
    pro_est {
      nombre
    }
    ent {
      razon_social
    }
    usu {
      apellidos
      nombre
    }
  }
  }
`
const GET_PROYECTO = gql`
query Q_GET_PROYECTO($id: bigint) {
  kangusoft_pro(where: {id: {_eq: $id}}) {
    id
    codigo
    nombre
    fec_creacion
    pro_est {
      id
      nombre
    }
    ent {
      id
      razon_social
    }
    usu {
      apellidos
      nombre
      flas {
        nombre
      }
    }
    inicio_oc
    direccion
    com {
      nombre
      id
      prov {
        reg {
          nombre
          id
        }
      }
    }
    mon {
      id
      nombre
    }
    descripcion
    presupuesto
    valor_contractual
  } kangusoft_pro_prouni(where: {pro_fk: {_eq: $id}}) {
    pro_uni {
      nombre
      id
    }
  }
  kangusoft_pro_fla(where: {pro_fk: {_eq: $id}}) {
    id
    fla {
      nombre
      id
    }
  }
}
`
const GET_MATERIALES_PROYECTO = gql`
query Q_GET_MATERIALES_PROYECTO($id: bigint) {
  kangusoft_pro_mat(where: {pro: {id: {_eq: $id}}}) {
    id
    mat_fk
    mat {
      nombre
      mat_uni {
        nombre
      }
    }
    valor_unitario
    total
    cantidad
  }
}
`
const GET_MATERIALES = gql`
query Q_GET_MATERIALES($id: bigint) {
  kangusoft_mat(where: {emp_fk: {_eq: $id}}) {
    activo
    id
    mat_uni {
      nombre
    }
    nombre
  }
}
`

const GET_APROBADORES_PROYECTO = gql`
query Q_GET_APROBADORES_PROYECTO($id: bigint) {
  kangusoft_apr(where: {pro_fk: {_eq: $id}}) {
    id
    monto
    flujo
    pro_fk
    apro_final
    mod_fk
    usu_apro_fk
    usuByUsuAproFk{
      apellidos
      nombre
    }
  }
}
`

const GET_USUARIOS_PROYECTO = gql`
query Q_GET_USUARIOS_PROYECTO($id: bigint) {
  kangusoft_pro_usu_per(where: {pro_fk: {_eq: $id}}) {
    pro_fk
    id
    usu_fk
    usu_per_fk
    usu {
      apellidos
      nombre
    }
  }
}
`
const GET_USUARIOS_EMPRESA = gql`
query Q_GET_USUARIOS_EMPRESA {
  kangusoft_usu {
    id
    activo
    apellidos
    avatar
    nombre
    email
    cargo
    rut
    fec_creacion
  }
}
`
const GET_PROYECTO_CODIGO_DUPLICADO = gql`
query Q_GET_PROYECTO_CODIGO_DUPLICADO($codigo: String!) {
  kangusoft_pro(where: {codigo: {_eq: $codigo}}) {
    codigo
  }
}
`
const GET_EXISTE_USUARIO = gql`
query Q_GET_EXISTE_USUARIO($_email: String = "", $_rut: String = "") {
  kangusoft_usu(where: {email: {_eq: $_email}, _or: {rut: {_eq: $_rut}}}) {
    id
  }
}
`
const GET_PERFIL_USUARIO = gql`
query Q_GET_PERFIL_USUARIO {
  kangusoft_usu_per(where: {id: {_in: [1,2]}}) {
  id
  nombre
}
}
`

const GET_PERMISOS = gql`
query Q_GET_PERMISO($id_usuario: bigint!) {
  kangusoft_usu_mod(where: {usu_fk: {_eq: $id_usuario}}) {
    usu_fk
    mod_fk
    id
    activo
  }
}
`
const GET_PROVEEDORES = gql`
query Q_GET_PROVEEDORES($emp: bigint!) {
    kangusoft_ent(where: {emp_fk: {_eq:  $emp}}) {
    id
    activo
    direccion
    razon_social
    rut
    fec_creacion
  }
}
`
const GET_PROVEEDOR_SELECCIONADO = gql`
query Q_GET_PROVEEDOR_SELECCIONADO($id: bigint!) {
    kangusoft_ent(where: {id: {_eq:  $id}}) {
      id
    activo
    direccion
    razon_social
    rut
    fec_creacion
    email_contacto
    email_dte
    ent_cons {
      nombre
      id
      email
    }
    giro
  }
}
`
const GET_USU_PER = gql`
query Q_GET_USU_PER {
  kangusoft_usu_per {
    id
    nombre
  }
  }
`
const GET_USUARIO_LOGIN = gql`
query Q_GET_USUARIO_LOGIN($id_usuario: bigint!) {
  kangusoft_usu(where: {id: {_eq: $id_usuario}}) {
    apellidos
    activo
    avatar
    cargo
    email
    firma
    id
    nombre
    rut
    usu_per_fk
      usu_mods {
      mod_fk
      id
      activo
    }
   
    # cgs(where: {estado_fk: {_eq: 1}}) {
    #   nombre
    #   id,
    #   descripcion,
    #   imagen
    # }
  }
}

`
 
export {  GET_USU_PER,GET_PERFIL_USUARIO,GET_MATERIALES,GET_PROVEEDOR_SELECCIONADO, GET_PROVEEDORES,GET_DATOS_GENERALES,GET_PROYECTO,GET_MATERIALES_PROYECTO,GET_APROBADORES_PROYECTO,GET_USUARIOS_PROYECTO,GET_USUARIOS_EMPRESA,GET_PROYECTO_CODIGO_DUPLICADO,GET_EXISTE_USUARIO, GET_PERMISOS, GET_USUARIO_LOGIN }
