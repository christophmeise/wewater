import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { BlogPostCardSimple } from '../BlogPostCard/blog-post-card';
import './sidebar.less';

const SidebarWidget = ({ posts }) => {
    return (
        <aside id="sidebar-widget" className="sidebar-widget">
            <h6><Trans>Spende jetzt</Trans></h6>
            <div>
                <iframe frameBorder="0" src="https://www.betterplace-widget.org/projects/68773?l=de" width="100%" height="320" style={{ border: 0, padding: 0, margin: 0 }}>
                    Informieren und spenden: <a href='https://www.betterplace.org/de/projects/68773-sauberes-trinkwasser-fur-die-schulen-im-kinderdorf-bei-bweyale-in-uganda' target='_blank'>
                        „SAUBERES TRINKWASSER FÜR DIE SCHULEN IM KINDERDORF BEI BWEYALE IN UGANDA“</a> auf betterplace.org öffnen.
                </iframe>
            </div>
            <div>
                <h6><Trans>Jetzt für unseren Wassernewsletter anmelden</Trans></h6>
                <div id="mc_embed_signup">
                    <form id="mc-embedded-subscribe-form" className="validate" action="https://wewater.us20.list-manage.com/subscribe/post?u=24746d4c48c610cc73f27cb63&amp;id=67239df000" method="post" name="mc-embedded-subscribe-form" noValidate={false} target="_blank">
                        <div id="mc_embed_signup_scroll">
                            <Input id="mce-EMAIL" className="email" name="EMAIL" required={true} type="email" placeholder="E-Mail" />
                            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true"><input tabIndex={-1} name="b_24746d4c48c610cc73f27cb63_67239df000" type="text" /></div>
                            <div className="clear">
                                <Button primary size="small" id="mc-embedded-subscribe" name="subscribe" type="submit" value="Eintragen"><Trans>Anmelden</Trans></Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <h6><Trans>Aktuelle Beiträge</Trans></h6>
                {posts
                    .filter((post) => post.node.title.length > 0)
                    .map(({ node: post }) => {
                        return (
                            <div key={post.id} className="blog-post-card-wrapper" data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                <BlogPostCardSimple post={post}></BlogPostCardSimple>
                            </div>
                        );
                    })}
            </div>
        </aside >
    );
};

export default SidebarWidget;
