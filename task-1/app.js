const yargs = require ('yargs')
const data = require ('./data.js')

yargs.command({
    command:'add',
    describe:'Add persone',
    builder:{
        id:{
            describe:'id of the persone',
            demandOption:true,
            type:'number'
        },
        name:{
            describe:'name of the persone',
            demandOption:true,
            type:'string'
        },
        grade:{
            describe:'grade of the persone',
            demandOption:true,
            type:'number'
        },
        comment:{
            describe:'leave a message',
            demandOption:false,
            type:'string'
        }
    },
    handler: function(argv){    
        data.addPersone (argv.id,argv.name,argv.grade,argv.comment)
    }
})

yargs.command({
    command:'delete',
    describe:'delete persone',
    builder:{
        id:{
            describe:'id of the pesone to be deleted',
            demandOption:true,
            type:'number'
        }
    },
    handler: function(argv){    
        data.removePersone (argv.id)
    }
})


yargs.command({
    command:'read',
    describe:'read info',
    builder:{
        id:{
            describe:'id of the persone',
            demandOption:true,
            type:'number'
        }
    },
    handler: function(argv){    
        data.readInfo (argv.id)
    }
})

yargs.command({
    command:'list',
    describe:'list data',
    handler: function(){    
    data.listInfo()
    }
})


console.log(yargs.argv)
yargs.parse()