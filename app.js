// Sets the date at the bottom of the jumbotron
$('#currentDay').text(moment().format('dddd, MMMM Do'))

// Creates an array to store the time-blocks for access later
let timeBlocks = []

// Creates an array to store events from localStorage
let currentEvents = JSON.parse(localStorage.getItem('currentEvents')) || []


// Creates section elements for timeblocks between 9AM and 5PM
for(let i = 0; i <= 8; i++) {
  // Creates new section element, then adds classes
  let block = $('<section>')
  block.addClass("row time-block")

  // Decides whether to use "AM" of "PM"
  let timeCode = ''
  if(i < 3) {
    timeCode = "AM"
  } else {
    timeCode = "PM"
  }

  // Sets inner HTML for the block
  block.html(`
    <div class="col-sm-1 hour">${(((i + 8) % 12) + 1)}${timeCode}</div>
    <textArea class="col-sm-10"></textArea>
    <div class="col-sm-1 saveBtn">
      <i class="fa fa-save save"></i>
    </div>
  `)

  // Checks if the current time-block is in the past, present, or future and adds a class accordingly
  if(i + 9 < moment().hour()) {
    block.addClass('past')
  } else if(i + 9 > moment().hour()) {
    block.addClass('future')
  } else {
    block.addClass('present')
  }

  // Gives textArea the proper event if one has been saved previously
  if(currentEvents[i] !== undefined) {
    block.children("textArea").val(currentEvents[i])
  }

  // Adds block to timeBlocks array, then appends block to schedule container
  timeBlocks.push(block[0])
  $('#schedule').append(block)
}

// Listens for a click on the save icon in a saveBtn element
$("*").click(event => {
  // Checks to ensure we have clicked the correct icon
  if($(event.target).hasClass('save')) {
    // Gets the text and stores it in newEvent
    let newEvent = $(event.target).parent().parent().children("textArea").val()

    // Gets index of the currently clicked block within the timeBlocks array
    let index = jQuery.inArray($(event.target).parent().parent()[0], timeBlocks)

    // Sets the correspondingly indexed element of currentEvents to have the newEvent text
    currentEvents[index] = newEvent

    // Sets the local storage to have the updated currentEvents array
    localStorage.setItem('currentEvents', JSON.stringify(currentEvents))
  }
})