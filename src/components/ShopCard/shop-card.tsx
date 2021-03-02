import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import './shop-card.less';

interface Props {
    shopItem: ShopItem;
}

export type ShopItem = {
    id: any;
    name: string;
    description: string;
    type: string;
    shortDescription: string;
    date: string;
    slug: string;
    onSale: string;
    status: string;
    databaseId: any;
    price: string;
    regularPrice: string;
    productCategories: any;
    variations: any;
    attributes: any;
    variationId: any;
    image: {
        localFile: {
            childImageSharp: any;
        }
    };
};

export default function ShopCard({ shopItem }: Props) {
    return (

        <div className="rounded hover-animate">
            <BackgroundImage
                Tag="div"
                className="rounded-corners-top shop-card-background"
                fluid={shopItem.image.localFile.childImageSharp.fluid}
            >
                <div className="shop-card-background-text-wrapper">
                    {shopItem.onSale && <h3 className="shop-card-background-text">Angebot</h3>}

                </div>
            </BackgroundImage>
            <div className="shop-card-content">
                <Link to={shopItem.slug}>
                    <h3>{shopItem.name}</h3>
                    <div className="shop-price-wrapper">
                        {shopItem.onSale && <p className="shop-regular-price">{shopItem.regularPrice}</p>}
                        <p>{shopItem.price}</p>
                    </div>
                </Link>
                {/* <AddToCartButton product={shopItem} /> */}
                {/*  <Button primary className="shadow rounded hover-animate">
                        <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
            In den Warenkorb
          </Button> */}
            </div>
        </div>
    );
}
