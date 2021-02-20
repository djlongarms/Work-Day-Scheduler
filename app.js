document.getElementById('currentDay').textContent = moment().format('dddd, MMMM Do')

let timeBlocks = []
for(let i = 9; i <= 17; i++) {
  let block = document.createElement("section")
  block.className = "row time-block"
  block.innerHTML = `
    <div class="col-sm-1 hour">${((i - 1) % 12) + 1}AM</div>
    <textArea class="col-sm-10"></textArea>
    <div class="col-sm-1 saveBtn"></div>
  `
  if(i < moment().hour()) {
    block.classList.add('past')
  } else if(i > moment().hour()) {
    block.classList.add('future')
  } else {
    block.classList.add('present')
  }
  timeBlocks.push(block)
  document.getElementById('schedule').append(block)
}