import axios from 'axios'
import { config } from '../../Constants'

export const orderApi = {
  createOrder,
  getOrders,
  getOrderDetails
}

function createOrder(user, cart) {
  return instance.post('/api/orders/checkout', cart, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}

function getOrders(user, text) {
  const url = text ? `/api/orders?text=${text}` : '/api/orders'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function getOrderDetails(user, orderId) {
  return instance.get(`/api/orders/${orderId}`, {
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