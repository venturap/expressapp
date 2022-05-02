const express = require('express');
const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/animals', (err, client) => {
    if (err) throw err

  const db = client.db('animals')

  db.collection('mammals').find().toArray((err, result) => {
    if (err) throw err

    console.log(result[1].species)
  })
});


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Hello World from Express and Let`s have dinner!')
})

app.get('/animals', (req, res) => {
    //console.log(req);
   // res.send(req.params.restaurant_id)
})

app.get('/animals/:animal_id', (req, res) => {
    //console.log(req);
    //res.send(req.params.restaurant_id)
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})