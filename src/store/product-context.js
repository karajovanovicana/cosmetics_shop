import {createContext} from "react";

const ProductContext = createContext({
    products: [],
    productDeletedHandler: () => {},
    productEditedHandler: () => {},
    productAddedHandler: () => {},
});

export default ProductContext;