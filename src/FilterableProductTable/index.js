import React from 'react';


export default class FilterableProductTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			filterText: '',
			inStockOnly: false
		}
	}

	handleFilterTextChange(value) {
		this.setState({
			filterText: value
		})
	}

	handleInStockChange(value) {
		this.setState({
			inStockOnly: value
		})
	}

	render() {
		return (
			<div className="FilterableProductTable">
				<SearchBar
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					onFilterTextChange={this.handleFilterTextChange.bind(this)}
					onInStockChange={this.handleInStockChange.bind(this)}
				>
				</SearchBar>
				<ProductTable
					products={this.props.products}
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}>
				</ProductTable>
			</div>
		)
	}

}

class SearchBar extends React.Component {
	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value)
	}
	handleInStockChange(e) {
		this.props.onInStockChange(e.target.checked);
	}

	render() {
		return (
			<form>
				<input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextChange.bind(this)}></input>
				<div>
					<input type="checkbox" value={this.props.inStockOnly} onChange={this.handleInStockChange.bind(this)} />
					<span> Only show products in stock</span>
				</div>
			</form>
		)
	}
}

class ProductTable extends React.Component {
	render() {
		const filterText = this.props.filterText;
		const inStockOnly = this.props.inStockOnly;

		const rows = []
		let lastCategory = null

		this.props.products.forEach(product => {
			if (product.name.indexOf(filterText) === -1) return
			if (inStockOnly && !product.stocked) return

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

