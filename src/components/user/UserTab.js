import React from 'react'
import { Tab } from 'semantic-ui-react'
import BookTable from './BookTable'
import BookList from './BookList'

function UserTab(props) {
    const { handleInputChange } = props
    const { cart, handleAddBookToCart, handleRemoveBookFromCart, handleCheckout } = props
    const { isBooksLoading, books, bookTextSearch, handleSearchBook } = props
    let totalQuantity = cart.reduce((quantity, item) => {
        return quantity + item.quantity
    }, 0)
    const panes = [
        {
            menuItem: { key: 'books', icon: 'book', content: 'Books' },
            render: () => (
                <Tab.Pane loading={isBooksLoading}>
                    <BookList
                        isBooksLoading={isBooksLoading}
                        bookTextSearch={bookTextSearch}
                        books={books}
                        handleInputChange={handleInputChange}
                        handleSearchBook={handleSearchBook}
                        handleAddBookToCart={handleAddBookToCart}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'cart', icon: 'cart', content: totalQuantity },
            render: () => (
                <Tab.Pane loading={isBooksLoading}>
                    <BookTable
                        bookTextSearch={bookTextSearch}
                        cart={cart}
                        handleInputChange={handleInputChange}
                        handleSearchBook={handleSearchBook}
                        handleAddBookToCart={handleAddBookToCart}
                        handleRemoveBookFromCart={handleRemoveBookFromCart}
                        handleCheckout={handleCheckout}
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