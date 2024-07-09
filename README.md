создать файл 
```
.env
```
Поместить в него переменные 
```
API_URL=http://localhost:3001
CLIENT_URL=*
DB_URL=mongodb://localhost:27017/shop
PORT=3001
JWT_ACCESS_SECRET=jwt-secret-key
JWT_REFRESH_SECRET=jwt-refresh-secret-key
```

настроить данные для отпарвки писем активации при регистрации в файле:
```
/src/services/mail-service.ts
```