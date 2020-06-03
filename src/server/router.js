var models  = require('../../models');
const server = require('./server')
const express = require('express');
var router = express.Router();
const Sequelize = require('sequelize')

router.get('/chat/:recip' , function(req , res) {
    res.render('chat')
})

router.get('/getAddress' , function(req , res){
    models.addressRecord.findAll({}).then((result)=>{
        let addressBook = {}
        for(address of result)
            addressBook[address.dataValues.ipfs] = address.dataValues.name
        res.json(addressBook)
    })
})

router.post('/addAddreess', function(req, res) {
    console.log('Entered POST route')
    models.addressRecord.create({ipfs: req.body.ipfs, name: req.body.name}).then((addressRecord) => {
        res.json({name: addressRecord.dataValues.name , ipfs: addressRecord.dataValues.ipfs})
    }).catch((error) => {
        console.log(error)
    })
})

router.post('/insertqueue', function(req, res) {
    models.messageQueue.create({ sender: req.body.sender, message: req.body.message,recipient:req.body.reciver }).then(function(messagequeue) {
        console.log("Record inserted in queue");
        res.json(messagequeue);
      }).catch((error) => {
        res.json(new Object())
    })
});

router.get('/getqueue', function(req, res) {
    models.messageQueue.findAll().then(function(messageQueues) {
        res.json(messageQueues);
      }).catch((error) => {
        console.error(error)
    })
});


module.exports = router;