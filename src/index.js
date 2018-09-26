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
                {this.props.value + ': ' + this.props.price}
            </button>
        )
    }
}

class ShoppingList extends React.Component {
    handleClick(price) {
        alert(price);
    }

    renderItem(name, price) {
        return (
            <Item
                value={name}
                price={price}
                onClick={() => this.handleClick(price)}
            />
        )
    }

    render() {
        let menuHeader;
        menuHeader = "title";
        return (
            <div>
                <div className="menu-header">{menuHeader}</div>
                <div>{this.renderItem('Star Wars Episode IV: DVD', '$20')}</div>
                <div>{this.renderItem('Star Wars Episode V: DVD', '$20')}</div>
                <div>{this.renderItem('Star Wars Episode VI: DVD', '$20')}</div>
                <div>{this.renderItem('Star Wars Episode IV: Blu-Ray', '$25')}</div>
                <div>{this.renderItem('Star Wars Episode V: Blu-Ray', '$25')}</div>
                <div>{this.renderItem('Star Wars Episode VI: Blu-Ray', '$25')}</div>
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
