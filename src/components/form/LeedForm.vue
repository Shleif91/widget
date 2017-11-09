<template>
    <div>
        <form-wizard shape="circle" color="#3498db">
            <tab-content :before-change="()=>validateStep('step0')">
                <step0 ref="step0" @on-validate="mergePartialModels"></step0>
            </tab-content>
            <tab-content :before-change="()=>validateStep('step1')">
                <step1 ref="step1" @on-validate="mergePartialModels"></step1>
            </tab-content>
            <tab-content :before-change="()=>validateStep('step2')">
                <step2 ref="step2" @on-validate="mergePartialModels"></step2>
            </tab-content>
            <tab-content :before-change="()=>validateStep('step3')">
                <step3 ref="step3" @on-validate="mergePartialModels"></step3>
            </tab-content>
            <tab-content>
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
        mounted() {
            window.addEventListener('message', function (event) {
                if (event.data.event === 'setToken') {
                    $('#vk').append(VK.Share.button({
                        url: 'http://localhost:63342/mvp/test.html?_ijt=l2farcmrpo7nhem15f3d3otgga/?ref=' + event.data.params.token,
                        title: 'Пиздатый оффер',
                        image: 'http://img0.liveinternet.ru/images/attach/c/0//44/903/44903744_X_cc4be601.jpg',
                        noparse: true
                    }));
                    $.ajaxSetup({ cache: true });
                    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
                        FB.init({
                            appId: '289273214892597',
                            version: 'v2.7' // or v2.1, v2.2, v2.3, ...
                        });
                        $("#fb").click(() => {
                            FB.ui({
                                method: 'share_open_graph',
                                action_type: 'og.likes',
                                action_properties: JSON.stringify({
                                    object:'http://localhost:63342/mvp/test.html?_ijt=l2farcmrpo7nhem15f3d3otgga',
                                })
                            }, function(response){
                                // Debug response (optional)
                                console.log(response);
                            });
                        });
                    });
                }
            });
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
    .wizard-progress-with-circle, ul.wizard-nav-pills {
        display: none !important;
    }
</style>