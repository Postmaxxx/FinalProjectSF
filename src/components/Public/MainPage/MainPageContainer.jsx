import React, { Component } from 'react';
import MainPage from './MainPage.jsx';


class MainPageContainer extends Component {
    render() {
        return (
            <MainPage {...this.props.store} />
        )
    }
}


export default MainPageContainer;