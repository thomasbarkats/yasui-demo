import { Controller, Get } from 'yasui';


// No auth middleware - public endpoint
@Controller('/api/public')
export class PublicController {

  @Get('/health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
