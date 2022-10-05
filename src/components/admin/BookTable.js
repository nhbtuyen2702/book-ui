import React from 'react'
import { Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import BookForm from './BookForm'

function BookTable({ books, bookIsbn, bookTitle, bookPrice, bookTextSearch, handleSearchBook, handleAddOrUpdateBook, handleBindBook, clearBookForm, handleInputChange }) {
  let bookList
  if (books.length === 0) {
    bookList = (
      <Table.Row key='no-book'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No book</Table.Cell>
      </Table.Row>
    )
  } else {
    bookList = books.map(book => {
      return (
        <Table.Row key={book.isbn} onClick={() => {
          handleBindBook(book)
        }}>
          <Table.Cell>
            <Image src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} size='tiny' bordered rounded />
          </Table.Cell>
          <Table.Cell>{book.isbn}</Table.Cell>
          <Table.Cell>{book.title}</Table.Cell>
          <Table.Cell>{book.price}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='4'>
          <Grid.Column width='4'>
            <BookForm
              bookIsbn={bookIsbn}
              bookTitle={bookTitle}
              bookPrice={bookPrice}
              handleAddOrUpdateBook={handleAddOrUpdateBook}
              clearBookForm={clearBookForm}
              handleInputChange={handleInputChange}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns='4'>
          <Grid.Column width='4'>
            <Form onSubmit={handleSearchBook}>
              <Input
                action={{ icon: 'search' }}
                name='bookTextSearch'
                placeholder='Search by ISBN or Title'
                value={bookTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>

        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>Cover</Table.HeaderCell>
            <Table.HeaderCell width={1}>ISBN</Table.HeaderCell>
            <Table.HeaderCell width={1}>Title</Table.HeaderCell>
            <Table.HeaderCell width={1}>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
    </>
  )
}

export default BookTable