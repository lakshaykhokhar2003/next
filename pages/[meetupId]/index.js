import MeetupDetail from "../../components/meetups/MeetupDetails";
import {MongoClient, ObjectId} from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {

    return (<>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name='description' content={props.meetupData.description}/>
        </Head>
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title} address={props.meetupData.address}
            description={props.meetupData.description}/>
    </>);
}

export async function getStaticPaths() {
    const uri = 'mongodb+srv://lakshaykhokhar2003:KD8wjGIcMQCKcpjJ@next.h0kyi0y.mongodb.net/meetups?retryWrites=true&w=majority'
    const client = await MongoClient.connect(uri)
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()
    await client.close()
    return {
        fallback: 'blocking', paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    }

}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId
    const uri = 'mongodb+srv://lakshaykhokhar2003:KD8wjGIcMQCKcpjJ@next.h0kyi0y.mongodb.net/meetups?retryWrites=true&w=majority'
    const client = await MongoClient.connect(uri)
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId),})
    await client.close()
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }, revalidate: 10
    }
}

export default MeetupDetails;