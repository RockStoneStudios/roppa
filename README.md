# Next.js Roppa|Shop
Para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```
<<<<<<< HEAD

* El -d, significa __detached__
=======

* El -d, significa __detached__



## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con información de pruebas

Llamar a:
```
http://localhost:3000/api/seed
```
![ropa](https://github.com/RockStoneStudios/roppa/assets/68566212/770a9a21-8add-4800-95d8-ef6ee023c73a)

![unio](https://github.com/RockStoneStudios/roppa/assets/68566212/c2439d87-4084-4483-84e9-149e545889d3)






>>>>>>> 24ff715e32f514c91aee8960cebe31fdbd8a42c0



## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con información de pruebas

Llamar a:
```
http://localhost:3000/api/seed
```