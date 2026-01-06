import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ICartProduct } from "../types";
import { calcTotalCount, calcTotalPrice, getCartFromLs } from "../utils/getCartFromLs";




interface ICartStore {
    cart: ICartProduct[]
    totalPrice: number;
    totalCount: number;
    addToCart: (product: ICartProduct) => void;
    minusCount: (id: number) => void;
    removeItem: (id: number) => void;
}

const { cart, totalCount, totalPrice } = getCartFromLs()

export const cartStore = create<ICartStore>()(devtools((set, get) => ({
    cart,
    totalPrice,
    totalCount,
    addToCart: (product) => {
        const { cart } = get()
        const findItem = cart.find((item) => item.id == product.id)
        let updatedCart;
        if(findItem) {
            updatedCart = cart.map((item) => {
                if(item.id == findItem.id) {
                    return {
                        ...item, count: item.count + 1
                    }
                }else {
                    return item
                }
            })
        }else {
            updatedCart = [...cart, {...product, count: 1 } ]
        }
        
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        set({
            cart: updatedCart,
            totalPrice: calcTotalPrice(updatedCart),
            totalCount: calcTotalCount(updatedCart)
        })
    }, 
    minusCount: (id) => {
        const { cart } = get()
        const updatedCart = cart.map((item) => {
            if(item.id == id && item.count > 1) {
                return {
                    ...item, count: item.count - 1
                }
            }else {
                return item
            }
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        set({
            cart: updatedCart,
            totalPrice: calcTotalPrice(updatedCart),
            totalCount: calcTotalCount(updatedCart)
        })
    },
    removeItem:(id) => {
        const { cart } = get()
        const filteredCart = cart.filter((item) => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(filteredCart))
        set({
            cart: filteredCart,
            totalPrice: calcTotalPrice(filteredCart),
            totalCount: calcTotalCount(filteredCart)
        })
    }
})))

