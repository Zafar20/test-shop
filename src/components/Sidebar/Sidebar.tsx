import { useState, type FC } from 'react'
import './Sidebar.scss'
import { cartIcon, logoutIcon, menuIcon, userIcon, userPhoto } from "../../utils/img"
import { NavLink } from "react-router-dom"
import CustomButton from "../UI/CustomButton"
import { userStore } from "../../store/userStore"
import Skeleton from "./Skeleton"
import Modal from "../Modal/Modal"
import { cartStore } from "../../store/cartStore"


const links = [
    { url: '/', name: 'Меню', img: menuIcon },
    { url: '/cart', name: 'Корзина', img: cartIcon },
    { url: '/profile', name: 'Профиль', img: userIcon },
]

const Sidebar: FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const { user, logoutUser } = userStore()
    const { totalCount } = cartStore()

    const userImg = `https://prowebapi.tech/${user?.avatar}`
    const img = user && user.avatar ? userImg : userPhoto
    
    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    
    const logout = () => {
        closeModal()
        logoutUser()
        window.location.href = "/login"
    }
 
    return (
        <>
            <div className="sidebar">
                {user ? (
                    <>
                        <div className="sidebar__block">
                            <div className="sidebar__user">
                                <img src={img} alt="" className="sidebar__user-img" />
                                <h2 className="sidebar__user-name">
                                    {user.username}
                                </h2>
                                <a href="#" className="sidebar__user-email">
                                    {user.email}
                                </a>
                            </div>
                            <ul className="sidebar__list">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <NavLink to={link.url} className="sidebar__list-links">
                                            <img src={link.img} alt="" />
                                            <span className="sidebar__list-links-text">{link.name}</span>
                                            {link.name == "Корзина" && totalCount > 0 && <span className="sidebar__list-links-count">{totalCount}</span> }
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <CustomButton
                            width={117}
                            height={43}
                            text="Выйти"
                            img={logoutIcon}
                            gap={9}
                            click={openModal}
                            visible="exit"
                        />
                    </>
                ) : <Skeleton/> }

            </div>
            {isModalOpen && <Modal closeModal={closeModal} logout={logout}/>}
        </>
    )
}

export default Sidebar