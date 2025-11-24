import { Middleware, Header, HttpError, IMiddleware, LoggerService, Logger } from 'yasui';


@Middleware()
export class AuthMiddleware implements IMiddleware {

  /**
   * Middleware with DI - same patterns as controllers!
   * Validates Bearer token from Authorization header
   */
  use(
    @Header('authorization') authHeader: string,
    @Logger() logger: LoggerService,
  ): void {
    if (!authHeader) {
      throw new HttpError(401, 'Authorization header required');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new HttpError(401, 'Invalid authorization format. Use: Bearer <token>');
    }

    const token = authHeader.slice(7);

    // Simulated token validation
    if (token !== 'secret-token-123') {
      throw new HttpError(403, 'Invalid or expired token');
    }

    logger.log('User authenticated successfully', 'AuthMiddleware');
  }
}
