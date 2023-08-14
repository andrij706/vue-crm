<template>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{ $t('historyVar.total') }}</th>
        <th>{{ $t('historyVar.date') }}</th>
        <th>{{ $t('historyVar.category') }}</th>
        <th>{{ $t('historyVar.type') }}</th>
        <th>{{ $t('historyVar.open') }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx+1 }}</td>
        <td>{{ formatCurrency(record.amount) }}</td>
        <td>{{ formatDateTime(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
        </td>
        <td>
          <button 
            v-tooltip="'Переглянути запис'"
            class="btn-small btn" @click="navigateToDetails(record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
import moment from 'moment';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
    props: {
        records: {
            required: true,
            type: Array
        }
    },
    setup(){
      const route = useRoute()
      const router = useRouter()
      const momentInstance = moment

      const formatCurrency = ((amount) => {return amount?.toLocaleString('uk-UA', {style: 'currency', currency: 'UAH'})})
      const formatDateTime = ((date) => {return momentInstance(date).format("ddd MMM DD, YYYY [at] HH:mm:ss a")})
      const navigateToDetails = (recordId) => {router.push(`/details/${recordId}`)}

      
      return{formatCurrency, formatDateTime, navigateToDetails}
    }
}
</script>