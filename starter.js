var handler = require('./handler.js')
const event = require('./event.js').event

handler.handler(event).then(response => {
  console.log("printing: ")
  console.log(response)
})

// console.log(event.pathParameters)