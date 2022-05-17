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
mutation M_INSERT_PROYECTO_ADQUISICIONES($perfiles: [PerfilesInput!]!,  $aprob_ped: AprobadoresPedInput!, $aprob_oc: [AprobadoresOcInput!]!,  $comp: [CompradoresInput!]!) {
  insert_pro_informacion(perfiles: $perfiles,  aprobadores_ped: $aprob_ped, aprobadores_oc: $aprob_oc, compradores: $comp) {
    codigo_
    error_
    mensaje_
    totalreg_
  }
}
`

export {
  INSERT_PROYECTO_INFORMACION,
  INSERT_PROYECTO_ADQUISICIONES
}
