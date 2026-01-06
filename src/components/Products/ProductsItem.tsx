import { type FC } from 'react'
import './Products.scss'
import { starIcon, addCartIcon } from "../../utils/img"
import type { IProduct } from "../../types"
import { Link } from "react-router-dom"
import { cartStore } from "../../store/cartStore"
import { toast } from "react-toastify"

interface IProductsItem {
    product: IProduct
}

const ProductsItem:FC<IProductsItem> = ({ product }) => {
    
    const { addToCart  } = cartStore()
    
    const addToCartHandler = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        addToCart(product)
        toast.success('Товар добавлен в корзину', {
            position: 'bottom-right',
            autoClose: 2000
        })
    }
    
    
  return (
   <>
    <Link to={`/product/${product.id}`} className="products__item">
        <img src={product.image} alt="" className="products__item-img" />
        <span className="products__item-price">{product.price} $</span>
        <button className="products__item-cart">
            <img src={addCartIcon} alt="" />
        </button>
        <div className="products__item-info">
            <span className="products__item-rating">
                {product.rating}
                <img src={starIcon} alt="" />
            </span>
            <h2 className="products__item-title">{product.title}</h2>
            <p className="products__item-text">{product.description}</p>
        </div>
    </Link>
   </>
  )
}

export default ProductsItem