<script setup>

</script>

<template>
    <section class="first-section" id="firstSection">
        <div class="container">
            <div class="first-section__inner common-padding">
                <div class="first-section__content">
                    <h1 class="first-section__title typography_h1 text-center">
                        Test assignment for front-end developer
                    </h1>
                    <p class="first-section__subtitle typography_body text-center">
                        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with
                        a vast
                        understanding of User design thinking as they'll be building web interfaces with accessibility
                        in mind.
                        They should also be excited to learn, as the world of Front-End Development keeps evolving.
                    </p>
                    <router-link class="button" :to="{name:'Index', hash: '#scrollPost'}">
                        Sign up
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .first-section {
        height: calc(100vh - 60px);

        &__inner {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/baza.png') center / cover no-repeat;
            overflow-y: auto;
            padding-top: 10px;
            padding-bottom: 10px;

            @include media-sm {
                background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/baza-mob.png') center / cover no-repeat;

            }
        }

        &__content {
            max-width: 380px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: auto;
            margin-bottom: auto;
        }

        &__title {
            margin-bottom: 21px;
            color: $cl-font-white;

        }

        &__subtitle {
            color: $cl-font-white;
            margin-bottom: 32px;
        }
    }
</style>
