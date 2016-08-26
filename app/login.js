

/**
 * helpers
 */

var baseUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : '');

$('#password-login').on('submit', function() {
    $('#password-login').attr('action', baseUrl + '/login');
});

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
};

/**
 * Handler for the signin callback triggered after the user selects an account.
 */

var userLogin = false;
function onSignInCallback(resp) {
    if(gapi.client !== undefined) {
        gapi.client.load('plus', 'v1', handleLogin(resp));
    }
}

function onLoginClick(){
    userLogin = true;
}

function handleLogin(resp) {
    if(resp.id_token !== undefined && userLogin === true){
        $.ajax({
            url: (baseUrl + '/login'),
            type: "post",
            success: function (data) {
                post(baseUrl + '/login/', {}, 'post');
            },
            failure: function (err) {
                alert('error in google auth');
            },
            data: {
                'id_token' : resp.id_token
            }
        });
    }
};

