import  { useEffect, type FC } from 'react'
import './Products.scss'
import Sort from "../Sort/Sort"
import Search from "../Search/Search"
import ProductsItem from "./ProductsItem"
import { getProducts } from "../../api/common"
import type { IProduct } from "../../types"
import Skeleton from "./Skeleton"
import { productStore } from "../../store/productStore"
import { useLocation, useNavigate } from "react-router-dom"
import Pagination from "../Pagination/Pagination"

const Products:FC = () => {
  
  const { 
    searchValue, 
    sortValue,
    setSearchValue, 
    setSortValue,
    limit,
    offset,
    currentPage,
    setCurrentPage,
    setOffset
  } = productStore()
  const { data } = getProducts({ searchValue, sortValue, offset, limit })
  
  const location = useLocation()
  const navigate = useNavigate()

  const skeletons = [...new Array(9)].map((_,i) => <Skeleton key={i}/>)
  
  const onChangePage = (num:number) => {
    setCurrentPage(num)
    setOffset(num * limit - limit)
  }
  
  
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSortValue(params.get('ordering')!)
    setSearchValue(params.get('search')!)
    setCurrentPage(+params.get('page')!)
    
  }, [location.search])
  
  
  useEffect(() => {
    
    setOffset(currentPage * limit - limit)
    
    const params = new URLSearchParams()
    searchValue && params.set('search', searchValue)
    sortValue &&   params.set('ordering', sortValue)
    currentPage && params.set('page', currentPage.toString())
    
    navigate(`?${decodeURIComponent(params.toString())}`)
  }, [searchValue, sortValue, currentPage])
  
   
  return (
    <>
        <div className="products">
            <div className="products__filters">
                <Sort/>
                <Search/>
            </div>
            <div className="products__list">
              {data && data.results.map((product:IProduct) => (
                <ProductsItem
                  key={product.id}
                  product={product}
                />
              )) }
            </div>
            {data &&  data.count > limit &&
              <Pagination
                limit={limit}
                currentPage={currentPage}
                totalCount={data.count}
                onChangePage={onChangePage}
              />
            }
            
        </div>
    </>
  )
}

export default Products