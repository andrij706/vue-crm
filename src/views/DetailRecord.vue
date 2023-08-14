<template>
<div>
  <loader v-if="loading" />
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{ $t('detailRecordVar.history') }}</router-link>
      <a @click.prevent class="breadcrumb">
        {{ record.type === 'income' ?  $t('detailRecordVar.income')  :  $t('detailRecordVar.outcome')  }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="{ 'red': record.type === 'outcome', 'green': record.type === 'income' }">
          <div class="card-content white-text" >
            <p>{{ $t('detailRecordVar.description') }}: {{ record.description }}</p>
            <p>{{ $t('detailRecordVar.total') }}: {{ formatCurrency(record.amount) }}</p>
            <p>{{ $t('detailRecordVar.category') }}: {{ record.categoryName }}</p>
            <small>{{  formatDateTime(record.date) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>{{ $t('detailRecordVar.recordWI') }}=<strong>{{ $route.params.id }}</strong> {{ $t('detailRecordVar.missing') }}</p>
</div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
import moment from 'moment'
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: { Loader },
  name: 'detail',
  setup(){
    const store = useStore()
    const route = useRoute()
    const momentInstance = moment
    const record = ref(null)
    const loading = ref(true)

    const formatDateTime =((date) => {return momentInstance(date).format("ddd MMM DD, YYYY [at] HH:mm:ss a")})
    const formatCurrency =((amount)=> {return amount?.toLocaleString('uk-UA', {style:'currency', currency:'UAH'})})

    onMounted(async()=>{
      const id = route.params.id
      const storeRecord = await store.dispatch('fetchRecordById', id)
      const category = await store.dispatch('fetchCategoryById', storeRecord.categoryId)

      record.value = {
        ...storeRecord,
        categoryName: category.title
    }

      loading.value = false
    })

    return{record, loading, formatDateTime, formatCurrency}
  }
}
</script>