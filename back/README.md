# How To

0. npm init
1. create MySQL "selina" DB
2. set login/password/port for DB connection
   in ./ormconfig.js
   and ./src/app.module.ts
3. run migration
   ./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run
4. seed data from
   ./migration/selina-data-seeding.sql (./mysql -u username -p selina < ./selina-data-seeding.sql)

All REST requests available here:

https://www.postman.com/nikitos84/workspace/selina-test/collection/10210279-ccf7aba3-cd2c-4174-9a37-cfa53e4ab662

# Structure of DB

rooms:
id_room: id_hotel, type

hotels:
id_hotel: hotel_name, id_location

activities:
id_activity: activity_name, id_location

location:
id_location, location_name, country

users:
id_user, name

booking_hotels:
(id_room, date)=key, id_user

booking_activities:
id_activity, id_user, date
