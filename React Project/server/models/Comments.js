module.exports = (sequelize, DataTypes ) => { // ORM tool used is sequelize.
    const Comments = sequelize.define("Comments", {
       commentBody: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       username: {
        type: DataTypes.STRING,
        allowNull: false,
       }
    });
    return Comments;
}