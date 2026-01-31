import React from "react"

function ProductLists(){
 
    const products = [
        {id:1, name:'Watch'},
        {id:2, name:'TV'}
    ]
 
    return(
        <>
          {products.map(product =>(
            <React.Fragment key={product.id}>
              <h3> {product.name} </h3>
              <h2> {product.id} </h2>
              <hr />
            </React.Fragment>
          ))}
        </>
    )
   
}