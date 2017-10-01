<template>
    <div>
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
            }
        },
    }
</script>