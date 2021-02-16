import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import { Card, CardContent } from 'semantic-ui-react';
import AddToCartButton from '../Cart/AddToCartButton/AddToCartButton';
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
    databaseId: string;
    price: string;
    image: {
        localFile: {
            childImageSharp: any;
        }
    };
};

export default function ShopCard({ shopItem }: Props) {
    return (

        <Card className="rounded hover-animate shadow" fluid centered>
            <div></div>
            <BackgroundImage
                Tag="div"
                className="rounded-corners-top dark-overlay-blog rtt-areas-card-background"
                fluid={shopItem.image.localFile.childImageSharp.fluid}
            >
                <div className="rtt-areas-card-background-text-wrapper">
                    <h3 className="rtt-areas-card-background-text"></h3>
                </div>
            </BackgroundImage>
            <CardContent className="blog-post-card-content">
                <Link to={shopItem.slug}>
                    <Card.Description>{shopItem.name}</Card.Description>
                </Link>
                <AddToCartButton product={shopItem} />
                {/*  <Button primary className="shadow rounded hover-animate">
                        <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
            In den Warenkorb
          </Button> */}
            </CardContent>
        </Card>
    );
}
