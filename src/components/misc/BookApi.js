import axios from 'axios'
import { config } from '../../Constants'

export const bookApi = {
  numberOfBooks,
  getBooks,
  addOrUpdateBook,
  deleteBook,
}

function numberOfBooks() {
  return instance.get('/public/numberOfBooks')
}

function getBooks(user, text) {
  const url = text ? `/api/books?text=${text}` : '/api/books'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function addOrUpdateBook(user, book) {
  return instance.post('/api/books', book, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}

function deleteBook(user, isbn) {
  return instance.delete(`/api/books/${isbn}`, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

// -- Axios
const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

// -- Helper functions
function basicAuth(user) {
  return `Basic ${user.authdata}`
}