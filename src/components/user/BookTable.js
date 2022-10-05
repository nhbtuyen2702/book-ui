import React from 'react';
import { Button, Container, Image, Table } from 'semantic-ui-react';

function BookTable({ cart, handleAddBookToCart, handleRemoveBookFromCart, handleDeleteBookFromCart, handleCheckout, handleCalculateTotal }) {
  let bookList
  let totalAmount = handleCalculateTotal('amount');

  if (cart.length === 0) {
    bookList = (
      <Table.Row key='no-book'>
        <Table.Cell collapsing textAlign='center' colSpan='11'>No book</Table.Cell>
      </Table.Row>
    )
  } else {
    bookList = cart.map(item => {
      return (
        <Table.Row key={item.isbn}>
          <Table.Cell collapsing>
            <Button
              circular
              color='green'
              size='small'
              icon='plus'
              onClick={() => handleAddBookToCart(item)}
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Button
              circular
              color='yellow'
              size='small'
              icon='minus'
              onClick={() => handleRemoveBookFromCart(item)}
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteBookFromCart(item)}
            />
          </Table.Cell>
          <Table.Cell>
            <Image src={`http://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`} size='tiny' bordered rounded />
          </Table.Cell>
          <Table.Cell>{item.isbn}</Table.Cell>
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.price}</Table.Cell>
          <Table.Cell>{item.quantity}</Table.Cell>
          <Table.Cell>{item.amount}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={1}>Cover</Table.HeaderCell>
            <Table.HeaderCell width={1}>ISBN</Table.HeaderCell>
            <Table.HeaderCell width={1}>Title</Table.HeaderCell>
            <Table.HeaderCell width={1}>Price</Table.HeaderCell>
            <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
            <Table.HeaderCell width={1}>Amount</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
      <Container>
        {totalAmount > 0 &&
          <Button
            color='black'
            size='small'
            onClick={() => handleCheckout(cart)}
          >Total Amount: ${totalAmount}</Button>
        }
      </Container>
    </>
  )
}

export default BookTable