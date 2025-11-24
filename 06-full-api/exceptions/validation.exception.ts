import type { ValidationError } from 'class-validator';
import {
  AP,
  ApiSchema,
  APO,
  HttpCode,
  HttpError,
  type IParamMetadata,
  type RouteRequestParamTypes,
} from 'yasui';


@ApiSchema('Validation Error')
export class ValidationException extends HttpError {

  @AP() private paramType: RouteRequestParamTypes;
  @APO() private paramName?: string;
  @APO() private className?: string;
  @AP() private properties: string[];
  @AP() private errors: Record<string, string[]>;


  constructor(
    paramMetadata: IParamMetadata,
    errors: ValidationError[]
  ) {
    super(HttpCode.BAD_REQUEST, '');

    this.paramType = paramMetadata.type;
    this.paramName = paramMetadata.name;
    this.className = paramMetadata.metatype?.name;
    this.message = (this.className || this.paramType) + ' validation failed';
    this.properties = [];
    this.errors = {};

    for (const error of errors) {
      this.properties.push(error.property);
      this.errors[error.property] = Object.values(error.constraints || {});
    }
  }
}
