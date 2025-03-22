"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
/*
mongosh "mongodb+srv://clustertest.zd7tc.mongodb.net/" --apiVersion 1 --username <db_username>
use top_war_movies
db.users.insertOne({
  username: "admin",
  password: "dittStarkaLösenord",
  isAdmin: true,
  createdAt: new Date()
})
*/
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', userRoutes_1.default, movieRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hej Världen!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
