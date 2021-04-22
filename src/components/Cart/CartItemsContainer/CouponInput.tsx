import { Trans } from 'gatsby-plugin-react-i18next';
import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { useTranslationHOC } from '../../useTranslationHOC/useTranslationHOC';

export interface Props {
    t: any;
    handleApplyCoupon: any;
    applyCouponProcessing: boolean;
}

class CouponInput extends Component<Props, any> {

    constructor(props) {
        super(props);
        this.state = {
            couponCode: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ couponCode: event.target.value });
    }

    render() {
        const { handleApplyCoupon, applyCouponProcessing, t } = this.props;

        return (
            <>
                <h4>Gutschein- oder Aktionscode eingeben</h4>
                <div className="ui action input">
                    <Input name="apply-coupon-input" required={false} type="text" placeholder={t('Code eingeben')} value={this.state.couponCode} onChange={this.handleChange} />
                    <Button primary basic onClick={handleApplyCoupon.bind(this, this.state.couponCode)} className={`${applyCouponProcessing && 'loading'}`}>
                        <Button.Content><Trans>Einlösen</Trans></Button.Content>
                    </Button>
                </div>
            </>
        )
    }
}

export default useTranslationHOC(CouponInput);