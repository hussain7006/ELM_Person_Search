import React from 'react'
import { constants } from '../../constants/constants'

const Header = () => {
    return (

        <header
            style={{
                background: "#38414A",
                padding: "0px 15px",
                height: constants.headerHeight + "px",
                display: "flex", alignItems: "center", gap: 10
            }}
        >
            <span style={{ background: "rgba(255,255,255, 0.95)", borderRadius: "50%" }}>
                <img src="/images/elm_logo.png" width={50} height={50} alt="logo" />
            </span>
            <span
                style={{
                    fontSize: "22px", fontWeight: "400", color: "#fff"
                }}>
                Person Search
            </span>
        </header>
    )
}

export default Header