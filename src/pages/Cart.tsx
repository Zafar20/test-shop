import  { type FC } from 'react'
import LayoutMain from "../layouts/LayoutMain"
import CartBox from "../components/CartBox/CartBox"

const Cart:FC = () => {
  return (
    <>
        <LayoutMain>
          <CartBox/>
        </LayoutMain>
    </>
  )
}

export default Cart