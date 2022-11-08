import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {postVideogame, getPlatforms} from '../../redux/actions';
import axios from "axios";


function validate(input){
  let errors = {};
  const blanks = /^\s+$/
  const validateLetters = /^[0-9a-zA-Z ']+$/

  if (!input.name || input.name.length === 0) {
    errors.name = 'Please enter the videogame Name';
  } else if (input.name.length > 20 ) {
    errors.name = "The name cannot have more than 20 characters"
  } else if (input.name.match(blanks)){
    errors.name = "The name cannot be blank spaces"
  } else if(!input.name.match(validateLetters)) {
    errors.name = "You can only use alphanumeric characters"
  } else if(!input.description || input.description.length > 300){
    errors.description = "Please write a description, no longer than 300 characters"
  } else if(input.description.match(blanks) || !input.desccription.match(validateLetters)){
    errors.description = "The description text cannot contain only blank spaces, you can only use alphanumeric characters"
  } else if (input.rating < 1 || input.rating > 5  ) {
    errors.rating = "The videogame can have a rating between 1 and 5"
  } else if(input.platforms.length === 0) {
    errors.platforms = "Please choose at least one platform"
  } else if(input.genres.length === 0) {
    errors.genres = "Please choose at least one genre"
  } 
  return errors;
};



const VideogameCreate = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const platforms = useSelector((state) => state.platforms);
  const allGenres = useSelector((state) => state.genres);
  const [ errors, setErrors] = useState({});

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
  }, [dispatch]);

  const handleChange = (e)=>{

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    console.log(input);
  };

  const handlePlatformsSelect = (e)=>{
    if(!input.platforms.includes(e.target.value)){
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value]
    });
  }
  }; 
  const handleGenresSelect = (e)=>{
    if(!input.genres.includes(e.target.value)){
    setInput({
      ...input,
      genres: [...input.genres, e.target.value]
    });
  }
  }; 

  const handleSubmit = (e)=>{
   e.preventDefault();
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

  const handleDelete = (value) =>{

    if(input.platforms.includes(value)){
      return setInput({
        ...input,
        platforms: input.platforms.filter( plataforma => plataforma !== value)
      })
    }
    if(input.genres.includes(value)){
      return setInput({
        ...input,
        genres: input.genres.filter( genero => genero !== value)
      })
    }
  };


  return(
    <div>
      <Link to='/home'><button>Home</button></Link>
      <h1>Create you Videogame</h1>
      <form onSubmit = {e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input type="text" value= {input.name} name= "name" onChange = {e => handleChange(e)}/>
          {errors.name && (<p className='error'>{errors.name}</p>)}
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value= {input.description} name= "description" onChange = {e => handleChange(e)}/>
          {errors.description && (<p className='error'>{errors.description}</p>)}
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
          <label>Platforms: </label>
          <select onChange = {e => handlePlatformsSelect(e)} >
             {platforms?.map(plataforma =>(
                <option value={plataforma.name} key={plataforma.id}>{plataforma.name}</option>
              ))}
          </select>
          {
            input.platforms?.map( p =>
            <div className = 'selected_Delete' key={p}>
              <p>{p}</p>
              <button className='buttonX' onClick={()=>handleDelete(p)}>x</button>
            </div>)
          }
          </div>
        <div>
          <label>Genres:</label>
          <select onChange = {e => handleGenresSelect(e)}>
            {allGenres?.map(genero =>(
              <option value={genero.name} key={genero.id}>{genero.name}</option>
            ))}
           </select>
            {
              input.genres?.map(g =>
                <div className = 'selected_Delete' key={g}>
                  <p>{g}</p>
                  <button className='buttonX' onClick={()=>handleDelete(g)}>x</button>
                </div>)
            }
        </div>
        <button type='submit' >Create Videogame</button>
      </form>
    </div>
  )
};

export default VideogameCreate; 