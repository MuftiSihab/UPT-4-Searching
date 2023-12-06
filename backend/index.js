import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import sequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

// Buat web server
const app = express();

const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// Buat tabel users dan products
// (async () => {
//     await db.sync();
// })();

// Mendefinsikan session
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: "auto"
    }
}));

// Tambahkan middleware
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

// Jalankan web server
app.listen(process.env.APP_PORT, () => {
    console.log(`Server up and running on port : ${process.env.APP_PORT}`);
});