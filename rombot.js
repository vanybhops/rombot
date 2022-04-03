const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))};
const fetch = require('node-fetch');
const WebSocket  = require('ws');
let podsjetnik=false
let mybban=false
let token="OTU4NDkzMDU5MTQ5MDk5MDI4.YkoUxQ.DWCOy-C1CJTlk3x3UlQsLT8ZVTs"
async function randomdova(){
	let rd=""
	await fetch("http://ikb-berlin.de/islamske-teme/muhammed-as/dove-allahovog-poslanika-muhammeda-as/109").then(x=>{return x.text()}).then(x=>rd=x.match(/(?<=“)(.*)(?=”)/gm)[Math.floor(Math.random() * x.match(/(?<=“)(.*)(?=”)/gm).length)])
	return rd}
async function provjeracijene(chid,vrsta,msid) {
    await fetch("https://prizmacomerc.ba/cijenovnik-otkupa-sekundarnih-sirovina/", {
        "method": "GET",
      }).then((res)=>{return res.text()}).then(x=>{cekiranje(x.match(/(?<=<td>)[0-9,;]+/g),vrsta,msid)})
    async function cekiranje(arrayz,vrsta,msid) {
        let ar=arrayz
        if (!vrsta.includes("!rombot"))
          return
        vrsta=vrsta.replace("!rombot ","")
        switch (vrsta) {
            case "bakar":
                sendmsg(chid,"cijena bakra je :"+ar[4].replace(",",".")+"KM/kg\n\t\t\t\t\t\t\t"+(parseFloat(ar[4].replace(",","."))/1.952).toFixed(2)+" EUR/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[4].replace(",","."))*3.883).toFixed(2)+" HRK/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[4].replace(",","."))*59.76).toFixed(2)+" RSD/kg",msid)
                break
            case "zeljezo":
                sendmsg(chid,"cijena zeljeza je :"+ar[1].replace(",",".")+"KM/kg\n\t\t\t\t\t\t\t"+(parseFloat(ar[1].replace(",","."))/1.952).toFixed(2)+" EUR/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[1].replace(",","."))*3.883).toFixed(2)+" HRK/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[1].replace(",","."))*59.76).toFixed(2)+" RSD/kg",msid)
                break
            case "aluminij":
                sendmsg(chid,"cijena aluminija je :"+ar[8].replace(",",".")+"KM/kg\n\t\t\t\t\t\t\t"+(parseFloat(ar[8].replace(",","."))/1.952).toFixed(2)+" EUR/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[8].replace(",","."))*3.883).toFixed(2)+" HRK/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[8].replace(",","."))*59.76).toFixed(2)+" RSD/kg",msid)
                break
            case "olovo":
                sendmsg(chid,"cijena olova je :"+ar[11].replace(",",".")+"KM/kg\n\t\t\t\t\t\t\t"+(parseFloat(ar[11].replace(",","."))/1.952).toFixed(2)+" EUR/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[11].replace(",","."))*3.883).toFixed(2)+" HRK/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[11].replace(",","."))*59.76).toFixed(2)+" RSD/kg",msid)
                break
            case "akumulatori":
                sendmsg(chid,"cijena akumulatora je :"+ar[12].replace(",",".")+"KM/kg\n\t\t\t\t\t\t\t"+(parseFloat(ar[12].replace(",","."))/1.952).toFixed(2)+" EUR/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[12].replace(",","."))*3.883).toFixed(2)+" HRK/kg"+
                "\n\t\t\t\t\t\t\t"+(parseFloat(ar[12].replace(",","."))*59.76).toFixed(2)+" RSD/kg",msid)
                break
	    case "prosvijetli me rombotu":
		sendmsg(chid,await randomdova(),msid)
		break
            case "podsjetnik sekiju da se ubije":

                if(podsjetnik!=true){
                podsjetnik=true
                ubijse(chid,msid)
                }
                break;
            default:
                break;
        }
    }
    async function ubijse(x,msid){
    while (mybban==false){
      sendmsg(x,"ubij se <@958708441554247741>",msid)
      await sleep(1800000);
    }
    mybban=false
    }
}
async function getmsg(guid,msid) {
  await sleep(300)
  try {
    await fetch(`https://discord.com/api/v9/channels/${guid}/messages?limit=1&around=${msid}`, {
      "headers": {
        "authorization": token},
      "method": "GET",
    }).then(r=>{return r.json()}).then(
      x=>{
        if (x[0]["content"].toLowerCase()=="!rombot bakar"||"!rombot zeljezo"||"!rombot aluminij"||"!rombot olovo"||"!rombot akumulatori")
          provjeracijene(guid,x[0]["content"].toLowerCase(),msid)
        if(x[0]["content"].toLowerCase()=="!rombot pomozi mi ciganinu")
          sendmsg(guid,"ROMBOT STIZE U POMOC\nlista metala u magacinu je: \nbakar\nzeljezo\naluminij\nolovo\nakumulatori",msid)
        });
  } catch (error){
  }

}
function sendmsg(chid,ctx,msid) {
    ctx=ctx.toString()
    if(ctx.match("ubij")){
        fetch(`https://discord.com/api/v9/channels/${chid}/messages`, {
    "headers": {
      "authorization": `${token}`,
      "content-type": "application/json"},
    "body": JSON.stringify({content:ctx}),
    "method": "POST",
  }).then(x=>{return x.status}).then(x=>{
	  if(x!=200){
	    podsjetnik=false
	    mybban=true
	    return}
  	  myban=false})
      return;
    }
    fetch(`https://discord.com/api/v9/channels/${chid}/messages`, {
    "headers": {
      "authorization": `${token}`,
      "content-type": "application/json"},
    "body": JSON.stringify({content:ctx,message_reference:{channel_id:`${chid}`,message_id:`${msid}`}}),
    "method": "POST",
  })
}
async function recursive() {
let socket = new WebSocket("wss://gateway.discord.gg/?v=6&encording=json");
socket.onready = function(event){
    console.log("bot je spreman")
}
socket.onclose = async function(event){
    recursive()
}
socket.onmessage = async function(event) {
    let ejson = JSON.parse(event.data);
    let e = JSON.stringify(event.data);

    let payload={
        "op": 2,
        "d": {
            "token": token,
            "intents": 32767,
            "properties": {
                "$os": "windows",
                "$browser": "chrome",
                "$device": 'pc'}
            }
        }
    async function hb(socket, interval){
        while(true){
            let hbpayload={
                'op': 1,
                'd': 'null'
            };
            socket.send(JSON.stringify(hbpayload));
            await sleep(interval);
        };
    };
    if(e.includes('heartbeat_interval')){
        var interval = JSON.parse(event.data)['d']['heartbeat_interval'];
        hb(socket, interval);
        socket.send(JSON.stringify(payload));
    };
    if (ejson["t"]=="READY")
      socket.send(JSON.stringify({"op":3,"d":{"status":"online","activities":[{
          "name": "!rombot pomozi mi ciganinu",
          "type": 0,}],
        "since":1,"afk":false}}))
    if (ejson["t"]=="MESSAGE_CREATE") {
      getmsg(ejson['d']['channel_id'],ejson['d']['id'])
    }
}
}
recursive()

