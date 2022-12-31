<script setup>
    import Header from '@/layouts/Header.vue'

</script>

<template>
    <Header/>
    <div class="content">
        <div class="site-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
