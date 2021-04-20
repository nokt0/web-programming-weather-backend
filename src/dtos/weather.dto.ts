import { IsString } from 'class-validator';

export class CreateCityIdDto{
  @IsString()
  public cityId: string;
}

export class CreateCityNameDto{
  @IsString()
  public name: string;
}

export class CreateCityDto  {
  @IsString()
  public name: string;

  @IsString()
  public cityId: string;
}

export class CreateCoordinatesDto {
  @IsString()
  public lon: string;

  @IsString()
  public lat: string;
}
