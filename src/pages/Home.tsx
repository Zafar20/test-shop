import type { FC } from "react"
import LayoutMain from "../layouts/LayoutMain"
import Products from "../components/Products/Products"


const Home:FC = () => {
  return (
    <>
      <LayoutMain>
        <Products/>
      </LayoutMain>
    </>
  )
}

export default Home