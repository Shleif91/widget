<template>
    <div>
        <div class="widget">
            <!--<div class="headWidget">-->
                <!--<button class="closeWidget" v-on:click="closeWidget()">x</button>-->
            <!--</div>-->
            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeWidget()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
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
                window.parent.postMessage({
                    'event': 'open',
                    'token': '123456',
                }, "*");
            },
            closeWidget() {
                window.parent.postMessage({
                    'event': 'close',
                    'token': '123456',
                }, "*");
                $(".widget").css('display', 'none');
                $("#widgetButton").css('display', 'block');
            }
        },
    }
</script>

<style>
    .widget {
        /*width: 300px;*/
        /*height: 300px;*/
        display: none;
        /*background-color: rgba(0,255,255,.2);*/
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