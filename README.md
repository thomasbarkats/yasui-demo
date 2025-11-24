# YasuiJS Demo Examples

Progressive examples showcasing YasuiJS features with Bun.

## Setup

```bash
cd demo
bun install
```

## Examples

### 01 - Hello World
```bash
bun run 01
```
- Minimal API (~15 lines)
- Single GET endpoint
- Basic syntax demonstration

### 02 - Basic CRUD
```bash
bun run 02
```
- Full CRUD on `/api/users`
- Dependency injection (Service → Controller)
- Error handling with `HttpError`

### 03 - Type Casting
```bash
bun run 03
```
- Automatic type casting for query params
- Typed parameters: `number`, `boolean`, `string[]`
- No manual conversion needed

**Test URLs:**
```
GET /api/products/1
GET /api/products?minPrice=50&maxPrice=200
GET /api/products?inStock=true
GET /api/products?categories=electronics,audio
```

### 04 - Middleware
```bash
bun run 04
```
- Global middleware (logging)
- Controller-level middleware (auth)
- Bearer token authentication

**Test:**
```bash
# Without auth
curl http://localhost:3000/api/tasks

# With auth
curl http://localhost:3000/api/tasks -H "Authorization: Bearer secret-token-123"
```

### 05 - Swagger
```bash
bun run 05
```
- Full Swagger/OpenAPI documentation
- `@ApiOperation`, `@ApiResponse` decorators

**Swagger UI:** http://localhost:3000/docs

### 06 - Full API
```bash
bun run 06
```
- E-commerce API example
- Products + Orders
- Multiple controllers/services
- Complete Swagger documentation
- **Pipe for DTOs validation** with `class-validator`
- Simple `sql.js` DB with `typeorm`
- Entities & repositories **custom injections**

**Endpoints:**
- `GET/POST /api/products`
- `GET/POST /api/orders`

**Swagger UI:** http://localhost:3000/docs
