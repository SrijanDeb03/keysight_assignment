import React, {useState,useEffect} from "react"
 
function withDataFecth(WrappedComponent, fetchData){   // HOC Component = withDataFecth
 
    return function (props) {
        const[data,setData] = useState(null);
        const[isLoading, setIsLoading] = useState(true);
        const[error, setError] = useState(null)
 
        useEffect( () => {
            const fetchWrapper =  async () => {
              try{
                  const data = await fetchData(props)
                  setData(data)
                  setIsLoading(false)
              }
              catch(error)
              {
                setError(error)
                setIsLoading(false);
              }
            };
            fetchWrapper();
        },[props])
 
        return(
            <WrappedComponent {...props}
            data={data}
            isLoading={isLoading}
            error={error} />
        )
    }
}
 
const fetchPosts = async () =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json();
    return data;
}
 
const PostComponent = ({data, isLoading, error}) =>{
   if(isLoading)
    return <p> Loading ... </p>
 
   if(error)
    return <p> Error: {error.message} </p>
 
   return(
    <ul>
        {data.map( (item) =>(
               <li key={item.id}>  {item.title} </li>
        ))}
    </ul>
   )
}
 
const PostComponentWithData = withDataFecth( PostComponent ,fetchPosts )
 
const App = () =>
    <div>
        <PostComponentWithData />
    </div>
 
export default App;