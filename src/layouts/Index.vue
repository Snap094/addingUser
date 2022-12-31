<script setup>
    import FirstSection from '@/components/FirstSection.vue'
    import ListUsers from '@/components/ListUsers.vue'
    import FormPost from '@/components/FormPost.vue'
    import SuccessfulyRegistred from '@/components/SuccessfulyRegistred.vue'
    import {storeToken} from "@/use/helpers";

    import { onMounted, ref } from 'vue'

    onMounted(() => {
        // set User token
        storeToken()
    })

    // form submit flag
    const isSuccess = ref(false)

    const formSent = (e) => {
        return isSuccess.value = e
    }

</script>

<template>
    <div class="group-section">
        <FirstSection />
        <ListUsers :updateUser="isSuccess"/>
        <FormPost @formSent="formSent" v-if="!isSuccess"/>
        <SuccessfulyRegistred v-if="isSuccess"/>
    </div>
</template>

<style lang="scss" scoped>
    .group-section {
        display: flex;
        flex-direction: column;
        gap: 140px;
    }
</style>
