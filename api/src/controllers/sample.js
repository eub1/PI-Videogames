const mySet = new Set()

  let gotPlatformsName = apiVideogames.results.map((videogame) => {
    return videogame.platforms
  })
    gotPlatformsName.flat().map((plataforma) => {

    return mySet.add(plataforma.platform.name)
  })
  const platformsByName = [...mySet];

  const formatApiVideogames = apiVideogames.results.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame["description"],
      released: videogame.released,
      rating: videogame.rating,
      platforms: platformsByName,
      genre: videogame.genres.map((genero) => genero.name)
    }
  });

