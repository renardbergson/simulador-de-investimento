const $inputs = document.querySelectorAll('#informations input')

function screenOperator() {
    const $informations = document.querySelector('#informations')
    const $submitBtn = document.querySelector('#submitBtn')

    const $resultMessage = document.querySelector('#resultMessage')
    const $returnBtn = document.querySelector('#returnBtn')
    
    getInvisible($informations, $submitBtn)
    getVisible($resultMessage, $returnBtn)
        
    $returnBtn.onclick = () => {
        getVisible($informations, $submitBtn)
        getInvisible($resultMessage, $returnBtn)
        resetFormulary()
    }
}

function getInvisible() {
    const args = [...arguments]

    return args.forEach(item => item.style.display = 'none')
}

function getVisible(item1, item2) {
    item1.style.display = 'flex'
    item2.style.display = 'block'
}

const resetFormulary = () => $inputs.forEach(item => item.value = '')

export {screenOperator, $inputs}