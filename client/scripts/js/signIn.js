function signIn() {
    event.preventDefault()
    const email = $('#emailSignIn').val()
    const password = $('#passwordSignIn').val()

    $.ajax({
        url: `${serverUrl}/users/signIn`,
        method: 'POST',
        data: { email, password }
    })
        .done((response) => {
            const { token, details } = response
            localStorage.setItem('token', token)
            localStorage.setItem('UserId', details.id)
            localStorage.setItem('email', details.email)
            getTaskCards()
            $('#taskCards').show()
            $('#navbarAfterLogin').show()
            $('#signInForm').hide()
            $('#navbarBeforeLogin').hide()
            swal("Success!", response.message, "success");
        })
        .fail((err) => {
            swal("Error!", err.responseJSON.message, "error");
        })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $.ajax({
        url: `${serverUrl}/users/googleSignIn`,
        method: 'POST',
        data: { token: id_token }
    })
        .done((response) => {
            const { userToken, details } = response
            if (!localStorage.getItem('token')) swal("Success!", response.message, "success")
            localStorage.setItem('token', userToken)
            localStorage.setItem('UserId', details.id)
            localStorage.setItem('email', details.email)
            getTaskCards()
            $('#taskCards').show()
            $('#navbarAfterLogin').show()
            $('#signInForm').hide()
            $('#navbarBeforeLogin').hide()
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed!', textStatus)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.')
    })
    localStorage.removeItem('token')
    localStorage.removeItem('UserId')
    localStorage.removeItem('email')
    swal("Success!", 'See you next time!', "success");
    $('#homepage_text').show()
    $('#navbarBeforeLogin').show()
    $('#navbarAfterLogin').hide()
    $('#signUpForm').hide()
    $('#signInForm').hide()
    $('#taskCards').empty()
}