// Sets the date at the bottom of the jumbotron
document.getElementById('currentDay').textContent = moment().format('dddd, MMMM Do')

// Creates an array to store the time-blocks for access later
let timeBlocks = []

// Creates section elements for times between 9AM and 5PM
for(let i = 9; i <= 17; i++) {
  // Creates new section element, then adds classes and inner HTML to make the section a time-block
  let block = document.createElement("section")
  block.className = "row time-block"
  block.innerHTML = `
    <div class="col-sm-1 hour">${((i - 1) % 12) + 1}AM</div>
    <textArea class="col-sm-10"></textArea>
    <div class="col-sm-1 saveBtn"></div>
  `

  // Checks if the current time-block is in the past, present, or future and adds a class accordingly
  if(i < moment().hour()) {
    block.classList.add('past')
  } else if(i > moment().hour()) {
    block.classList.add('future')
  } else {
    block.classList.add('present')
  }

  // Adds block to timeBlocks array, then appends block to schedule container
  timeBlocks.push(block)
  document.getElementById('schedule').append(block)
}