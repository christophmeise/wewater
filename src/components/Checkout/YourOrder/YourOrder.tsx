import React from 'react';

const YourOrder = ({ cart }) => {

	return (
		<>
			{ cart ? (
				<>
					{/*Product Listing*/}
					<table className="table table-hover">
						<thead>
							{ /* eslint-disable */}
							<tr className="woo-next-cart-head-container">
								<th className="woo-next-cart-heading-el" />
								<th className="woo-next-cart-heading-el">Product</th>
								<th className="woo-next-cart-heading-el">Total</th>
							</tr>
						</thead>
						<tbody>
							{cart.products.length && (
								cart.products.map(item => (
									<CheckoutCartItem key={item.productId} item={item} />
								))
							)}
							{/*Total*/}
							<tr className="">
								<td className="" />
								<td className="woo-next-checkout-total">Subtotal</td>
								<td className="woo-next-checkout-total">{cart.totalProductsPrice}</td>
							</tr>
							<tr className="">
								<td className="" />
								<td className="woo-next-checkout-total">Total</td>
								<td className="woo-next-checkout-total">{cart.totalProductsPrice}</td>
							</tr>
						</tbody>
					</table>
				</>
			) : ''}
		</>
	)
};

const CheckoutCartItem = ({ item }) => {

	return (
		<tr className="woo-next-cart-item" key={item.productId}>
			<td className="woo-next-cart-element">
				<img width="64" src={item.image.sourceUrl} srcSet={item.image.srcSet} alt={item.image.title} />
			</td>
			{item?.variation?.node?.name != null ?
				<td className="woo-next-cart-element">{item?.variation?.node?.name}</td> :
				<td className="woo-next-cart-element">{item.name}</td>
			}
			<td className="woo-next-cart-element">{item.totalPrice}</td>
		</tr>
	)
};


export default YourOrder;
