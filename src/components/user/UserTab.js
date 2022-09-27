import React from 'react'
import { Tab } from 'semantic-ui-react'
import BookList from './BookList'
import BookTable from './BookTable'

function UserTab(props) {
    const { handleInputChange } = props
    const { books, bookTextSearch, handleSearchBook, isBooksLoading } = props
    const { cart, handleAddBookToCart, handleRemoveBookFromCart, handleCheckout } = props

    let totalQuantity = cart.reduce((quantity, item) => {
        return quantity + item.quantity
    }, 0)

    const panes = [
        {
            menuItem: { key: 'books', icon: 'book', content: 'Books' },
            render: () => (
                <Tab.Pane loading={isBooksLoading}>
                    <BookList
                        books={books}
                        bookTextSearch={bookTextSearch}
                        handleSearchBook={handleSearchBook}
                        handleAddBookToCart={handleAddBookToCart}
                        isBooksLoading={isBooksLoading}
                        handleInputChange={handleInputChange}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'cart', icon: 'cart', content: totalQuantity },
            render: () => (
                <Tab.Pane loading={isBooksLoading}>
                    <BookTable
                        cart={cart}
                        bookTextSearch={bookTextSearch}
                        handleSearchBook={handleSearchBook}
                        handleAddBookToCart={handleAddBookToCart}
                        handleRemoveBookFromCart={handleRemoveBookFromCart}
                        handleCheckout={handleCheckout}
                        handleInputChange={handleInputChange}
                    />
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes} />
    )
}

export default UserTab