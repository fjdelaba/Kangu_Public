import gql from 'graphql-tag'

const GET_DATOS_OC_CABECERA = gql`
  query Q_GET_DATOS_OC_CABECERA {
    kangusoft_emp_imp(where: { activo: { _eq: true } }) {
      imp {
        nombre
        id
        valor_porcentual
      }
    }
    kangusoft_emp_doctip(where: { activo: { _eq: true } }) {
      doc_tip {
        id
        nombre
        codigo_sii
      }
    }
    kangusoft_des_tip(where: { activo: { _eq: true } }) {
      id
      nombre
    }
    kangusoft_emp_mon(where: { activo: { _eq: true } }) {
      mon {
        nombre
        id
        simbolo
      }
    }
    kangusoft_fla(where: { activo: { _eq: true }, fla_mod_fk: { _eq: "1" } }) {
      nombre
      id
    }
    kangusoft_for_pag(where: { activo: { _eq: true } }) {
      id
      nombre
    }
  }
`

//Comentario
const GET_DATOS_OC_CONSULTA = gql`
  query Q_GET_DATOS_OC_CONSULTA {
    kangusoft_oc {
      nombre
      id
      pro {
        nombre
        fec_creacion
        id
      }
      identificacion
      neto
      usu {
        nombre
        apellidos
      }
      fec_aprobacion
      est_doc {
        nombre
        id
      }
      ent {
        id
        rut
        razon_social
      }
      mon {
        nombre
        id
      }
    }
  }
`
const GET_DTE_CABECERA = gql`
  query Q_GET_DTE_CABECERA($ref: smallint!, $folio: String!) {
    kangusoft_dte_cab(
      where: { folio: { _eq: $folio }, dte_tip_fk: { _eq: $ref } }
    ) {
      id
    }
  }
`
const GET_OC_RECEPCION = gql`
  query Q_GET_OC_RECEPCION($datos: getOcsInput!) {
    getOcs(datos: $datos) {
      ocs {
        doc_tip_fk
        ent_fk
        fec_apro
        fec_creacion
        identificacion
        mon_fk
        neto
        oc_nombre
        pro_nombre
        razon_social
        usu_apellidos
        usu_nombre
        id
        mon_nombre
        est_nombre
        rut
        comentario
        des_tip_fk
        dt_nombre
        ec_nombre
        el_nombre
        ent_con_fk
        est_doc_fk
        est_lin_fk
        fp_nombre
        for_pag_fk
        neto_ajustado
        iva_ajustado
        impuestos
        usu_fk
        pro_fk
        desp_nombre
        lineasJson
        ent_direccion
        ec_email
      }
      success
      error
    }
  }
`

const GET_DATOS_OC_DETALLE_EXCEL = gql`
  query Q_GET_DATOS_OC_DETALLE_EXCEL {
    kangusoft_oc_det {
      cantidad
      total
      precio_unitario
      oc {
        nombre
        identificacion
        ent {
          razon_social
          rut
        }
        pro {
          nombre
        }
        mon {
          nombre
        }
        est_doc {
          nombre
        }
        usu {
          apellidos
          nombre
        }
        neto
        impuestos
      }
      mat {
        nombre
        id
      }
    }
  }
`
const GET_ESTADO_OC = gql`
  query Q_GET_ESTADO_OC {
    kangusoft_est_doc {
      nombre
      id
    }
  }
`
const GET_RECEPCION = gql`
query Q_GET_RECEPCIONC($_eq: bigint!) {
  kangusoft_rec_cab(where: {id: {_eq: $_eq}}) {
    descuadre
    fec_recepcion
    id
    oc_fk
    rec_est_fk
    usu_fk
    dte_cab {
      dte_tip {
        nombre
        id
      }
      folio
    }
    oc {
      ent {
        razon_social
        id
        rut
      }
      pro {
        id
        nombre
      }
      identificacion
      oc__view_monto_recepciones_obra {
        monto_recibido
      }
    }
    usu {
      apellidos
      nombre
    }
    dte_cab_fk
    identificacion
    rec_dets {
      cantidad
      descuadre
      id
      monto
      observacion
      rec_cab_fk
      oc_det_fk
      oc_det {
        cant_ajustada
        cant_despacho
        cant_recepcion
        cantidad
        mat {
          nombre
          id
          mat_uni {
            nombre
          }
        }
      }
    }
  }
}
`
const GET_APROBADOR_PEDIDO = gql`
  query Q_GET_APROBADOR_PEDIDO($mod_fk: bigint!, $pro_fk: bigint!) {
    kangusoft_apr(
      where: {
        mod_fk: { _eq: $mod_fk }
        pro_fk: { _eq: $pro_fk }
        flujo: { _eq: true }
      }
    ) {
      usuByUsuAproFk {
        apellidos
        id
        nombre
      }
    }
  }
`
const GET_FACTURA_COMPLETA = gql`
  query Q_GET_FACTURA_COMPLETA($id: bigint!) {
    kangusoft_dte_cab(where: { id: { _eq: $id } }) {
      credito
      dte_des_tip_fk
      dte_for_pag_fk
      dte_tip_fk
      emi_ciudad
      emi_comuna
      emi_correo
      emi_direccion
      emi_giro
      emi_nombre
      emi_rut
      emi_telefono
      emi_vendedor
      exento
      fec_creacion
      fec_emision
      fec_recepcion_kangu
      fec_recepcion_sii
      fec_ven
      folio
      id
      iva_monto
      iva_tasa
      neto
      pro {
        nombre
        codigo
      }
      dte_dets {
        cantidad
        descripcion
        descuento
        monto
        nombre
        nro_linea
        precio
        unidad
      }
      dte_refs {
        dte_cab_fk
        dte_ref_tip_fk
        fec_ref
        folio
        folio_kangu
        id
        nro_linea
        oc_fk
      }
    }
  }
`
const GET_PEDIDO = gql`
  query Q_GET_PEDIDO($id: bigint!) {
    kangusoft_ped(where: { emp: { id: { _eq: $id } } }) {
      comentario
      fec_creacion
      id
      identificacion
      nombre
      pro {
        nombre
        id
      }
      est_lin {
        nombre
        id
      }
      usu {
        apellidos
        nombre
        id
      }
      est_doc {
        nombre
        id
      }
      ped_dets {
        cant_ajustada
        cant_comprada
        cant_cotizada
        cant_despacho
        cant_recepcion
        cantidad
        identificacion
        mat_fk
        observacion
        mat {
          nombre
          mat_uni {
            nombre
          }
        }
        parByParFk {
          id
          nombre
        }
        ped_fk
      }
    }
  }
`
const GET_PEDIDO_CABECERA = gql`
  query Q_GET_PEDIDO_CABECERA($_eq: bigint!) {
    kangusoft_ped(where: { id: { _eq: $_eq } }) {
      comentario
      id
      identificacion
      nombre
      fec_creacion
      pro {
        codigo
        nombre
        id
      }
      usu {
        apellidos
        nombre
      }
    }
  }
`

const GET_TIPO_DOCUMENTO = gql`
  query Q_GET_TIPO_DOCUMENTO {
    kangusoft_dte_tip {
      id
      nombre
    }
  }
`
const GET_RECEPCIONES_LISTADO = gql`
  query Q_GET_RECEPCIONES_LISTADO {
    kangusoft_rec_cab {
      descuadre
      fec_recepcion
      id
      oc_fk
      rec_est_fk
      usu_fk
      identificacion

      oc {
        oc__view_monto_recepciones_obra {
          monto_recibido
        }
        identificacion
        ent {
          razon_social
          id
        }
        pro {
          id
          nombre
        }
      }
      usu {
        apellidos
        nombre
      }
      dte_cab_fk
    }
  }
`
const GET_DETALLEPEDIDO = gql`
  query Q_GET_DETALLEPEDIDO($id: bigint!) {
    kangusoft_ped_det(where: { ped_fk: { _eq: $id } }) {
      cant_ajustada
      cant_comprada
      cant_cotizada
      cant_despacho
      cant_recepcion
      cantidad
      identificacion
      observacion
      mat {
        nombre
        mat_uni {
          nombre
        }
      }
      parByParFk {
        nombre
        id
      }
    }
    kangusoft_ped(where: { id: { _eq: $id } }) {
      id
      comentario
      fec_creacion
      identificacion
      nombre
      pro {
        nombre
        id
      }
      usu {
        nombre
        email
        apellidos
      }
    }
  }
`

const GET_MONTO_COMPRADOR = gql`
  query Q_GET_MONTO(
    $id_usuario: bigint!
    $flujo: Boolean!
    $id_proyecto: bigint!
    $mod_fk: bigint!
  ) {
    kangusoft_apr(
      where: {
        usu_apro_fk: { _eq: $id_usuario }
        flujo: { _eq: $flujo }
        pro_fk: { _eq: $id_proyecto }
        mod_fk: { _eq: $mod_fk }
      }
    ) {
      id
      usu_fk
      monto
    }
  }
`

const GET_OC_DETALLE = gql`
  query Q_GET_OC_DETALLE($oc_fk: bigint_comparison_exp!, $_eq: bigint!) {
    kangusoft_oc_det(where: { oc_fk: $oc_fk }) {
      mat {
        id
        nombre
        mat_uni {
          id
          nombre
        }
      }
      oc_det__view_recepciones_lista {
        total_recibido
      }
      cant_ajustada
      cant_despacho
      cant_recepcion
      cantidad
      id
      mat_fk
      observacion
      total
      precio_unitario
      oc_fk
      oc_det_pars {
        cantidad
        id
        oc_det_id
        par_fk
      }
    }
    kangusoft_oc(where: { id: { _eq: $_eq } }) {
      id
      bloqueado
      comentario
      comentario_pdf
      fec_creacion
      des_tip {
        nombre
        id
      }
      desp_direccion
      doc_tip_fk
      ent {
        id
        razon_social
        rut
        email_contacto
        direccion
      }
      ent_con {
        id
        email
        nombre
      }
      identificacion
      nombre
      est_doc_fk
      pro {
        nombre
        codigo
        id
        direccion
      }
      usu {
        id
        apellidos
        nombre
        email
      }
      for_pag {
        nombre
        id
      }
      neto
      neto_ajustado
      mon {
        id
        nombre
      }
      apr_pros {
        id
        aprobado
        comentario
        fec_apro
        apr {
          usuByUsuAproFk {
            nombre
            apellidos
            id
            avatar
          }
          id
        }
      }
      doc_tip {
        id
        nombre
      }
      impuestos
      oc_adjs {
        id
        fec_creacion
        nombre
        oc_fk
        tipo
        url
        usu_fk
      }
    }
  }
`

const GET_OC_CONSULTAS = gql`
  query Q_GET_OC_CONSULTAS($datos: getOcsInput!) @cached(ttl: 120) {
    getOcs(datos: $datos) {
      ocs {
        doc_tip_fk
        ent_fk
        fec_apro
        fec_creacion
        identificacion
        mon_fk
        neto
        oc_nombre
        pro_nombre
        razon_social
        usu_apellidos
        usu_nombre
        id
        mon_nombre
        est_nombre
        rut
        comentario
        des_tip_fk
        dt_nombre
        ec_nombre
        el_nombre
        ent_con_fk
        est_doc_fk
        est_lin_fk
        fp_nombre
        for_pag_fk
        neto_ajustado
        iva_ajustado
        impuestos
        usu_fk
        pro_fk
        desp_nombre
        lineas {
          nombre
          cantidad
          cant_ajustada
          precio_unitario
          observacion
          mu_nombre
          cant_recepcion
          cant_por_recepcionar
          pendiente
          mat_fk
        }
        lineasJson
        ent_direccion
        ec_email
      }
      success
      error
    }
  }
`

const GET_MATERIALES = gql`
  query Q_GET_MATERIALES($datos: getMaterialesInput!) {
    getMateriales(datos: $datos) {
      error
      success
      materiales {
        id
        mf_nombre
        mu_nombre
        name
      }
    }
  }
`
const GET_OCS_USUARIO = gql`
  query Q_GET_OCS_USUARIO($usu_fk: bigint!) {
    # kangusoft_view_permisos_usuario_mod(where: { usu_id: { _eq: $usu_fk } }) {
      kangusoft_view_permisos_usuario_mod(where: {usu_id: {_eq: $usu_fk}, mod_id: {_eq: "3"}}) {
      view_permisos_usuario_mod_oc (where: {est_doc: {id: {_neq: "4"}}}){
        identificacion
        id
        est_doc_fk
        mon_fk
        oc_nombre: nombre
        ent_fk
        ent_con_fk
        pro_fk
        usu_fk
        fec_creacion
        des_tip_fk
        comentario
        for_pag_fk
        est_lin_fk
        impuestos
        neto
        doc_tip_fk
        fec_apro
        iva_ajustado
        neto_ajustado
        pro {
          pro_nombre: nombre
          id
        }
        ent {
          razon_social
          rut
          ent_direccion: direccion
          id
        }
        mon {
          mon_nombre: nombre
          id
        }
        est_doc {
          est_nombre: nombre
          id
        }
        est_lin {
          el_nombre: nombre
          id
        }
        for_pag {
          fp_nombre: nombre
          id
        }
        doc_tip {
          dt_nombre: nombre
          id
        }
        ent_con {
          ec_nombre: nombre
          ec_email: email
          id
        }
        des_tip {
          desp_nombre: nombre
          id
        }
        oc_dets {
          id
          total
          cantidad
          precio_unitario
          mat {
            id
            nombre
            mat_uni {
              nombre
              id
            }
          }
        }
        usu {
          usu_apellidos: apellidos
          usu_nombre: nombre
          id
        }
      }
    }
  }
`

export { GET_RECEPCION,GET_RECEPCIONES_LISTADO,GET_DTE_CABECERA,GET_TIPO_DOCUMENTO,GET_OC_RECEPCION,GET_FACTURA_COMPLETA,GET_PEDIDO_CABECERA,GET_DETALLEPEDIDO,GET_PEDIDO,GET_APROBADOR_PEDIDO,GET_DATOS_OC_CABECERA, GET_DATOS_OC_CONSULTA, GET_OC_DETALLE,GET_ESTADO_OC,GET_DATOS_OC_DETALLE_EXCEL, GET_MONTO_COMPRADOR,GET_OC_CONSULTAS, GET_MATERIALES, GET_OCS_USUARIO }
