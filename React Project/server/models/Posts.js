module.exports = (sequelize, DataTypes ) => { // ORM tool used is sequelize.
    const Posts = sequelize.define("Posts", {
       title: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       description: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       username: {
           type: DataTypes.STRING,
           allowNull: false,
       },
    });
    return Posts;
}