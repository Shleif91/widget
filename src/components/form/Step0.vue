<template>
    <div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.policy.$error }">
            <div class="checkbox">
                <label>
                    <input type="checkbox" v-model.trim="policy" @input="$v.policy.$touch()">
                    <a href="#">Accept privacy policy</a>
                </label>
            </div>
            <span class="help-block" v-if="$v.policy.$error && !$v.policy.required">Accept policy</span>
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
                policy: false
            }
        },
        validations: {
            policy: {
                required
            },
            form: ['policy']
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