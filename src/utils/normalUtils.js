const utils = {}
utils.getCurTime = function(){
    const date = new Date()
    const y = date.getFullYear()
    const month = date.getMonth() + 1
    const m = month>9?month:('0'+month)
    const day = date.getDate()
    const d = day>9?day:('0'+day)
    const hours = date.getHours()
    const h = hours > 9?hours:('0'+hours)
    const mi = date.getMinutes()
    const min = mi > 9?mi:('0'+mi)
    return y+'年'+m+'月'+d+'日'+' '+h+':'+min 
  } 

export default utils