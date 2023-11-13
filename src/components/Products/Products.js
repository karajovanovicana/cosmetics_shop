import {Fragment} from 'react';

import ProductsSummary from './ProductsSummary';
import AvailableProducts from './AvailableProducts';

const Products = (props) => {
    return (
        <Fragment>
            <ProductsSummary/>
            <AvailableProducts/>
        </Fragment>
    );
};

export default Products;
