import React, { Component } from 'react';
import MenuPublic from './MenuPublic/MenuPublic.jsx';
import MenuAdmin from './MenuAdmin/MenuAdmin.jsx';
import './MenuContainer.css';


class MenuContainer extends Component {
    render() {
        return (
            <div className='menu-container'>
                {this.props.store.main.autorized ? <MenuAdmin {...this.props} /> : <MenuPublic {...this.props}/> }
            </div>
        )
    }
}


export default MenuContainer;

