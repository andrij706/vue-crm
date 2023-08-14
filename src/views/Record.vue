<template>
<div>
  <div class="page-title">
    <h3>{{ $t('recordVar.newRecord') }}</h3>
  </div>

  <loader v-if="loading" />

  <p class="center" v-else-if="!categories.length">{{ $t('recordVar.emptyCatList') }} <router-link to="/categories">{{ $t('recordVar.newCat') }}</router-link> </p>

  <form class="form" v-else @submit.prevent="submitHandler">
    <div class="input-field" >
      <select ref="select" v-model="category">
        <option
          v-for="c in categories"
          :key="c.id"
          :value="c.id"
        >
          {{ c.title }}
        </option>
      </select>
      <label>{{ $t('recordVar.selectCat') }}</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>{{ $t('recordVar.income') }}</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>{{ $t('recordVar.outcome') }}</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: v$.amount.$dirty && v$.amount.minValue.$invalid}"
      >
      <label for="amount">{{ $t('recordVar.total') }}</label>
      <span v-if="v$.amount.$dirty && v$.amount.minValue.$invalid" class="helper-text invalid">{{ $t('recordVar.totalInvalid') }}{{ v$.amount.minValue.$params.min }}</span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: v$.description.$dirty && v$.description.required.$invalid}"
      >
      <label for="description">{{ $t('recordVar.description') }}</label>
      <span v-if="v$.description.$dirty && v$.description.required.$invalid" class="helper-text invalid">{{ $t('recordVar.descInvalid') }}</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{ $t('recordVar.create') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { Loader },
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select), M.updateTextFields()
    }, 0)
    if(this.categories.length){
      this.category = this.categories[0].id
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord(){
      if(this.type ==='income'){
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler(){
      if(this.v$.$invalid){
        this.v$.$touch()
        return
      }
      if (this.canCreateRecord){
        try{
          await this.$store.dispatch('createRecord', {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        })
          const bill = this.type === 'income' 
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запис успішно створено')
          this.v$.$reset()
          this.amount = 1
          this.description = ''
        }catch(error){}
      }else{
        this.$message(`Недостатньо коштів на рахунку (${this.amount - this.info.bill})`)
      }
    }
  },
  validations: () => ({
        description: {required},
        amount: {minValue: minValue(1)}
    }),
  destroyed() {
        if (this.select && this.select.destroy){
            this.select.destroy()
        }
    }
}
</script>