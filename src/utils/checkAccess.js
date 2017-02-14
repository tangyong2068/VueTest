export function checkValid(currentUserId,userid,idList){
  var flag = false;
  if (idList.length < 0) {
    for (var i = 0;i < idList.length; i++) {
      if (idList[i].id == currentUserId) {
        flag = true
      }
    }
  }
  if (currentUserId == userid || flag) {
    return true
  }
  else {
    return false
  }
}


export function formatDate (time) {
  if(time == null || time == ''){
    return ''
  }
  let tmpDate = new Date(time)
  let year = tmpDate.getFullYear()
  let mathon = tmpDate.getMonth() + 1
  if (mathon < 10){
    mathon = '0' + mathon
  }
  let day = tmpDate.getDate()
  if ( day < 10 ){
    day = '0' + day
  }
  let hours = tmpDate.getHours()
  if ( hours < 10 ){
    hours = '0' + hours
  }
  let minutes = tmpDate.getMinutes()
  if ( minutes < 10 ){
    minutes = '0' + minutes
  }
  let second = tmpDate.getSeconds()
  if ( second < 10 ){
    second = '0' + second
  }
  return year + '-' + mathon + '-' + day + ' ' + hours + ':' + minutes + ':' + second
}
