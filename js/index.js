const $formulary = document.querySelector('#informations')
const $inputs = document.querySelectorAll('#informations input')
//const { name, monthlyPayment, fees, contributionTime } = $formulary

$formulary.onsubmit = e => {
    e.preventDefault()

    const $screenOne = document.querySelector('.screenOne')
    const $screenTwo = document.querySelector('.screenTwo')

    getInvisible($screenOne)
    getVisible($screenTwo, 'flex')

    const $returnBtn = document.querySelector('#returnBtn')
    $returnBtn.onclick = () => {
        getVisible($screenOne)
        getInvisible($screenTwo)
        resetFormulary()
    }
}

const getInvisible = item => item.style.display = 'none'

function getVisible(item, display) {
    if (display) {
        item.style.display = display
    } else {
        item.style.display = 'block'
    }
}

const resetFormulary = () => $inputs.forEach(item => item.value = '')