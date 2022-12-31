<script setup>

</script>

<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style lang="scss" >
    .button {
        display: inline-block;
        min-height: 34px;
        min-width: 100px;
        max-width: 200px;
        word-break: break-word;
        padding: 4px 18px;
        border-radius: 80px;
        background-color: $cl-primary;
        text-align: center;
        border: 0;
        transition: .2s;
        @include typography_body;


        &:hover {
            cursor: pointer;
            background-color: $cl-btn-hover;
        }

        &:disabled {
            background-color: $cl-btn-disabled;
            cursor: default;
        }
    }
</style>
