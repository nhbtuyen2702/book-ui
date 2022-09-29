import React from 'react'
import { Form, Grid, Input, Table } from 'semantic-ui-react'
import ModalOrderDetails from './ModalOrderDetails'

function OrderTable({ orders, orderTextSearch, handleSearchOrder, user, handleInputChange }) {
  let orderList

  if (orders.length === 0) {
    orderList = (
      <Table.Row key='no-order'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No order</Table.Cell>
      </Table.Row>
    )
  } else {
    orderList = orders.map(order => {
      return (
        <Table.Row key={order.id}>
          <Table.Cell>{order.orderNum}</Table.Cell>
          <Table.Cell>{order.orderDate}</Table.Cell>
          <Table.Cell>{order.name}</Table.Cell>
          <Table.Cell>{order.totalQuantity}</Table.Cell>
          <Table.Cell>{order.totalAmount}</Table.Cell>
          <Table.Cell>
            <ModalOrderDetails
              orderId={order.id}
              user={user}
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
            <Form onSubmit={handleSearchOrder}>
              <Input
                action={{ icon: 'search' }}
                name='orderTextSearch'
                placeholder='Search by Name'
                value={orderTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>Order Num</Table.HeaderCell>
            <Table.HeaderCell width={2}>Order Date</Table.HeaderCell>
            <Table.HeaderCell width={2}>Name</Table.HeaderCell>
            <Table.HeaderCell width={2}>Total Quantity</Table.HeaderCell>
            <Table.HeaderCell width={2}>Total Amount</Table.HeaderCell>
            <Table.HeaderCell width={2}>View Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orderList}
        </Table.Body>
      </Table>
    </>
  )
}

export default OrderTable