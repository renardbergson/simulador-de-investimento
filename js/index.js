import {formValidation, paymentFormatter, feesFormatter, localeStrings} from './dataVerification.js'
import {screenOperator, $inputs} from './visibilityControl.js'

const $submitBtn = document.querySelector('#submitBtn')

// FORMULARY CONTROLLER 
$submitBtn.onclick = () => {
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

// API REQUEST AND DATA CONSTRUCT 
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

    $resultMessage.innerHTML = `Olá, ${$name}! Investindo ${localeStrings($payment)} todo mês, você acumulará ${localeStrings(result)} em ${parseInt($time)} meses, sob uma taxa de juros de ${$fees.replace('.' , ',')} mensais.`

    screenOperator()
}

function error() {
    alert('Ops, ocorreu algum erro na requisição!')
}