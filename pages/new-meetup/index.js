import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredDetails) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredDetails),
      header: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta name="description" content="Create networking opportunities" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
