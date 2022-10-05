import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

function BookForm({ bookIsbn, bookTitle, bookPrice, handleAddOrUpdateBook, clearBookForm, handleInputChange }) {
  const createBtnDisabled = bookIsbn.trim() === '' || bookTitle.trim() === '' || bookPrice === ''
  const clearBtnDisabled = bookIsbn.trim() === '' && bookTitle.trim() === '' && bookPrice === ''

  return (
    <Form>
      <Form.Group>
        <Form.Input
          name='bookIsbn'
          placeholder='ISBN *'
          value={bookIsbn}
          onChange={handleInputChange}
        />
        <Form.Input
          name='bookTitle'
          placeholder='Title *'
          value={bookTitle}
          onChange={handleInputChange}
        />
        <Form.Input
          name='bookPrice'
          placeholder='Price *'
          value={bookPrice}
          onChange={handleInputChange}
        />
        <Button icon labelPosition='right' disabled={createBtnDisabled} onClick={handleAddOrUpdateBook}>
          Save<Icon name='save' />
        </Button>
        <Button icon labelPosition='right' disabled={clearBtnDisabled} onClick={clearBookForm}>
          Clear<Icon name='delete' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default BookForm