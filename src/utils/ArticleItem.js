
export function setArticleObj(name,obj) {
  obj = JSON.stringify(obj)
  localStorage.setItem(name,obj)
}

export function getArticleObj(name) {
  let item = localStorage.getItem(name)
  item = JSON.parse(item)
  return item
}

export function removeArticleObj(name) {
  localStorage.removeItem(name)
}

export function clearArticleObj() {
  localStorage.clear()
}

export function getParam() {
  var str = location.href //取得整个地址栏
  var num = str.indexOf("=")
  str = str.substr(num+1)
  return str
}

export function getParams() {
  var params = window.location.href
  var index = params.indexOf("?")
  var str = params.substring(index+1).split("&").map(v => v.split("=")).reduce((map, [key, value]) => map.set(key,decodeURIComponent(value)), new Map())
  return str
}
