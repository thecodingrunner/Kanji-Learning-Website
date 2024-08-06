import { Schema, model, models } from 'mongoose'
import { type } from 'os'

const CardSchema = new Schema({
    author: {
        type: String,
    },
    userIds: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    kanji: {
        type: String,
        required: [true, 'Kanji is required!'],
    },
    onyomi: {
        type: String,
    },
    kunyomi: {
        type: String,
    },
    keyword: {
        type: String,
        required: [true, 'Keyword is required!'],
    },
    prompt: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    audioUrl: {
        type: String,
    },
    interval: {
        type: Number,
    },
    lastStudied: {
        type: Date,
    },
    users: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
    },
    reviews: {
        type: Number,
        default: 0,
    }
}, {timestamps: true})

const Card = models?.Card || model("Card", CardSchema)

export default Card