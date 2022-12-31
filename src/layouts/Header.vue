<script setup>
    import ButtonComponent from '@/components/ButtonComponent.vue'
    import LogoMain from '@/components/LogoMain.vue'
</script>

<template>
    <header class="header" ref="test">
        <div class="container">
            <div class="header__inner common-padding">
                <router-link :to="{name:'Index', hash: '#firstSection'}" class="header__logo">
                    <LogoMain />
                </router-link>
                <div class="header__auth">
                    <router-link class="button" :to="{name:'Index', hash: '#scrollUsers'}">Users</router-link>
                    <router-link class="button" :to="{name:'Index', hash: '#scrollPost'}">Sign up</router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .header {
        background: white;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;


        &__auth {
            display: flex;
            gap: 10px;
        }

        &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 10;
            min-height: 60px;
            padding-top: 13px;
            padding-bottom: 13px;
        }

        &__logo {
            width: 104px;
            height: 26px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>