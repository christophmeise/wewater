import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Label } from 'semantic-ui-react';
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
    galleryImages: any;
    stockStatus: any;
    image: {
        localFile: {
            childImageSharp: any;
        }
    };
};

export default function ShopCard({ shopItem }: Props) {
    return (
        <Link to={shopItem.slug}>
            <div className="rounded">
                <div>
                    {shopItem.onSale &&
                        <Label ribbon>
                            <h3 className="shop-card-background-text">Angebot</h3>
                        </Label>}
                    <GatsbyImage
                        image={shopItem.image.localFile.childImageSharp.gatsbyImageData}
                        className="rounded-corners-top shop-card-background"
                        alt="Shop article image"
                    >
                    </GatsbyImage>
                </div>
                <div className="shop-card-content">
                    <h3>{shopItem.name}</h3>
                    <div className="shop-price-wrapper">
                        {shopItem.onSale && <p className="shop-regular-price">{shopItem.regularPrice}</p>}
                        <p>{shopItem.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
