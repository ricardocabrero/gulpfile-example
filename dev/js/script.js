

const text = `En    un lugar     de la Mancha, de cuyo nombre no quiero acordarme, 
no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, 
adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, 
salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de 
añadidura los domingos, consumían las tres partes de su hacienda.`

const normalizeText = word => word.toLowerCase().replace(/[.!,)(\n]/g, '');

const capitalizeText = word => word.substring(0,1).toUpperCase() + word.substring(1, word.length);

const grammarNumber = num => (num.toString() === '1') ? 'vez' : 'veces';

function arrayFormSelector(selector) {
    const arr = [];
    for(let i = 0; i < selector.length; i++) {
        arr.push(selector[i]);
    }
    return arr;
}

function printEnunc(text) {
    const btn = document.querySelector('button');
    const paraph = document.createElement('div');

    paraph.className = 'main';
    paraph.innerHTML = `<h1>Comprobar las veces que se repite cada
    palabra en el siguiente texto:</h1> <p>"${text}"</p>`;

    btn.insertAdjacentElement('beforebegin', paraph);
}
                                           
function repeatWordInText(text) {
    const wordsArray = text.split(' ');
    const whitespace = "";
    const dict = {}; //object with the words

    wordsArray.map(word => {
        word = normalizeText(word);
        
        if(word === whitespace) {
            return;
        }
        !(dict[word]) ? dict[word] = 1 : dict[word]++;
    });
        return dict;
}

function printResult(text, handleClickInWord) { // param & callback
    const result = repeatWordInText(text); //object
    const list = document.createElement('ul');
    let count = 0;
    
    for(const prop in result) {
        count++;
        const literal = count === 1 ? `está` : `" "`;
        const item = document.createElement('li');

        item.className = `item item-${count}`;
        item.innerHTML = `<strong>${prop}</strong> = 
        ${literal} ${result[prop]} ${grammarNumber(result[prop])}`;

        list.appendChild(item);
    }

    document.body.append(list);

    handleClickInWord(text);
}

function handleButton() {
    const btn = document.querySelector('button');

    btn.addEventListener('click', () => {
        printResult(text, handleClickInWord);
        btn.setAttribute('disabled', true);
    });
}

function handleClickInWord(text) {
    const selector = document.querySelectorAll('ul li');
    const arr = arrayFormSelector(selector);
    const delayTime = 150; 

    arr.forEach((el) => {
        el.addEventListener('click', () => {
            const word = el.firstChild.textContent;

            markWord(text, word);
            setTimeout(() => animateScroll(), delayTime);
        });
    })
}

function markWord(text, word) {
    const wordM = capitalizeText(word);

    const exp = new RegExp(`\\b`+word+`\\b`, "g");
    const expM = new RegExp(`\\b`+wordM+`\\b`, "g");

    let newText = text
    .replaceAll(exp, `<span class="mark">${word}</span>`)
    .replaceAll(expM, `<span class="mark">${wordM}</span>`);

    const paraph = document.querySelector('.main p');
    
    paraph.innerHTML = `"${newText}"`;
}

function animateScroll() {
    let paramTop = window.pageYOffset;
    const time = 1000 / 100;

    const interval = setInterval(() => {
        paramTop = paramTop - 20;
        moveScroll(paramTop, interval);
    }, time);
}

function moveScroll(paramTop, interval) {
    if(paramTop > 0) {
        window.scroll({
            left: 0,
            top: paramTop,
        });
    } else {
        clearInterval(interval);
    }
}
//init
document.addEventListener('DOMContentLoaded', () => {
    printEnunc(text);
    handleButton();
});


