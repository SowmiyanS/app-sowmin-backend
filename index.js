const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Database
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

//Connect to the database before listening
client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
        app.get("/", (req, res) =>
        {
            res.send("Hello");
        });
    })
});

app.get("/", (req, res) =>
{
    res.send("Hello");
});


app.get("/R-2019/:detail", async (req, res) => {
    let detail = req.params.detail;
    let data = await client.db("database1")
                .collection("R-2019")
                .find({ detail: detail });

    return res.json(data);
});

app.get("/R-2020/:detail", async (req, res) => {
    let detail = req.params.detail;
    let data = await client.db("database1")
                .collection("R-2020")
                .find({ detail: detail });

    return res.json(data);
});

app.get("/R-2021/:detail", async (req, res) => {
    let detail = req.params.detail;
    let data = await client.db("database1")
                .collection("R-2021")
                .find({ detail: detail });

    return res.json(data);
});

app.all('*', (req,res) => {
    res.json({"every thing":"is awesome"});
})

