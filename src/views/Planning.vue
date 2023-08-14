<template>
<div>
  <div class="page-title">
    <h3>{{ $t('planningVar.planning') }}</h3>
    <h4>{{ info.bill?.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH'}) }}</h4>
  </div>
  <loader v-if="loading" />
  <p class="center" v-else-if="!categories.length">{{ $t('planningVar.emptyCatList') }}<router-link to="/categories">{{ $t('planningVar.newCat') }}</router-link> </p>
  <section v-else>
    <div v-for="cat in categories" :key="cat.id">
      <p>
        <strong>{{ cat.title }}:</strong>
        {{ cat.spend?.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH'}) }} з {{ cat.limit?.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH'})  }}
      </p>
      <div class="progress" v-tooltip="cat.tooltip">
        <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%'}"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
import { mapGetters } from 'vuex'
export default {
  components: { Loader },
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += record.amount 
        }, 0)

      const percent = (100 * spend / cat.limit)
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green'
      : percent < 100 ? 'yellow'
        : 'red'
      
      const tooltipValie = cat.limit - spend
      const tooltip = `${tooltipValie < 0? 'Перевищення на': 'Залишилося'} ${Math.abs(tooltipValie).toLocaleString('uk-UA', { style: 'currency', currency: 'UAH'})}`

      return {
        ...cat,
        spend,
        progressPercent,
        progressColor,
        tooltip
      };
    })
    this.loading = false
  }
}
</script>