import React from 'react'
import './style.css'

const Marquee = () => {
    return (
        <div className="marquee-container">
            <marquee behavior="scroll" direction="left" className="marquee-text" onMouseOver={e => e.target.stop()} onMouseOut={e => e.target.start()}>
                <span>40% Off: Catch the Last Day of Insider Sale!</span>
                <span>40% Off: Catch the Last Day of Insider Sale!</span>
                <span>40% Off: Catch the Last Day of Insider Sale!</span>
            </marquee>
        </div>
    )
}

export default Marquee
