import { Elarian } from 'elarian'

const client = new Elarian({
    apiKey: process.env.RAZZLE_ELARIAN_API,
    orgId: process.env.RAZZLE_ELARIAN_ORGID,
    appId: process.env.RAZZLE_ELARIAN_APPID,
})

client.on('receivedSms', (notification, customer) => {
    console.log(notification)
    console.log(customer)
})

client
    .on('connected', () => {
        console.log('Elarian is running')
    })
    .on('error', (error) => {
        console.error({ error })
    })
    .connect()

export default client
