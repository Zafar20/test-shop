import type { ICartProduct } from "../types"


export const calcTotalPrice = (items:ICartProduct[]) => {
    return items.reduce((sum,obj) => +obj.price  * obj.count + sum, 0)
}
export const calcTotalCount = (items:ICartProduct[]) => {
    return items.reduce((sum,obj) => sum + obj.count, 0)
}

export const getCartFromLs = () => {
    const data = localStorage.getItem('cart')
    const cart = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(cart)
    const totalCount = calcTotalCount(cart)
    
    return {
        cart: cart,
        totalPrice: totalPrice,
        totalCount: totalCount
    }
    
}