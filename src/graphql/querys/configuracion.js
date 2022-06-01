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
const GET_APROBADORES_PROYECTO = gql`
query Q_GET_APROBADORES_PROYECTO($id: bigint) {
  kangusoft_apr(where: {pro_fk: {_eq: $id}}) {
    id
    monto
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

export { GET_DATOS_GENERALES,GET_PROYECTO,GET_MATERIALES_PROYECTO,GET_APROBADORES_PROYECTO,GET_USUARIOS_PROYECTO }
