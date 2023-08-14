/*import {chunk,  size} from 'lodash'
import {ref, computed} from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePagination(allItems, pageSize=5){
  const route = useRoute()
  const router = useRouter()
  const page = ref(Number(route.query.page || 1))
  const pageCount = computed(() => size(chunk(allItems.value, pageSize)))
  const allItemsChunked = computed(() => chunk(allItems.value, pageSize))
  const items = computed(() => allItemsChunked.value[page - 1] || allItemsChunked.value[0])

  const pageChangeHandler = ((page) => {
    router.push(`${route.path}?page=${page}`)
    page.value = page
  })
  return {page, pageCount, items, pageChangeHandler}
}*/

import _ from "lodash"
export default {
  data() {
    return {
      page: this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
}







