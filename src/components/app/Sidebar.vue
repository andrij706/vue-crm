<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
        <div v-if="locale">  
            <router-link
                v-for="link in links"
                :key="link.url"
                :to="link.url"
                active-class="active"
                :exact="link.exact"
            >
                <li>
                    <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
                </li>
            </router-link>
        </div> 
	</ul>
</template>

<script>
export default {
    props: ['value'],
    data: () => ({
        locale: true,
        links: [
            {title: 'Рахунок', url: '/', exact: true},
            {title: 'Історія', url: '/history'},
            {title: 'Планування', url: '/planning'},
            {title: 'Новий запис', url: '/record'},
            {title: 'Категорії', url: '/categories'}
        ]
    }),
    async mounted() {
        try {
            this.links[0].title= $t('sidebarVar.bill')
            this.links[1].title= $t('sidebarVar.history')
            this.links[2].title= $t('sidebarVar.planning')
            this.links[3].title= $t('sidebarVar.newRecord')
            this.links[4].title= $t('sidebarVar.categories')
            
            this.locale = true;
        } catch (error) {}
    },
        
}
</script>