import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    await meetupsCollection.insertOne(JSON.parse(data));

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
};

export default handler;
