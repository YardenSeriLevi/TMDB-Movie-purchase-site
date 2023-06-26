import React from 'react';
import {MDBTypography} from "mdb-react-ui-kit";

function Empty() {

    const EMPTYCART = "Your cart is empty. Start adding items to your cart to proceed with your purchase.";

    return (
        <MDBTypography tag="h4" >
            {EMPTYCART}
        </MDBTypography>
    );
}

export default Empty;
