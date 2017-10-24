<template>
    <div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.phone.$error }">
            <h1 id="vk"></h1>
        </div>
    </div>
</template>

<script>
    const {
        required
    } = require('vuelidate/lib/validators');

    export default {
        data() {
            return {
                phone: ''
            }
        },
        validations: {
            phone: {

            },
            form: ['phone']
        },
        methods: {
            validate() {
                this.$v.form.$touch();
                var isValid = !this.$v.form.$invalid;
                this.$emit('on-validate', this.$data, isValid);
                return isValid
            }
        }
    }
</script>