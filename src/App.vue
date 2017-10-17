<template>
    <div>
        <div class="widget">
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeWidget()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form-wizard shape="circle" color="#3498db">
                                <tab-content title="Policy" icon="ti-user" :before-change="()=>validateStep('step0')">
                                    <step0 ref="step0" @on-validate="mergePartialModels"></step0>
                                </tab-content>
                                <tab-content title="Personal details" icon="ti-user" :before-change="()=>validateStep('step1')">
                                    <step1 ref="step1" @on-validate="mergePartialModels"></step1>
                                </tab-content>
                                <tab-content title="Shared" icon="ti-settings" :before-change="()=>validateStep('step2')">
                                    <step2 ref="step2" @on-validate="mergePartialModels"></step2>
                                </tab-content>
                                <tab-content title="Additional Info" icon="ti-settings" :before-change="()=>validateStep('step3')">
                                    <step3 ref="step3" @on-validate="mergePartialModels"></step3>
                                </tab-content>
                                <tab-content title="Last step" icon="ti-check">
                                    Here is your final model:
                                    <pre>{{finalModel}}</pre>
                                </tab-content>
                            </form-wizard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="widgetButton">
            <a href="#" id="popup__toggle" onclick="return false;" v-on:click="openWidget()">
                <div class="circlephone" style="transform-origin: center;"></div>
                <div class="circle-fill" style="transform-origin: center;"></div>
                <div class="img-circle" style="transform-origin: center;">
                    <div class="img-circleblock" style="transform-origin: center;"></div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                finalModel: {},
            }
        },
        mounted() {
            let self = this;
            $('#myModal').on('hide.bs.modal', function (e) {
                self.closeWidget();
            })
        },
        methods: {
            validateStep(name) {
                var refToValidate = this.$refs[name];
                if (refToValidate.validate()) {
                    switch (name) {
                        case 'step0':
                            this.callParent('agree');
                            break;
                        case 'step1':
                            this.callParent('first-data');
                            break;
                        case 'step2':
                            this.callParent('second-data');
                            break;
                        case 'step3':
                            this.callParent('third-data');
                            break;
                    }
                }
                return refToValidate.validate();
            },
            mergePartialModels(model, isValid){
                if(isValid){
                    // merging each step model into the final model
                    this.finalModel = Object.assign({},this.finalModel, model)
                }
            },
            openWidget() {
                $('#myModal').modal('show');
                $("#widgetButton").css('display', 'none');
                $(".widget").css('display', 'block');
                this.callParent('open');
            },
            closeWidget() {
                this.callParent('close');
                $(".widget").css('display', 'none');
                $("#widgetButton").css('display', 'block');
            },
            callParent(eventName) {
                window.parent.postMessage({
                    'event': eventName,
                    'token': 'it-zombie',
                    'params': this.finalModel
                }, "*");
            }
        },
    }
</script>

<style>
    .widget {
        display: none;
    }
    img {
        width: 100px;
        height: 100px;
    }
</style>