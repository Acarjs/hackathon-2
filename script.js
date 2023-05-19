const container = document.querySelector('.container')

const eventUrl = 'https://test-api.codingbootcamp.cz/api/7d2397f8/events'

const getEvents = async () => {
  const res = await fetch(eventUrl)
  const data = await res.json()

  data.forEach((event) => {
    const section = document.createElement('section')
    section.classList.add('events')
    section.innerHTML = `
    <div class="event event__small">
            <h3>${event.name}</h3>
            <img src="${event.image_url}" class='event__img'>
            <div class='buttons'>
            <button class='btn'>More</button>
            <button type="submit" class='register-btn'> <a href="#form" class='register__link'>Register</a> </button>
            </div>
          
    <div class='description off'>
      <span>${event.date}</span>
      <p>${event.description}</p>
    </div>
    </div>
    `
    container.appendChild(section)
  })

  const btn = document.querySelectorAll('.btn')

  btn.forEach((button, index) => {
    button.addEventListener('click', () => {
      const descriptions = document.querySelectorAll('.description')
      const currentDescription = descriptions[index]

      currentDescription.classList.toggle('off')
    })
  })

  const registerButtons = document.querySelectorAll('.register-btn')

  registerButtons.forEach((registerButton, index) => {
    registerButton.addEventListener('click', () => {
      const form = document.getElementById('form')
      form.classList.remove('off')
    })
  })
}

getEvents()

const sendData = async () => {
  const formRegistration = {
    first_name: document.querySelector('input[name=fname]').value,
    last_name: document.querySelector('input[name=lname]').value,
    email: document.querySelector('input[name=email]').value,
    number: document.querySelector('input[name=number]').value,
  }

  const eventId = 1
  const sendUrl = `https://test-api.codingbootcamp.cz/api/7d2397f8/events/${eventId}/registrations`
  const registerUser = await fetch(sendUrl, {
    method: 'POST',
    body: JSON.stringify(formRegistration),
    headers: { 'Content-type': 'application/json' },
  })
  const sentData = await registerUser.json()
  if (sentData.status === 'success') {
    alert('Data sent successfully')
  } else {
    alert('Something went wrong!')
  }
}

const sentButton = document.querySelector('.register')
sentButton.addEventListener('click', () => {
  sendData()
})
