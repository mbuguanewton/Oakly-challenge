import { Router } from 'express'
import { order } from '../models/OrderModel'
// import { sendOrderConfirmation } from '../utils/atSms'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const newOrder = new order({
            ...data,
        })

        const item = await newOrder.save()

        // sendOrderConfirmation(item?.userPhoneNumber)

        res.status(201).send({ message: 'ok', item })
    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
})

export const orderRouter = router
