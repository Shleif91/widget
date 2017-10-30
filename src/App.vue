<template>
    <div>
        <div class="widget">
            <input type="hidden" id="leedToken">
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeWidget()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <leed-form></leed-form>
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
        mounted() {
            let self = this;
            $('#myModal').on('hide.bs.modal', function (e) {
                self.closeWidget();
            });
        },
        methods: {
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
                    'token': 'it-zombie'
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