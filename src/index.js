import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

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

class CartItem extends React.Component {
    render() {
        return (
            <button
                className="cart-item"
                onClick={this.props.onClick}>
                {this.props.value + ': ' + this.props.quantity}
            </button>
        )
    }
}



class ShoppingList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            priceTotal: 0,
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
        this.state.cart[name] = <CartItem
            value={name}
            quantity={this.state.allItems[name]}
            onClick={() => this.handleRemoveClick(name, price)}
        />
    }

    handleRemoveClick(name, price){
        this.state.cart.splice(0, 1);
        this.setState({
            priceTotal: this.state.priceTotal - price,
            cart: this.state.cart,
        })
    }

    handleClick(name, price) {
        this.addCart(name, price);
        this.setState({
            priceTotal: this.state.priceTotal+price,
            cart: this.state.cart,
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
        let menuHeader;
        menuHeader = "The Pirate Shop";
        return (
            <div>
                <div className="menu-header">{menuHeader}</div>
                <div className="shopping-list">
                    {this.renderItem('Star Wars Episode IV: DVD', 20)}
                    {this.renderItem('Star Wars Episode V: DVD', 20)}
                    {this.renderItem('Star Wars Episode VI: DVD', 20)}
                    {this.renderItem('Star Wars Episode IV: Blu-Ray', 25)}
                    {this.renderItem('Star Wars Episode V: Blu-Ray', 25)}
                    {this.renderItem('Star Wars Episode VI: Blu-Ray', 25)}
                </div>
                <div className="shopping-cart">
                    {'$' + this.state.priceTotal}
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
