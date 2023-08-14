<template>
<div>
	<loader v-if="loading"/>
	<div v-else>
		<div class="app-main-layout">
			<navbar @press="isOpen = !isOpen"/>
			<sidebar :value="isOpen" :key="locale"/>
			<main class="app-content" :class="{full: !isOpen}">
				<div class="app-page">
					<router-view />
				</div>
			</main>
			<div class="fixed-action-btn">
				<router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Створити новий запис'">
					<i class="large material-icons">add</i>
				</router-link>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import Loader from '@/components/app/Loader.vue';
import messages from '@/utils/messages'
import { ref } from 'vue'
export default {
  components: { Navbar, Sidebar, Loader },
  setup() {
	const isOpen = ref(true)
	const loading = ref(true)

	return {isOpen, loading}
  },
  data: () => ({
  }),
  async mounted() {
	if(!Object.keys (this.$store.getters.info).length) {
		await this.$store.dispatch('fetchInfo')
	}
	this.loading = false
  },
  computed: {
    error(){
      return this.$store.getters.error
    },
	locale(){
		return this.$store.getters.info.locale
	}
  },
  watch: {
    error(fbError){
      this.$error(messages[fbError.code] || 'Щось пішло не так')
    }
  }
}
</script>