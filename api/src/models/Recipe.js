const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('recipe', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },

        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        score: {
            type: DataTypes.INTEGER,
        },

        healthScore: {
            type: DataTypes.INTEGER,
        },

        instructions: {
            type: DataTypes.TEXT,
        },

        mine: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });
};