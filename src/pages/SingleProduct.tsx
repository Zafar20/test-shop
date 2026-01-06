import { type FC } from 'react'
import LayoutMain from "../layouts/LayoutMain"
import ProductById from "../components/ProductById/ProductById"

const SingleProduct:FC = () => {
  return (
    <>
        <LayoutMain>
          <ProductById/>
        </LayoutMain>
    </>
  )
}

export default SingleProduct