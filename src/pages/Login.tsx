import  { useState, type FC } from 'react'
import LayoutForm from "../layouts/LayoutForm"
import { useForm } from "react-hook-form"
import CustomInput from "../components/UI/CustomInput"
import type { ILogin } from "../types"
import CustomButton from "../components/UI/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../api/common"
import { errorResponse } from "../utils/errorResponse"

const Login:FC = () => {
  
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')
  const { mutateAsync } = loginUser()
  
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<ILogin>({ mode: 'onChange' })
  
  
  const submit = async (data: ILogin) => {
    console.log('data', data);
    try {
      await mutateAsync(data)
      setErrorText('')
      navigate('/')
    } catch (error) {
      let text = errorResponse(error, 'login')
      setErrorText(text)
    }
  }
  
  return (
    <>
        <LayoutForm>
            <div className="layoutForm__block">
              <h2 className="layoutForm__block-title">Вход</h2>
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
                <CustomButton
                  text="Вход"
                  width={248}
                  height={60}
                  center={true}
                />
              </form>
              <div className="layoutForm__block-info">
                {errorText && <p className="layoutForm__block-info-error">{errorText}</p> }
                <p className="layoutForm__block-info-text">Нет акканута? </p>
                <Link to="/register" className="layoutForm__block-info-link">Зарегистрироваться</Link>
              </div>
            </div>
        </LayoutForm>
    </>
  )
}

export default Login