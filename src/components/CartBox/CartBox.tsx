import  { type FC } from 'react'
import './CartBox.scss'
import { Link } from "react-router-dom"
import { arrowIcon } from "../../utils/img"
import CartItem from "./CartItem"
import { cartStore } from "../../store/cartStore"

const CartBox:FC = () => {
    
    const { cart } = cartStore()
    
  return (
    <>
        <div className="cart">
            <div className="cart__top">
                <Link to="/" className="cart__top-link">
                    <img src={arrowIcon} alt="" />
                </Link>
                <h2 className="cart__top-title">
                   {cart.length > 0 ? 'Корзина' : 'Корзина пустая'}
                </h2>
            </div>
            <div className="cart__list">
                {cart && cart.map((item) => <CartItem key={item.id} {...item}/> )}
            </div>
            {cart.length > 0 && 
                <div className="cart__total">
                    <span className="cart__total-text">Итог</span>
                    <p className="cart__total-price">
                        0
                        <span>$</span>
                    </p>
                </div>
            }
        </div>
    </>
  )
}

export default CartBox