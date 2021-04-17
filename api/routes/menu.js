import { Router } from 'express'
import { menu } from '../models/MenuModel'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body

        console.log(data)

        if (!data.name || !data.price)
            return res.status(400).send({ message: 'all fields are required' })

        const newMenu = new menu({
            ...data,
        })

        const item = await newMenu.save()

        return res.status(201).send({ message: 'ok', item })
    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
})

router.get('/', async (_, res) => {
    try {
        const items = await menu.find({}).sort({ created: 'asc' })

        if (items.length) {
            res.status(200).send({ message: 'ok', data: items })
        } else {
            res.status(200).send({ message: 'ok', data: [] })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const update = {
            ...data,
            updated: Date.now(),
        }

        const item = await menu.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        res.status(200).send({ message: 'ok', data: item })
    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const update = {
            ...data,
            updated: Date.now(),
        }

        const item = await menu.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        res.status(200).send({ message: 'ok', data: item })
    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const item = await menu.findByIdAndDelete(id)

        if (!item) {
            res.status(404).send({ message: 'item not found' })
        } else {
            res.status(200).send({ message: 'ok', data: item })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
})

export const menuRouter = router
