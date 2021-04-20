import HttpException from '../exceptions/HttpException';
import {CreateCityDto, CreateCityIdDto, CreateCityNameDto} from "../dtos/weather.dto";
import cityModel from "../models/cities.model";
import {City} from "../interfaces/city.interface";
import {isEmpty} from "../utils/util";

class FavoriteService {
    public favoriteCities = cityModel;

    async addToFavorites(cityData: CreateCityDto) : Promise<City> {
        if(isEmpty(cityData)) throw new HttpException(400, "You're not city name");

        const findCity: City = await this.favoriteCities.findOne(cityData );

        if (findCity) throw new HttpException(409, `You're city ${findCity.name} already exists`);

        return await this.favoriteCities.create({...cityData});
    }

    async deleteFromFavorites(cityNameDto: CreateCityNameDto) : Promise<City> {
        if(!cityNameDto) throw new HttpException(400, "You're not city name");
        const deleteCityByName: City = await this.favoriteCities.findOneAndDelete(cityNameDto);

        if (!deleteCityByName) throw new HttpException(409, "There is no city in the favorites");

        return deleteCityByName;
    }


    async findAllFavorites() : Promise<City[]> {
        return await this.favoriteCities.find();
    }

    public async findCityById(cityIdDto: CreateCityIdDto): Promise<City> {
        return await this.favoriteCities.findOne(cityIdDto);
    }

}

export default FavoriteService;
