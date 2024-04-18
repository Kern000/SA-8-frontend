import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { API_URL } from "../context/Api-Handler";
import axios from "axios";

export default function AddProduct(){

    const [name, setName] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [srp, setSrp] = useState(0);
    const [category_id, setCategory_id] = useState(0);
    const [supplier_id, setSupplier_id] = useState(0);

    const {supplierList} = useContext(ProductContext)
    const {categoryList} = useContext(ProductContext)

    const navigate = useNavigate();

    function handleNavigateToProducts(){
        try {
            navigate("/");
          } catch (error) {
            console.error("Navigation error:", error);
          }    
    }

    const handleSubmit = async () =>{
        const newItem = {
            name,
            launchDate,
            srp,
            category_id,
            supplier_id
        }
        await axios.post(API_URL + "/add-product", newItem);
        handleNavigateToProducts();
    }

    return(
        <React.Fragment>
            <div>
                <div className="ms-3 mb-3 mt-2">
                    <label htmlFor="newProductName" className="form-label">Product Name</label>
                    <input  type="text" 
                            className="form-control" 
                            id="newProductName" 
                            aria-describedby="newProductHelp" 
                            value={name}
                            onChange={(event)=>setName(event.target.value)}
                    />
                    <div id="newProductHelp" className="form-text">Enter a new product's name based on official designation.</div>
                </div>

                <div className="ms-3 mb-3">
                    <label htmlFor="newLaunchDate" className="form-label">Launch Date in YYYY-MM-DD format</label>
                    <input  type="text"
                            className="form-control" 
                            id="newLaunchDate" 
                            value={launchDate}
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
        </React.Fragment>
    )
}
