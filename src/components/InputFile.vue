<script setup>
    import {ref, computed, reactive} from "vue";
    import {useVuelidate} from "@vuelidate/core";

    const emit = defineEmits(['update:modelValue'])

    const props = defineProps({
        modelValue: [File],
        helper: {
            type: String,
            default: null,
        },
        errors: {
            type: Array,
            default: []
        },
        rules: {
            type: Object,
            default: {}
        },
    })

    // when the file is selected paste the file name
    const fileName = computed(() => {
        return props.modelValue === null ? 'Upload your photo' : props.modelValue.name
    })

    // when file selected make the font color black
    const fileNameColor = computed(() => {
        return props.modelValue === null ?  '' : 'input-file__item_black'
    })

    // call event on ref
    const onFileChanged = function ($event) {
        const file = $event.target.files[0]
        emit('update:modelValue', file)
    }

    const state = reactive({
        input: props.modelValue ?? {input: {}}
    });

    const rules = computed(() => {
        return {
            input: props.rules ?? {input: {}}
        };
    });

    const v$ = useVuelidate(rules, state)

    // pass all errors to array
    const errors = computed(() => {
        let errors = [...props.errors ?? []];
        if (v$.value.$error) {
            v$.value.$errors.forEach(error => {
                errors.push(error.$message)
            });
        }
        return errors;
    });
</script>

<template>
    <div class="input-file__wrap">
        <input
                required
                ref="file"
                class="input-file__hidden "
                type="file"
                :class="v$.input.$error || errors[0] ? 'error' : ''"
                @change="onFileChanged($event)"
                accept=".jpg, .jpeg"
        />
        <div class="input-file" @click="$refs.file.click()">
            <div class="input-file__field">
                <span class="input-file__button" >Upload</span>
                <span class="input-file__item" :class="fileNameColor" :title="fileName">{{ fileName }}</span>
            </div>
            <span class="input-file__helpers typography_label" v-if="props.helper">{{ props.helper }}</span>
            <span class="input-file__helpers typography_label" v-if="errors[0]">{{ errors[0] }}</span>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .input-file {
        width: 100%;

        &:hover {
            cursor: pointer;
        }

        &__wrap {
            width: 100%;
            margin-bottom: 50px;
        }

        /*hide input*/
        &__hidden {
            position: absolute;
            opacity: 0;
            pointer-events: none;

            /*add class error on input*/
            &.error ~ .input-file {
                & > .input-file__field {
                    border: 2px solid $cl-error;

                    & > .input-file__button {
                        border: 2px solid transparent;
                        border-right: 2px solid $cl-error;
                        height: calc(100% + 4px);
                        left: -2px;
                        top: -2px;
                    }
                }
                & > .input-file__helpers {
                    color: $cl-error;
                }
            }
        }

        &__button {
            position: absolute;
            width: 83px;
            height: calc(100% + 2px);
            left: -1px;
            top: -1px;
            border: 1px solid black;
            border-radius: 4px 0px 0px 4px;
            padding: 0 15px;
            display: flex;
            align-items: center;
            @include typography_body;
        }

        &__item {
            width: fit-content;
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding: 0 16px 0 97px;
            @include typography_body;
            color: $cl-font-gray;

            &_black {
                color: $cl-font-black;
            }
        }


        &__field {
            position: relative;
            height: 54px;
            display: flex;
            align-items: center;
            border: 1px solid $cl-background-light-gray;
            border-radius: 4px;

        }

        &__helpers {
            display: inline-block;
            font-weight: 400;
            margin-top: 4px;
            margin-left: 16px;
        }
    }
</style>
