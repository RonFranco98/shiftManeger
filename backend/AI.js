let basetable = {
    Sunday:{morning:"" , evning:undefined , night:undefined},
    Monday:{morning:undefined , evning:undefined , night:undefined},
    Tuesday:{morning:undefined , evning:undefined , night:undefined},
    Wednesday:{morning:undefined , evning:undefined , night:undefined},
    Thursday:{morning:undefined , evning:undefined , night:undefined},
    Friday:{morning:undefined , evning:undefined , night:""},
    Saturday:{morning:"" , evning:"" , night:""}
}
let prices = {
    restricted:100,
    prefrence:50,
    twoConsecativeShift:-1000
}
function getAutuFiledTable(restrictions, prefrences){
    let payload = initPayload()
}

function initPayload(){
    let payload = {}
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let shifts = ["morning" , "evning" , "night"]
    days.forEach(day =>{
        payload[day] = {} 
        shifts.forEach(shifts => {
            payload[day][shifts] = undefined
        })
    })
    return payload
}