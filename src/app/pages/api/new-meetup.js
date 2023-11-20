import {MongoClient} from 'mongodb'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body
        const uri = 'mongodb+srv://lakshaykhokhar2003:KD8wjGIcMQCKcpjJ@next.h0kyi0y.mongodb.net/meetups?retryWrites=true&w=majority'
        const client = await MongoClient.connect(uri)
        const db = client.db()
        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data)
        console.log(result)
        await client.close()
        res.status(201).json({message: 'Meetup inserted!'})
    }
}

export default handler
