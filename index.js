const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Schema Design (Name, Email, Phone, Message) [source 12, 16]
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// 2. POST API - Store contact data [source 14]
app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: "Validation Error", error: error.message });
    }
});

// 3. GET API - Fetch stored contacts [source 14]
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// 4. Database Connection
const MONGO_URI = "mongodb+srv://pratikk105:Pratik0803@cluster0.iubzadd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch(err => console.error("❌ Connection Fail:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));