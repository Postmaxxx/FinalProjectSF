import React, { useContext, useEffect } from 'react';
import TheftReportPage from './TheftReportPage.jsx';
import axios from 'axios';
import Modal from 'react-modal';
import { changeInputStyle, checkContentType } from '../../Common/processors.js';
import Preloader from '../../Common/Preloader.jsx';
import { Context } from '../../Common/context';

const TheftReportPageContainer = (props) => {

    useEffect(() => Modal.setAppElement('body'), []); //Без привязки будет ошибка, т.к. modal не к чему привязаться. ComponenetDidMount.
    const reportParams = useContext(Context).reportCase;


    const openConfirmation = () => { //Открыть модальное окно подтверждения
        props.confirmationActions.setShowConfirmation(true); //Установить статус Показывать
    }
    

    const closeConfirmation = () => { 
        props.confirmationActions.setShowConfirmation(false);
    }


    const onClearFormButtonClick = () => { //При нажатии кнопки Очистить форму
        props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите очистить форму?')
        props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        props.confirmationActions.setConfirmationRightButtonText('Очистить');
        props.confirmationActions.setConfirmationLeftButtonAction(() => closeConfirmation());
        props.confirmationActions.setConfirmationRightButtonAction(() => clearForm());
        props.confirmationActions.setShouldCloseOnOverlayClick(false);
        props.confirmationActions.setShouldCloseOnEsc(true);     
        openConfirmation();
    }


    function clearForm() {
        props.caseActions.setDate('');
        props.caseActions.setLicenseNumber('');
        props.caseActions.setColor('');
        props.caseActions.setType('');
        props.caseActions.setOwnerFullName('');
        props.caseActions.setDescription('');
        changeInputStyle('#theft-report-page__input-date', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-licenceNumber', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-color', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-ownerFullName', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-description', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-bikeType', 'remove', 'input_uncorrected');
        closeConfirmation();
    }

    
    const onSubmitFormButtonClick = () => {
        props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите отправить сообщение?')
        props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        props.confirmationActions.setConfirmationRightButtonText('Отправить');
        props.confirmationActions.setConfirmationLeftButtonAction(() => closeConfirmation())
        props.confirmationActions.setConfirmationRightButtonAction(() => checkAndSendSubmitForm());
        props.confirmationActions.setShouldCloseOnOverlayClick(true);
        props.confirmationActions.setShouldCloseOnEsc(true);
        openConfirmation();
    }
    

    const checkInputsCorrection = () => { //Проверка корректности ввода
        let errorsArray = []; //массив ошибок, по умолчанию их нет
        let { date, ownerFullName, bikeType, color, licenseNumber, description } = props.store.case;
        if (date === '') {
            errorsArray.push('Не указана дата кражи велосипеда');
            changeInputStyle('#theft-report-page__input-date', 'add', 'input_uncorrected'); //Выделение нужного Input цветом путем добавления стиля
        }

        if (licenseNumber.length < 3) {
            errorsArray.push('Номер велосипеда слишком короткий');
            changeInputStyle('#theft-report-page__input-licenceNumber', 'add', 'input_uncorrected');
        }
        if (!checkContentType(licenseNumber, 'text+number')) { // Проверка синтаксиса введенных данных
            errorsArray.push('Номер велосипеда указан неверно (разрешены только цифры и буквы)');
            changeInputStyle('#theft-report-page__input-licenceNumber', 'add', 'input_uncorrected');
        }
        if (color.length < 3) {
            errorsArray.push('Не указан цвет велосипеда');
            changeInputStyle('#theft-report-page__input-color', 'add', 'input_uncorrected')
        }
        if (!checkContentType(color, 'text+number')) {
            errorsArray.push('Поле "цвет велосипеда" введено некорректно (разрешены только цифры и буквы)');
            changeInputStyle('#theft-report-page__input-color', 'add', 'input_uncorrected')
        }

        if (bikeType === '') {
            errorsArray.push('Не выбран тип велосипеда');
            changeInputStyle('#theft-report-page__input-bikeType', 'add', 'input_uncorrected');
        }

        if (ownerFullName.length < 6) {
            errorsArray.push('ФИО владельца велосипеда слишком короткое');
            changeInputStyle('#theft-report-page__input-ownerFullName', 'add', 'input_uncorrected');
        }
        if (!checkContentType(ownerFullName, 'text')) {
            errorsArray.push('ФИО владельца введено некорректно (разрешены только буквы)');
            changeInputStyle('#theft-report-page__input-ownerFullName', 'add', 'input_uncorrected');
        }

        if (description.length < 20) {
            errorsArray.push('Описание обстоятельст кражи и особых примет слишком короткое');
            changeInputStyle('#theft-report-page__input-description', 'add', 'input_uncorrected');
        }
        
        return errorsArray.length === 0 ? 'None' : (errorsArray.join(", ") + '. ')
    }


    const checkAndSendSubmitForm = ()  => {
        closeConfirmation();
        let errorsList = checkInputsCorrection();
        errorsList === 'None' ? 
            submitForm() :
            alert('Обнаружены следующие ошибки при заполнении: ' + errorsList + 'Исправьте введенные даннные и попробуйте снова.');
    }


    const submitForm = async () => {
        let currentDate = new Date().toLocaleDateString();
        let reportData = {
            status: 'new',
            date: props.store.case.date,
            licenseNumber: props.store.case.licenseNumber,
            color: props.store.case.color,
            type: props.store.case.bikeType,
            ownerFullName: props.store.case.ownerFullName,
            createdAt: currentDate,
            updateAt: currentDate,
            clientId: 'bmluYS5wb3N0bmlrb3ZhODdAeWFuZGV4LnJ1', //Без этого поля не принимает, но непонятно, откуда оно должно браться для гостя?
            description: props.store.case.description,
            resolution: ''
        };
        props.mainActions.setFetching('start', 'reportCase');
        try {
            let response = await axios[reportParams.method](reportParams.url, reportData)
            if (response.status===200) {
                props.mainActions.setFetching('success', 'reportCase', `Данные успешно отправлены!`);
                props.caseActions.setDate('');             //Очистка формы
                props.caseActions.setLicenseNumber('');
                props.caseActions.setColor('');
                props.caseActions.setType('');
                props.caseActions.setOwnerFullName('');
                props.caseActions.setDescription(''); 
                alert('Отчет был успешно отправлен!');
            } else {
                alert('Ошибка при отправке отчета о краже. Данные не корректны.');
                props.mainActions.setFetching('error', 'reportCase', 'Произошла ошибка при отправке сообщения');
            }
        } catch {
            alert('Произошла ошибка на сервере при отправке отчета, попробуйте позднее.');
            props.mainActions.setFetching('error', 'reportCase', 'Произошла ошибка на сервере при отправке сообщения:');
        }
    }


        return (
            <div className='theft-report-page-container'>
                {props.store.main.fetching.reportCase.isFetching ? 
                    <Preloader {...props} preloaderText='Отправка сообщения...' marginTop='0px' marginLeft='auto'/> :
                    <TheftReportPage 
                        {...props} 
                        onClearFormButtonClick={onClearFormButtonClick}
                        onSubmitFormButtonClick={onSubmitFormButtonClick}
                        closeConfirmation={closeConfirmation}
                    />
                }
            </div>
        )
    
} 


export default TheftReportPageContainer;