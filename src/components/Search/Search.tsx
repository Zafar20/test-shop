import { useEffect, useState, type FC } from 'react'
import { closeIcon, searchIcon } from "../../utils/img"
import './Search.scss'
import { productStore } from "../../store/productStore"

const Search:FC = () => {
  
  const { setSearchValue, searchValue, setCurrentPage } = productStore()
  const [value, setValue] = useState('')
  
  const submit = (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setSearchValue(value)
      setCurrentPage(1)
  }
  
  const reset = () => {
    setValue('')
    setSearchValue('')
  }
  
  useEffect(() => {
    setValue(searchValue)
  }, [])
  
  return (
    <>
      <form className="search" onSubmit={(event) => submit(event) }>
        <div className="search__box">
          <input 
            type="text" 
            className="search__box-input" 
            placeholder="Введите ..."
          />
           <img onClick={reset} src={closeIcon} alt="" className="search__box-icon" /> 
        </div>
        <button className="search__box-btn">
          <img src={searchIcon} alt="" />
        </button>
      </form>
    </>
  )
}

export default Search