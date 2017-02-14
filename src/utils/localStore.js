export function saveLocal(name,value) {
  localStorage.setItem(name,value)
}

export function getLocal(name) {
  return localStorage.getItem(name)
}
