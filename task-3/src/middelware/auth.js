const jwt = require('jsonwebtoken')
const Reporter = require('../models/reporter')

const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const deCode = jwt.verify(token,'secretMssg')
        const reporter = await Reporter.findOne({_id:deCode._id,'tokens.token':token})
        if(!reporter){ throw new Error()}
        req.reporter = reporter
        req.token = token
        next()
    }
    catch(error){
        res.status(401).send({error:'Authentication Error'})
    }
}
module.exports = auth