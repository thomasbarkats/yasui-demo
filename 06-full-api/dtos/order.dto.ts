import { IsEmail, IsArray, IsNumber, ValidateNested, Min, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { AP, ApiSchema } from 'yasui';


export class OrderItemDto {
  @AP()
  @IsNumber()
  productId!: number;

  @AP()
  @IsNumber()
  @Min(1)
  quantity!: number;
}

@ApiSchema('Create Order')
export class CreateOrderDto {

  @AP()
  @IsEmail()
  customerEmail!: string;

  @AP([OrderItemDto])
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}


@ApiSchema('Order')
export class OrderDto {

  @AP() id!: number;
  @AP() customerEmail!: string;
  @AP([OrderItemDto]) items!: OrderItemDto[];
  @AP() total!: number;
  @AP() status!: string;
  @AP() createdAt!: Date;
  @AP() updatedAt!: Date;
}


@ApiSchema('Message Response')
export class MessageResponseDto {

  @AP() message!: string;
}
