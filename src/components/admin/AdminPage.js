import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'
import { orderApi } from '../misc/OrderApi'
import { userApi } from '../misc/UserApi'
import AdminTab from './AdminTab'

class AdminPage extends Component {
  static contextType = AuthContext

  state = {
    books: [],
    bookIsbn: '',
    bookTitle: '',
    bookPrice: '',
    bookTextSearch: '',
    isBooksLoading: false,
    users: [],
    userUsernameSearch: '',
    isUsersLoading: false,
    isAdmin: true,
    orders: [],
    orderTextSearch: '',
    isOrdersLoading: false
  }

  componentDidMount() {
    const Auth = this.context // this.context = useAuth()
    const user = Auth.getUser()
    const isAdmin = user.role === 'ADMIN'
    this.setState({ isAdmin })

    this.handleGetUsers()
    this.handleGetBooks()
    this.handleGetOrders()
  }

  handleGetUsers = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isUsersLoading: true })
    userApi.getUsers(user)
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isUsersLoading: false })
      })
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

  handleGetOrders = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isOrdersLoading: true })
    orderApi.getOrders(user)
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isOrdersLoading: false })
      })
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleDeleteUser = (username) => {
    const Auth = this.context
    const user = Auth.getUser()

    userApi.deleteUser(user, username)
      .then(() => {
        this.handleGetUsers()
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleSearchUser = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const username = this.state.userUsernameSearch
    userApi.getUsers(user, username)
      .then(response => {
        const data = response.data
        const users = data instanceof Array ? data : [data]
        this.setState({ users })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ users: [] })
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

  handleAddOrUpdateBook = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { bookIsbn, bookTitle, bookPrice } = this.state
    bookIsbn = bookIsbn.trim()
    bookTitle = bookTitle.trim()
    if (!(bookIsbn && bookTitle && bookPrice)) {
      return
    }

    const book = { isbn: bookIsbn, title: bookTitle, price: bookPrice }
    bookApi.addOrUpdateBook(user, book)
      .then(() => {
        this.clearBookForm()
        this.handleGetBooks()
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  clearBookForm = () => {
    this.setState({
      bookIsbn: '',
      bookTitle: '',
      bookPrice: ''
    })
  }

  handleBindBook = (book) => {
    this.setState({
      bookIsbn: book.isbn,
      bookTitle: book.title,
      bookPrice: book.price
    })
  }

  handleSearchOrder = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const text = this.state.orderTextSearch
    orderApi.getOrders(user, text)
      .then(response => {
        const orders = response.data
        this.setState({ orders })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ orders: [] })
      })
  }

  render() {
    if (!this.state.isAdmin) {
      return <Redirect to='/' />
    } else {
      const Auth = this.context
      const user = Auth.getUser()

      const { books, bookIsbn, bookTitle, bookPrice, bookTextSearch, isBooksLoading, users, userUsernameSearch, isUsersLoading, orders, orderTextSearch, isOrdersLoading } = this.state
      return (
        <Container>
          <AdminTab //gọi component AdminTab -->chạy vào Constructor và render
            books={books}
            bookIsbn={bookIsbn}
            bookTitle={bookTitle}
            bookPrice={bookPrice}
            bookTextSearch={bookTextSearch}
            isBooksLoading={isBooksLoading}
            handleSearchBook={this.handleSearchBook}
            handleAddOrUpdateBook={this.handleAddOrUpdateBook}
            handleBindBook={this.handleBindBook}
            clearBookForm={this.clearBookForm}
            handleInputChange={this.handleInputChange}

            users={users}
            userUsernameSearch={userUsernameSearch}
            isUsersLoading={isUsersLoading}
            handleSearchUser={this.handleSearchUser}
            handleDeleteUser={this.handleDeleteUser}

            orders={orders}
            orderTextSearch={orderTextSearch}
            isOrdersLoading={isOrdersLoading}
            handleSearchOrder={this.handleSearchOrder}

            user={user}
          />
        </Container>
      )
    }
  }
}

export default AdminPage