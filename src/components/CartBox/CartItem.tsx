import  { type FC } from 'react'
import { closeIcon, minusIcon, plusIcon } from "../../utils/img"
import './CartBox.scss'
import type { ICartProduct } from "../../types"
import { cartStore } from "../../store/cartStore"

const CartItem:FC<ICartProduct> = ({ id, title, price, count, image }) => {
    

    
  return (
    <>
        <div className="cart__item">
            <div className="cart__item-left">
                <img src={image} alt="" className="cart__item-left-img" />
                <div className="cart__item-left-info">
                    <h2 className="cart__item-left-title">{title}</h2>
                    <span className="cart__item-left-price">{price} $</span>
                </div>
            </div>
            <div className="cart__item-right">
                <button className="cart__item-right-minus" >
                    <img src={minusIcon} alt="" />
                </button>
                <span className="cart__item-right-count">{count}</span>
                <button className="cart__item-right-plus">
                    <img src={plusIcon} alt="" />
                </button>
                <button className="cart__item-right-remove">
                    <img src={closeIcon} alt="" />
                </button>
            </div>
        </div>
    </>
  )
}

export default CartItem