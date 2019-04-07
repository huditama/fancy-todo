const User = require('../models/user')
const { sign, verify } = require('../helpers/jwt')
const { hash, compare } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);

class userController {
    static findAll(req, res) {
        User
            .find({})
            .then((allUsers) => { res.status(200).json(allUsers) })
            .catch((err) => { res.status(500).json(err.messsage) })
    }

    static create(req, res) {
        const { first_name, last_name, email, password } = req.body
        User
            .create({ first_name, last_name, email, password })
            .then((createdUser) => { res.status(201).json({ message: 'Thank you for registering!', createdUser }) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static update(req, res) {
        const { first_name, last_name, email, password } = req.body
        const { id } = req.params
        User
            .findByIdAndUpdate(id, { first_name, last_name, email, password }, { new: true })
            .then((updatedUser) => { res.status(200).json({ message: 'Updated data!', updatedUser }) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static delete(req, res) {
        const { id } = req.params
        User
            .findByIdAndDelete(id)
            .then((deletedUser) => { res.status(200).json({ message: 'Deleted user!', deletedUser }) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static signUp(req, res) {
        const { first_name, last_name, email, password } = req.body
        User
            .create({ first_name, last_name, email, password })
            .then((createdUser) => { res.status(201).json({ message: 'Thank you for registering!', createdUser }) })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    }

    static signIn(req, res) {
        const { email, password } = req.body
        User
            .findOne({ email })
            .then((findOneUser) => {
                if (!findOneUser) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else {
                    if (!compare(password, findOneUser.password)) res.status(401).json({ message: 'Email/Password is incorrect!' })
                    else {
                        const { id, first_name, last_name, email } = findOneUser
                        const payload = { id, first_name, last_name, email }
                        const token = sign(payload)
                        req.headers.token = token
                        res.status(200).json({ message: 'You have successfully logged in!', token, details: payload })
                    }
                }
            })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static googleSignIn(req, res) {
        const { token } = req.body
        let payload;
        let userToken;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then((ticket) => {
                payload = ticket.getPayload()
                const userid = payload['sub']
                return User
                    .findOne({ email: payload.email })
            })
            .then((findOneUser) => {
                const { given_name, family_name, email } = payload
                if (!findOneUser) {
                    return User
                        .create({ first_name: given_name, last_name: family_name, email, password: process.env.GOOGLE_DEFAULT_PASSWORD })
                } else return findOneUser
            })
            .then((user) => {
                const { id, first_name, last_name, email } = user
                const userPayload = { id, first_name, last_name, email }
                userToken = sign(userPayload)
                req.headers.token = userToken
                res.status(200).json({ message: 'You are now logged in via Google Sign In!', userToken, details: userPayload })
            })
            .catch((err) => { res.status(500).json(err.message) })
    }
}
module.exports = userController