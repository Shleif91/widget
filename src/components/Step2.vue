<template>
    <div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.country.$error }">
            <label >Country</label>
            <select class="form-control" v-model.trim="country" @input="$v.country.$touch()">
                <option>USA</option>
                <option>United Kingdom</option>
                <option>France</option>
            </select>
            <span class="help-block" v-if="$v.country.$error && !$v.country.required">Country is required</span>
        </div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.city.$error }">
            <label>City</label>
            <input class="form-control" v-model.trim="city" @input="$v.city.$touch()">
            <span class="help-block" v-if="$v.city.$error && !$v.city.required">City is required</span>
        </div>
    </div>
</template>

<script>
    const {
        required,
        minLength,
        email
    } = require('vuelidate/lib/validators');

    export default {
        data() {
            return {
                country: '',
                city: ''
            }
        },
        validations: {
            country: {
                required
            },
            city: {
                required
            },
            form: ['country', 'city']
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