import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../context/Api-Handler';

export default function DeleteProduct (){

    //state
    const [itemBeingDeleted, setItemBeingDeleted] = useState("");   

    useEffect(()=>{
        fetchItemBeingDeleted();
    },[]);

    const {productId} = useParams();   

    async function fetchItemBeingDeleted (){
        let response = await axios.get(API_URL + `/update-product/${productId}`);
        setItemBeingDeleted(response.data.products[0]);
    }

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    async function handleDeleteConfirm(){
        await axios.delete(API_URL + `/delete-product/${productId}`);
        navigate(-1);
    }

    return (
        <React.Fragment>
            {itemBeingDeleted ? (
            <div className="card" style={{width: "400px", marginLeft: "12px", marginTop:"5px", marginBottom:"5px"}}>
                <div className="card-body">
                    <h5 className="card-title">Name: {itemBeingDeleted.name}</h5>
                    <p className="card-text">Launch Date: {itemBeingDeleted.launchDate.slice(0,10)}</p>
                    <p className="card-text">SRP: {itemBeingDeleted.srp}</p>
                    <p className="card-text">Category Id: {itemBeingDeleted.category_name}</p>
                    <p className="card-text">Supplier Id: {itemBeingDeleted.supplier_name}</p>
                </div>
                <div>
                    <button className="btn btn-primary ms-3 me-3 mb-2" onClick={handleBack}> Nope! </button>
                    <button className="btn btn-success mb-2" onClick={handleDeleteConfirm}> Confirm! </button>
                </div>
            </div>
            
            ) : <p>Loading</p>}        
        </React.Fragment>
    )
}