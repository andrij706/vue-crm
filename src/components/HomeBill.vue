<template>
<div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">{{ $t('homeVar.billCurrency') }}</span>

          <p 
            v-for="cur in currencies"
            :key="cur"
            class="currency-line">
            <span>{{ getCurrency(cur).toLocaleString('uk-UA', { style: 'currency', currency: cur}) }} </span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue'
import { useStore } from 'vuex'
export default {
    props: ['rates'],
    setup(props){
      const store = useStore()
      const currencies = ref(['UAH', 'USD', 'EUR'])
      const base = computed(() => store.getters.info.bill / (props.rates['UAH'] / props.rates['EUR']))
      const getCurrency = (currency) => { return Math.floor(base.value * props.rates[currency])}
      return {currencies, base, getCurrency}
    }
}
</script>