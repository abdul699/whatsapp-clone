// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;

// for realtime messaging -- Can use soket.io as well
const pusher = new Pusher({
    appId: "1110978",
    key: "409070dcfcd483e07194",
    secret: "8d377265f77e9556d659",
    cluster: "ap2",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url = 'mongodb+srv://admin:co5Z9VAI1w7HFiKK@cluster0.obp4q.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("DataBase connected...");

    const msgCollection = db.collection('messagecontents'); // get from dbMessages.js
    const changeStream = msgCollection.watch();
    // on change of event
    changeStream.on("change", (change) => {
        console.log('A change occured', change);

        // if a message is inserted
        if(change.operationType === 'insert' ) {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', 
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        }
        else {
            console.log("Error triggering Pusher");
        }
    });
});


// API routes

// home page
app.get("/", (req, res) => {
    res.status(200).send('hello world')
});

// get all messages
app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
});

// insert new message
app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
});

// Listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));