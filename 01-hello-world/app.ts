import { createServer, Controller, Get } from 'yasui';


@Controller('/api')
class HelloController {
  @Get('/hello')
  hello() {
    return { message: 'Hello World!' };
  }
}

await createServer({
  controllers: [HelloController],
  port: 3000
});


console.log(`
  Hello World Demo

  Available endpoints:
    GET http://localhost:3000/api/hello
`);
