# creacion del package.json
  npm init

# instalacion de librerias
  npm i cors 
  npm i morgan
  npm i express
  npm i mongoose
  npm i bcryptjs
  npm i jsonwebtoken

  npm i dotenv --save-dev
  npm i nodemon --save-dev

  npm i @types/cors --save-dev/
  npm i @types/morgan --save-dev/
  npm i @types/express --save-dev/
  npm i @types/jsonwebtoken --save-dev/

# ahora incluimos typescript
  tsc --init

# configurar tsc config.json carpeta de salida
  "outDir": "./build"

# Creacion de scripts para ejecutar el backend en el package.json
  "dev": "nodemon build/index.js",
  "build": "tsc -w"

# Vamos a crear las carpetas
  Crear carpeta scr, dentro de la carpeta crear
  carpeta config
  carpeta controlador
  carpeta dao
  carpeta entidad
  carpeta esquema
  carpeta middleware
  carpeta ruta
  index.ts
