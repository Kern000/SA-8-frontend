import React, {useState, useContext, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { API_URL } from "../context/Api-Handler";
import axios from "axios";

export default function UpdateProduct(){

    const [name, setName] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [srp, setSrp] = useState(0);
    const [category_id, setCategory_id] = useState(0);
    const [supplier_id, setSupplier_id] = useState(0);
    const [fullItem, setFullItem] = useState();

    const {supplierList} = useContext(ProductContext);
    const {categoryList} = useContext(ProductContext);

    const navigate = useNavigate();
    const {productId} = useParams();

    function handleNavigateToProducts(){
        try {
            navigate("/");
        } catch (error) {
        console.error("Navigation error:", error);
        };
    }

    async function fetchItemToUpdate(){
        let response = await axios.get(API_URL + `/update-product/${productId}`);
        let {name,launchDate,srp,category_id,supplier_id} = response.data.products[0];
        setName(name);
        setLaunchDate(launchDate);
        setSrp(srp);
        setCategory_id(category_id);
        setSupplier_id(supplier_id);
        setFullItem({
            name,
            launchDate,
            srp,
            category_id,
            supplier_id
        })
    }

    useEffect(()=>{
        fetchItemToUpdate();
    },[]);

    const handleSubmit = async () =>{
        const updateItem = {
            name,
            launchDate,
            srp,
            category_id,
            supplier_id
        };
        await axios.put(API_URL + `/update-product/${productId}`, updateItem);
        handleNavigateToProducts();
    }

    return(
        <React.Fragment>
            { fullItem ? (
            <div>
                <h5 className="ms-3 mt-2"> Update Product </h5>
                <div className="ms-3 mb-3 mt-2">
                    <label htmlFor="newProductName" className="form-label">Product Name</label>
                    <input  type="text" 
                            className="form-control" 
                            id="newProductName" 
                            aria-describedby="newProductHelp" 
                            value={name}
                            onChange={(event)=>setName(event.target.value)}
                    />
                    <div id="newProductHelp" className="form-text"> Update the product name? </div>
                </div>

                <div className="ms-3 mb-3">
                    <label htmlFor="newLaunchDate" className="form-label">Launch Date in YYYY-MM-DD format</label>
                    <input  type="text"
                            className="form-control" 
                            id="newLaunchDate" 
                            value={launchDate.slice(0,10)}
                            onChange={(event)=>setLaunchDate(event.target.value)}
                    />
                </div>

                <div className="ms-3 mb-3">
                    <label htmlFor="newSrp" className="form-label">Srp (without $ sign)</label>
                    <input  type="number"
                            className="form-control" 
                            id="newSrp" 
                            value={srp}
                            onChange={(event)=>setSrp(event.target.value)}
                    />
                </div>

                <div className="ms-3 mb-3">
                    <label htmlFor="supplier" className="form-label me-2"> Supplier </label>
                    {supplierList? (
                        <select value={supplier_id} onChange={(event)=>setSupplier_id(event.target.value)}>
                            <option value="" onChange={(event)=>setSupplier_id(event.target.value)}></option>
                            {Object.keys(supplierList).map((supplierName)=>
                                <option value={parseInt(supplierList[supplierName])} key={supplierList[supplierName]}>
                                    {supplierName}
                                </option>
                            )}
                        </select>
                    ): <p></p>}
                </div>

                <div className="ms-3 mb-3">
                    <label htmlFor="category" className="form-label me-2"> Category </label>
                    {categoryList? (
                        <select value={category_id} onChange={(event)=>setCategory_id(event.target.value)}>
                            <option value="" onChange={(event)=>setCategory_id(event.target.value)}></option>
                            {Object.keys(categoryList).map((categoryName)=>
                                <option value={parseInt(categoryList[categoryName])} key={categoryList[categoryName]}>
                                    {categoryName}
                                </option>
                            )}
                        </select>
                    ): <p></p>}
                </div>

                <div className="ms-3 mb-3">
                    <button className="btn btn-primary" onClick={()=>{handleSubmit()}}>Submit</button>
                </div>
            </div>
            ) : (<p className="ms-3 mt-2">...Retrieving item to edit</p>)            
            }
        </React.Fragment>
    )
}
