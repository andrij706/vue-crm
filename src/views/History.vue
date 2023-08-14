<template>
<div>
  <div class="page-title">
    <h3>{{ $t('historyVar.history') }}</h3>
  </div>
  <div class="history-chart">
    <section>
    <pie-chart :loading="loading" :charData="charData" :charOptions="charOptions" :style="{ maxHeight: '300px' }"/>  
    </section>
  </div>
  <loader v-if="loading" />
  <p class="center" v-else-if="!records.length">
      {{ $t('historyVar.emptyHis') }}
    <router-link to="/record">{{ $t('historyVar.createNewRec') }}</router-link>
  </p>
  <section v-else>
    <history-table :records="items"/>
    <paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="$t('historyVar.prev')"
      :next-text="$t('historyVar.next')"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    >
</paginate>
  </section>
</div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import Paginate from 'vuejs-paginate-next';
import paginationMixin from '@/mixins/pagination.mixin'
import PieChart from '@/components/PieChart.vue'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';
import _ from "lodash"

export default {
  name: 'history',
  mixins: [paginationMixin],
  components: { HistoryTable, paginate: Paginate, PieChart},
  setup(){
      const store = useStore()
      const loading = ref(true)
      const records = ref([])
      const categories = ref([])
      const charData = ref(null)
      const charOptions = ref(null)

      
      const getColors = (() => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return (`rgb(${r}, ${g}, ${b})`)
      })

      return {loading, records, categories, charData, charOptions, getColors}
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    
  this.setupPagination(
          this.records = this.records.map(record => {
          return {
            ...record,
            categoryName: this.categories.find(c => c.id === record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Дохід' : 'Витрата'
          }
        })
      )

      this.charOptions = this.categories.map(c => c.title)
      
      const colors = this.charOptions.map( () => this.getColors())

      this.charData = {
        labels: this.categories.map(c => c.title),
        datasets: [{
          data: this.categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += r.amount;
              }
              return total;
            }, 0)
          }),
          backgroundColor: colors
        }]
      };
    
    this.loading = false
    }
}
</script>