<template>
    <div>
        <div class="widget">
            <div class="headWidget">
                <button class="closeWidget" v-on:click="closeWidget()">x</button>
            </div>
            <form-wizard shape="square" color="#3498db">
                <tab-content title="Personal details" icon="ti-user" :before-change="()=>validateStep('step1')">
                    <step1 ref="step1" @on-validate="mergePartialModels"></step1>
                </tab-content>
                <tab-content title="Additional Info" icon="ti-settings" :before-change="()=>validateStep('step2')">
                    <step2 ref="step2" @on-validate="mergePartialModels"></step2>
                </tab-content>
                <tab-content title="Last step" icon="ti-check">
                    Here is your final model:
                    <pre>{{finalModel}}</pre>
                </tab-content>
            </form-wizard>
        </div>
        <img src="./assets/img/gift.png" id="label1" v-on:click="openWidget()">
        <a href="#" id="popup__toggle" onclick="return false;">
            <div class="circlephone" style="transform-origin: center;"></div>
            <div class="circle-fill" style="transform-origin: center;"></div>
            <div class="img-circle" style="transform-origin: center;">
                <div class="img-circleblock" style="transform-origin: center;"></div>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                finalModel: {},
            }
        },
        methods: {
            validateStep(name) {
                var refToValidate = this.$refs[name];
                return refToValidate.validate();
            },
            mergePartialModels(model, isValid){
                if(isValid){
                    // merging each step model into the final model
                    this.finalModel = Object.assign({},this.finalModel, model)
                }
            },
            openWidget() {
                $("#label").css('display', 'none');
                $(".widget").css('display', 'block');
            },
            closeWidget() {
                $("#label").css('display', 'block');
                $(".widget").css('display', 'none');
            }
        },
    }
</script>

<style>
    .widget {
        width: 300px;
        display: none;
        background-color: rgba(0,255,255,.2);
    }
    #label {
        position: fixed;
        right: 20px;
        bottom: 100px;
    }
    .headWidget {
        width: 100%;
        background-color: rgb(52,152,219);
        height: 50px;
        border-radius: 5px 5px 0 0;
    }
    .closeWidget {
        position: fixed;
        right: 10px;
        top: 10px;
        border: 2px solid #fff;
        color: #fff;
        background-color: transparent;
        border-radius: 5px;
        cursor: pointer;
        z-index: 9999;
    }
    img {
        width: 100px;
        height: 100px;
    }
</style>