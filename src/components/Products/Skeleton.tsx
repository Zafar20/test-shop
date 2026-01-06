import { type FC } from 'react'
import ContentLoader from "react-content-loader"

const Skeleton: FC = () => {
    return (
        <ContentLoader
            speed={1}
            width={435}
            height={340}
            viewBox="0 0 435 340"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="0" ry="0" width="435" height="200" />
            <rect x="0" y="230" rx="0" ry="0" width="220" height="25" />
            <rect x="0" y="280" rx="0" ry="0" width="435" height="55" />
        </ContentLoader>

    )
}

export default Skeleton