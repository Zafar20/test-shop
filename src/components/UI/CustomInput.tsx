import type { FC } from "react"


interface ICustomInput {
    text: string;
    placeholder: string;
    type: string;
    error: any;
    register: any
}

const CustomInput: FC<ICustomInput> = ({ text, placeholder, type,error, register }) => {
    
    return (
        <>
            <div className="layoutForm__block-field">
                <span className="layoutForm__block-field-span">{text}</span>
                <input
                    type={type}
                    className="layoutForm__block-field-input"
                    placeholder={placeholder}
                    {...register}
                />
                {error &&
                    <p className="layoutForm__block-field-error">{error.message}</p>
                }
            </div>
        </>
    )
}

export default CustomInput