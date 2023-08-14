<template>
<form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">{{ $t('registerVar.title') }}</span>
    <div class="input-field">
            <input
                id="email"
                type="text"
                v-model.trim="email"
                :class="{invalid: (v$.email.$dirty && v$.email.email.$invalid)||(v$.email.$dirty && v$.email.required.$invalid) }"
            >
            <label for="email">Email</label>
            <small 
                class="helper-text invalid"
                v-if="v$.email.$dirty && v$.email.required.$invalid"
            >{{ $t('registerVar.emailInvalid1') }}</small>
            <small 
                class="helper-text invalid"
                v-else-if="v$.email.$dirty && v$.email.email.$invalid"
            >{{ $t('registerVar.emailInvalid2') }}</small>
        </div>
        <div class="input-field">
            <input
                id="password"
                type="password"
                v-model="password"
                :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid)|| (v$.password.$dirty && v$.password.minLength.$invalid)}"
            >
            <label for="password">{{ $t('registerVar.password') }}</label>
            <small 
                class="helper-text invalid"
                v-if="v$.password.$dirty && v$.password.required.$invalid"    
            >{{ $t('registerVar.passwordInvalid1') }}</small>
            <small 
                class="helper-text invalid"
                v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"    
            >{{ $t('registerVar.passwordInvalid2') }} {{ v$.password.minLength.$params.min }} {{ $t('registerVar.passwordInvalid2_1') }} {{ password.length }} {{ $t('registerVar.passwordInvalid2_2') }}</small>
        </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: v$.name.$dirty && v$.name.required.$invalid}"
      >
      <label for="name">{{ $t('registerVar.name') }}</label>
      <small 
        class="helper-text invalid"
        v-if="v$.name.$dirty && v$.name.required.$invalid"
        >{{ $t('registerVar.nameInvalid') }}</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree"/>
        <span>{{ $t('registerVar.checkRules') }}</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        {{ $t('registerVar.signUp') }}
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      {{ $t('registerVar.readyAccount') }}
      <router-link to="/login" >{{ $t('registerVar.enter') }}!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import router from '@/router'
export default {
  name: 'register',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  
    data: () => ({
        email: '',
        password: '',
        name: '',
        agree: false
    }),
    validations: () => ({
        email: {email, required},
        password: {required, minLength: minLength(6)},
        name: {required},
        agree: {checked: v => v}
    }),
    methods: {
      async submitHandler(){
        if(this.v$.$invalid){
          this.v$.$touch()
          return
        }
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        try{
          await this.$store.dispatch('register', formData)
          router.push('/')
        }catch (error) {} 
      }
    }
}
</script>