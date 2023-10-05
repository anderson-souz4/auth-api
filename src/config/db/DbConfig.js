import { Sequelize } from "sequelize";

const sequelize = new Sequelize("auth-db", "admin", "123456", {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        freezeTableName: true
    }
});

sequelize.authenticate().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.error("Error connecting to DB", err);
    console.error(err.message)
});

export default sequelize;