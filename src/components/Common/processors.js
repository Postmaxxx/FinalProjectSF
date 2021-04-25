export const changeInputStyle = (selector, action, style) => { //Переключение стиля элемента по селектору
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


export const toggleElementAttribute = (selector, attribute, attrValue1, attrValue2) => { //Переключение атрибута элемента по селектору
    let element = document.querySelector(selector);
    if (element.getAttribute(attribute) === attrValue1) {
        element.setAttribute(attribute, attrValue2);
    } else {element.setAttribute(attribute, attrValue1)};
}


export const checkContentType = (text, type) => { //Проверка текста на соответствие указанному типу
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
    let newText = text.match(regexp) || []; //исключает ошибку, если совпадений нет вообще, т.к. иначе newText будет undefined и newText[0] вывалится с ошибкой
    return (newText[0] === text)
}


export const comparePasswords = (pass, rePass, element) =>  { //сравнение паролей
    pass === rePass ? 
        changeInputStyle(element, 'add', 'input_similar') :
        changeInputStyle(element, 'remove', 'input_similar')
}


export const IndexedEmployeeArray = new Proxy(Array, { //Использование прокси для хранения вместе с массивом работников объекта, в котором  id_сотрудника: порядковый номер в массиве; прототип - массив
    construct(target, [args]) { //при создании принимаем всю инфу в [args]
        let indexes = {}; // в этом объекте хранятся индексы
        args.map((item, itemIndex) => { indexes[item._id] = itemIndex }); //заполнение объекта индексами
        return new Proxy(new target(...args), { //создаем проксированный массив со спец.методами
            get(arr, prop) {
                switch(prop) {
                    case 'addToEnd': //добавление элемента в конец массива
                        return item => { //получаемые параметры
                            indexes[item._id] = arr.length; //индекс этого нового элемента = длине массива, т.к. добавили элемент в конец
                            arr.push.call(arr, item);
                            return arr
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
                            arr.splice.apply(arr, [index, 1, item]); //замента в массиве одного элемента с номером index на переданный элемент item. Apply, т.к. у нас массив параметров
                            return arr
                        };

                    case 'deleteEmployee':
                        return id => {
                            arr.splice.apply(arr, [indexes[id], 1]); //удаление одного элемента с номером indexes[id]
                            delete indexes[id]; //нельзя делать indexes = {}, вываливается с ошибкой, поэтому удаляем только необходимый элемент
                            arr.map((item, itemIndex) => indexes[item._id] = itemIndex); //пересчет всех индексов, т.к. они сместятся из-за удаления
                            return arr
                        }
                    case 'findById': return id => arr[indexes[id]]; //Поиск в массиве элемента по id, ради чего все это и проксировалось, т.к иначе эта частая процедура будет слишком затратной
                    case 'isExist': return id => indexes[id] === undefined ? false : true; //проверка, есть ли элемент с id в массиве. Тоже частая процедура и весьма затратная без indexes
                    default: return arr[prop]
                }
            }
        })
    }
})
