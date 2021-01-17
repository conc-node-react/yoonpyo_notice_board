const e = require("express");
const { createIndexes } = require("../../../models/board");
const Board = require("../../../models/board")
const User = require("../../../models/user")

exports.write = async (req, res) => {
    try {
        const decoded = req.decoded
        const { title, contents } = req.body

        if (!title || !contents) {
            throw new Error('Title or contents is required')
        }  

        const user = await User.findOneByUsername(decoded.username)

        if (!user) {
            throw new Error('Not found user')
        }

        const board = await Board.write(user._id, title, contents)

        res.json({
            result: true,
            board
        })
    } catch(e) {
        res.status(404).json({
            message: e.message
        })
    }
}

exports.list = async (req, res) => {
    try {
        const { page, limit } = req.query

        const data = await Board.readAll(page, limit)

        res.json({
            data,
            result: true
        })
    } catch(e) {
        res.status(404).json({
            message: e.message
        })
    }
}

exports.read = async (req, res) => {
    try {
        const id = req.params.id

        const board = await Board.findById(id);

        res.json({
            board,
            result: true
        })

    } catch(e) {
        res.status(404).json({
            message: e.message
        })
    }
}