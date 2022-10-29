const { DataTypes } = require('sequelize');

// videogamGenre:  createdAt | updatedAt | videogameId | genreId

// Genre: id | name

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {timestamps: false}
  );
};


/* 
https://api.rawg.io/api/genres

  [
    {
      "id": 4,
      "name": "Action",
      "slug": "action",
      "games_count": 165285,
      "image_background": "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg",
      "games": [
        {
          "id": 3498,
          "slug": "grand-theft-auto-v",
          "name": "Grand Theft Auto V",
          "added": 18122
        },
        {
          "id": 3328,
          "slug": "the-witcher-3-wild-hunt",
          "name": "The Witcher 3: Wild Hunt",
          "added": 16961
        },
      ],
    },
    {
      "id": 51,
      "name": "Indie",
      "slug": "indie",
      "games_count": 48155,
      "image_background": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
      "games": [
        {
          "id": 1030,
          "slug": "limbo",
          "name": "Limbo",
          "added": 11710
        },
        {
          "id": 3272,
          "slug": "rocket-league",
          "name": "Rocket League",
          "added": 10601
        },
      }
  ]
*/