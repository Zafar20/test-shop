import  { type FC } from 'react'
import './Modal.scss'

interface IModal {
    closeModal: () => void;
    logout: () => void;
}

const Modal:FC<IModal> = ({ closeModal, logout }) => {
  return (
    <>
        <div className="modal" onClick={() => closeModal()}>
            <div className="modal__block" onClick={(event) => event.stopPropagation()}>
                <h2 className="modal__block-title">Вы точно хотите выйти?</h2>
                <div className="modal__block-buttons">
                    <button className="modal__block-button" onClick={() => logout()}>Да</button>
                    <button className="modal__block-button" onClick={() => closeModal()}>Нет</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal