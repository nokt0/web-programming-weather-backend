import {NextFunction, Request, Response} from 'express';
import FavoriteService from "../services/favorite.service";
import {City} from "../interfaces/city.interface";
import {CreateCityDto, CreateCityIdDto, CreateCityNameDto} from "../dtos/weather.dto";
import WeatherService from "../services/weather.service";
import {WeatherApiResponse} from "../interfaces/apiResponses.interface";
import HttpException from "../exceptions/HttpException";


class FavoriteController {
    public favoriteService = new FavoriteService();
    public weatherService = new WeatherService();

    public getFavoriteCities = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: City[] = await this.favoriteService.findAllFavorites();
            res.status(200).json({data: findAllUsersData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    };

    public getCityById = async (req: Request, res: Response, next: NextFunction) => {
        const cityIdDto: CreateCityIdDto = req.params as unknown as CreateCityIdDto;

        try {
            const findOneUserData: City = await this.favoriteService.findCityById(cityIdDto);
            res.status(200).json({data: findOneUserData, message: 'findOne'});
        } catch (error) {
            next(error);
        }
    };

    public addCity = async (req: Request, res: Response, next: NextFunction) => {
        const cityNameDto: CreateCityNameDto = req.body;
        let weatherForCity: WeatherApiResponse;

        // Check city exists
        try {
            weatherForCity = await this.weatherService.requestWeatherByCity(cityNameDto);
        } catch (error) {
            next(error)
        }

        const cityDto: CreateCityDto = {name: weatherForCity?.name, cityId: weatherForCity?.id.toString()}

        try {
            const foundCity = await this.favoriteService.findCityById(cityDto as CreateCityIdDto);
            if(foundCity){
                next(new HttpException(409,`City ${cityNameDto?.name} already exists`));
            }
        }catch (error){
            next(error)
        }

        try {
            await this.favoriteService.addToFavorites(cityDto);
            res.status(201).json({data: weatherForCity, message: 'added'});
        } catch (error) {
            next(error);
        }
    };

    public deleteCity = async (req: Request, res: Response, next: NextFunction) => {
        const cityNameDto: CreateCityNameDto = req.body as unknown as CreateCityNameDto;

        try {
            const deletedCity: City = await this.favoriteService.deleteFromFavorites(cityNameDto);
            res.status(200).json({data: deletedCity, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    };
}

export default FavoriteController;
