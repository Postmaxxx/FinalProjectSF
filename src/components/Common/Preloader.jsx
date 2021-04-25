import './Preloader.css';
import React from 'react';


const Preloader = (props) => {
    let style = {
        marginTop: props.marginTop,
        marginLeft: props.marginLeft
    }
    let { preloaderText } = props

    
    return (
        <div className='preloader__container' style={style} >
            <div className="loader"></div>
            <p className='preloader__text'>{preloaderText}</p>
        </div>
    )
}


export default Preloader;