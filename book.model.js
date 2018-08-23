'use strict';

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BookSchema = new Schema({
/*    title:{
        type: String,
        required: true
    },

    published:{
        type: Date,
        default: Date.now
    },

    keywords: Array,

    published: Boolean,

    author: {
        type: Schema.ObjectId,
        ref: 'User'//It will make reference to user model and map it in this field
    },

//Embedded sub documents
    detail:{
        modelNumber: Number,
        hardcover: Boolean,
        reviews: Number,
        rank: Number
    }*/

    title: String,
    author: String,
    category: String
});

module.exports = mongoose.model("Book",BookSchema);