<script setup>
    import {useModelWrapper} from "@/use/modelWrapper";
    import {computed, reactive, ref} from 'vue'
    import {useVuelidate} from "@vuelidate/core";

    const props = defineProps({
        position: Object,
        id: {
            type: Number,
            default: null,
        },
        helper: {
            type: String,
            default: null,
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: "Label",
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

    const emit = defineEmits();

    // wrapper for working with the modelValue
    let inputValue = useModelWrapper(props, emit, 'modelValue');

    const state = reactive({
        input: inputValue
    });

    const rules = computed(() => {
        return {
            input: props.rules ?? {input: {}}
        };
    });

    const v$ = useVuelidate(rules, state)

    // checking for strings at +380
    const checkInput = () => {
        inputValue.value === null || '' || inputValue.value.length < 4 ? inputValue.value = '+380' : "+380";
    }

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
    <div class="input__wrap">
        <input required
               class="input"
               :class="v$.input.$error ? 'error' : ''"
               :placeholder="props.placeholder"
               :type="props.type"
               v-model="inputValue"
               autocomplete="off"
               @blur="v$.input.$touch"
               @focus="props.type === 'tel' ? checkInput() : ''"
        />
        <span class="input__label">{{ props.placeholder }}</span>
        <span class="input__helper input__helper_error" v-if="errors[0]">{{ errors[0] }}</span>
        <span class="input__helper" v-if="!v$.$error">
            {{ props.helper }}
        </span>


    </div>
</template>


<style lang="scss" scoped>
    .input {
        border: 1px solid $cl-background-light-gray;
        background-color: $cl-background-main;
        border-radius: 4px;
        height: 54px;
        width: 100%;
        padding: 14px 16px;
        box-sizing: border-box;
        outline: 0;
        transition: 0.2s linear;
        color: $cl-font-black;
        @include typography_body;

        &:hover {
            cursor: pointer;
        }

        &::placeholder {
            color: $cl-font-gray;
            transition: 0.2s linear;
        }

        &:focus {
            &::placeholder {
                opacity: 0;
            }
        }

        &:focus ~ .input__label {
            top: -7px;
            opacity: 1;
        }

        &:valid ~ .input__label {
            top: -7px;
            opacity: 1;
        }

        &__wrap {
            position: relative;
            max-width: 380px;
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        /*text under input*/
        &__helper {
            margin-left: 16px;
            margin-top: 4px;
            @include typography_label;
            font-weight: 400;
            color: $cl-font-gray;

            &_error {
                color: $cl-error;
            }
        }

        /*text placeholder*/
        &__label {
            pointer-events: none;
            color: $cl-font-gray;
            position: absolute;
            opacity: 0;
            left: 12px;
            top: 15px;
            transition: .2s;
            background-color: $cl-background-main;
            padding: 0 4px;
            @include typography_label
        }

        &.error {
            border: 2px solid $cl-error;
            animation-name: dragInput;
            animation-duration: 1s;

            & ~ .input__label {
                animation-name: dragInput;
                animation-duration: 1s;
                color: $cl-error;
                top: -7px;
                opacity: 1;
            }

            & ~ .input__helper {
                color: $cl-error;
            }

            &::placeholder {
                opacity: 0;
            }
        }

        /*error animation*/
        @keyframes dragInput {
            0% {
                transform: translateX(-3px)
            }
            25% {
                transform: translateX(3px)
            }
            50% {
                transform: translateX(-3px)
            }
            100% {
                transform: translateX(0)
            }
        }
    }
</style>