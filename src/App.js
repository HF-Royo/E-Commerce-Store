import { useState } from "react";
import Nav from "./Navigation/Nav";
import Products from "./products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import products_data from './db/data'; // Database
import Card from "./components/Card";
import './index.css';

function App() {

  const[selectedCategory,setSelectedCategory] = useState(null);
  const[query,setQuery] = useState("");
  
  //------------Input Filter------------
  const handleInputChange = event => {
    setQuery(event.target.value);
  }

  // Search the name of the products
  // -1 if selected all products
  const filteredItems = products_data.filter((Products) => 
    Products.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  
  //------------Radio Filter------------
  const handleChange = (event) =>{
    setSelectedCategory(event.target.value);
  };

  //------------Radio Filter------------
  const handleClick = (event) =>{
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query){
    
    let filteredProducts = products;

    // Filtering Input Items
    if(query){
      filteredProducts = filteredItems
    }

    // Selected Filter
    if(selected){
      filteredProducts = filteredProducts.filter(
      ({ category, color, company, newPrice, title }) => 
        category === selected || 
        color === selected || 
        company === selected || 
        newPrice === selected ||
        title === selected
      );
    }

    return filteredProducts.map(({img, title, star, reviews, prevPrice, newPrice}) => (
      <Card
      key={Math.random()}
      img={img}
      title={title}
      star={star}
      reviews={reviews}
      newPrice={newPrice}
      prevPrice={prevPrice} 
      />     
    ));
  }

  const result = filteredData(products_data, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange}/>
      <Nav query={query} handleInputChange={handleInputChange}/>      
      <Recommended handleClick={handleClick}/>
      <Products result={result}/>

    </>
  ); 
}

export default App;
