const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Board = new Schema({
    writer: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    contents: String,
})

// added paginate plugin for pagenation
Board.plugin(paginate)

// create new Board
Board.statics.write = function(writer, title, contents) {
    console.log(writer)
    const board = new this({
        writer, 
        title, 
        contents
    })

    return board.save()
}

// find one board list
Board.statics.readAll = function(page, limit) {
    return this.paginate({}, { page, limit, populate: {
        path: 'writer',
        select: '-password -__v'
    }, lean: true })
}

module.exports = mongoose.model('Board', Board)