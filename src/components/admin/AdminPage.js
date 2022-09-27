import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'
import AdminTab from './AdminTab'

class AdminPage extends Component {
  static contextType = AuthContext

  state = {
    books: [],
    bookIsbn: '',
    bookTitle: '',
    bookTextSearch: '',
    isBooksLoading: false,
    users: [],
    userUsernameSearch: '',
    isUsersLoading: false,
    isAdmin: true,

  }

  componentDidMount() {
    const Auth = this.context // this.context = useAuth()
    const user = Auth.getUser()
    const isAdmin = user.role === 'ADMIN'
    this.setState({ isAdmin })

    this.handleGetUsers()
    this.handleGetBooks()
  }

  handleGetUsers = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isUsersLoading: true })
    bookApi.getUsers(user)
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

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleDeleteUser = (username) => {
    const Auth = this.context
    const user = Auth.getUser()

    bookApi.deleteUser(user, username)
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
    bookApi.getUsers(user, username)
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

  handleAddBook = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { bookIsbn, bookTitle } = this.state
    bookIsbn = bookIsbn.trim()
    bookTitle = bookTitle.trim()
    if (!(bookIsbn && bookTitle)) {
      return
    }

    const book = { isbn: bookIsbn, title: bookTitle }
    bookApi.addBook(user, book)
      .then(() => {
        this.clearBookForm()
        this.handleGetBooks()
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleDeleteBook = (isbn) => {
    const Auth = this.context
    const user = Auth.getUser()

    bookApi.deleteBook(user, isbn)
      .then(() => {
        this.handleGetBooks()
      })
      .catch(error => {
        handleLogError(error)
      })
  }
  clearBookForm = () => {
    this.setState({
      bookIsbn: '',
      bookTitle: ''
    })
  }

  render() {
    if (!this.state.isAdmin) {
      return <Redirect to='/' />
    } else {
      const { books, bookIsbn, bookTitle, bookTextSearch, isBooksLoading, users, userUsernameSearch, isUsersLoading } = this.state
      return (
        <Container>
          <AdminTab //gọi component AdminTab -->chạy vào Constructor và render
            books={books}
            bookIsbn={bookIsbn}
            bookTitle={bookTitle}
            bookTextSearch={bookTextSearch}
            isBooksLoading={isBooksLoading}
            handleSearchBook={this.handleSearchBook}
            handleAddBook={this.handleAddBook}
            handleDeleteBook={this.handleDeleteBook}
            handleInputChange={this.handleInputChange}
            users={users}
            userUsernameSearch={userUsernameSearch}
            isUsersLoading={isUsersLoading}
            handleSearchUser={this.handleSearchUser}
            handleDeleteUser={this.handleDeleteUser}
          />
        </Container>
      )
    }
  }
}

export default AdminPage