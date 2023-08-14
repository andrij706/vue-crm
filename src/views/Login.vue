<template>
    <form class="card auth-card" @submit.prevent="submitForm">
    <div class="card-content">
        <span class="card-title">{{ $t('loginVar.title') }}</span>
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
            >{{ $t('loginVar.emailInvalid1') }}</small>
            <small 
                class="helper-text invalid"
                v-else-if="v$.email.$dirty && v$.email.email.$invalid"
            >{{ $t('loginVar.emailInvalid2') }}</small>
        </div>
        <div class="input-field">
            <input
                id="password"
                type="password"
                v-model="password"
                :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid)|| (v$.password.$dirty && v$.password.minLength.$invalid)}"
            >
            <label for="password">{{ $t('loginVar.password') }}</label>
            <small 
                class="helper-text invalid"
                v-if="v$.password.$dirty && v$.password.required.$invalid"    
            >{{ $t('loginVar.passwordInvalid1') }}</small>
            <small 
                class="helper-text invalid"
                v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"    
            >{{ $t('loginVar.passwordInvalid2') }} {{ v$.password.minLength.$params.min }} {{ $t('loginVar.passwordInvalid2_1') }} {{ password.length }} {{ $t('loginVar.passwordInvalid2_2') }}</small>
        </div>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    {{ $t('loginVar.enter') }}
                    <i class="material-icons right">send</i>
                </button>
            </div>
            <p class="center">
                {{ $t('loginVar.missAccaunt') }}
                <router-link to="/register"> {{ $t('loginVar.signUp') }}</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import messages from '@/utils/messages'
export default {
    setup () {
        return { v$: useVuelidate() }
    },
    name: 'login',
    data: () => ({
        email: '',
        password: ''
    }),
    mounted(){
        if (messages[this.$route.query.message]){
            this.$message(messages[this.$route.query.message])
        }
    },
    validations: () => ({
        email: {email, required},
        password: {required, minLength: minLength(6)}
    }),
    methods: {
        async submitForm() {
            if (this.v$.$invalid){
                this.v$.$touch()
                return
            }
            const formData ={
                email: this.email,
                password: this.password
            }
            try{
                await this.$store.dispatch('login', formData)
                router.push('/')
            }catch (error) {}
            
        }
    }
}
</script>