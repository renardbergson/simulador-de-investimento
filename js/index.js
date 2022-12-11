const $formulary = document.querySelector('#informations')
const $inputs = document.querySelectorAll('#informations input')

// ************************************************ FORMULARY CONTROLLER ************************************************
$formulary.onsubmit = e => {
    e.preventDefault()

    let isThereAnError = false
    
    $inputs.forEach(input => {
        if (!input.value) {
            isThereAnError = true
            return input.classList.add('invalid')    
        } 
        input.classList.remove('invalid')
    })

    if (!isThereAnError) {
        request()
    }
}

// ******************************************** API REQUEST AND DATA CONSTRUCT ********************************************
function request() {
    const $payment = $formulary.monthlyPayment.value
    const $fees = $formulary.fees.value
    const $time = parseInt($formulary.contributionTime.value)

    if (!$fees.includes(',') && !$fees.includes('.') && $fees.charAt(0) === '0') {
        return $inputs.item(2).classList.add('invalid')
    }

    const expression = { expr: `${paymentFormatter($payment)} * (((1 + ${feesFormatter($fees)}) ^ ${$time} - 1) / ${feesFormatter($fees)})` }

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

    const { name, monthlyPayment, fees, contributionTime } = $formulary

    $resultMessage.innerHTML = `Olá, ${name.value}! Investindo ${localeStrings(monthlyPayment.value)} todo mês, você acumulará ${localeStrings(result)} em ${contributionTime.value} meses, sob uma taxa de juros de ${fees.value.replace('.' , ',')} mensais.`

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