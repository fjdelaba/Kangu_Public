import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'

//Vue.use(VueCurrencyFilter)
// or with custom config
Vue.use(VueCurrencyFilter, [{
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
},
{ // default name 'currency_2'
  name: 'currency_2',
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
}
])