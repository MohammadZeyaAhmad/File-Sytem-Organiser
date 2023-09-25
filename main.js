#!/usr/bin/env node
let inputArr=process.argv.slice(2);
console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help
let fs = require("fs");
let path = require("path");

 helpObj = require("./commands/help");
 treeObj = require("./commands/tree");
 organizeObj = require("./commands/organize");
let command=inputArr[0];
switch(command)
{
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey();
        break;
    case "help":
        helpObj.helpKey(inputArr[1]);
        break;
    default:
        console.log("Please enter the correct command 🙄")
        break;
}



