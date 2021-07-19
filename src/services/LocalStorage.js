

export function removeItem(itemToRemove){
    window.sessionStorage.removeItem(itemToRemove)
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('email')
}

export function getItem(item){
   return window.sessionStorage.getItem(item)
   
}

export function addItem(localStorageName , newItem){
    window.sessionStorage.setItem(localStorageName , newItem)
}