 
 const request = require ('request')
 
 const newcode = ( country, callback) =>{
   
    // + in the strings ---> concatenate
    const url3 ="http://newsapi.org/v2/top-headlines?country=" + country + "&category=entertainment&apiKey=e98b265a08ac4748a98bb11fc5f865c1"

    request ({url:url3,json:true},(error,response)=>{
        if (error){                      
            callback('unable to connect to service',undefined)
        }
        else if(response.body.articles.length === 0){
            callback('unable to find news',undefined)
        }
        else {
           // callback(undefined,'center for '+country +' is '+response.body.features[0].center[0] +'   '+ response.body.features[0].center[1])
           callback(undefined,{
            articleName1:response.body.articles[0].source.name,
            title1:response.body.articles[0].title,
            articleName2:response.body.articles[1].source.name,
            title2:response.body.articles[1].title
           })
        }
    })
}

module.exports= newcode