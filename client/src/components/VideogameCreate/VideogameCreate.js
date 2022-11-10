import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getAllVideogames, getPlatforms, getGenres} from '../../redux/actions';
import axios from "axios";
import s from "../VideogameCreate/videogameCreate.module.css"


function validate(input){
  let errors = {};
  const blanks = /^\s+$/
  const validateLetters = /^[0-9a-zA-Z ]+$/

  if (!input.name || input.name?.length === 0) {
    errors.name = 'Please enter the videogame Name';
  } else if (input.name?.length > 20 ) {
    errors.name = "The name cannot have more than 20 characters"
  } else if (input.name?.match(blanks)) {
    errors.name = "The name cannot be blank spaces"
  } else if (!input.name?.match(validateLetters)) {
    errors.name = "You can only use alphanumeric characters"
  } else if (!input.description || input.description?.length > 300) {
    errors.description = "Please write a description, no longer than 300 characters"
  } else if (input.description?.match(blanks)) {
    errors.description = "The description text cannot contain only blank spaces"
  } else if (input.rating < 0 || input.rating > 5  ) {
    errors.rating = "The videogame can have a rating between 0 and 5"
  } else if(input.platforms?.length === 0) {
    errors.platforms = "Please choose at least one platform"
  } else if(input.genres?.length === 0) {
    errors.genres = "Please choose at least one genre"
  } else if(new Date(input.released) > new Date()) {
    errors.released = "The released date cannot be greater than today"
  }
  return errors;
};



const VideogameCreate = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const allVideogames = useSelector((state) => state.all_videogames)
  const platforms = useSelector((state) => state.platforms);
  const allGenres = useSelector((state) => state.genres);
  const [ errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: []
  });

  const allNames = allVideogames.map(v => v.name);

  const current = new Date();
  const today = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`

  useEffect(()=>{
    dispatch(getPlatforms());
    dispatch(getGenres())
  }, [dispatch]);

  //* ------- HANDLE INPUT -------
  const handleChange = (e)=>{
 
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setTimeout(() => {
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
    }, 1000);

  };

  //* -------SELECT / DELETE- PALTFORMS & GENRES -------

  const handlePlatformsSelect = (e)=>{
    if(!input.platforms.includes(e.target.value)){
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
      });
      setTimeout(() => {
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
      }, 1000);
    }
  }; 
  const handleGenresSelect = (e)=>{
    if(!input.genres.includes(e.target.value)){
      setInput({
        ...input,
        genres: [...input.genres, e.target.value]
      });
      setTimeout(() => {
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
      }, 1000);
    }
  }; 
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

  //*
  const handleErrorsCheck = (e) => {
    setErrors(validate(input));
  }

  //*------- SUBMIT FORM-------

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setErrors(validate(input));
   
    try {
        const response = await axios.post("http://localhost:3001/videogames", input)
        if(response.status >= 200 && response.status <=205){
          dispatch(getAllVideogames())
          alert("Videogame created");
          setInput({
            name: "",
            description: "",
            released: "",
            rating: 0,
            platforms: [],
            genres: []
          });
          history.push(`/videogame/${response.data.id}`) 
        } else {
          alert("Something went wrong, please try again")
        }
      } catch (error) {
        alert(`Something went wrong. ${error.message}`)
      }
    };
  

  return(
    <div className={s.videogameCreate_Main}>
      <h1>Create your Videogame</h1>
      <form onSubmit = {e => handleSubmit(e)} className={s.form}>
        <div>
          <label htmlFor="name">Name:</label><br/>
          <input type="text" value= {input.name} name= "name" onChange = {e => handleChange(e)}/>
          { allNames.includes(input.name) ? "This videogame already exists, please create a different one" : null }
          {errors.name && (<p className='error'>{errors.name}</p>)}
        </div>
        <div>
          <label htmlFor="description">Description:</label><br/>
          <input type="text" value= {input.description} name= "description" onChange = {e => handleChange(e)}/>
          {errors.description && (<p className='error'>{errors.description}</p>)}
        </div>
        <div>
          <label htmlFor='released'>Released date:</label><br/>
          <input type="date" value= {input.released} name= "released" onChange = {e => handleChange(e)}/>
          {errors.released && (<p className='error'>{errors.released}</p>)}
        </div>
        <div>
          <label htmlFor='rating'>Rating:</label><br/>
          <input type="number" value= {input.rating} name= "rating" onChange = {e => handleChange(e)} min={0} max={5}/>
          {errors.rating && (<p className='error'>{errors.rating}</p>)}
        </div>
        <div>
          <label htmlFor='image'>Image:</label><br/>
          <input type="text" value= {input.image} name= "image" onChange = {e => handleChange(e)}/>
        </div>
        <div>
          <label>Platforms: </label><br/>
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
           {errors.platforms && (<p className='error'>{errors.platforms}</p>)}
        </div>
        <div>
          <label>Genres:</label><br/>
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
             {errors.genres && (<p className='error'>{errors.genres}</p>)}
        </div><br/>
        { Object.keys(errors).length > 0 ?
        <button type="submit" disabled={true} key={Math.random()}>Cannot Submit, complete fields as required</button> :
        <button type='submit' key={Math.random()} >Create Videogame</button>
        }
      </form><br/>
      <button type="button" onClick = {e=> handleErrorsCheck(e)}>Validate</button>
      <br/>
      <Link to='/home'><button>Home</button></Link>
    </div>
  )
};

export default VideogameCreate; 