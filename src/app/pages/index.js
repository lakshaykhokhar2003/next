import MeetupList from "../../../components/meetups/MeetupList";
import {Fragment, useEffect, useState} from "react";
import {MongoClient} from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
    return (<Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name='description' content='Browse a huge list of highly active React meetups'/>
        </Head>
        <MeetupList meetups={props.meetups}/>
    </Fragment>)
}


// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps() {
    const uri = 'mongodb+srv://lakshaykhokhar2003:KD8wjGIcMQCKcpjJ@next.h0kyi0y.mongodb.net/meetups?retryWrites=true&w=majority'
    const client = await MongoClient.connect(uri)
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()
    await client.close()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title, address: meetup.address, image: meetup.image, id: meetup._id.toString()
            }))
        }, revalidate: 1
    }
}

export default HomePage
