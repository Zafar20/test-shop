export function errorResponse (error: any, type?: string) {
    
    let data = error.response.data
    let text = ''
    
    if(type == 'login') {
        text = data.detail
    }else {
        for(let key in data) {
            data[key].forEach((value: string) => {
                text += value
            })
        }
    }
    
    
    return text
    
}



