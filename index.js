const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Database
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

//As these are async even though the express did not start to listen the get queued and executed later


console.log("client.connect");
//Connect to the database before listening
client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
});

app.listen(PORT, () => {
    console.log("listening for requests");
    app.get("/", (req, res) =>
    {
        res.send("Hello");
    });
})

console.log("app.get");
app.get("/", (req, res) =>
{
    console.log("hello");
    res.send("Hello");
});

//Let's see if this works without giving this error
//MongoServerSelectionError: Server selection timed out after 30000 ms
console.log("app.get/R2019");
app.get("/R2019/:detail", async (req, res) => {
    let detail = req.params.detail;
    console.log(detail);
    let data = await client.db("database1")
                .collection("R-2019")
                .find({ detail: detail })
                .toArray();
    console.log(data);
    return res.json(data);
});

console.log("app.get/R2020");
app.get("/R2020/:detail", async (req, res) => {
    let detail = req.params.detail;
    console.log(detail);
    let data = await client.db("database1")
                .collection("R-2020")
                .find({ detail: detail })
                .toArray();
    console.log(data);
    return res.json(data);
});

console.log("app.get/R2021");
app.get("/R2021/:detail", async (req, res) => {
    let detail = req.params.detail;
    console.log(detail);
    let data = await client.db("database1")
                .collection("R-2021")
                .find({ detail: detail })
                .toArray();
    console.log(data);
    return res.json(data);
});

console.log("all");
//app.all('*', (req,res) => {
//    res.json({"every thing":"is awesome"});
//})

console.log("end");