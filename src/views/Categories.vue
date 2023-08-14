<template>
    <div>
    <div class="page-title">
        <h3>{{ $t('categoriesVar.categories') }}</h3>
    </div>
    <section>
        <loader v-if="loading" />
        <div class="row" v-else>
            <category-create @created="addNewCategory"/>
            <category-edit v-if="categories.length"
                :categories="categories" 
                @updated="updateCategories"
                :key="categories.length + updateCount"
            />
            <p class="center" v-else>{{ $t('categoriesVar.emptyCategories') }}</p>
        </div>
    </section>
    </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'
import Loader from '@/components/app/Loader.vue'
import {ref, onMounted} from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'categories',
    components: {CategoryCreate, CategoryEdit, Loader},
    setup(){
        const categories = ref([])
        const loading = ref(true)
        const updateCount = ref(0)
        const store = useStore()

        const addNewCategory = (category) => {
            categories.value.push(category)
        }

        const updateCategories = (category) => {
            const idx = categories.value.findIndex(c => c.id === category.id)
            categories.value[idx].title = category.title
            categories.value[idx].limit = category.limit
            updateCount.value ++
        }

        onMounted(async () => {
            categories.value = await store.dispatch('fetchCategories')
            loading.value = false
        })

        return {categories, loading, updateCount, addNewCategory, updateCategories}
    }
}
</script>