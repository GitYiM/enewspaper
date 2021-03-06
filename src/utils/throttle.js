export function throttle (fn, timeout=300) {
    let canRun = true
    return function listen() {
        if(!canRun){
            return
        }
        canRun = false
        setTimeout(function() {
            fn.apply(this)
            canRun = true
        },timeout)
    }

}