import de from 'hyphenated-de';
import React from 'react';
import Hyphenated from 'react-hyphen';
import './plain-header.less';

const PlainHeader = ({ content }) => {
    return (
        <div className="plain-header">
            <div className="plain-header-container">
                <div className="responsive-desktop-container plain-header-container-desktop">
                    <div className="plain-header-grid">
                        <div data-sal="slide-down" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                            <Hyphenated language={de}>{content}</Hyphenated>
                        </div>
                    </div>
                </div>
                <div className="responsive-mobile-container plain-header-container-mobile">
                    <div className="plain-header-grid">
                        <div data-sal="slide-down" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                            <Hyphenated language={de}>{content}</Hyphenated>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlainHeader;
