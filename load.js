const widget_pk = 1;
const user_token = 'IntcInRva2VuXCI6XCJlcUl2TWZxZUZ2N1k4VFNpQUdTYkhqZENUc0tRWTQ1aUJDRXJFRElPQmhhR3hnbXBURVJkNWxINzdIR3o4MVdyYm0xbVFTOXQ4ZzBQMFJZYU9ydWVlalR6MzVidzJ0OUc5TzVWXCJ9Ig:1e6jvU:l4ORxUPDyIS-b2zZPj8Lub4UFWQ';
const domain = 'http://127.0.0.1:8000';
var leed_token = '';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.onload = function() {
    // if the site does not have jquery - connect it
    if (!window.jQuery) {
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
        document.body.appendChild(script);
    }

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
            if (event.data.event === 'loading') {
                iframe.contentWindow.postMessage({
                    'event': 'setUserToken',
                    'token': 'it-zombie',
                    'params': {'token':user_token}
                }, "*");
            }
            if (event.data.event === 'open') {
                widget.css('height', '100%');
                widget.css('width', '100%');
                $('body').css('overflow', 'hidden');
                url = domain + '/ru/api/widgets/opened/' + widget_pk + '/?token=' + user_token;
                PUT(url, {});
            }
            if (event.data.event === 'close') {
                widget.css('height', '160');
                widget.css('width', '180');
                $('body').css('overflow', 'visible');
                url = domain + '/ru/api/widgets/closed/' + widget_pk + '/?token=' + user_token;
                PUT(url, {});
            }
            if (event.data.event === 'agree') {
                url = domain + '/ru/api/leeds/?token=' + user_token;
                data = {
                    "widget": widget_pk,
                    "token" : 234,
                    "referal": getParameterByName('ref')
                };
                $.ajax({
                    url: url,
                    method: 'POST',
                    data: data
                }).done(function(data) {
                    leed_token = data.id;
                    iframe.contentWindow.postMessage({
                        'event': 'setToken',
                        'token': 'it-zombie',
                        'params': {'token':data.token}
                    }, "*");
                }).fail(function(data) {
                    console.log(data);
                });
            }
            if (event.data.event === 'first-data') {
                url = domain + '/ru/api/leeds/' + leed_token + '/?token=' + user_token;
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
                url = domain + '/ru/api/leeds/' + leed_token + '/?token=' + user_token;
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