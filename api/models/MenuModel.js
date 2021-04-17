import mongoose from 'mongoose'
import Double from '@mongoosejs/double'

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
    },
    price: {
        type: Double,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

export const menu = mongoose.models.menu || mongoose.model('menu', MenuSchema)
