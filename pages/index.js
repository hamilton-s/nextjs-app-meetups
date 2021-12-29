import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a list of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// Using getStaticProps
// Prepares props for the page. Executed during the build process
// Never shows on the client side
// data fetching for prerendering is great for SEO as the data will show in the page source
export const getStaticProps = async () => {
  const client = await MongoClient.connect(process.env.DB_URL);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    // regenerated on the server every 1 seconds so data doesn't get old
    revalidate: 1,
  };
};

export default HomePage;
