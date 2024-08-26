import { useState, useEffect } from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoToTopButton = () => {
    const [ showGoTop, setShowGoTop ] = useState(false)
    
    const handleButtonVisibility = () => {
        setShowGoTop(window.scrollY > 0)
    }

    const handleScrollUp = () => {
        window.scrollTo( { left: 0, top: 0, behavior: 'smooth'} )
    }

    useEffect(() => {
        window.addEventListener('scroll', handleButtonVisibility);
        return () => {
            window.removeEventListener('scroll', handleButtonVisibility);
        };
    }, []);

    const goTopButtonStyle = {
        position: "fixed",
        bottom: "50px",
        right: "20px",
        display: showGoTop ? "block" : "none",
        backgroundColor: "rgb(13, 86, 245)",
        color: "rgb(243, 229, 229)",
        border: "2px solid rgb(243, 229, 229)",
        borderRadius: "12%",
        padding: "10px",
        fontWeight: '800',
        cursor: "pointer",
    }
    
    return(
        <div>
            <button onClick={handleScrollUp} style={goTopButtonStyle}>
                <FontAwesomeIcon icon={faArrowUp} />
                <p>Top</p>
            </button>
        </div>
    )
}

export default GoToTopButton




