const express = require("express")
const path = require('path');
const { query } = require("express");
const myMongoApi = require( path.resolve( __dirname, "./api.js" ) );
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))


app.post("/createNewUser" , (req , res) =>{
    let {username , password , usertype} = req.body
    myMongoApi.search({"username" : username} , "Users" , (err , result) => {
        if(!result[0]){
            myMongoApi.addEntity({username:username , password:password , usertype:usertype , recurringRestrictions:{}} , "Users")
        }
    })
    res.end();
})

app.get("/authenticate" , (req , res) =>{
    let {username , password} = req.query
    myMongoApi.search({"username" : username} , "Users" , (err , result) => {
        if(result[0] && result[0].password == password){
            res.json({
                "auth":true,
                "userType":result[0].usertype,
                "recurringRestrictions":result[0].recurringRestrictions
            })
        }
        else{
            res.json({
                "auth":false
            })
        }
    })
})

app.post("/updateRecurringRestrictions" , (req , res) =>{
    collection = "Users"
    let {user, restrictions } = req.body
    let query = {"username" : user}
    myMongoApi.update(query, "recurringRestrictions", restrictions, collection)
    res.end()
})

app.post("/updateRestrictions" , (req , res) =>{
    collection = "Restrictions"
    let {week ,user, restrictions } = req.body
    let query = {"week" : week}
    myMongoApi.search( query , collection , (err , result) => {
        if(!result[0]){
            myMongoApi.addEntity(query , collection)
        }
        myMongoApi.update(query, user, restrictions, collection)
    })
    res.end()
})


app.get("/getRestrictions" , (req , res) =>{
    collection = "Restrictions"
    let {week, user} = req.query
    let query = {"week" : week}

    myMongoApi.search( query , collection , (err , result) => {
        if(!result[0] || !result[0][user]){
            res.json({})
        }else{
            res.json(result[0][user])
        }
    })
})

app.get("/getAllEmploysNames" , (req , res) =>{
    collection = "Users"
    let query = {"usertype" : "employ"}
    myMongoApi.search( query , collection , (err , result) => {
        let payload = []
        result.forEach(item => {
            payload.push(item.username)
        })
        res.json(payload)
    })
})

app.get("/getAllRestrictions" , (req , res) =>{
    let {week} = req.query
    myMongoApi.search({"usertype" : "employ"} , "Users" , (err , result) => {
        let returnObject = {
            "recurringRestrictions":{},
            "restrictions":{}
        }
        for(let i = 0; i < result.length; i++){
            let {username , recurringRestrictions} = result[i]
            returnObject.recurringRestrictions[username] = recurringRestrictions
        }
        myMongoApi.search({"week" : week} , "Restrictions" , (err , result) => {
            if(!result[0]){
                res.json(returnObject) 
            }else{
                delete result[0].week
                delete result[0]._id
                returnObject.restrictions = result[0]
                res.json(returnObject)
            }
        })
    })
})

app.post("/updateShiftTable" , (req , res) =>{
    collection = "Shifts"
    let {week ,user, shiftTable } = req.body
    let query = {"week" : week}
    myMongoApi.search( query , collection , (err , result) => {
        if(!result[0]){
            myMongoApi.addEntity(query , collection)
        }
        myMongoApi.update(query, "table", shiftTable, collection)
    })
    res.end()
})

app.get("/getShift" , (req , res) =>{
    collection = "Shifts"
    let {week} = req.query
    let query = {"week" : week}

    myMongoApi.search( query , collection , (err , result) => {
        if(!result[0]){
            res.json({})
        }else{
            delete result[0].week
            delete result[0]._id
            res.json(result[0])
        }
    })
})

app.get("/whoWorksNow" , (req , res) => {
    d = new Date(d);
    let diff = d.getDate() - d.getDay() 
    return new Date(d.setDate(diff));
})

app.listen(8000 , () => {
    
})
