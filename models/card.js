import { Schema, model, models } from 'mongoose'
import { type } from 'os'

const CardSchema = new Schema({
    author: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
}, {timestamps: true})

const Card = models?.Card || model("Card", CardSchema)

export default Card