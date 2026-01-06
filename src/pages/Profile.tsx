import { useRef, useState, type FC } from 'react'
import LayoutForm from "../layouts/LayoutForm"
import CustomInput from "../components/UI/CustomInput"
import { useForm } from "react-hook-form"
import type { IUpdateUser } from "../types"
import CustomButton from "../components/UI/CustomButton"
import { updateUser, updateUserAvatar } from "../api/common"
import { userStore } from "../store/userStore"
import { Link, useNavigate } from "react-router-dom"
import { avatarImg } from "../utils/img"

const Profile: FC = () => {

  const navigate = useNavigate()
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<null | File>(null)
  
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    watch
  } = useForm<IUpdateUser>({ mode: 'onChange' })
  
  const username = watch('username')
  const email = watch('email')
  const password = watch('password')
  
  const updateUserFn = updateUser()
  const updateUserAvatarFn = updateUserAvatar()
  const { user } = userStore()
  
  const submit = async(data: IUpdateUser) => {
    try {
      if(username !== '' && email !== '' && password !== '') {
        await updateUserFn.mutateAsync({data: data, id: user?.id})
      }
      if(selectedFile) {
        const formData = new FormData()
        formData.append('avatar', selectedFile)
        await updateUserAvatarFn.mutateAsync({data: formData, id: user?.id})
      }
      navigate('/')
    } catch (error) {
      console.log('Ошибка при редактировании', error);
    }
  }
  
  const removeAvatar = async() => {
    try {
      setSelectedFile(null)
      if(inputRef.current) {
        inputRef.current.value = ''
      }
      const img = document.getElementById('avatarPreview') as HTMLImageElement
      if(img) {
        img.src = avatarImg
      }
      const formData = new FormData()
      formData.append('avatar', '')
      await updateUserAvatarFn.mutateAsync({data: formData, id: user?.id})
    } catch (error) {
      console.log("Ошибка при удалении картинки", error);
      
    }
  }

  const avatarSrc = user?.avatar ?  `https://prowebapi.tech/${user?.avatar}` : avatarImg
  
  
  return (
    <>
      <LayoutForm>
        <div className="layoutForm__block">
          <h2 className="layoutForm__block-title">Редактировать профиль</h2>
          <form onSubmit={handleSubmit(submit)} className="layoutForm__block-form">
            <CustomInput
              text="Ваш логин"
              placeholder="Логин"
              type="text"
              error={errors.username}
              register={register('username')}
            />
            <CustomInput
              text="Ваша почта"
              placeholder="Почта"
              type="email"
              error={errors.email}
              register={register('email')}
            />
            <CustomInput
              text="Ваш пароль"
              placeholder="Ваш пароль"
              type="password"
              error={errors.password}
              register={register('password')}
            />
            <div className="layoutForm__block-avatar">
              <label htmlFor="avatar" className="layoutForm__block-avatar-label">
                Изменить фото профиля
              </label>
              <input 
                type="file"
                id="avatar" 
                className="layoutForm__block-avatar-input"
                ref={inputRef}
                accept="image/*"
                onChange={(e) => {
                  console.log(1);
                  
                  setSelectedFile(null)
                  const file = e.target.files?.[0]
                  console.log(file);
                  
                  if(file) {
                    console.log('hello');
                    
                    setSelectedFile(file)
                    const reader = new FileReader()
                    reader.onload = () => {
                      const img = document.getElementById('avatarPreview') as HTMLImageElement
                      if(img) {
                        img.src = reader.result as string
                      }
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
              <div onClick={() => inputRef.current?.click()} className="layoutForm__block-avatar-preview">
                <img id="avatarPreview" src={avatarSrc} alt="" />
              </div>
                
              {(user?.avatar || selectedFile) && 
                <button onClick={() => removeAvatar()} className="layoutForm__block-avatar-btn">
                  Удалить фото
                </button>
              }
            </div>
            <CustomButton
              text="Редактировать"
              width={248}
              height={60}
              center={true}
            />
          </form>
          <Link to="/" className="layoutForm__block-link">Вернуться на главную</Link>
        </div>

      </LayoutForm>
    </>
  )
}

export default Profile