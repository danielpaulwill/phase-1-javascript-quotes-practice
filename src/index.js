document.addEventListener('DOMContentLoaded', autoFunc)
let quoteContainer = document.getElementById('quote-list')

function autoFunc() {
  initialize()
  newQuote()
};

// Initial render of the quote list to the DOM
function initialize() {
fetch('http://localhost:3000/quotes?_embed=likes')
.then(res => res.json())
.then(data => {
  console.log(data)
  data.forEach(eachQuote => quoteCardMaker(eachQuote)
  )}
)};

function quoteCardMaker(eachQuote) {
  let quoteCard = document.createElement('li')
  quoteCard.className = 'quote-card'
  let blockQuote = document.createElement('blockquote')
  blockQuote.className = 'blockquote'
  let quoteText = document.createElement('p')
  quoteText.className = 'mb-0'
  quoteText.innerText = `${eachQuote.quote}`
  let quoteFooter = document.createElement('footer')
  quoteFooter.className = 'blockquote-footer'
  quoteFooter.innerText = `${eachQuote.author}`
  let quoteBreak = document.createElement('br')
  let likeButton = document.createElement('button')
  likeButton.className = 'btn-success'
  likeButton.innerText = 'Likes: '
  let likeSpan = document.createElement('span')
  likeSpan.innerText = `${eachQuote.likes.length}`
  likeButton.addEventListener('click', e => {
    let quoteId = parseInt(`${eachQuote.id}`)
    likeIncrement(likeSpan, quoteId)
  })
  let deleteButton = document.createElement('button')
  deleteButton.className = 'btn-danger'
  deleteButton.innerText = 'Delete'
  deleteButton.addEventListener('click', e => {
    quoteCard.remove()
    fetch(`http://localhost:3000/quotes/${eachQuote.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }})
    .then(res => res.json())
    .then(data => console.log(data))
  })
// Below is appending the above to the DOM
  likeButton.append(likeSpan)
  blockQuote.append(quoteText)
  blockQuote.append(quoteFooter)
  blockQuote.append(quoteBreak)
  blockQuote.append(likeButton)
  blockQuote.append(deleteButton)
  quoteCard.append(blockQuote)
  quoteContainer.append(quoteCard)
}


function newQuote() {
  let submitButton = document.getElementById('new-quote-form')
  let newQuoteInput = document.getElementById('new-quote')
  let newAuthorInput = document.getElementById('author')
  submitButton.addEventListener('submit', e => {
    e.preventDefault()
    fetch('http://localhost:3000/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'quote': `${newQuoteInput.value}`,
        'author': `${newAuthorInput.value}`
      }),
    })
    .then(res => res.json())
    .then(data => {
    quoteCardMaker(data)
  })
})};


function likeIncrement(likeSpan, quoteId) {
  fetch('http://localhost:3000/likes', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      'quoteId': parseInt(`${quoteId}`)
    })
  })
  fetch(`http://localhost:3000/quotes/${quoteId}?_embed=likes`)
  .then(res => res.json())
  .then(data => {
    likeSpan.innerText = ''
    likeSpan.innerText = `${data.likes.length}`
  })
};






// IMPORTANT: if the quoteID is a string for some reason 
// (for example, if you've pulled the ID from a dataset) 
// the index page will not include the like you create on 
// any quote.