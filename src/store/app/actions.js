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

export default {
  showToast,
  showError,
  showSuccess,
  setLoading,
  setDatosEmpresa,
  setDatosUsuario
}
