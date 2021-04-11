import './Preloader.css';
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'

const Preloader = (props) => {

    return (
        <div className='preloader__container'>
            <div className="loader"></div>
            <p className='preloader__text'>{props.preloaderText}</p>
        </div>
    )

}

export default Preloader;