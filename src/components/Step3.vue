<template>
    <div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.phone.$error }">
            <label>Phone</label>
            <input class="form-control" v-model.trim="phone" @input="$v.phone.$touch()">
            <span class="help-block" v-if="$v.phone.$error && !$v.phone.required">Phone is required</span>
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
                required
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