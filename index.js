import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyparser from 'body-parser';
import Appointment from "./Appointment.js";

const app = express();
const PORT = 3000;

const DB_URL = "mongodb+srv://gleb:123@cluster.uw5bnc6.mongodb.net/?retryWrites=true&w=majority&appName=cluster";

app.use(cors())
app.use(bodyparser.json());



app.listen(PORT, async (error) => {
    await mongoose.connect(DB_URL)
    if(!error) {
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    } else { 
        console.log("Error occurred, server can't start", error);
    }
    }
);

app.post('/api/appointment', async (req, res) => {
    try {
        const {name, phone, date} = req.body;
        const appointment = new Appointment({name, phone, date});
        return res.json(appointment);
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/api/appointment', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        return res.json(appointments);
    } catch (error) {
        console.error(error.message);
    }
});
