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
},
{ // default name 'currency_3'
  name: 'currency_3',
  symbol: 'UF',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
},
{ // default name 'currency_3'
  name: 'currency_4',
  symbol: 'USD',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
},
{ // default name 'currency_3'
  name: 'currency_5', 
  symbol: '€',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
}
])