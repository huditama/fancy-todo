function signUp() {
    event.preventDefault()
    const first_name = $('#first_name').val()
    const last_name = $('#last_name').val()
    const email = $('#emailRegister').val()
    const password = $('#passwordRegister').val()

    $.ajax(({
        url: 'http://localhost:3000/users/signUp',
        method: 'POST',
        data: { first_name, last_name, email, password }
    }))
        .done((response) => {
            $('#signUpForm').hide()
            $('#signInForm').show()
            swal("Success!", response.message, "success");
        })
        .fail((err) => {
            swal("Error!", err.responseJSON, "error");
        })
}