const ToDo = require('../models/toDo')

class toDoController {
    static findAll(req, res) {
        ToDo
            .find({ UserId: req.authenticatedUser.id })
            .populate('UserId')
            .then((allToDo) => { res.status(200).json(allToDo) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static findOne(req, res) {
        const { id } = req.params
        ToDo
            .findOne({ _id: id })
            .populate('UserId')
            .then((findOneToDo) => { res.status(200).json(findOneToDo) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static create(req, res) {
        const { name, description, due_date, UserId } = req.body
        ToDo
            .create({ name, description, createdAt: new Date(), due_date: new Date(due_date), completedAt: null, UserId })
            .then((createdToDo) => { res.status(201).json({ message: 'Added a new task!', createdToDo }) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static complete(req, res) {
        ToDo
            .findByIdAndUpdate(req.params.id, { completedAt: new Date() }, { new: true })
            .then((updatedToDo) => { res.status(200).json({ message: 'Completed task!', updatedToDo }) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static unComplete(req, res) {
        ToDo
            .findByIdAndUpdate(req.params.id, { completedAt: null }, { new: true })
            .then((updatedToDo) => { res.status(200).json({ message: 'Unchecked task!', updatedToDo }) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static update(req, res) {
        const { name, description, due_date } = req.body
        ToDo
            .findByIdAndUpdate(req.params.id, { name, description, due_date }, { new: true })
            .then((updatedToDo) => { res.status(200).json({ message: 'Updated task!', updatedToDo }) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static delete(req, res) {
        ToDo
            .findByIdAndDelete(req.params.id)
            .then((deletedToDo) => { res.status(200).json({ message: 'Deleted task!', deletedToDo }) })
            .catch((err) => { res.status(500).json(err.message) })
    }
}

module.exports = toDoController