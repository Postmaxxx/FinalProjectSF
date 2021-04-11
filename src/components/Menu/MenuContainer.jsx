import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuPublic from './MenuPublic/MenuPublic.jsx';
import MenuAdmin from './MenuAdmin/MenuAdmin.jsx';
import './MenuContainer.css';


class MenuContainer extends Component {

    componentDidMount() {
    }
 


    render() {
        return (
            <div className='menu-container'>
                {this.props.store.main.autorized ? <MenuAdmin {...this.props} /> : <MenuPublic {...this.props}/> }


            </div>

        )
    }
}

/*

                <Switch>
                        <Route path='/public' render={() => <MenuPublic {...this.props}/>} />
                        <Route path='/admin' render={() => <MenuAdmin {...this.props}/>} /> 
                </Switch>



                {autorized ? <MenuAdmin {...this.props} /> : <MenuPublic {...this.props}/> }
                <Switch>
                        <Route path='/public' component={PublicContainer} />
                        <Route path='/admin' component={AdminContainer} />
                </Switch>
                */


export default MenuContainer;

