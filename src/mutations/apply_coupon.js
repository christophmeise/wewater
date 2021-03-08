import { gql } from "@apollo/client";

const APPLY_COUPON = gql`
mutation APPLY_COUPON($input: ApplyCouponInput!) {
    applyCoupon(input: $input) {
        clientMutationId
    }
}
`;

export default APPLY_COUPON;
