<script setup>
    import {useModelWrapper} from "@/use/modelWrapper";
    import {computed, reactive} from "vue";
    import {useVuelidate} from "@vuelidate/core";

    const emit = defineEmits(['update:modelValue'])

    const props = defineProps({
        position: Object,
        modelValue: Number,
        errors: {
            type: Array,
            default: []
        },
        rules: {
            type: Object,
            default: {}
        },
    })

    // wrapper for working with the modelValue
    const inputValue = useModelWrapper(props, emit, 'modelValue')

    const state = reactive({
        input: inputValue
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
    <div class="input-radio__wrap">
        <input
                class="input-radio"
                type="radio"
                :id="position.id" :value="position.id" v-model="inputValue"
                :class="v$.input.$error ? 'error' : ''"
        />
        <label class="typography_body" :for="position.id">{{ position.name }}</label>
    </div>
</template>


<style lang="scss" scoped>
    .input-radio {

        &__wrap {
            display: flex;
            align-items: center;

            &:not(:last-child) {
                margin-bottom: 7px;
            }

            label {
                &:hover {
                    cursor: pointer;
                }
            }
        }

        width: 20px;
        height: 20px;
        outline: none;
        opacity: 0;

        & ~ label {
            position: relative;
            margin-left: 12px;
        }

        /*button redrawing*/
        & ~ label::before {
            position: absolute;
            box-sizing: border-box;
            content: "";
            left: -32px;
            top: 50%;
            transform: translate(0, -50%);
            width: 20px;
            height: 20px;
            background-color: $cl-background-main;
            border: 1px solid $cl-background-light-gray;
            border-radius: 50%;
        }

        /*button redraw inside*/
        & ~ label::after {
            transition: .3s ease;
            position: absolute;
            box-sizing: border-box;
            content: "";
            left: -27px;
            top: 50%;
            transform: scale(0) translate(0, -50%);
            width: 0;
            height: 0;
            background-color: $cl-secondary;
            border-radius: 50%;
        }

        &:checked ~ label::before {
            border: 1px solid $cl-secondary;
        }

        &:checked ~ label::after {
            width: 10px;
            height: 10px;
            transform: scale(1) translate(0, -50%);
        }

    }


</style>