import React, {useState, createContext, useMemo} from 'react';

export const ProductContext = createContext();

export default function ProductsContextData({children}){

    const [productList, setProductList] = useState([]);
    const [supplierList, setSupplierList] = useState({});
    const [categoryList, setCategoryList] = useState({});

    const contextValue = useMemo(()=>{
        return({
            productList, setProductList,
            supplierList, setSupplierList,
            categoryList, setCategoryList
        })
    },  [
            productList, setProductList,
            supplierList, setSupplierList,
            categoryList, setCategoryList
        ]
    );
    
    return(
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
}