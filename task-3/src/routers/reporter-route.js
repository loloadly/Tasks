const express = require ('express')
const Reporter = require('../models/reporter')
const News = require('../models/news')
const auth= require('../middelware/auth')

const router = new express.Router()


router.post('/users',async(req,res)=>{
    const reporter = new Reporter(req.body)
    try{
        await reporter.save()
        const token = await reporter.getToken()
        res.status(200).send({reporter})
    }
    catch(error){
        res.status(400).send('Unable to Post')
    }
})

router.post('/users/login',auth,async(req,res)=>{
    try{
        const reporter = await Reporter.findByCredentials(req.body.email,req.body.password)
        const token = await reporter.getToken()
        res.status(200).send({reporter})
    }
    catch(error){
        res.status(400).send('Unabl to login')
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.reporter.tokens = req.reporter.tokens.filter((tokenElement)=>{
            return tokenElement.token !== req.token
        })
        await req.reporter.save()
        res.send('Logged-out successfully')
    }
    catch(error){
        res.status(500).send('Please login')
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.reporter.tokens = []
        await req.reporter.save()
        res.send('Logout all is Done')
    }
    catch(error){
        res.status(500).send('Please LOGIN')
    }
})

router.get('/users',async(req,res)=>{
    try{
        const reporters = await Reporter.find({})
        res.send(reporters)
    }
    catch(e){
        res.status(500).send('Server Error')
    }
})

router.get('/users/profile',auth,async(req,res)=>{
    try{
        res.send(req.reporter)
    }
    catch(error){
        res.send('Reporter-Profile is not Found')
    }
})

router.delete('/users/profile',auth,async(req,res)=>{
    try{
        await req.reporter.remove()
        res.send('Profile is Deleted')
    }
    catch(error){
        res.send('This can not be Deleted')
    }
})

router.patch('/users/profile',auth,async(req,res)=>{
    const updates = Object.keys(req.body)       
    try {
        updates.forEach((element)=>{
            (req.reporter[element]=req.body[element])
        })
        await req.reporter.save()
        res.status(200).send(req.reporter)
    }
    catch(error){
        res.status(400).send('Can not Update')
    }
})


module.exports = router