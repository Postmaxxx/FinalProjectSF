import React from 'react';
import './Footer.css';


const Footer = (props) => {

    let current_page = props.history.location.pathname;
    let autorized = props.store.main.autorized;
    let btn = 'footer__navigation__item__button';

    let mainpage_style = [btn, `${btn}__mainpage`]; // footer__navigation__item__button, footer__navigation__item__button__mainpage
    let theft_report_style = [btn, `${btn}__theft-report`];
    let login_style = [btn, `${btn}__login`];
    let all_cases_style = [btn, `${btn}__all-cases`];
    let all_employees_style = [btn, `${btn}__all_employees`];
    let logoff_style = [btn, `${btn}__logoff`];

    current_page==='/public/mainpage' && mainpage_style.push('button_selected')
    current_page==='/public/theft-report' && theft_report_style.push('button_selected')
    current_page==='/public/login' && login_style.push('button_selected')
    current_page==='/admin/all_cases' && all_cases_style.push('button_selected')
    current_page==='/admin/all_employees' && all_employees_style.push('button_selected')

    const logoff = () => {
        let response = confirm('Вы уверены, что хотите выйти?')
        if (response) {
            props.mainActions.setAutorized(false);
            props.mainActions.setToken('');
            JSON.stringify(localStorage.clear());
            props.history.push('/public/mainpage')
        }
    }


    const footerPublic = () => { //Footer для неавторизованных
        return(
            <>
                <button 
                    className={mainpage_style.join(' ')}
                    onClick={() => props.history.push('/public/mainpage')} 
                />              
                <button 
                    className={theft_report_style.join(' ')}
                    onClick={() =>  props.history.push('/public/theft-report')} 
                />
                <button 
                    className={login_style.join(' ')}
                    onClick={() => props.history.push('/public/login')} 
                />
            </>
        )
    }


    const footerAdmin = () => {//Footer для авторизованных
        return(
            <>
                <button 
                    className={all_cases_style.join(' ')}
                    onClick={() => props.history.push('/admin/all_cases')} 
                />              
                <button 
                    className={all_employees_style.join(' ')}
                    onClick={() =>  props.history.push('/admin/all_employees')} 
                />
                <button 
                    className={logoff_style.join(' ')}
                    onClick={logoff} 
                />
            </>
        )
    }



    return (
        <div className='footer'>
            <div className='footer__logo-info'>
                <p>© PostMaxxx</p>
            </div>
            <div className='footer__navigation'>
                {autorized ? footerAdmin() : footerPublic()}
            </div> 
            <div className='footer__date'>
                <p>2021</p>
            </div>
        </div>
    )
}


export default Footer;
