<template>
    <div class="col s12 m6">
            <div>
            <div class="page-subtitle">
                <h4>{{ $t('categoriesVar.edit') }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field" >
                <select ref="select" v-model="current">
                    <option
                        v-for="c in categories"
                        :key="c.id"
                        :value="c.id"
                    >
                        {{ c.title }}
                    </option>
                </select>
                <label>{{ $t('categoriesVar.choiceCategory') }}</label>
                </div>
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
                    Оновити
                    <i class="material-icons right">send</i>
                </button>
            </form>
            </div>
        </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import {ref, onMounted, watch} from 'vue'
export default {
    props: ['categories'],
    setup () {
        const select = ref(null)
        const title = ref('')
        const limit = ref(100)
        const current = ref(null)
        const rules = {
            title: {required},
            limit: {minValue: minValue(100)}
        }
        const v$ = useVuelidate(rules, {title, limit})

        onMounted(() => {
            if (select.value){
                select.value = M.FormSelect.init(select.value)
            }
            M.updateTextFields()
        })
    return { v$, select, title, limit, current }
  },

    methods: {
        async submitHandler(){
            if (this.v$.$invalid){
                this.v$.$touch()
                return
            }
            try {
                const categoryData = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit
                }
                this.$store.dispatch('updateCategory', categoryData)
                this.$message('Категорію успішно оновлено')
                this.$emit('updated', categoryData)
            } catch (error) {}
        }
    },
    watch: {
        current(catId){
            const {title, limit} = this.categories.find(c => c.id === catId)
            this.title = title
            this.limit = limit
        }
    },
    created() {
        const {id, title, limit} = this.categories[0]
        this.current = id
        this.title = title
        this.limit = limit
    },
    destroyed() {
        if (this.select && this.select.destroy){
            this.select.destroy()
        }
    },
}
</script>