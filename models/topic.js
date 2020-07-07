'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Modelo de COMMENT
var CommentSchema = Schema({
    content: string,
    date: { type: date, default: date.now },
    user: { type: Schema.ObjectId, ref: 'User' },

});

var Comment = mongoose.model('Comment', CommentSchema);

// Modelo de TOPIC
var TopicSchema = Schema({
    title: string,
    content: string,
    code: string,
    lang: string,
    date: { type: date, default: date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
    comments: [CommentSchema]
});

module.exports = mongoose.model('Topic', TopicSchema);