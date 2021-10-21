import React from 'react';


export default class FilterableProductTable extends React.Component {
    render() {
        return (
            <div className="FilterableProductTable">
                <SearchBar></SearchBar>
                <ProductTable products={this.props.products}></ProductTable>
            </div>
        )
    }

}

class SearchBar extends React.Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..."></input>
                <div>
                    <input type="checkbox" />
                    <span> Only show products in stock</span>
                </div>
            </form>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        const rows = []
        let lastCategory = null

        this.props.products.forEach(product => {
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow category={product.category} key={product.category} ></ProductCategoryRow>
                )
            }
            rows.push(
                <ProductRow product={product} key={product.name}></ProductRow>
            )
            lastCategory = product.category
        })

        return (
            <div className="ProductTable">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                </table>
                <tbody>{rows}</tbody>
            </div>
        )
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="2">
                    {this.props.category}
                </th>
            </tr>
        )
    }

}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product
        const name = product.stocked ? <span style={{ color: 'red' }}>{product.name}</span> : product.name
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }

}

