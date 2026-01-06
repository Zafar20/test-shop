import { type FC } from 'react'
import ContentLoader from "react-content-loader"

const Skeleton: FC = () => {
    return (
        <ContentLoader
            speed={1}
            width={1400}
            height={730}
            viewBox="0 0 1400 730"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="0" ry="0" width="1404" height="43" />
            <rect x="0" y="77" rx="0" ry="0" width="1404" height="350" />
        </ContentLoader>

    )
}

export default Skeleton