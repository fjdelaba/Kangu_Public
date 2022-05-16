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

export {
  INSERT_PROYECTO_INFORMACION
}
