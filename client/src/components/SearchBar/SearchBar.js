import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByNameVideogames } from "../../redux/actions";


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
    console.log(name); // name es mi estado local, donde voy guardando lo que escribe el usuario, y con el dispatch, la accion le llega al reducer
    // setName() --> setName con state vacio para que se borre lo que queda en el searchBar
  };


  return (
    <div>
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