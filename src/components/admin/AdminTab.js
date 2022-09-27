import React from 'react'
import { Tab } from 'semantic-ui-react'
import BookTable from './BookTable'
import UserTable from './UserTable'

function AdminTab(props) {
  const { books, bookIsbn, bookTitle, bookTextSearch, isBooksLoading, handleSearchBook, handleAddBook, handleDeleteBook } = props
  const { users, userUsernameSearch, isUsersLoading, handleSearchUser, handleDeleteUser } = props
  const { handleInputChange } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Users' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleSearchUser={handleSearchUser}
            handleDeleteUser={handleDeleteUser}
            handleInputChange={handleInputChange}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'books', icon: 'book', content: 'Books' },
      render: () => (
        <Tab.Pane loading={isBooksLoading}>
          <BookTable
            books={books}
            bookIsbn={bookIsbn}
            bookTitle={bookTitle}
            bookTextSearch={bookTextSearch}
            handleSearchBook={handleSearchBook}
            handleAddBook={handleAddBook}
            handleDeleteBook={handleDeleteBook}
            handleInputChange={handleInputChange}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'order', icon: 'folder open', content: 'order' },
      render: () => (
        <Tab.Pane loading={isBooksLoading}>
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab