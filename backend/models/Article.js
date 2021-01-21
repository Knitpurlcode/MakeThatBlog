const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    heroImage: {type: String, required: true},
    articleTitle: {type: String, required: true},
    urlRessource: {type: String, required: true},
    description: {type: String, required: true},
})

module.exports = mongoose.model('Article', articleSchema);