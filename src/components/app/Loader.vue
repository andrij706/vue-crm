<template>
    <div class="app-loader">
        <div class="preloader-wrapper active">
            <div class="spinner-layer" :class="color">
                <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue'
export default {
    setup(){
        const colors = ['spinner-red-only', 'spinner-blue-only', 'spinner-green-only']
        const color = computed(() => colors[Math.floor(Math.random() * 3)])
        return {color}    
    }

}
</script>