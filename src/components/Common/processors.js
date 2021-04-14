export const changeInputStyle = (selector, action, style) => {
    let element = document.querySelector(selector);
    if (action === 'add') {
        element.classList.add(style);
    }
    if (action === 'remove') {
        element.classList.remove(style);
    }
    if (action === 'toggle') {
        element.classList.toggle(style);
    }
}

export const transformInputValue = (value) => {
    switch(value) {
        case false: return 'No';
        case true: return 'Yes';
        case 'No': return false;
        case 'Yes': return true;
    }
    return value;
};



export const toggleElementAttribute = (selector, attribute, attrValue1, attrValue2) => {
    let element = document.querySelector(selector);
    if (element.getAttribute(attribute) === attrValue1) {
        element.setAttribute(attribute, attrValue2);
    } else {element.setAttribute(attribute, attrValue1)};
}


export const checkContentType = (text, type) => {
    let regexp = '';
    switch (type) {
        case 'text':
            regexp = /[a-zа-я]+/i;
        break;
        case 'number':
            regexp = /[0-9]+/i;
        break;
        case 'text+number':
            regexp = /[0-9a-zа-я]+/i;
        break;
        case 'email':
            regexp = /^[a-zа-я0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
        break;
    }
    let newText = text.match(regexp) || []; //исключает ошибку, если совпадений нет вообще
    return (newText[0] === text)
}


export const comparePasswords = (pass, rePass, element) =>  {
    pass === rePass ? 
    changeInputStyle(element, 'add', 'input_similar')
    : changeInputStyle(element, 'remove', 'input_similar')
}


//checkContentType(this.props.store.case.ownerFullName, 'text')