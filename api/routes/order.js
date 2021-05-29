import { Router } from 'express'
import { order } from '../models/OrderModel'
import { sendOrderConfirmation } from '../utils/Sms'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const newOrder = new order({
            ...data,
        })

        const item = await newOrder.save()

        const resp = await sendOrderConfirmation(item.userPhoneNumber)

        if (resp.status === 'sent') {
            res.status(201).send({ message: 'ok', item })
        } else {
            res.status(400).send({ message: 'message not sent' })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
})

export const orderRouter = router
