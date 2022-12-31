<script setup>
    import ButtonComponent from '@/components/ButtonComponent.vue'
    import UserCard from '@/components/UserCard.vue'
    import SpinLoader from '@/components/SpinLoader.vue'
    import { ref, onMounted, watch, computed } from 'vue'
    import {request} from "@/use/helpers";
    import {API_ROUTES} from "@/use/routes";

    const users = ref([])
    const totalPage = ref(0)
    const isLoad = ref(false)
    const defaultUsers = ref({
        page: 0,
        count: 6,
    })
    const props = defineProps({
        updateUser: Boolean
    })

    // user load on page load
    onMounted(() => {
        return loadUsers()
    })

    // looks after user registration
    watch(() => props.updateUser, () => {
        refreshUsers()
    })

    // user display flag
    const isShow = computed(() => {
        return defaultUsers.value.page < totalPage.value
    })

    // refresh Users
    const refreshUsers = () => {
        defaultUsers.value.page = 0
        users.value = []
        loadUsers()
    }

    // load Users
    const loadUsers = () => {
        defaultUsers.value.page++
        isLoad.value = false
        request().get(API_ROUTES.USERS, {
            params: defaultUsers.value
        })
            .then(response => {
                totalPage.value = response.data.total_pages
                users.value = users.value.concat(response.data.users)
                isLoad.value = true
            });
    }

</script>

<template>
    <section class="list-users" id="scrollUsers">
        <div class="container">
            <div class="list-users__inner col-centered common-padding">
                <h2 class="list-users__title typography_h1 text-center">
                    Working with GET request
                </h2>
                <transition name="fade">
                    <div class="list-users__list" v-if="isLoad">
                        <UserCard
                                v-for="(user, index) in users"
                                :key="index"
                                :user="user"
                        />
                    </div>
                </transition>
                <SpinLoader  v-if="!isLoad"/>
                    <ButtonComponent v-show="isShow" @click="loadUsers">
                        Show more
                    </ButtonComponent>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .list-users {

        &__inner {
            row-gap: 50px;
        }

        /*user list*/
        &__list {
            width: 100%;
            display: grid;
            justify-content: center;
            grid-template-columns: repeat(3, 370px);
            grid-auto-rows: minmax(254px, auto);
            gap: 29px;

            @include media-lg {
                grid-template-columns: repeat(3, 282px);
            }

            @include media-md {
                grid-template-columns: repeat(2, 344px);
                gap: 16px;
            }

            @include media-sm {
                gap: 20px;
                grid-template-columns: repeat(1, minmax(auto, 328px));
            }
        }

    }

    /*animation list user*/
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
