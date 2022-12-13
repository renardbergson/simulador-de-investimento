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

export {formValidation, paymentFormatter, feesFormatter, localeStrings}