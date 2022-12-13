const $inputs = document.querySelectorAll('#informations input')

function screenOperator() {
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
const getVisible = (item, display) => {display ? item.style.display = display : item.style.display = 'block'}
const resetFormulary = () => $inputs.forEach(item => item.value = '')

export {screenOperator, $inputs}