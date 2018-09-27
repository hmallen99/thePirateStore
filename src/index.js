import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

/*
This Item Component represents one of the items for sale, with its price and name
*/
class Item extends React.Component {
    render() {
        return (
            <button
                className="item"
                onClick={this.props.onClick}
            >
                {this.props.value + ': $' + this.props.price}
            </button>
        )
    }
}


/*
The CartItem Component represents an item that is added to the cart, with a quantity
and a name attached
*/
class CartItem extends React.Component {
    render() {
        return (
            <button
                className="cart-item"
                onClick={this.props.onClick}>
                {this.props.value + ', Quantity: ' + this.props.quantity}
            </button>
        )
    }
}

/*
The RemoveButton component removes a cart item from the shopping cart
*/
class RemoveButton extends React.Component {
    render() {
        return (
            <button
                className="remove-button"
                onClick={this.props.onClick}>
                {"X"}
            </button>
        )
    }
}

/*
The EnterQuantity component allows the user to input a quantity of items desired,
submitting an html form on an enter keystroke
*/
class EnterQuantity extends React.Component {
    render() {
        return (
            <form className='enter-quantity' onSubmit={this.props.onSubmit}>
                <label>
                    {"Quantity: "}
                    <input type="text" size="10" onChange={this.props.onChange}/>
                </label>

            </form>
        )
    }
}

/*
The ShoppingList class contains all of the items that are for sale or in the
cart.
*/
class ShoppingList extends React.Component {
    /*
    constructor for the Shoppinglist class, contains the total price, total quantity,
    all of the items and their quantities, and a cart that conatins the React components
    for each possible Item
    */
    constructor(props){
        super(props);
        this.state = {
            newQuant: 0,
            priceTotal: 0,
            quantityTotal: 0,

            cart: {
                'Star Wars Episode IV: DVD' : null,
                'Star Wars Episode V: DVD' : null,
                'Star Wars Episode VI: DVD' : null,
                'Star Wars Episode IV: Blu-Ray' : null,
                'Star Wars Episode V: Blu-Ray' : null,
                'Star Wars Episode VI: Blu-Ray' : null
            },

            allItems: {
                'Star Wars Episode IV: DVD' : 0,
                'Star Wars Episode V: DVD' : 0,
                'Star Wars Episode VI: DVD' : 0,
                'Star Wars Episode IV: Blu-Ray' : 0,
                'Star Wars Episode V: Blu-Ray' : 0,
                'Star Wars Episode VI: Blu-Ray' : 0
            }
        };
    }

    /*
    Adds 1 to the quantity of items in the cart, updates the CartItem
    */
    addCart(name, price){
        this.state.allItems[name] += 1;

        this.state.cart[name] =
        <div>
            <CartItem
                value={name}
                quantity={this.state.allItems[name]}
                onClick={() => this.handleRemoveClick(name, price)}
            />
            <RemoveButton
                value={name}
                onClick={() => this.handleRemoveAllClick(name, price)}
            />
            <EnterQuantity
                onSubmit={(event) => this.handleSubmit(event, name, price)}
                onChange={(event) => this.handleChange(event)}
            />

        </div>
    }

    /*
    removes 1 item from the cart item's quantity on clicking the item in the cart,
    removes the item if the quantity goes to 0
    */
    handleRemoveClick(name, price){
        this.state.allItems[name] -= 1;

        if (this.state.allItems[name] == 0) {
            this.state.cart[name] = null;
        } else {
            this.state.cart[name] =
                <div>
                    <CartItem
                        value={name}
                        quantity={this.state.allItems[name]}
                        onClick={() => this.handleRemoveClick(name, price)}
                    />
                    <RemoveButton
                        value={name}
                        onClick={() => this.handleRemoveAllClick(name, price)}
                    />
                    <EnterQuantity
                        onSubmit={(event) => this.handleSubmit(event, name, price)}
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>
        }

        this.setState({
            priceTotal: this.state.priceTotal - price,
            quantityTotal: this.state.quantityTotal - 1,
            cart: this.state.cart,
            allItems: this.state.allItems,
        })
    }

    /*
    Removes a cart item completely from the cart, resets the quantity of that item
    */
    handleRemoveAllClick(name, price) {
        var numItems = this.state.allItems[name];
        this.state.allItems[name] -= numItems;
        this.state.cart[name] = null;

        this.setState({
            priceTotal: this.state.priceTotal - numItems * price,
            quantityTotal: this.state.quantityTotal - numItems,
            cart: this.state.cart,
            allItems: this.state.allItems,
        })
    }

    /*
    Handles the Enter keystroke for EnterQuantity, and updates the values of
    the cart item
    */
    handleSubmit(event, name, price) {
        event.preventDefault();

        if(this.state.newQuant) {
            var oldVal = this.state.allItems[name];
            this.state.allItems[name] = this.state.newQuant;

            this.state.cart[name] =
            <div>
                <CartItem
                    value={name}
                    quantity={this.state.allItems[name]}
                    onClick={() => this.handleRemoveClick(name, price)}
                />
                <RemoveButton
                    value={name}
                    onClick={() => this.handleRemoveAllClick(name, price)}
                />
                <EnterQuantity
                    onSubmit={(event) => this.handleSubmit(event, name, price)}
                    onChange={(event) => this.handleChange(event)}
                />
            </div>;

            this.setState({
                newQuant: 0,
                allItems: this.state.allItems,
                priceTotal: this.state.priceTotal - oldVal * price + this.state.newQuant * price,
                cart: this.state.cart,
                quantityTotal: this.state.quantityTotal - oldVal + this.state.newQuant,
            })

        } else {
            this.handleRemoveAllClick(name, price);
        }
    }

    /*
    Used by quantity to store the entered value
    */
    handleChange(event) {
        this.setState({newQuant: parseInt(event.target.value, 10)})
    }

    /*
    Adds an item to the shopping cart on the click of an item in the list,
    clicking multiple times adds to the quantity instead of creating a new item
    */
    handleClick(name, price) {
        this.addCart(name, price);

        this.setState({
            priceTotal: this.state.priceTotal + price,
            quantityTotal: this.state.quantityTotal + 1,
        })
    }

    /*
    Renders an item in the ShoppingList
    */
    renderItem(name, itemPrice) {
        return (
            <Item
                value={name}
                price={String(itemPrice)}
                onClick={() => this.handleClick(name, itemPrice)}
            />
        )
    }

    /*
    Renders the cart items that are not null
    */
    renderCart(price) {
        var currentCart = [];

        for (var key in this.state.cart) {
            var tempItem = this.state.cart[key];
            if (tempItem){
                currentCart.push(tempItem);
            }
        }

        return (
            currentCart
        )
    }

    /*
    Renders the entire shopping list with headers and instructions
    */
    render() {
        var menuHeader = "The Pirate Shop - By Henry Allen";
        var shopHeader = "Items For Sale";
        var instruct = '1. Click an item to add to cart, click multiple times to increase quantity by one' ;
        var instruct2 = '2. Enter quantity in quaantity field and press enter to select quantity';
        var instruct3 = '3. Delete numbers in quantity box and press enter to change again';
        var instruct4 = '4. Click on an item in cart to reduce quantity by one';
        var instruct5 = '5. Click on X to remove an item from cart';

        return (
            <div>
                <div className="menu-header">{menuHeader}</div>
                <div className='instruction-box'>
                    Instructions:
                    <div className='instructions'>{instruct}</div>
                    <div className="instructions">{instruct2}</div>
                    <div className="instructions">{instruct3}</div>
                    <div className="instructions">{instruct4}</div>
                    <div className="instructions">{instruct5}</div>
                </div>

                <div className="shopping-list">
                    <div className="shop-header">{shopHeader}</div>
                    {this.renderItem('Star Wars Episode IV: DVD', 20)}
                    {this.renderItem('Star Wars Episode V: DVD', 20)}
                    {this.renderItem('Star Wars Episode VI: DVD', 20)}
                    {this.renderItem('Star Wars Episode IV: Blu-Ray', 25)}
                    {this.renderItem('Star Wars Episode V: Blu-Ray', 25)}
                    {this.renderItem('Star Wars Episode VI: Blu-Ray', 25)}
                </div>
                <div className="shopping-cart">
                    <div className="cart-header">
                        {'Total Items: ' + this.state.quantityTotal + ' | Total in Cart: $' + this.state.priceTotal}
                    </div>
                    <div>{this.renderCart()}</div>
                </div>
            </div>
        )
    }
}

/*
The Menu component is a holding place for all of the other components, forming
the main body of the webapp
*/
class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <ShoppingList />
            </div>
        )
    }
}

/*
renders the react code as HTML and JavaScript code
*/
ReactDom.render(
    <Menu />,
    document.getElementById('root')
)
