import { type FC } from 'react'
import ContentLoader from "react-content-loader"

const Skeleton: FC = () => {
    return (
        <ContentLoader
            speed={1}
            width={320}
            height={360}
            viewBox="0 0 320 360"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="45" cy="45" r="45" />
            <rect x="0" y="115" rx="0" ry="0" width="105" height="27" />
            <rect x="0" y="150" rx="0" ry="0" width="150" height="20" />
            <rect x="0" y="220" rx="0" ry="0" width="135" height="23" />
            <rect x="0" y="275" rx="0" ry="0" width="135" height="23" />
            <rect x="0" y="330" rx="0" ry="0" width="135" height="23" />
        </ContentLoader>

    )
}

export default Skeleton