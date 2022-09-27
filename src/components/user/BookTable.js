import React from 'react'
import { Button, Image, Table } from 'semantic-ui-react'

function BookTable({ cart, handleAddBookToCart, handleRemoveBookFromCart, handleCheckout }) {
  let bookList
  let totalPrice
  if (cart.length === 0) {
    bookList = (
      <Table.Row key='no-book'>
        <Table.Cell collapsing textAlign='center' colSpan='11'>No book</Table.Cell>
      </Table.Row>
    )
  } else {
    totalPrice = cart.reduce((price, item) => {
      return price + item.quantity * item.price
    }, 0)

    bookList = cart.map(item => {
      return (
        <Table.Row key={item.isbn}>
          <Table.Cell collapsing>
            <Button
              circular
              color='green'
              size='small'
              icon='cart plus'
              onClick={() => handleAddBookToCart(item)}
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='cart arrow down'
              onClick={() => handleRemoveBookFromCart(item)}
            />
          </Table.Cell>
          <Table.Cell>
            <Image src={`http://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`} size='tiny' bordered rounded />
          </Table.Cell>
          <Table.Cell>{item.isbn}</Table.Cell>
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.price}</Table.Cell>
          <Table.Cell>{item.quantity}</Table.Cell>
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
            <Table.HeaderCell width={2}>Cover</Table.HeaderCell>
            <Table.HeaderCell width={2}>ISBN</Table.HeaderCell>
            <Table.HeaderCell width={2}>Title</Table.HeaderCell>
            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
            <Table.HeaderCell width={2}>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
      {totalPrice > 0 &&
        <Button
          color='green'
          size='small'
          onClick={() => handleCheckout(cart)}
        >Total Price: ${totalPrice}</Button>
      }
    </>
  )
}

export default BookTable