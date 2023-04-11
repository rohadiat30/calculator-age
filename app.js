const validNumber = /^(0|[0-9][0-9]*)$/;
const form = document.querySelector('form');
const day = form.querySelector('#day');
const month = form.querySelector('#month');
const year = form.querySelector('#year');
const button = document.querySelector('#render-btn');
const dayDisplay = document.querySelector('#dayDisplay');
const monthDisplay = document.querySelector('#monthDisplay');
const yearDisplay = document.querySelector('#yearDisplay');
const inputs = document.querySelectorAll('input');

// When input is invalid
inputs.forEach(input => {
  input.addEventListener('keyup', () => {
    if(isNaN(input.value)) {
      input.nextElementSibling.innerHTML = 'Please enter numbers only'
      input.value = ''
      input.parentElement.classList.add('error')
    } else {
      input.nextElementSibling.innerHTML = ''
    }
  })
})


// Submitting form on click
button.addEventListener('click', () => {
  checkInputs();
})

function checkInputs() {
  const dayValue = day.value.trim()
  const monthValue = month.value.trim()
  const yearValue = year.value.trim()
  let x

  validateOnEmpty(dayValue, monthValue, yearValue)
  validateOnFormat(dayValue, monthValue, yearValue)
}

 // When input field is empty
 function validateOnEmpty(dayVal, monthVal, yearVal) {
  if(dayVal === "") {
    setErrorFor(day, "This field is required")
  } else {
    submitInput(dayDisplay, dayVal)
  }
  if(monthVal === "") {
    setErrorFor(month, "This field is required")
  } else {
    submitInput(monthDisplay, monthVal)
  }
  if(yearVal === "") {
    setErrorFor(year, "This field is required")
    
  } else {
    submitInput(yearDisplay, yearVal)
  }
}

function validateOnFormat(dayForm, monthForm, yearForm) {
  const currentDate = new Date().getFullYear()
  // Valid inputs
  if(dayForm.length > 2 || dayForm > 31) {
    setErrorFor(day, "Must be a valid date")
    submitInput(dayDisplay, '- -')
    dayForm = false
  } else if(dayForm.length == 1) {
    submitInput(dayDisplay, 0 + dayForm)
  }else {
    submitInput(dayDisplay, dayForm)
    dayForm = true
  }
  if(monthForm.length > 2 || monthForm > 12) {
    setErrorFor(month, "Must be a valid date")
    submitInput(monthDisplay, '- -')
     monthForm = false
  } else {
    submitInput(monthDisplay, monthForm)
    monthForm = true
  }
  if(yearForm.length > 4 || yearForm.length < 4 || currentYear(yearForm) == false) {
    setErrorFor(year, "Must be a valid date")
    submitInput(yearDisplay, '- -')
     yearForm = false
  } else {
    submitInput(yearDisplay, currentDate - yearForm)
    yearForm = true
  }

  if(dayForm && monthForm && yearForm) {
    return this
  } else {
    submitInput(dayDisplay, '- -')
    submitInput(monthDisplay, '- -')
    submitInput(yearDisplay, '- -')
  }
}

// Validate year format (to make sure the inputYear is not greater than the current year)
function currentYear(value) {
  const date = new Date();
  const getYear = date.getFullYear()
  if(value > getYear) {
    return false
  } else {
    return true
  }
}

// Error function
function setErrorFor(input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small');
  // add error 
  small.innerText = message
  formControl.classList.add('error')
}

// Submit function
function submitInput(input, value) {
  const outputDisplay = input.querySelector('.output')
  // render value
  outputDisplay.innerText = value || "- -";
}