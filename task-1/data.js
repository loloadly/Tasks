
const fs = require ('fs')

const addPersone= (id,name,grade,comment) =>{
    const data  = loadData();
    const duplicateName = data.filter(function (data){             
        return data.name === name
    })

    if(duplicateName.length === 0){
        data.push({
            id,name,grade,comment
        })

        saveId(data)
        console.log('saved successfully')
    }
    else{
        console.log('Duplicate name')
    }

};

const removePersone = (id) =>{
    const data  = loadData();

    const infoToKeep = data.filter(function (data){
        return data.id !== id
    })

    if(data.length > infoToKeep.length){
        console.log('persone is removed')
        saveId(infoToKeep)
    }else{
        console.log('Persone is not removed')
    }
}

const readInfo = (id) => {
    const data  = loadData();
    
    const persone = data.find((persone) => {
        return persone.id === id

    })
    if(persone){
        console.log(persone.name + '   ' + persone.id + '   ' +persone.grade )
    }
    else{
        console.log('persone is not found')
    }
}

const listInfo = () => {
    const data  = loadData();
    data.forEach( persone => {
        console.log(persone.name, persone.grade)
})
}


const loadData = () =>{
    try{
        const dataBuffer = fs.readFileSync('info.json').toString()
        return JSON.parse(dataBuffer)
    }catch(e){
        return[]
    }
}

const saveId = (data) =>{                    
    const saveData = JSON.stringify(data)
    fs.writeFileSync('info.json',saveData)
}

module.exports = {
addPersone:addPersone,
removePersone:removePersone,
readInfo:readInfo,
listInfo:listInfo
}