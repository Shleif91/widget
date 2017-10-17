const widget_pk = 1;
const user_token = 'IntcInRva2VuXCI6XCJzd2tqelZxdklmUXdSN1YxN3VKd3dWaUNHczNNU0tZejU5M1ZFU0JBSTJ0TnVVUllNU1RLNHhhMTFIcDM3RDZwc0Q0MEVLSEdpQkNhT0pSVGk5RmE0VjE5emxrQ1pqMUJWaFVQXCJ9Ig:1e3pVB:DuQpsSp0BaLVDzMRZMX9h_QW68g';

var leed_token = '';

window.onload = function() {
    // if the site does not have jquery - connect it
    if (!window.jQuery) {
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
        document.body.appendChild(script);
    }

    // script = document.createElement('script');
    // script.src = 'https://vk.com/js/api/share.js?93';
    // script.charset = 'windows-1251';
    // document.head.appendChild(script);

    // add input for storage token on user site
    var input = document.createElement('input');
    input.type = 'hidden';
    input.id = 'lead-zombie-token';
    input.value = '';
    document.body.appendChild(input);

    // add frame for widget on user site
    var iframe = document.createElement('iframe');
    iframe.id = 'it-zombie-widget';
    iframe.frameBorder = 0;
    iframe.src = 'https://stagingserver.xyz/ru/widget/';
    iframe.src = 'http://localhost:8080';
    document.body.appendChild(iframe);

    // add widget styles on user site
    var css = '#it-zombie-widget { position: fixed; top: 0; left: 0; margin: 0; padding: 0; width: 180px; height: 160px; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);

    window.addEventListener('message', function (event) {
        var widget = $('#it-zombie-widget'),
            url = null,
            data = null;

        if (event.data.token === 'it-zombie') {
            if (event.data.event === 'open') {
                widget.css('height', '100%');
                widget.css('width', '100%');
                $('body').css('overflow', 'hidden');
                url = 'https://stagingserver.xyz/ru/api/widgets/opened/' + widget_pk + '/?token=' + user_token;
                PUT(url, {});
            }
            if (event.data.event === 'close') {
                widget.css('height', '160');
                widget.css('width', '180');
                $('body').css('overflow', 'visible');
                url = 'https://stagingserver.xyz/ru/api/widgets/closed/' + widget_pk + '/?token=' + user_token;
                PUT(url, {});
            }
            if (event.data.event === 'agree') {
                url = 'https://stagingserver.xyz/ru/api/leeds/?token=' + user_token;
                data = {
                    "widget": widget_pk,
                    "token" : 234
                };
                $.ajax({
                    url: url,
                    method: 'POST',
                    data: data
                }).done(function(data) {
                    leed_token = data.id;
                }).fail(function(data) {
                    console.log(data);
                });
            }
            if (event.data.event === 'first-data') {
                url = 'https://stagingserver.xyz/ru/api/leeds/' + leed_token + '/?token=' + user_token;
                data = {
                    first_name: event.data.params.name,
                    email: event.data.params.email
                };
                PUT(url, data);
            }
            if (event.data.event === 'second-data') {
                console.log('second');
            }
            if (event.data.event === 'third-data') {
                url = 'https://stagingserver.xyz/ru/api/leeds/' + leed_token + '/?token=' + user_token;
                data = {
                    phone_number: event.data.params.phone
                };
                PUT(url, data);
            }
        }
    }, false);

    function POST(url, data) {
        apiSend(url, 'POST', data)
    }

    function PUT(url, data) {
        apiSend(url, 'PUT', data)
    }

    function apiSend(url, method, data) {
        $.ajax({
            url: url,
            method: method,
            data: data
        }).done(function(data) {
            console.log(data);
        }).fail(function(data) {
            console.log(data);
        });
    }
};

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}