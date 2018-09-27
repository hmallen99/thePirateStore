import React from 'react';
import ReactDom from 'react-dom';
import './index.css';


/*
This Item represents one of the items for sale
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
The CartItem class represents an item that is added to the cart, with a quantity
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

    handleChange(event) {
        this.setState({newQuant: parseInt(event.target.value, 10)})
    }

    handleClick(name, price) {
        this.addCart(name, price);
        this.setState({
            priceTotal: this.state.priceTotal + price,
            quantityTotal: this.state.quantityTotal + 1,
        })
    }

    renderItem(name, itemPrice) {
        return (
            <Item
                value={name}
                price={String(itemPrice)}
                onClick={() => this.handleClick(name, itemPrice)}
            />
        )
    }

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

    render() {
        var menuHeader = "The Pirate Shop";
        var shopHeader = "Items For Sale"
        return (
            <div>
                <div className="menu-header">{menuHeader}</div>
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

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <ShoppingList />
            </div>
        )
    }
}

ReactDom.render(
    <Menu />,
    document.getElementById('root')
)
