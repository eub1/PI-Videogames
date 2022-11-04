import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {postVideogame, getPlatforms} from '../../redux/actions'


const VideogameCreate = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const platforms = useSelector((state) => state.platforms);

  // const {name, description, released, rating, platforms, genres} = req.body
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: []
  });

  useEffect(()=>{
    dispatch(getPlatforms());
  }, []);

  const handleChange = (e)=>{

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    console.log(input);
  };

  const handleCheckbox = (e)=>{
    if(e.target.checked){
      setInput({
        ...input, 
        status: e.target.value
      })
    }
  };

  const handleSelect = (e)=>{
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value]
    });
    console.log(input);
  }; //guarda en un arreglo todo lo que voy seleccionando

  const handleSubmit = (e)=>{
   e.preventDefault();
    console.log(input);
    dispatch(postVideogame(input));
    // alert para avisar al usuario que se creo el personaje
    alert("Videogame created");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genres: []
    });
    history.push('/home') //useHistory, metodo del router que me redirige a la ruta que le digo. Ya se creo el vidoegame, ahora llevame al home
  }; //guarda en un arreglo todo lo que voy seleccionando

  




  return(
    <div>
      <Link to='/home'><button>Home</button></Link>
      <h1>Create you Videogame</h1>
      <form onSubmit = {e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input type="text" value= {input.name} name= "name" onChange = {e => handleChange(e)}/>
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value= {input.description} name= "description" onChange = {e => handleChange(e)}/>
        </div>
        <div>
          <label>Released date:</label>
          <input type="date" value= {input.released} name= "released" onChange = {e => handleChange(e)}/>
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value= {input.rating} name= "rating" onChange = {e => handleChange(e)}/>
        </div>
        <div>
          <label>Image:</label>
          <input type="text" value= {input.image} name= "image" onChange = {e => handleChange(e)}/>
        </div>
        <div>
          <label>Platforms </label>
          <select onChange = {e => handleSelect(e)} >
             {platforms.map(plataforma =>(
                <option value={plataforma.name} key={plataforma.id}>{plataforma.name}</option>
              ))}
          </select>
          <ul><li>{input.platforms.map(selectedEl => selectedEl + " ,")}</li></ul>
          {/* una lista que agarra mi estado input.platforms, y renderiza cada cosita que marco en el select. Asi el usuario puede ver lo que selecciona, a medida que selecciona */}
        </div>
        <div>
          <label>Genres:</label>
            <label>Action
              <input type="checkbox" value= "Action" name= "Action" onChange = {e => handleCheckbox(e)}/>
            </label>
            <label>Shooter
              <input type="checkbox" value= "Shooter" name= "Shooter" onChange = {e => handleCheckbox(e)}/>
            </label>
        </div>
        <button type='submit' >Create Videogame</button>
      </form>
    </div>
  )
};

export default VideogameCreate; 