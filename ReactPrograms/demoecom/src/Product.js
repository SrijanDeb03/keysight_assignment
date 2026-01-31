import React ,{useState, useEffect} from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios'

const Product = ({match}) => {
    const [data,setData]= useState([]);

    useEffect(()=>{
        fetchProduct();
    },[])

    const fetchProduct =()=>{
        axios.get(`https://fakestoreapi.com/products/?id=${match.params.id}`)
        .then((res)=>{
            setData(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err))
    };

    return(
        <div>
            {data.map((item) =>{
                return(
                    <div>
                        <div>
                            <img src={item.image} alt='' className= 'pro-image' />
                        </div>
                        <div>
                            <h1>{item.category}</h1>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>
                                <strong>Price: INR. {item.price}</strong>
                            </p>
                            <p>
                                <strong>Price: INR. {item.price}</strong>
                            </p>
                        </div>
                    </div>
                )
            })}
            <div className="back">
                <NavLink to ='/home'> Featured Products =  Back</NavLink>
            </div>
        </div>
    )


}
export default Product;