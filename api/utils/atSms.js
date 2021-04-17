const credentials = {
    apiKey: process.env.RAZZLE_AT_API_KEY,
    username: 'sandbox',
}

const Africastalking = require('africastalking')(credentials)
const sms = Africastalking.SMS

export async function sendOrderConfirmation(number) {
    try {
        const options = {
            to: number,
            message:
                'Foodie has recieved your order. Thank you for buying at Foodie',
            from: 'Foodie',
            enque: true,
        }

        const response = await sms.send({ ...options })
        console.log({ response })
    } catch (error) {
        console.log({ error })
    }
}
