import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/index.js';
import {
  type IParamMetadata,
  type IPipeTransform,
  type Constructible,
  RouteRequestParamTypes,
  PipeTransform,
} from 'yasui';


@PipeTransform()
export class ClassValidatorPipe implements IPipeTransform {

  async transform(value: unknown, metadata: IParamMetadata): Promise<unknown> {
    if (
      metadata.type !== RouteRequestParamTypes.BODY &&
      metadata.type !== RouteRequestParamTypes.QUERY
    ) {
      return value;
    }

    const { metatype } = metadata;
    if (
      !metatype ||
      typeof metatype !== 'function' ||
      metatype === String ||
      metatype === Number ||
      metatype === Boolean ||
      metatype === Array ||
      metatype === Object
    ) {
      return value;
    }

    const object = plainToInstance(<Constructible>metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new ValidationException(metadata, errors);
    }
    return object;
  }
}
