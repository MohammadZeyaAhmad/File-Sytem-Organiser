let fs = require("fs");
let path = require("path");
function organizeFn(dirPath)
{
    let destPath;
    if(dirPath==undefined)
    {
        destPath=process.cwd();
       
    }
    else
    {
        let doesExist=fs.existsSync(dirPath);
        if(doesExist)
        {
           destPath=  path.join(dirPath,"organised_files");
          if(fs.existsSync(destPath)==false)
          {
            fs.mkdirSync(destPath);
          }
          
        }
        else
        {
            console.log("Please enter a valid path 🙄");
            return;
        }
        
    }
    organizeHelper(dirPath,destPath);
}
function getCategory(name)
{
    let ext=path.extname(name);
    
    ext=ext.slice(1);
    for(let type in types)
    {
        let currType=types[type];
        for(let i=0;i<currType.length;i++)
        {
            if(ext==currType[i])
            {
                return type;
            }
        }
       
    }
    return "others";


}
function organizeHelper(src,dest)
{
  let childNames=fs.readdirSync(src);
  for(let i=0;i<childNames.length;i++)
  {
      let childAddress=path.join(src,childNames[i]);
      let isFile=fs.lstatSync(childAddress).isFile();
      if(isFile)
      {
          let category=getCategory(childNames[i]);
          sendFiles(childAddress,dest,category);
      }
  }
}
function sendFiles(srcFilePath,dest,category)
{
  let categoryPath=path.join(dest,category);
  if(fs.existsSync(categoryPath)==false)
  {
      fs.mkdirSync(categoryPath);
  }
  let fileName=path.basename(srcFilePath);
  let destFilePath=path.join(categoryPath,fileName);
  fs.copyFileSync(srcFilePath,destFilePath);
  console.log(fileName," moved to ",category);
  fs.unlinkSync(srcFilePath);
}
module.exports={
    organizeKey:organizeFn
}