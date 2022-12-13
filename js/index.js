const $formulary = document.querySelector('#informations')
const $inputs = document.querySelectorAll('#informations input')

// ************************************************ FORMULARY CONTROLLER ************************************************
$formulary.onsubmit = e => {
    e.preventDefault()

    let isThereAnError = false
    
    $inputs.forEach(input => {
        if (!input.value) {
            isThereAnError = true
            return formValidation(input, true)  
        } 
        return formValidation(input, false)
    })

    if (!isThereAnError) {
        request($inputs.item(1).value, $inputs.item(2).value, $inputs.item(3).value)
    }
}

// ******************************************** API REQUEST AND DATA CONSTRUCT ********************************************
function request(payment, fees, time) {
    if (!fees.includes(',') && !fees.includes('.') && fees.charAt(0) === '0') {
        return formValidation($inputs.item(2), true)
    }

    if (time.includes('ano') || time.includes('anos')) {
        return formValidation($inputs.item(3), true)
    }

    const expression = { expr: `${paymentFormatter(payment)} * (((1 + ${feesFormatter(fees)}) ^ ${parseInt(time)} - 1) / ${feesFormatter(fees)})` }

    const configs = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify( expression ) 
    }

    fetch('https://api.mathjs.org/v4', configs)
        .then(getData)
        .then(dataConstruct)
        .catch(error)
}

function getData(data) {
    if (data.status === 200) {
        return data.json()
    }
}

function dataConstruct(data) {    
    const result = parseFloat(data.result)
    const $resultMessage = document.querySelector('#resultMessage')

    const $name = $inputs.item(0).value
    const $payment = $inputs.item(1).value
    const $fees = $inputs.item(2).value
    const $time = $inputs.item(3).value

    $resultMessage.innerHTML = `Olá, ${$name}! Investindo ${localeStrings($payment)} todo mês, você acumulará ${localeStrings(result)} em ${$time} meses, sob uma taxa de juros de ${$fees.replace('.' , ',')} mensais.`

    screenOperator()
}

function error() {
    alert('Ops, ocorreu algum erro na requisição!')
}

// ************************************************** SCREEN OPERATOR ***************************************************
function screenOperator() {
    const $screenOne = document.querySelector('.screenOne')
    const $screenTwo = document.querySelector('.screenTwo')
    
    getInvisible($screenOne)
    getVisible($screenTwo, 'flex')
    
    const $returnBtn = document.querySelector('#returnBtn')
    
    $returnBtn.onclick = () => {
        getVisible($screenOne)
        getInvisible($screenTwo)
        //resetFormulary()
    }
}

// ******************************************** DATA VERIFICATION FUNCTIONS ********************************************
function formValidation(item, response) {
    if (response === true) {
        return item.classList.add('invalid')
    } 
    return item.classList.remove('invalid')
}

function paymentFormatter(item) {
    let newPayment
    
    if (item.includes(',')) {
        const replace = item.replace(',' , '.')
        newPayment = parseFloat(replace)
    } else {
        newPayment = parseInt(item)
    }

    return newPayment
}

function feesFormatter(item) {
    let newFees

    if (item.includes('.') && !item.includes('%')) {
        newFees = item + '%'
    } else if (item.includes(',') && !item.includes('%')) {
        newFees = item.replace(',' , '.') + '%'
    } else if (item.includes(',') && item.includes('%')) {
        newFees = item.replace(',' , '.')
    } else {
        newFees = item
    }

    return newFees
}

function localeStrings(num) {
    if (typeof num === 'string') {
        const number = parseFloat(num)
        return number.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
    } else {
        return num.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
    }
}

// ************************************ ITEM VISIBILITY AND VALUE CONTROL FUNCTIONS ************************************
const getInvisible = item => item.style.display = 'none'
const getVisible = (item, display) => {display ? item.style.display = display : item.style.display = 'block'}
const resetFormulary = () => $inputs.forEach(item => item.value = '')