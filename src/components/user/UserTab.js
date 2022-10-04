import React from 'react'
import { Tab } from 'semantic-ui-react'
import BookList from './BookList'
import BookTable from './BookTable'
import OrderTable from './OrderTable'

function UserTab(props) {
    const { handleInputChange } = props
    const { books, bookTextSearch, handleSearchBook, isBooksLoading } = props
    const { cart, handleAddBookToCart, handleRemoveBookFromCart, handleDeleteBookFromCart, handleCheckout, handleCalculateTotal } = props
    const { orders, isOrdersLoading, user } = props

    let totalQuantity = handleCalculateTotal('quantity');

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
                        handleDeleteBookFromCart={handleDeleteBookFromCart}
                        handleCheckout={handleCheckout}
                        handleInputChange={handleInputChange}
                        handleCalculateTotal={handleCalculateTotal}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'orders', icon: 'file', content: 'Your Orders' },
            render: () => (
                <Tab.Pane loading={isOrdersLoading}>
                    <OrderTable
                        orders={orders}
                        user={user}
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