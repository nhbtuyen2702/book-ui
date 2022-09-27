import React from 'react'
import { Button, Icon, Image, Modal, Table } from 'semantic-ui-react'

const ModalExampleScrollingContent = ({ books, bookIsbn, bookTitle }) => {
  const [open, setOpen] = React.useState(false)

  let bookList = books.map(book => {
    return (
      <Table.Row key={book.isbn}>
        <Table.Cell>
          <Image src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} size='tiny' bordered rounded />
        </Table.Cell>
        <Table.Cell>{book.isbn}</Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
      </Table.Row>
    )
  })

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>View Detail</Button>}
      size='small'
    >
      <Modal.Header><Icon name='book' />Details</Modal.Header>
      <Modal.Content image scrolling>
        <Table compact striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Cover</Table.HeaderCell>
              <Table.HeaderCell width={4}>ISBN</Table.HeaderCell>
              <Table.HeaderCell width={8}>Title</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {bookList}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Close <Icon name='chevron right' />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleScrollingContent
