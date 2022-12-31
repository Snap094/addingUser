<script setup>
    import ButtonComponent from '@/components/ButtonComponent.vue'
    import FormInput from '@/components/FormInput.vue'
    import InputRadio from '@/components/InputRadio.vue'
    import InputFile from '@/components/InputFile.vue'
    import SpinLoader from '@/components/SpinLoader.vue'
    import {ref, defineEmits, reactive, toRefs, computed} from 'vue'
    import {authorizeRequest, request} from "@/use/helpers";
    import {API_ROUTES} from "@/use/routes";
    import {email, required, minLength, maxLength, helpers,} from "@vuelidate/validators";
    import {useVuelidate} from "@vuelidate/core";
    import {isNumeric, isUaNumber} from "@/use/validationHelpers";

    const state = reactive({
        name: '',
        email: '',
        phone: '',
        position: null,
        file: null,
    })

    toRefs(state)

    // settings vuelidate
    const rules = computed(() => {
        return {
            name: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(60),
            },
            email: {
                required,
                email,
            },
            phone: {
                required,
                isUaNumber: helpers.withMessage('Value must be start +380', isUaNumber),
                isNumeric: helpers.withMessage('Value must be numeric', isNumeric),
                minLength: minLength(13),
                maxLength: maxLength(13),
            },
            position: {
                required,
            },
            file: {
                required,
            },
        }
    })

    const v$ = useVuelidate(rules, state)

    const positions = ref({})
    const isLoadForm = ref(false)
    const isLoadPosition = ref(false)
    let errorBackEnd = ref([])

    const props = defineProps({
        handleFileUpload: String,
    })

    const emit = defineEmits(['formSent'])

    // hardcode value on form
    const inputFields = {
        name: {
            placeholder: 'Your name'
        },
        email: {
            type: 'email',
            placeholder: 'Email'
        },
        phone: {
            type: 'tel',
            placeholder: 'Phone',
            helper: '+38 (XXX) XXX - XX - XX',
        },
        position: {
            type: 'radio'
        }
    }

    // position loading function
    const loadPositions = function () {
        isLoadPosition.value = true
        request().get(API_ROUTES.GET_POSITIONS, {})
            .then(response => {
                positions.value = response.data.positions
                isLoadPosition.value = false
            });
    }

    // user post request function
    const postRequest = () => {
        const formData = new FormData()
        formData.append('name', state.name)
        formData.append('email', state.email)
        formData.append('phone', state.phone)
        formData.append('position_id', state.position)
        formData.append('photo', state.file, state.file.name)
        authorizeRequest().post(API_ROUTES.USERS, formData)
            .then(() => {
                isLoadForm.value = false
                emit('formSent', true)
            })
            .catch(function (error) {
                if (error.response) {
                    errorBackEnd.value = Object.assign(error.response.data.fails)
                }
            })
    }

    loadPositions()

</script>

<template>
    <section class="form-post" id="scrollPost" ref="postScroll">
        <div class="container">
            <div class="form-post__inner common-padding col-centered">
                <h2 class="typography_h1 text-center">Working with POST request</h2>
                <SpinLoader v-if="isLoadForm"/>
                <form class="form-post__form col-centered" @submit.prevent v-if="!isLoadForm">
                    <div class="form-post__inputs-text col-centered">
                        <FormInput
                                :placeholder="inputFields.name.placeholder"
                                v-model="state.name"
                                :rules="rules.name"
                                :errors="errorBackEnd.name"
                        />
                        <FormInput
                                :placeholder="inputFields.email.placeholder"
                                :type="inputFields.email.type"
                                :rules="rules.email"
                                v-model="state.email"
                                :errors="errorBackEnd.email"
                        />
                        <FormInput
                                :placeholder="inputFields.phone.placeholder"
                                :type="inputFields.phone.type"
                                :helper="inputFields.phone.helper"
                                :rules="rules.phone"
                                v-model="state.phone"
                                :errors="errorBackEnd.phone"
                        />
                    </div>
                    <div class="form-post__inputs-radio col-centered">
                        <p class="typography_body">Select your position</p>
                        <InputRadio v-model="state.position"
                                    v-for="(position, index) in positions"
                                    :key="index"
                                    :position="position"
                                    v-if="!isLoadPosition"
                        />
                        <span class="form-post__inputs-error" v-if="errorBackEnd.position_id">{{ errorBackEnd.position_id[0] }}</span>
                        <SpinLoader v-if="isLoadPosition"/>
                    </div>
                    <InputFile
                            :rules="rules.file"
                            v-model="state.file"
                            :errors="errorBackEnd.photo"
                    />
                    <ButtonComponent :disabled="v$.$invalid" @click="postRequest">
                        Sign up
                    </ButtonComponent>
                </form>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
    .form-post {
        &__form {
            max-width: 380px;
        }

        &__inner {
            gap: 50px;
        }

        &__inputs-text {
            gap: 50px;
        }

        &__inputs-error {
            position: absolute;
            bottom: -20px;
            margin-left: 16px;
            margin-top: 4px;
            @include typography_label;
            font-weight: 400;
            color: $cl-error;
        }

        &__inputs-radio {
            align-items: start;
            margin-top: 25px;
            margin-bottom: 50px;
            position: relative;

            & > *:first-child {
                margin-bottom: 11px;
            }
        }
    }
</style>