<template>
    <div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.name.$error }">
            <label >Name</label>
            <input class="form-control" v-model.trim="name" @input="$v.name.$touch()">
            <span class="help-block" v-if="$v.name.$error && !$v.name.required">First name is required</span>
        </div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.email.$error }">
            <label>Email</label>
            <input class="form-control" v-model.trim="email" @input="$v.email.$touch()">
            <span class="help-block" v-if="$v.email.$error && !$v.email.required">Email is required</span>
            <span class="help-block" v-if="$v.email.$error && !$v.email.email">This is not a valid email!</span>
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
                name: '',
                email: ''
            }
        },
        validations: {
            name: {
                required
            },
            email: {
                required,
                email
            },
            form: ['name', 'email']
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