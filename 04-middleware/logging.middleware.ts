import { Middleware, Req, IMiddleware, LoggerService, Logger, type Request } from 'yasui';


@Middleware()
export class LoggingMiddleware implements IMiddleware {

  use(
    @Req() req: Request,
    @Logger() logger: LoggerService,
  ): void {
    const url = new URL(req.url);
    logger.log(`${req.method} ${url.pathname}`, 'Request');
  }
}
