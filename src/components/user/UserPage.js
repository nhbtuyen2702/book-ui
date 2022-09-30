import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'
import UserTab from './UserTab'

class UserPage extends Component {
  static contextType = AuthContext

  state = {
    books: [],
    bookTextSearch: '',
    isBooksLoading: false,
    isUser: true,
    cart: []
  }

  componentDidMount() {
    const Auth = this.context
    const user = Auth.getUser()
    const isUser = user.role === 'USER'
    this.setState({ isUser })

    this.handleGetBooks()
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleGetBooks = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isBooksLoading: true })
    bookApi.getBooks(user)
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isBooksLoading: false })
      })
  }

  handleSearchBook = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const text = this.state.bookTextSearch
    bookApi.getBooks(user, text)
      .then(response => {
        const books = response.data
        this.setState({ books })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ books: [] })
      })
  }

  handleAddBookToCart = (book) => {
    let { cart } = this.state;

    const bookExist = cart.find((item) => {
      return item.isbn === book.isbn
    });

    if (bookExist) {
      this.setState({
        cart: cart.map((item) => {
          return item.isbn === book.isbn ? { ...bookExist, quantity: bookExist.quantity + 1, amount: book.price * (bookExist.quantity + 1) } : item
        })
      })
    } else {
      this.setState({
        cart: [...cart, { ...book, quantity: 1, amount: book.price * 1 }]
      })
    }

  }

  handleRemoveBookFromCart = (book) => {
    let { cart } = this.state;

    const bookExist = cart.find((item) => {
      return item.isbn === book.isbn
    });

    if (bookExist.quantity === 1) {
      this.setState({
        cart: cart.filter((item) => {
          return item.isbn !== book.isbn
        })
      })
    } else {
      this.setState({
        cart: cart.map((item) => {
          return item.isbn === book.isbn ? { ...bookExist, quantity: bookExist.quantity - 1, amount: book.price * (bookExist.quantity - 1) } : item
        })
      })
    }

  }

  handleDeleteBookFromCart = (book) => {
    let { cart } = this.state;

    this.setState({
      cart: cart.filter((item) => {
        return item.isbn !== book.isbn
      })
    })
  }

  handleCheckout = () => {
    let { cart } = this.state;

    const Auth = this.context
    const user = Auth.getUser()

    let totalAmount = this.handleCalculateTotal('amount');
    let totalQuantity = this.handleCalculateTotal('quantity')
    let mycart = { totalAmount: totalAmount, totalQuantity: totalQuantity, name: user.name, books: cart }

    bookApi.createOrder(user, mycart)
      .then(response => {
        alert('Thanks for your order.')
        this.setState({
          cart: []
        })
        console.log('success.');
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        console.log('finally.');
      })
  }

  handleCalculateTotal = (name) => {
    let { cart } = this.state;

    let totalAmount = cart.reduce((amount, item) => {
      return amount + item[name]
    }, 0)

    return totalAmount;

  }

  render() {
    if (!this.state.isUser) {
      return <Redirect to='/' />
    } else {
      const { books, bookTextSearch, isBooksLoading, cart } = this.state
      return (
        <Container>
          <UserTab
            books={books}
            bookTextSearch={bookTextSearch}
            handleSearchBook={this.handleSearchBook}
            isBooksLoading={isBooksLoading}
            handleInputChange={this.handleInputChange}
            cart={cart}
            handleAddBookToCart={this.handleAddBookToCart}
            handleRemoveBookFromCart={this.handleRemoveBookFromCart}
            handleDeleteBookFromCart={this.handleDeleteBookFromCart}
            handleCheckout={this.handleCheckout}
            handleCalculateTotal={this.handleCalculateTotal}
          />
        </Container>

      )
    }
  }
}

export default UserPage