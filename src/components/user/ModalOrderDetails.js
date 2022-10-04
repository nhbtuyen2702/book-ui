import React from 'react'
import { Button, Icon, Image, Modal, Table } from 'semantic-ui-react'
import { bookApi } from '../misc/BookApi'

const ModalOrderDetails = ({ orderId, user }) => {
  const [open, setOpen] = React.useState(false)
  const [orderDetailList, setOrderDetailList] = React.useState([])

  async function handleGetOrderDetails() {
    let response = await bookApi.getOrderDetails(user, orderId)

    if (response != '') {
      let list = response.data.map(orderDetail => {
        return (
          <Table.Row key={orderDetail.id}>
            <Table.Cell>
              <Image src={`http://covers.openlibrary.org/b/isbn/${orderDetail.book.isbn}-M.jpg`} size='tiny' bordered rounded />
            </Table.Cell>
            <Table.Cell>{orderDetail.book.isbn}</Table.Cell>
            <Table.Cell>{orderDetail.book.title}</Table.Cell>
            <Table.Cell>{orderDetail.book.price}</Table.Cell>
            <Table.Cell>{orderDetail.quantity}</Table.Cell>
            <Table.Cell>{orderDetail.amount}</Table.Cell>
          </Table.Row>
        )
      })
      setOrderDetailList(list)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button
          circular
          color='blue'
          size='small'
          onClick={handleGetOrderDetails}
        >View Details <Icon name='chevron right' /></Button>
      }
    >
      <Modal.Header><Icon name='book' />Details</Modal.Header>
      <Modal.Content image scrolling>
        <Table compact striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Cover</Table.HeaderCell>
              <Table.HeaderCell width={3}>ISBN</Table.HeaderCell>
              <Table.HeaderCell width={3}>Title</Table.HeaderCell>
              <Table.HeaderCell width={3}>Price</Table.HeaderCell>
              <Table.HeaderCell width={3}>Quantity</Table.HeaderCell>
              <Table.HeaderCell width={3}>Amount</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orderDetailList}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalOrderDetails
