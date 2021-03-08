const express = require('express')
const router = express.Router()

const Ninja = require('../models/ninja')


//get a list of ninjas from the db
router.get('/ninjas', (req, res, next)=>{
    /*
    Ninja.find({})
    .then((ninjas)=>{
        res.send(ninjas)
    })
    
    */

    Ninja.aggregate([{ 
        $geoNear: { near: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]}, 
                    spherical: true, 
                    maxDistance: 100000, 
                    distanceField: "dist.calculated" } 
        }])
        .then(function(results){ res.send(results); });


})

//add a new ninja to a database
router.post('/ninjas', (req, res, next)=>{
    Ninja.create(req.body)
    .then( ninja =>{
        res.send(ninja)
    })
    .catch(next)
    
})

//update a ninja in a database
router.put('/ninjas/:id', (req, res, next)=>{
    Ninja.findByIdAndUpdate({ _id: req.params.id },req.body)
    .then(()=>{
        Ninja.findOne({_id: req.params.id})
        .then(ninja => res.send(ninja))
    })
})

//delete a ninja in the database
router.delete('/ninjas/:id', (req, res, next)=>{
    Ninja.findByIdAndRemove({ _id: req.params.id })
    .then((ninja)=>{
       res.send(ninja)
    })
})

module.exports = router




