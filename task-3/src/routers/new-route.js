const express = require ('express')
const multer = require('multer')
const router = new express.Router()
const News = require('../models/news')
const Reporter = require('../models/reporter')
const auth= require('../middelware/auth')

const uploads = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfid)$/)){
            return cb(new Error ('Please Upload an Image'))
        }
        cb(undefined,true)
    }
})

router.post('/news',auth,async(req,res)=>{
    const doc = new News({
        ...req.body,
        reporter:req.reporter._id
    })
    try{
        await doc.save()
        res.status(200).send({doc})
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.post('/news/image/:id',auth,uploads.single('image'),async(req,res)=>{
    const _id= req.params.id
    try{
        const doc = await News.findOne({_id,reporter:req.reporter._id})
        if(!doc){
            res.status(404).send('Unabl to find the Document')
        }
        doc.image = req.file.buffer
        await doc.save()
        res.send('Saved')
    }
    catch(error){
        res.send('Can not upload an Image')
    }
})


// router.get('/news',(req,res)=>{
//     News.find({}).then((doc)=>{
//         res.status(200).send(doc)
//     }).catch((error)=>{
//         res.status(500).send('Server Error')
//     })
// })


router.get('/news',auth,async (req,res)=>{
   try{
        await req.reporter.populate('documents').execPopulate()
        res.send(req.reporter.documents)
   }
   catch(e){
    res.status(500).send('Server Error')
   }
})


// router.get('/news/:id',(req,res)=>{
//     const _id = req.params.id
//     News.findById({_id}).then((doc)=>{
//         if (!doc){
//             return res.status(400).send('Document is not Found')
//         }
//         res.status(200).send(doc)
//     }).catch((error)=>{
//         res.status(500).send('Server Error')
//     })
// })

router.get('/news/:id',auth,async(req,res)=>{
    const _id= req.params.id
    try{
        const doc = await News.findOne({_id,reporter:req.reporter._id})
        if(!doc){
            return res.status(400).send('Unable to find the Document')
        }
        res.send(doc)
    }
    catch(error){
        res.status(500).send('Server Error')
    }
})

// router.delete('/news/:id',async(req,res)=>{
//     const _id = req.params.id
//     News.findByIdAndDelete({_id}).then((doc)=>{
//         if (!doc){
//             return res.status(400).send('Unable to find the Document')
//         }
//         res.status(200).send(doc)
//     }).catch((error)=>{
//         res.status(500).send('Server Error')
//     })
// })

router.patch('/news/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const _id = req.params.id
    try{
        const doc = await News.findOne({_id,reporter:req.reporter._id})
        if(!doc){
            return res.status(404).send('Document is not Found')
        }
        updates.forEach((element)=>{doc[element]=req.body[element]})
        await doc.save()
        res.send(doc)
    }
    catch(e){
        res.status(400).send('Try again')
    }
})


router.delete('/news/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const doc = await News.findOneAndDelete({_id,reporter:req.reporter._id})
        if(!doc){
            res.status(404).send('Unabl to find the Document')
        }
        res.send(doc)
    }
    catch(e){
    res.status(400).send('Error')
}
})



module.exports = router