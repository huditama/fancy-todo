$(document).ready(function () {
    if (localStorage.getItem('token')) isLoggedIn(true)
    else isLoggedIn(false)

    // If user already has an account
    $('#signInFromSignUp').click(function () {
        $('#signInForm').show()
        $('#signUpForm').hide()
        $('#homepage_text').hide()
    })

    // Navbar Functions
    $('#click_home').click(function () {
        $('#homepage_text').show()
        $('#signUpForm').hide()
        $('#signInForm').hide()
    })

    $('#click_home_loggedin').click(function () {
        $('#homepage_text').show()
        $('#dashboard').hide()
    })

    $('#click_dashboard').click(function () {
        $('#dashboard').show()
        $('#homepage_text').hide()
    })

    $('#click_register').click(function () {
        $('#signUpForm').show()
        $('#signInForm').hide()
        $('#homepage_text').hide()
    })

    $('#click_login').click(function () {
        $('#signInForm').show()
        $('#signUpForm').hide()
        $('#homepage_text').hide()
    })

    $('#click_logout').click(function () {
        signOut()
    })

    $('#click_create').click(function () {
        $('#createTaskForm').show()
    })
})

//Check if token is still present in localStorage
function isLoggedIn(state) {
    if (state == false) {
        console.log('No user logged in!')
        $('#navbarBeforeLogin').show()
        $('#homepage_text').show()
        $('#navbarAfterLogin').hide()
        $('#signInForm').hide()
        $('#signUpForm').hide()
        $('#taskCards').empty()
    } else {
        console.log('User logged in!')
        $('#navbarAfterLogin').show()
        getTaskCards()
        $('#taskCards').show()
        $('#navbarBeforeLogin').hide()
        $('#homepage_text').hide()
        $('#signInForm').hide()
        $('#signUpForm').hide()
    }
}