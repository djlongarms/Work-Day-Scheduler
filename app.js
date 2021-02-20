// Sets the date at the bottom of the jumbotron
document.getElementById('currentDay').textContent = moment().format('dddd, MMMM Do')

// Creates an array to store the time-blocks for access later
let timeBlocks = []

// Creates an array to store events from localStorage
let currentEvents = JSON.parse(localStorage.getItem('currentEvents')) || []


// Creates section elements for times between 9AM and 5PM
for(let i = 0; i <= 8; i++) {
  // Creates new section element, then adds classes and inner HTML to make the section a time-block
  let block = document.createElement("section")
  block.className = "row time-block"
  block.innerHTML = `
    <div class="col-sm-1 hour">${((i + 8) % 12) + 1}AM</div>
    <textArea class="col-sm-10"></textArea>
    <div class="col-sm-1 saveBtn">
      <i class="fa fa-save save"></i>
    </div>
  `

  // Checks if the current time-block is in the past, present, or future and adds a class accordingly
  if(i + 9 < moment().hour()) {
    block.classList.add('past')
  } else if(i + 9 > moment().hour()) {
    block.classList.add('future')
  } else {
    block.classList.add('present')
  }

  // Gives textArea the proper event if one has been saved previously
  if(currentEvents[i] !== undefined) {
    block.childNodes[3].value = currentEvents[i]
  }

  // Adds block to timeBlocks array, then appends block to schedule container
  timeBlocks.push(block)
  document.getElementById('schedule').append(block)
}

// Listens for a click on the save icon in a saveBtn element
document.addEventListener('click', event => {
  // Checks to ensure we have clicked the correct icon
  if(event.target.classList.contains('save')) {
    // Gets the text and stores it in newEvent
    let newEvent = event.target.parentElement.parentElement.childNodes[3].value

    // Gets index of the currently clicked block within the timeBlocks array
    let index = timeBlocks.indexOf(event.target.parentElement.parentElement)

    // Sets the correspondingly indexed element of currentEvents to have the newEvent text
    currentEvents[index] = newEvent

    // Sets the local storage to have the updated currentEvents array
    localStorage.setItem('currentEvents', JSON.stringify(currentEvents))
  }
})