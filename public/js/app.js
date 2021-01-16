const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From Javascript'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent= ''
    
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data2) => {
            if (data2.error) {
                messageOne.textContent = data2.error
            } else {
                messageOne.textContent = data2.location
                messageTwo.textContent = data2.forcast
            }
        })
    })
})

console.log('Hello')
