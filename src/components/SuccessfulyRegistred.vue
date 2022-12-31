<script setup>

</script>

<template>
    <section class="successfully">
        <div class="container">
            <div class="successfully__inner common-padding col-centered">
                <h2 class="typography_h1 text-center">User successfully registered</h2>
                <img class="successfully__image" src="@/assets/images/success-image.png" alt="girl did job">
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .successfully {
        &__inner {
            gap: 50px;
        }

        &__image {
            max-width: 328px;
            width: 100%;
            height: auto;
        }
    }
</style>
