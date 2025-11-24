import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';
import { AP, APO, ApiSchema } from 'yasui';


@ApiSchema('Create Product')
export class CreateProductDto {

  @AP()
  @IsString()
  @MaxLength(200)
  name!: string;

  @AP()
  @IsNumber()
  @Min(0)
  price!: number;

  @AP()
  @IsNumber()
  @Min(0)
  stock!: number;

  @APO()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}


@ApiSchema('Update Product')
export class UpdateProductDto {

  @APO()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;

  @APO()
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @APO()
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @APO()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}


@ApiSchema('Product')
export class ProductDto {

  @AP() id!: number;
  @AP() name!: string;
  @AP() price!: number;
  @AP() stock!: number;
  @APO() description?: string;
  @AP() createdAt!: Date;
  @AP() updatedAt!: Date;
}
