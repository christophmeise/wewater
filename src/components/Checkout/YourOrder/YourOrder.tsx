import { Trans, useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { useTranslationHOC } from '../../useTranslationHOC/useTranslationHOC';

const YourOrder = ({ cart }) => {
	const { t } = useI18next();
	return (
		<>
			{ cart ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderCell />
							<TableHeaderCell />
							<TableHeaderCell><Trans>Preis</Trans></TableHeaderCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{cart.products.length && (
							cart.products.map((item, index) => (
								<CheckoutCartItem key={item.productId + index} item={item} />
							))
						)}
						<TableRow textAlign="right">
							<TableCell />
							<TableCell><Trans>Verpackung & Versand</Trans></TableCell>
							<TableCell>{cart.shippingTotal}</TableCell>
						</TableRow>
						<TableRow textAlign="right">
							<TableCell />
							<TableCell>{t('SummeArtikel_plural', { count: cart?.totalProductsCount })}</TableCell>
							<TableCell><strong>{cart.totalProductsPrice}</strong></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			) : ''}
		</>
	)
};

const CheckoutCartItem = ({ item }) => {

	return (
		<TableRow>
			<TableCell>
				<img width="80" src={item.image.sourceUrl} srcSet={item.image.srcSet} alt={item.image.title} />
			</TableCell>
			<TableCell>
				{item?.qty + 'x '}
				{item?.variation?.node?.name != null ?
					item?.variation?.node?.name :
					item.name
				}
			</TableCell>
			<TableCell><strong>{item.totalPrice}</strong></TableCell>
		</TableRow>
	)
};


export default useTranslationHOC(YourOrder);
