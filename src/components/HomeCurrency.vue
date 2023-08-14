<template>
        <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{ $t('homeVar.exchangeRate') }}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{ $t('homeVar.currency') }}</th>
              <th>{{ $t('homeVar.rate') }}</th>
              <th>{{ $t('homeVar.date') }}</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(3) }}</td>
              <td>{{ date }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
  props: ['rates', 'date'],
  setup(){
    const currencies = ref(['UAH', 'USD', 'EUR'])
    return {currencies}
  }
}  
</script>