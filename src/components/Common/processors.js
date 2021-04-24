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
            regexp = /[a-zа-я\s-]+/i;
        break;
        case 'number':
            regexp = /[0-9\s-]+/i;
        break;
        case 'text+number':
            regexp = /[\.0-9a-zа-я-\s]+/i;
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







export const IndexedEmployeeArray = new Proxy(Array, {
    construct(target, [args]) {
        let indexes = {};
        args.map((item, itemIndex) => { indexes[item._id] = itemIndex });
        return new Proxy(new target(...args), {
            get(arr, prop) {
                switch(prop) {
                    case 'addToEnd':
                        return item => { 
                            indexes[item._id] = arr.length;
                            return arr.push.call(arr, item)
                        };

                    case 'addToBegin':
                        return item => { 
                            arr.unshift.call(arr, item)
                            arr.map((item, itemIndex) => indexes[item._id] = itemIndex); //пересчет всех индексов, т.к. они сместятся из-за удаления
                            return arr
                        };

                    case 'edit':
                        return item => { 
                            let index = indexes[item._id];
                            arr.splice.apply(arr, [index, 1, item]);
                            return arr
                        };

                    case 'deleteEmployee':
                        return id => {
                            arr.splice.apply(arr, [indexes[id], 1]); //удаление элемента с номером indexes[id]
                            delete indexes[id]; //нельзя делать indexes = {}
                            arr.map((item, itemIndex) => indexes[item._id] = itemIndex); //пересчет всех индексов, т.к. они сместятся из-за удаления
                            return arr
                        }
                    case 'findById': return id => arr[indexes[id]];
                    case 'isExist': return id => indexes[id] === undefined ? false : true;
                    default: return arr[prop]
                }
            }
        })
    }
})
//checkContentType(this.props.store.case.ownerFullName, 'text')