import { type FC } from 'react'

interface ICustomButton {
    text: string;
    width: number;
    height: number;
    center?: boolean
    img?: string
    gap?: number
    click?: () => void;
    visible?: string; 
}

const CustomButton:FC<ICustomButton> = ({ text, width, height, center, img,gap, click, visible }) => {
  return (
    <>
        <button 
            onClick={click}
            className={`custom__button ${visible}`}
            style={{
                maxWidth: width,
                height: height,
                marginLeft: center ? 'auto' : '',
                marginRight: center ? 'auto' : '',
                gap: gap
            }}
        >
            {img && <img src={img} alt="" /> }
            <span>{text}</span>
        </button>
    </>
  )
}

export default CustomButton