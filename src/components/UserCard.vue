<script setup>
    const props = defineProps({user: Object})
</script>

<template>
    <div class="user-card col-centered">
        <div class="user-card__image-wrap">
            <img class="user-card__image" :src="user.photo" alt="">
        </div>
        <p :title="user.name" class="user-card__text typography_body text-center">{{user.name}}</p>
        <div class="user-card__info">
            <p :title="user.position" class="user-card__text typography_body text-center">{{user.position}}</p>
            <p :title="user.email" class="user-card__text typography_body text-center">{{user.email}}</p>
            <p :title="user.phone" class="user-card__text typography_body text-center">{{user.phone}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .user-card {
        background-color: $cl-background-card;
        max-width: 370px;
        justify-content: space-between;
        gap: 20px;
        padding: 20px;
        border-radius: 10px;

        &__image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        &__image-wrap {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: $cl-background-light-gray;
            overflow: hidden;
        }

        &__info {
            width: 100%;
        }

        &__text {
            max-width: 100%;
            width: fit-content;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin: 0 auto;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
