const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const costRoutes = express.Router();
const PORT = 4000;

let Cost = require('./cost.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/costs', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

costRoutes.route('/').get(function(req, res) {
    Cost.find(function(err, costs) {
        if (err) {
            console.log(err);
        } else {
            res.json(costs);
        }
    });
});

costRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Cost.findById(id, function(err, cost) {
        res.json(cost);
    });
});

costRoutes.route('/add').post(function(req, res) {
    let cost = new Cost(req.body);
    cost.save()
        .then(cost => {
            res.status(200).json({'cost': 'cost added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new cost failed');
        });
});

costRoutes.route('/update/:id').post(function(req, res) {
    Cost.findById(req.params.id, function(err, cost) {
        if (!cost)
            res.status(404).send('data is not found');
        else
            cost.start_date = req.body.start_date;
        cost.end_date = req.body.end_date;
        cost.pax = req.body.pax;

        cost.save().then(cost => {
            res.json('Cost updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/costs', costRoutes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});