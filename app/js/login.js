
let loginState = {
    passMatches: true,
    emailMatches: true,
    buttonIsActive: true,
    noBlankInputs: false,
}

function getStateString(className){
    if(className === 'emailInput'){
        return 'emailMatches'
    } else if (className === 'passwordInput') {
        return 'passMatches'
    }
}

function setupLoginEventHandlers(){
    function _setUpValidation(){
        const pairs = [
            'emailInput',
            'passwordInput'
        ]

        let inputs = document.querySelectorAll('.inputToValidate')

        Array.from(inputs).forEach((input) => {
            input.addEventListener('keyup', (e) => {

                let classArray = Array.from(e.target.classList).filter((c) => {
                    return pairs.includes(c)
                })
                
                let className = classArray[0]
                let elementsToMatch = document.querySelectorAll(`.${className}`)
                let button = document.getElementById('submitButton')
                let valueOne = elementsToMatch[0]
                let valueTwo = elementsToMatch[1]
                let stateToCheck = getStateString(className)


                if (!valueOne.value.includes(valueTwo.value)) {
                    if (loginState[stateToCheck]) {
                        loginState[stateToCheck] = false
                        loginState.buttonIsActive = false
                    }
                } else {
                    if (!loginState[stateToCheck]) {
                        loginState[stateToCheck] = true
                        loginState.buttonIsActive = true
                    }
                }

                if (loginState[stateToCheck]){
                    valueOne.classList.contains('invalid')
                        ? valueOne.classList.remove('invalid')
                        : null
                    valueTwo.classList.contains('invalid')
                        ? valueTwo.classList.remove('invalid')
                        : null
                    loginState.buttonIsActive && button.classList.contains('invalidButton')
                        ? button.classList.remove('invalidButton')
                        : null
                } else {
                    !valueOne.classList.contains('invalid')
                        ? valueOne.classList.add('invalid')
                        : null
                    !valueTwo.classList.contains('invalid')
                        ? valueTwo.classList.add('invalid')
                        : null
                    !loginState.buttonIsActive && !button.classList.contains('invalidButton')
                        ? button.classList.add('invalidButton')
                        : null
                }

                console.log(loginState)
            })
        })
    }

    _setUpValidation()
}





function initLogin(){
    setupLoginEventHandlers()
}