const fs = require('fs');
path = require('path');
 
const  { SHA3 } = require("sha3")
 
const ignore = ["node_modules", "task2.js", "package-lock.json", "tempCodeRunnerFile.js", "task1", ".git", "1", "task2_2.js"]
 
const rstream = f => new Promise( (resolve, reject) => {
    const readStream = fs.createReadStream(f, {highWaterMark: 1024*1024 });
    
    const data = []
    readStream.on('data', (chunk) => {
        data.push(chunk)
    })
 
    readStream.on('end', () => {
        resolve(data)
    })
    
    readStream.on('error', (err) => {
        reject(err)
    })
})
 
const getHash = (entry, data) => {
    const hash = new SHA3(256);
    hash.update(Buffer.concat(data))
    const hash256 = hash.digest('hex');
    console.log(entry, hash256)
}
 
const procEntry = async entry =>{
    let statEntry = fs.statSync(entry)
    if(statEntry.isFile()){
        try{
            let data = await rstream(entry)
            getHash(entry, data)
        }
        catch(e){
            console.log(e)
        }
    }
    else if (statEntry.isDirectory()){
        
        for(let e of fs.readdirSync(entry)) {
            if(!ignore.includes(e))
                procEntry(path.join(entry, "\\", e))
        }
    }
}
 
try{
    for(let entry of fs.readdirSync(".")) if(!ignore.includes(entry)) procEntry(entry)
}
catch(e){
    console.error(e.message)
}