import  { useState, type FC } from 'react'
import LayoutForm from "../layouts/LayoutForm"
import { useForm } from "react-hook-form"
import CustomInput from "../components/UI/CustomInput"
import type { IRegister } from "../types"
import CustomButton from "../components/UI/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../api/common"
import { errorResponse } from "../utils/errorResponse"

const Register:FC = () => {
  
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')
  const { mutateAsync } = registerUser()
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm<IRegister>({ mode: 'onChange' })
  
  const password = watch('password')
  
  const submit = async (data: IRegister) => {
    console.log('data', data);
    try {
      await mutateAsync(data)
      setErrorText('')
      navigate('/login')
    } catch (error) {
      let text = errorResponse(error)
      setErrorText(text)
    }
  }
  
  return (
    <>
        <LayoutForm>
            <div className="layoutForm__block">
              <h2 className="layoutForm__block-title">Регистрация</h2>
              <form onSubmit={handleSubmit(submit)}  className="layoutForm__block-form">
                <CustomInput
                  text="Ваш логин"
                  placeholder="Логин"
                  type="text"
                  error={errors.username}
                  register={register('username', {
                    required: 'Поле обязательное для заполнения',
                    minLength: {
                      value: 6,
                      message: 'Минимум 6 символов'
                    }
                  })}
                />
                <CustomInput
                  text="Ваша почта"
                  placeholder="Почта"
                  type="email"
                  error={errors.email}
                  register={register('email', {
                    required: 'Поле обязательное для заполнения',
                  })}
                />
                <CustomInput
                  text="Ваш пароль"
                  placeholder="Ваш пароль"
                  type="password"
                  error={errors.password}
                  register={register('password', {
                    required: 'Поле обязательное для заполнения',
                    minLength: {
                      value: 8,
                      message: 'Минимум 8 символов'
                    }
                  })}
                />
                <CustomInput
                  text="Повторите пароль"
                  placeholder="Повторите пароль"
                  type="password"
                  error={errors.password2}
                  register={register('password2', {
                    required: 'Поле обязательное для заполнения',
                    validate: (value) =>  value == password || 'Пароли не совпадают',
                    minLength: {
                      value: 8,
                      message: 'Минимум 8 символов'
                    }
                  })}
                />
                <CustomButton
                  text="Зарегистрироваться"
                  width={248}
                  height={60}
                  center={true}
                />
              </form>
              <div className="layoutForm__block-info">
                {errorText && <p className="layoutForm__block-info-error">{errorText}</p> }
                <p className="layoutForm__block-info-text">Есть акканут?</p>
                <Link to="/login" className="layoutForm__block-info-link">Войти</Link>
              </div>
            </div>
        </LayoutForm>
    </>
  )
}

export default Register