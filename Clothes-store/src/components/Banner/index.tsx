import React from 'react'
import { BannerWrapper } from './style'

const Banner = () => {
    return (
        <BannerWrapper>
            <div className="demo">
                <div
                    style={{
                        fontSize: "2rem",
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textTransform:"uppercase"
                    }}
                >
                    Về chúng tôi
                </div>
            </div>
        </BannerWrapper>
    )
}

export default Banner