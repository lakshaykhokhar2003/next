import NewMeetupForm from "../../../../components/meetups/NewMeetupForm";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {redirect} from "next/navigation";
import {useRouter} from "next/router";
import Head from "next/head";

const NewMeetupPage = () => {
    const router = useRouter()
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await axios.post('/api/new-meetup', enteredMeetupData)
        console.log(response.data)
        await router.push('/')
    }
    return (<>
        <Head>
            <title>Add a New Meetup</title>
            <meta name='description' content='Add your own meetups and create amazing networking opportunities.'/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </>)
}

export default NewMeetupPage;