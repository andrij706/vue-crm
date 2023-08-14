<template>
<div>
  <div class="page-title">
    <h3>{{ $t('homeVar.bill') }}</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>
  <loader v-if="loading"/>
  <div class="row" v-else>
    <home-bill 
      :rates = "currency.rates"
    />
    <home-currency 
      :rates = "currency.rates"
      :date = "currency.date"
    />
  </div>
</div>
</template>
<script>
import HomeBill from '@/components/HomeBill.vue'
import HomeCurrency from '@/components/HomeCurrency.vue'
import Loader from '@/components/app/Loader.vue'
import { useStore } from 'vuex'
import {ref, onMounted} from 'vue'
export default {
  name: 'home',
  components: {HomeBill, HomeCurrency, Loader},
  setup (){
    const loading = ref(true)
    const currency = ref(null)
    const store = useStore()

    const refresh= async () => {
      loading.value = true
      currency.value = await store.dispatch('fetchCurrency')
      loading.value = false
    }
    onMounted(async () => {
    currency.value = await store.dispatch('fetchCurrency')
    loading.value = false
  })

    return {loading, currency, refresh}
  }
}
</script>