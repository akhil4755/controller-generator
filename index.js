const prompt = require('prompt-sync')();
const fs = require('fs');

let controllerName = prompt('Controller Name : ').trim();
let tableName = prompt('Table Name : ').trim();
tableName = tableName[0].toUpperCase() + tableName.slice(1);

// -----------------------------------------------------------------------------------------------------

let importTable = "import "+tableName+" from '../models/"+tableName+".model';";

// -----------------------------------------------------------------------------------------------------

let insertFunction = `async function add${tableName}()
{
    let newRow = {
        "col1":"val1",
        "col2":"val2"
    }

    try
    {
        ${tableName}.forge( newRow ).save()
        .then(retData => {
            return res.status(200).json({ status:"success" })
        });
    }
    catch(err)
    {
        return res.status(500).json("error")
    }
}`

// -----------------------------------------------------------------------------------------------------

let getRowsFunction = `async function get${tableName}()
{
    try
    {
        ${tableName}.where({ id : id})
        .fetch({ columns: ['email', 'name', 'username'] })
        .then(retData => {
            console.log("do something");
        });
    }
    catch(err)
    {
        return res.status(500).json("error")
    }
}`;

let moduleExport = `module.exports = {
	get${tableName}: get${tableName},
    add${tableName}: add${tableName}
};`;


// -----------------------------------------------------------------------------------------------------
let content = `${importTable}

${insertFunction}

${getRowsFunction}

${moduleExport}`;

let fileName = "./controllers/"+controllerName+"Controller.js";
fs.writeFileSync(fileName, content );

console.log("Created the " + controllerName + " Controller !");