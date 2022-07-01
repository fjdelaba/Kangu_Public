export default {
  name: 'DialogBorrador',
  props: {
    eliminarBorrador: { type: Function },
    recuperarBorrador: { type: Function }
  }, 
  methods: {
    _eliminarBorrador() {
      this.eliminarBorrador()
    },
    _recuperarBorrador() {
      this.recuperarBorrador()
    }
  }
}