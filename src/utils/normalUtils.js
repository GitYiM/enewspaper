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
utils.createUUID = function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export default utils