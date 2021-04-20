import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import validateEnv from './utils/validateEnv';
import WeatherRoutes from "./routes/weather.route";
import FavoriteRoutes from "./routes/favorites.route";

validateEnv();

const app = new App([new IndexRoute(),  new WeatherRoutes(), new FavoriteRoutes()]);

app.listen();
