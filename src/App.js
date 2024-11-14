import React, {useState} from "react";
import "./App.css"
function Test(){
  const [searchTerm,setSearchTerm] = useState("");
  const lists=[
    {
      'id':1,
      'name':'Cappucino',
      'price':5
    },
    {
      'id':2,
      'name':'Americano',
      'price':3
    },
    {
      'id':3,
      'name':'Coffee',
      'price':7
    }
  ];
  const filteredItems = lists.filter(list=>list.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const [credit,setCredit] = useState(1000);
  const [addcart,setAddcart] = useState([]);
  function click(){
    setCredit(credit+1000);
  }
  
  const addToCard = (lists)=>{
    setAddcart((previtems)=>
    {const existItem = previtems.find((item)=>item.id===lists.id);
      if(existItem){
        return previtems.map((item)=>item.id===lists.id?{...item, qty : item.qty+1}:item);
      }
      return [...previtems,{...lists,qty:1}];
    });
  };

  const remove=(lists)=>{
    setAddcart((previtems)=>
    previtems.filter((item) => item.id !== lists.id));
    
  }

  const total=addcart.reduce((total,item)=>{
    return total+item.price*item.qty;
  },0);

  const checkout=()=>{
    if(credit>=total){
      setCredit((prevCredit)=>prevCredit-total);
      alert(`Checkout successful! Total amount: $${total}. Remaining credit: $${credit - total}`);
      setAddcart([]);
    }
  }
  return(
    <div>
      <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}></input>
      <h1>User credit:{credit}</h1>
      <table border="3">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>price</th>
          <th>qty</th>
        </tr>
        {filteredItems.map((list,index)=>(
          <tr data-index={index}>
            <td>{list.id}</td>
            <td>{list.name}</td>
            <td>{list.price}</td>
            <td><button onClick={()=>addToCard(list)}>Add to cart</button></td>
          </tr>
        ))}
        
      </table>
      <h3>Your cart:</h3>
      {addcart.length>0? (
        <ul>
        {addcart.map((item)=>(
          <li>{item.name} ,{item.price}$ ,quantity:{item.qty},total: {item.price*item.qty}$
          <button onClick={()=>remove(item)}>Remove</button>
          </li>
          
        ))}
        </ul>
      ):<p>empty</p>}
      <h3>{total}</h3>
      <button onClick={click}>Add credit</button>
      <button disabled={addcart.length===0} onClick={checkout}>Check out</button>
    </div>
  );
}
export default Test;