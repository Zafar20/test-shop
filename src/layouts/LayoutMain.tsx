import { type FC, type ReactNode } from 'react'
import Sidebar from "../components/Sidebar/Sidebar"


interface ILayoutMain {
    children: ReactNode
}

const LayoutMain:FC<ILayoutMain> = ({ children }) => {
  return (
    <>
        <div className="layoutMain" style={{ display: 'flex'}}>
            <Sidebar/>
            <div className="container">
                {children}
            </div>
        </div>
    </>
  )
}

export default LayoutMain