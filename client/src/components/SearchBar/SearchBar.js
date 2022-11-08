import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByNameVideogames } from "../../redux/actions";
import s from "./searchBar.module.css"


const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e)=>{
    e.preventDefault();
    setName(e.target.value)
    console.log(name);
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(getByNameVideogames(name))
    console.log(name); 
    setName();
  };


  return (
    <div className={s.searchBar_main}>
      <input 
      type="text"
      placeholder="Search..."
      onChange = {e=> handleInputChange(e)}
      />
      <button type="submit" onClick= {e => handleSubmit(e)}>Search</button>
    </div>
  )
};

export default SearchBar;