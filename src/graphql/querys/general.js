import gql from 'graphql-tag'

const GET_FORMAS_PAGO = gql`
  query Q_GET_FORMAS_PAGO {
    kangusoft_fla {
      nombre
      id
    }
  }
`
const GET_ULTIMAS_OC = gql`
  query Q_GET_ULTIMAS_OC($id: bigint!) {
    kangusoft_oc(limit: 5, where: {usu_fk: {_eq: $id}, est_doc_fk: {_neq: "4"}}, order_by: {fec_creacion: desc}) {
    fec_creacion
    pro {
      id
      nombre
    }
    nombre
    est_doc {
      nombre
      id
    }
  }
  }
`

const GET_TIPOS_DESPACHO = gql`
  query Q_GET_TIPOS_DESPACHO {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_MONEDAS = gql`
  query Q_GET_MONEDAS {
    kangusoft_mon {
    id
    nombre
  }
}
`

const GET_TIPO_DOCUMENTO = gql`
  query Q_GET_MONEDAS {
    kangusoft_mon {
    id
    nombre
  }
}
`

const GET_ESTADOS_PROYECTO = gql`
  query Q_GET_ESTADOS_PROYECTO {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_UNIDADES_NEGOCIO = gql`
  query Q_GET_UNIDADES_NEGOCIO {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_TIEMPO_APROBACION = gql`
  query Q_GET_TIEMPO_APROBACION {
    kangusoft_fla {
      nombre
      id
    }
  }
`

const GET_FLAGS = gql`
  query Q_GET_FLAGS {
    kangusoft_fla {
      nombre
      id
    }
  }
`
const GET_PROVEEDORES = gql`
query Q_GET_PROVEEDORES($nombrerut: String) {
  kangusoft_ent(where: {_or: [{razon_social: {_ilike: $nombrerut}}, {rut: {_ilike: $nombrerut}}], activo: {_eq: true}}) {
    email_dte
    fec_creacion
    id
    razon_social
    rut
    activo
  }
}
`

const GET_CONTACTOS = gql`
query Q_GET_CONTACTOS($idproveedor: bigint) {
  kangusoft_ent_con(where: {ent_fk: {_eq: $idproveedor}}) {
    nombre
    id
    email
  }
}
`
const GET_COMUNAS = gql`
query Q_GET_COMUNA($idRegion: bigint) {
  kangusoft_prov(where: {reg_fk: {_eq: $idRegion}}) {
    coms {
      id
      nombre
    }
  }
}
`
// const GET_PROYECTOS_POR_USUARIO = gql`
// query Q_GET_PROYECTOS_POR_USUARIO($id_usuario: bigint!, $mod_fk: bigint!) {
//   kangusoft_apr(where: {usu_apro_fk: {_eq: $id_usuario}}) {
//     pro {
//       id
//       nombre
//       codigo
//     }
//   }
// }
// `
const GET_PROYECTOS_POR_USUARIO = gql`
query Q_GET_PROYECTOS_POR_USUARIO($id_usuario: bigint!, $mod_fk: bigint!) {
  kangusoft_apr(where: {usu_apro_fk: {_eq: $id_usuario}, mod_fk: {_eq: $mod_fk}, flujo: {_eq: false}}) {
    pro {
      id
      nombre
      codigo
    }
  }
}
`
const GET_MATERIAL = gql`
query Q_GET_MATERIAL($material: String!) {
  kangusoft_mat(where: {activo: {_eq: true}, nombre: {_ilike: $material}}) {
    id
    nombre
    mat_fam {
      nombre
    }
    mat_uni {
      nombre
    }
  }
}
`

const GET_ACCESO_MODULO = gql`
query Q_GET_ACCESO_MODULO($id_usuario: bigint!, $modulo_fk: bigint = "") {
  kangusoft_usu_mod(where: {usu_fk: {_eq: $id_usuario}, mod_fk: {_eq: $modulo_fk}}) {
    mod_fk
    id
    usu_fk
  }
}
`

const GET_EMPRESA = gql`
query Q_GET_EMPRESA($emp_id: bigint!) {
  kangusoft_emp(where: {id: {_eq: $emp_id}}) {
    activo
    direccion
    email
    com {
      nombre
      id
      prov {
        reg {
          id
          nombre
        }
      }
    }
    giro
    id
    logo
    nombre
    rut
    telefono
    representante
    usuarios
    color
    eslogan
  }
}
`

const GET_PROYECTOS_USUARIO_APROBADOR = gql`
query Q_GET_PROYECTOS_USUARIO_APROBADOR($usu_fk: bigint = "") {
  getProyectosUsuarioAprobar(datos: {usu_fk: $usu_fk}) {
    proyectos_aprobador {
      id
      nombre
    }
    success
    error
  }
}
`

const GET_PROYECTOS_USUARIO_CONSULTA = gql`
query Q_GET_PROYECTOS_USUARIO_CONSULTA($usu_fk: bigint!) {
  getProyectosUsuarioConsulta(datos: {usu_fk: $usu_fk}) {
    proyectos_consultar {
      id
      nombre
    }
    success
    error
  }
}
`

//Se debe asignar
const GET_VALORES_FILTROS_CONSULTA = gql`
query Q_GET_VALORES_FILTROS_CONSULTA($emp_fk: bigint!) {
  getValoresFiltrosConsultas(datos: {emp_fk: $emp_fk}) {
    documento_estado {
      id
      nombre
    }
    forma_pago {
      id
      nombre
    }
    error
    monedas {
      id
      nombre
    }
    success
    tipos_despacho {
      id
      nombre
    }
    tipos_documentos {
      id
      nombre
    }
  }
}

`

// const GET_PARTIDAS = gql`
// mutation Q_GET_PARTIDAS($pro_fk: bigint!) {
//   getPartidas(pro_fk: $pro_fk) {
//     nombre
//     id
//     path
//   }
// }
// `
export {
  GET_FORMAS_PAGO,
  GET_TIPOS_DESPACHO,
  GET_MONEDAS,
  GET_ESTADOS_PROYECTO,
  GET_UNIDADES_NEGOCIO,
  GET_TIEMPO_APROBACION,
  GET_FLAGS,
  GET_PROVEEDORES,
  GET_CONTACTOS,
  GET_COMUNAS,
  GET_PROYECTOS_POR_USUARIO,
  GET_MATERIAL,
  GET_EMPRESA,
  GET_ACCESO_MODULO,
  GET_PROYECTOS_USUARIO_APROBADOR,
  GET_TIPO_DOCUMENTO,
  GET_VALORES_FILTROS_CONSULTA,
  GET_PROYECTOS_USUARIO_CONSULTA,
  GET_ULTIMAS_OC
}