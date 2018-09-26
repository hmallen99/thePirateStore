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
            cart: [],
        };
    }

    addCart(name, price){
        this.state.cart.push(<CartItem value={name} quantity={"1"} onClick={() => this.handleRemoveClick(name, price)}/>);
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
        if (this.state.cart.length > 0) {
            return (
                this.state.cart
            )
        }
        else {
            return (
                <div>{"No Items In Cart"}</div>
            )
        }
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
