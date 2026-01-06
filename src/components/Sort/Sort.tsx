import  { useEffect, useState, type FC } from 'react'
import Select from 'react-select'
import './Sort.scss'
import { productStore } from "../../store/productStore"

const options = [
  { value: '', label: 'Все товары' },
  { value: 'price', label: 'Цене' },
  { value: 'rating', label: 'Рейтингу' },
  { value: 'title', label: 'Названию' }
]

const Sort:FC = () => {
  
  const { setSortValue, sortValue } = productStore()
  const [selectedOption, setSelectedOption] = useState(null)
  
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '200px',
      height: '50px',
      border: '1px solid #efefef',
      borderRadius: '10px',
      background: 'rgb(252, 252, 253)',
      color: 'red',
      fontSize: '14px',
      fontWeight: '400',
      boxShadow: 'none',
      padding: '0px 12px'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontFamily: 'var(--font-family)',
      fontWeight: '400',
      fontSize: '14px',
      textAlign: 'justify',
      color: '#9aa0b4',
    }),
    indicatorsContainer: () => ({
      display: 'none' // ❌ скрывает стрелку вниз и разделительную палочку
    }),
  };
  
  const changeSortValue  = (option: any) => {
    setSortValue(option.value)
    setSelectedOption(option)
  }
  
  useEffect(() => {
    const option = options.find((item) => item.value == sortValue)
    setSelectedOption(option)
  }, [sortValue])
  
  return (
   <>
    <Select
      value={selectedOption}
      onChange={changeSortValue}
      options={options} 
      placeholder="Сортировать по:"
      styles={customStyles}
    />
   </>
  )
}

export default Sort