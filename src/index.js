document.addEventListener('DOMContentLoaded', initialize)
let quoteContainer = document.getElementById('quote-list')

// Initial render of the quote list to the DOM
function initialize() {
fetch('http://localhost:3000/quotes?_embed=likes')
.then(res => res.json())
.then(data => {
  console.log(data)
  data.forEach(eachQuote => {
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
    likeSpan.innerText = `${eachQuote.likes}`
    let deleteButton = document.createElement('button')
    deleteButton.className = 'btn-danger'
    deleteButton.innerText = 'Delete'
// Below is appending the above to the DOM
    likeButton.append(likeSpan)
    blockQuote.append(quoteText)
    blockQuote.append(quoteFooter)
    blockQuote.append(quoteBreak)
    blockQuote.append(likeButton)
    blockQuote.append(deleteButton)
    quoteCard.append(blockQuote)
    quoteContainer.append(quoteCard)
  })
})
};



