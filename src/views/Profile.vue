<template>
<div>
  <div class="page-title">
    <h3> {{ $t('profileVar.profile') }} </h3>
  </div>
  <form class="form" @submit.prevent="submitHandler">
    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: v$.name.$dirty && v$.name.required.$invalid}"
      >
      <label for="description">{{$t('profileVar.name')}}</label>
      <small v-if="v$.name.$dirty && v$.name.required.$invalid" class="helper-text invalid">
        {{$t('profileVar.nameEnter')}}
      </small>
    </div>
    <div class="switch">
      <label>
        English
        <input type="checkbox" v-model="isUaLocale">
        <span class="lever"></span>
        Українська
      </label>
    </div>
    <button class="btn waves-effect waves-light" type="submit">
        {{$t('profileVar.update')}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { locale } from 'moment'
export default {
  data: () => ({
    name: '',
    isUaLocale: true
  }),
  mounted() {
    this.name = this.info.name
    this.isUaLocale = this.info.locale === 'uk-UA'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  setup () {
        return { v$: useVuelidate() }
  },
  validations: () => ({
        name: { required }
    }),
  methods: {
    ...mapActions(['updateInfo']),

    async submitHandler(){
      if(this.v$.$invalid){
        this.v$.$touch()
        return
      }
      try{
        await this.updateInfo({
          name: this.name,
          locale: this.isUaLocale ? 'uk-UA' : 'en-US'
        })
      } catch(error) {console.error()}
    }
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
