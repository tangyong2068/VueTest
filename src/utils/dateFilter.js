exports.customTime = item => {
  let nowTime = new Date().getTime()
  let minuteTime = 60*1000
  let hourTime = 60*minuteTime
  let dayTime = 24*hourTime
  let monthTime = dayTime * 30
  let yearTime = monthTime * 12

  if(item == null || item == ''){
    return ''
  }
  let publishTime = new Date(item).getTime()
  let historyTime = parseInt(nowTime) - parseInt(publishTime)
  let descTime
  if(historyTime >= yearTime){
    //按年算
    descTime = parseInt(historyTime/yearTime) + '年前'
  }else if(historyTime< yearTime && historyTime >= monthTime){
    //按月算
    descTime = parseInt(historyTime/monthTime) + '月前'
  }else if(historyTime< monthTime && historyTime>= dayTime){
    //按天算
    descTime = parseInt(historyTime/dayTime) + '天前'
  }else if(historyTime< dayTime && historyTime>= hourTime){
    //按小时算
    descTime = parseInt(historyTime/hourTime) + '小时前'
  }else if(historyTime< hourTime && historyTime>= minuteTime){
    //按分钟算
    descTime = parseInt(historyTime/minuteTime) + '分钟前'
  }else{
    descTime = '刚刚'
  }
  return descTime
}

exports.formatDate =  time => {
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
  return year + '-' + mathon + '-' + day + ' ' + hours + ':' + minutes
}

exports.shortDate =  time => {
  if(time){
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
    return year + '-' + mathon + '-' + day
  }
  else {
    return ''
  }
}
