const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    name: String,
    description: String,
    createdAt: Date,
    due_date: {
        type: Date,
        validate: {
            validator: function (value) {
                if (value < new Date()) return false
            },
            message: `Invalid date!`
        }
    },
    completedAt: Date,
    UserId: { type: Schema.Types.ObjectId, ref: 'User' }
})

let ToDo = mongoose.model('ToDo', toDoSchema)

module.exports = ToDo