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

export const menuRouter = router
