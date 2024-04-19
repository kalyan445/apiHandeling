import axios from 'axios';
import { useEffect, useState } from 'react'



function App() {

  const [product,setProduct]=useState([]);
  const[error,setError]=useState(false)
  const[loading,setLoading]=useState(false)
  const [search,setSearch]= useState('')





useEffect(()=>{

  // this_Clear_the_initial_request
  const controller = new AbortController();
 
  
  // ifIs
;( async ()=>{
 try {
  setLoading(true)  
  setError(false)
  
   const res = await axios.get('/api/products?search='+search ,{
    signal:controller.signal 
   })
 
   setProduct(res.data)
   console.log(product);
  setLoading(false)
 }
 
 
 catch (error) {
   if(axios.isCancel(error)){
    console.log('Req Cancle',error.message);
    return
   }


  setError(true)
  setLoading(false)


  
 }

})()


// cleanup_Method
return ()=>{
  controller.abort();
}





},[search])




  return (
    <>

   <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
    {loading ? (<h3>Loading</h3>):( <h4>{product?.length}</h4>)}

     
      <h3>ABo banxa api</h3>
     
    </>
  )
}

export default App
