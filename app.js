import express from "express";
import * as db from "./src/config/db/InitialData.js";
import userRoutes from "./src/modules/user/routes/UserRoutes.js";
import checkToken from "./src/config/auth/CheckToken.js";


const app = express();
const env = process.env; // consegue pegar todas as variaves de ambiente
const PORT = env.PORT || 8080;

db.createInitialData();

app.use(express.json());

app.use(userRoutes);

app.get('/api/status', (req, res) => {
    return res.status(200)
        .json({
        service: "Auth-API",
        status: 'OK',
        httpStatus: 200,
    });
});

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
})