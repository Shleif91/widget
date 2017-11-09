<template>
    <div>
        <social-sharing url="https://vuejs.org/"
                        title="The Progressive JavaScript Framework"
                        description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                        quote="Vue is a progressive framework for building user interfaces."
                        hashtags="vuejs,javascript,framework"
                        twitter-user="vuejs"
                        inline-template>
            <div class="row">
                <div class="col-md-6">
                    <network network="facebook">
                        <i class="fa fa-facebook"></i> Facebook
                    </network>
                    <network network="googleplus">
                        <i class="fa fa-google-plus"></i> Google +
                    </network>
                    <network network="linkedin">
                        <i class="fa fa-linkedin"></i> LinkedIn
                    </network>
                    <network network="odnoklassniki">
                        <i class="fa fa-odnoklassniki"></i> Odnoklassniki
                    </network>
                    <network network="pinterest">
                        <i class="fa fa-pinterest"></i> Pinterest
                    </network>
                    <network network="reddit">
                        <i class="fa fa-reddit"></i> Reddit
                    </network>
                </div>
                <div class="col-md-6">
                    <network network="skype">
                        <i class="fa fa-skype"></i> Skype
                    </network>
                    <network network="telegram">
                        <i class="fa fa-telegram"></i> Telegram
                    </network>
                    <network network="twitter">
                        <i class="fa fa-twitter"></i> Twitter
                    </network>
                    <network network="vk">
                        <i class="fa fa-vk"></i> VKontakte
                    </network>
                    <network network="weibo">
                        <i class="fa fa-weibo"></i> Weibo
                    </network>
                    <network network="whatsapp">
                        <i class="fa fa-whatsapp"></i> Whatsapp
                    </network>
                </div>
            </div>
        </social-sharing>
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

<style>
    .fa {
        width: 25px;
        height: 25px;
        background-color: #73cdff;
        border-radius: 5px;
        padding: 5px;
    }
</style>