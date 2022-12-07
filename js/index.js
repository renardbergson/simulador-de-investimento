const $formulary = document.querySelector('#informations')
const $inputs = document.querySelectorAll('#informations input')

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
}

const getInvisible = item => item.style.display = 'none'
const getVisible = (item, display) => {display ? item.style.display = display : item.style.display = 'block'}
const resetFormulary = () => $inputs.forEach(item => item.value = '')