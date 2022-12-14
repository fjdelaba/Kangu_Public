const showToast = ({ state, commit }, message) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      color: 'black',
      message,
      timeout: 3000
    })
  })
}

const showError = ({ state, commit }, { message = 'Failed!', error }) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      color: 'error',
      message: message + ' ' + error.message,
      timeout: 10000
    })
  })
}

const showSuccess = ({ state, commit }, message) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      color: 'success',
      message,
      timeout: 3000
    })
  })
}

const setLoading = ({ state, commit }, payload) => {
  commit('setLoading', payload)
}

const setDatosEmpresa = ({ state, commit }, payload) => {
  commit('setDatosEmpresa', payload)
}

const setDatosUsuario = ({ state, commit }, payload) => {
  commit('setDatosUsuario', payload)
}

const setPermisosUsuario = ({ state, commit }, payload) => {
  commit('setPermisosUsuario', payload)
}

const setUsuario = ({ state, commit }, payload) => {
  commit('setUsuario', payload)
}

const setTipoBoleta = ({ state, commit }, payload) => {
  commit('setTipoBoleta', payload)
}

const setTiposDocumento = ({ state, commit }, payload) => {
  commit('setTiposDocumento', payload)
}

const setMonedas = ({ state, commit }, payload) => {
  commit('setMonedas', payload)
}

const setIndicadores = ({ state, commit }, payload) => {
  commit('setIndicadores', payload)
}

export default {
  showToast,
  showError,
  showSuccess,
  setLoading,
  setDatosEmpresa,
  setDatosUsuario,
  setPermisosUsuario,
  setUsuario,
  setTipoBoleta,
  setTiposDocumento,
  setMonedas,
  setIndicadores
}
