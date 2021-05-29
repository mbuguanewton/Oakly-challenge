import client from './elarian'

export async function sendOrderConfirmation(number) {
    try {
        const customer = new client.Customer({
            number: number,
            provider: 'cellular',
        })

        const smsChannel = {
            number: process.env.RAZZLE_ELARIAN_CHANNEL,
            channel: 'sms',
        }

        const resp = await customer.sendMessage(smsChannel, {
            body: {
                text: 'Foodie has recieved your order. Thank you for buying at Foodie',
            },
        })

        return resp
    } catch (error) {
        console.log({ error })
    }
}
