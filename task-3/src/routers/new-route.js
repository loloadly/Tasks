const express = require ('express')
const router = new express.Router()
const News = require('../models/news')

router.post('/news',(req,res)=>{
    const info = new News(req.body)
    info.save().then(()=>{
        res.status(200).send(info)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

router.get('/news',(req,res)=>{
    News.find({}).then((doc)=>{
        res.status(200).send(doc)
    }).catch((error)=>{
        res.status(500).send('Server Error')
    })
})

router.get('/news/:id',(req,res)=>{
    const _id = req.params.id
    News.findById({_id}).then((doc)=>{
        if (!doc){
            return res.status(400).send('Document is not Found')
        }
        res.status(200).send(doc)
    }).catch((error)=>{
        res.status(500).send('Server Error')
    })
})

router.delete('/news/:id',async(req,res)=>{
    const _id = req.params.id
    News.findByIdAndDelete({_id}).then((doc)=>{
        if (!doc){
            return res.status(400).send('Unable to find the Document')
        }
        res.status(200).send(doc)
    }).catch((error)=>{
        res.status(500).send('Server Error')
    })
})

module.exports = router