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
    // Each post needs to be associated to the comments table. One post might have multiple comments hence
    // a one to many relationship.

    Posts.associate = (models) => {
        Posts.hasMany(models.Likes,{
            onDelete: "cascade",
        });

        Posts.hasMany(models.Comments,{
            onDelete: "cascade", // cascade will ensure that whenever a post is deleted then
                                // all the comments associated with the post are also deleted.
        })

    };

    return Posts;
}