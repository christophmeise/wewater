import { Trans } from 'gatsby-plugin-react-i18next';
import React, { useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Grid, Select } from 'semantic-ui-react';
import { v4 } from "uuid";
import isEmpty from "validator/es/lib/isEmpty";
import { getUpdatedItems } from "../../../utils/functions";
import './style.less';

const quantitySelect = [
	{
		text: '1',
		value: 1
	},
	{
		text: '2',
		value: 2
	},
	{
		text: '3',
		value: 3
	},
	{
		text: '4',
		value: 4
	},
	{
		text: '5',
		value: 5
	},
]

const CartItem = ({
	item,
	products,
	updateCartProcessing,
	handleRemoveProductClick,
	updateCart,
}) => {

	const [productCount, setProductCount] = useState(item.qty);

	const handleQtyChange = (data, cartKey) => {

		if (typeof window !== 'undefined') {
			if (updateCartProcessing) {
				return;
			}

			const newQty = data?.value != null ? data.value : 1;

			setProductCount(newQty);

			if (products.length) {
				const updatedItems = getUpdatedItems(products, newQty, cartKey);
				updateCart({
					variables: {
						input: {
							clientMutationId: v4(),
							items: updatedItems
						}
					},
				});
			}
		}
	};

	return (
		<Grid.Row columns="2" className="cart-item-row">
			<Grid.Column width="4">
				<LazyLoadImage
					className="cart-item-product-img"
					alt={item.image.title}
					src={!isEmpty(item.image.sourceUrl) ? item.image.sourceUrl : ''}
					effect="blur"
				/>
			</Grid.Column>
			<Grid.Column width="12" className="cart-item-column-right">
				<div className="cart-product-title-wrap">
					{item.variation?.node?.name != null ?
						<h2 className="cart-product-title">{item.variation.node.name}</h2> :
						<h2 className="cart-product-title">{item.name}</h2>
					}
					<div>
						<Select placeholder='Menge' options={quantitySelect} value={productCount} onChange={(event, data) => handleQtyChange(data, item.cartKey)} />
						<Button primary compact size="small" basic onClick={(event) => handleRemoveProductClick(event, item.cartKey, products)} className={`shadow rounded hover-animate ${updateCartProcessing && 'loading'}`}>
							<Button.Content><Trans>Löschen</Trans></Button.Content>
						</Button>
					</div>

				</div>

				<div className="cart-product-footer">
					<div>
						<span className="cart-total-price"> {('string' !== typeof item.totalPrice) ? item.totalPrice.toFixed(2) : item.totalPrice}</span>
					</div>
				</div>
			</Grid.Column>
		</Grid.Row>
	)
};

export default CartItem;
