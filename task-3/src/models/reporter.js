const mongoose = require ('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');


const reporterSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if( !validator.isEmail(value)){
                throw new Error ('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:8,
        validate(value){
            if ( value.toLowerCase().includes('password')){
                throw new Error ('Password is Invalid')
            }
        }
    },
    tokens:[{
        token:{
          type:String,
          required:true
        }
    }]

})

reporterSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

reporterSchema.methods.getToken = async function(){
    const reporter = this
    const token = jwt.sign({_id:reporter._id.toString()},'secretMssg')
    reporter.tokens = reporter.tokens.concat({token})
    await reporter.save()
    return token

}

reporterSchema.statics.findByCredentials = async (email,password)=>{
    const reporter = await Reporter.findOne({email:email})
    if(!reporter){
        throw new Error ('User is not Found')
    }
    const compare = await bcrypt.compare(password,reporter.password)
    if(!compare){
        throw new Error ('Password is InCorrect')
    }
    return (reporter)
}

reporterSchema.methods.toJSON = function(){
    const reporter = this
    const reporterObject = reporter.toObject()
    delete reporterObject.tokens
    delete reporterObject.password
    return reporterObject
}

reporterSchema.virtual('documents',{
    ref:'News',
    localField:'_id',
    foreignField:'reporter'
})

const Reporter = mongoose.model('Reporter',reporterSchema);
module.exports = Reporter;