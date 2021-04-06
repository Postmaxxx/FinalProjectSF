export const changeInputStyle = (selector, action, style) => {
    let element = document.querySelector(selector);
    if (action === 'add') {
        element.classList.add(style);
    }
    if (action === 'remove') {
        element.classList.remove(style);
    }
}

export const transformInputValue = (value) => {
    switch(value) {
        /*case 'new': return 'Новое';
        case 'Новое': return 'new';
        case 'in_progress': return 'В работе';
        case 'В работе': return 'in_progress';
        case 'done': return 'Закрыто';
        case 'Закрыто': return 'done';

        case 'Выберете': return 'Выберете';
        case 'general': return 'Обычный';
        case 'Обычный': return 'general';
        case 'sport': return 'Спорт';
        case 'Спорт': return 'sport';
*/
        case false: return 'No';
        case true: return 'Yes';
        case 'No': return false;
        case 'Yes': return true;

    }
    return value;
};
