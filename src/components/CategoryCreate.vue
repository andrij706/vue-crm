<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ $t('categoriesVar.create') }}</h4>
            </div>
            <form @submit.prevent="submitHandler">
                <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model="title"
                    :class="{ invalid: v$.title.$dirty && v$.title.required.$invalid }"
                >
                <label for="name">{{ $t('categoriesVar.name') }}</label>
                <span
                    v-if="v$.title.$dirty && v$.title.required.$invalid"
                    class="helper-text invalid"
                >
                    {{ $t('categoriesVar.invalidName') }}
                </span>
                </div>

                <div class="input-field">
                <input
                    id="limit"
                    type="number"
                    v-model="limit"
                    :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}"
                >
                <label for="limit">{{ $t('categoriesVar.limit') }}</label>
                <span 
                    class="helper-text invalid"
                    v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
                >
                    {{ $t('categoriesVar.invalidLimit') }} {{ v$.limit.minValue.$params.min }}
                </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{ $t('categoriesVar.create') }}
                <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import {ref, onMounted} from 'vue'
export default {
    setup () {
        const title = ref('')
        const limit = ref(100)
        
        const rules = {
            title: {required},
            limit: {minValue: minValue(100)}
        }
        const v$ = useVuelidate(rules, {title, limit})

        onMounted(() => M.updateTextFields())

    return { v$, title, limit }
  },
    methods: {
        async submitHandler(){
            if (this.v$.$invalid){
                this.v$.$touch()
                return
            }
            try{
                const category = await this.$store.dispatch('createCategory', {
                title: this.title,
                limit: this.limit
            })
            this.title = ''
            this.limit = 100
            this.v$.$reset()
            this.$message('Категорія була створена')
            this.$emit('created', category)  
            } catch (error){}   
        } 
    }
}
</script>