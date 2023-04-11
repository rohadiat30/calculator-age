const synth = window.speechSynthesis

let months = [31,28,31,30,31,30,31,31,30,31,30,31]
let dayInput = document.querySelector('#dayInput')
let monthInput = document.querySelector('#monthInput')
let yearInput = document.querySelector('#yearInput')

// SPEECH 
function speak(sayAge) {
  const speechText = new SpeechSynthesisUtterance(sayAge)
  synth.speak(speechText)
}

// DISPLAY RESULTS
function displayResult(bDate, bMonth, bYear) {
  yearOutput.querySelector('.output').innerHTML = bYear
  monthOutput.querySelector('.output').innerHTML = bMonth
  dayOutput.querySelector('.output').innerHTML = bDate
}

function ageCalculator() {
  let dayValue = document.querySelector('#dayInput').value
  let dayOutput = document.querySelector('#dayOutput')
  let monthValue = document.querySelector('#monthInput').value
  let monthOutput = document.querySelector('#monthOutput')
  let yearValue = document.querySelector('#yearInput').value
  let yearOutput = document.querySelector('#yearOutput')


  let today = new Date()
  // let inputDate = new Date(yearValue, monthValue, dayValue)
  let currentYear = today.getFullYear()
  let currentDate = today.getDate()
  let currentMonth = today.getMonth() + 1
  let birthDate, birthMonth, birthYear
  
  leapChecker(currentYear)

  let birthDetails = {
    date: dayValue,
    month: monthValue,
    year: yearValue
  }

  console.log(birthDetails.year, birthDetails.date, birthDetails.month)

  birthYear = currentYear - birthDetails.year

  // For Month
  if(currentMonth >= birthDetails.month) {
    birthMonth = currentMonth - birthDetails.month
  }else {
    birthYear--
    birthMonth = 12 + currentMonth - birthDetails.month
  }

  // For Date
  if(currentDate >= birthDetails.date) {
    birthDate = currentDate - birthDetails.date
  }else {
    birthMonth--
    let days = months[currentMonth - 2]
    birthDate = days + currentDate - birthDetails.date
    if(birthMonth < 0) {
      birthMonth = 11
      birthYear--
    }
  }

  // GENERAL CONDITION SUMMED UP TOGETHER
  if(
    birthDetails.year > currentYear ||
    (birthDetails.month > currentMonth &&
      birthDetails.year == currentYear) || 
    (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear) || 
    (birthDate == 10 && birthMonth == 4 && birthYear == 2023) ||
    yearValue === "" || monthValue === "" || dayValue === "" ||
    yearValue == 0 || monthValue == 0 || dayValue == 0 ||
    yearValue > currentYear || monthValue > 12 || dayValue > 31 || 
    (monthValue == 2 && dayValue > 28) ||
    (monthValue == 4 && dayValue > 30) ||
    (monthValue == 6 && dayValue > 30) ||
    (monthValue == 8 && dayValue > 30) ||
    (monthValue == 11 && dayValue > 30)
    ) {
    displayResult("- -", "- -", "- -")
    console.log('true')
    }else{
      displayResult(birthDate, birthMonth, birthYear)
      confetti()
      speak(`Hurray! you are ${birthYear} years old`)
    }
  
    validateEmpty(yearValue, monthValue, dayValue);
    validateFormat(yearValue, monthValue, dayValue, currentYear, currentMonth);
    wholeForm(monthValue, dayValue)
  
}

// FUNCTION = check for leap year
function leapChecker(year) {
  if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
    months[1] = 29
  } else {
    months[1] = 28
  }
}

// FUNCTION = set error
function setError(input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')
  small.innerHTML = message
  formControl.classList.add('error') 
}

// FUNCTION = remove error
function removeError(input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')
  small.innerHTML = message
  formControl.classList.remove('error')

}

// FUNCTION = validate form (when field is empty)
function validateEmpty(year, month, day) {
  if(year === "") {
    displayResult("- -", "- -", "- -")
    setError(yearInput, 'This field is required')
  }else {
    removeError(yearInput, '')
  }

  if(month === "") {
    displayResult("- -", "- -", "- -")
    setError(monthInput, 'This field is required')
  }else {
    removeError(monthInput, '')
  }

  if(day === ""){
    displayResult("- -", "- -", "- -")
    setError(dayInput, 'This field is required')
  }else {
    removeError(dayInput, '')
  }
  
  if(!(year === "") && !(month === "") && !(day === "")) {
    removeError(yearInput, '')
    removeError(monthInput, '')
    removeError(dayInput, '')
  }

}

// FUNCTION = when field is invalid
function validateFormat(year, month, day, cuYear) {
  day = parseInt(day)
  month = parseInt(month)
  if(year > cuYear) {
    displayResult("- -", "- -", "- -")
    setError(yearInput, 'Must be in the past')
  }
  if(month > months.length || month === 0) {
    displayResult("- -", "- -", "- -")
    setError(monthInput, 'Must be a valid month')
  }
  if(day > 31 || day === 0) {
    displayResult("- -", "- -", "- -")
    setError(dayInput, 'Must be a valid day')
  }
}

// FUNCTION = months that are right
function wholeForm(month, day) {
  month = parseInt(month)
  day = parseInt(day)

  // february 28
  if((month === 2 || month === 02) && day > 28) {
    displayResult("- -", "- -", "- -")
    setError(dayInput, 'Must be a valid date')
  }

  // April 30
  if((month === 4 || month === 04) && day > 30) {
    displayResult("- -", "- -", "- -")
    setError(dayInput, 'Must be a valid date')
  }

  // June 30
  if((month === 6 || month === 06) && day > 30) {
    displayResult("- -", "- -", "- -")
    setError(dayInput, 'Must be a valid date')
  }

  // September 30
  if((month === 8 || month === 08) && day > 30) {
    displayResult("- -", "- -", "- -")
    setError(dayInput, 'Must be a valid date')
  }

  // November 30
  if(month === 11 && day > 30) {
    displayResult("- -", "- -", "- -")
    setError(dayInput, 'Must be a valid date')
  }
}