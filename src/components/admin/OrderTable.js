import React from 'react'
import { Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import ModalOrderDetails from './ModalOrderDetails'

function OrderTable({ books, bookIsbn, bookTitle, bookTextSearch, handleSearchBook, handleAddBook, handleDeleteBook, handleInputChange }) {
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
        <Table.Row key={book.isbn}>
          <Table.Cell>
            <Image src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} size='tiny' bordered rounded />
          </Table.Cell>
          <Table.Cell>{book.isbn}</Table.Cell>
          <Table.Cell>{book.title}</Table.Cell>
          <Table.Cell>
            <ModalOrderDetails
              books={books}
              bookIsbn={bookIsbn}
              bookTitle={bookTitle}
            />
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            <Form onSubmit={handleSearchBook}>
              <Input
                action={{ icon: 'search' }}
                name='bookTextSearch'
                placeholder='Search by User'
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
            <Table.HeaderCell width={3}>Order Num</Table.HeaderCell>
            <Table.HeaderCell width={4}>User</Table.HeaderCell>
            <Table.HeaderCell width={4}>Amount</Table.HeaderCell>
            <Table.HeaderCell width={4}>Order Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
    </>
  )
}

export default OrderTable