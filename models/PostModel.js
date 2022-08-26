module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Post
}