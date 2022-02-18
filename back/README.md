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

https://www.postman.com/nikitos84/workspace/selina/collection/10210279-29ba48b5-46cc-4538-b719-f173976c4a90

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
