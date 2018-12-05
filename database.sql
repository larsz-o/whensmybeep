CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "rooms" (
	"id" int primary key, 
	"number" int not null
);
CREATE TABLE "medications" (
	"id" serial primary key, 
	"name" varchar (250), 
	"room_id" int references "rooms"("id"), 
	"time_end" bigint, 
	"user_id" int references "person"("id"), 
	"expired" boolean default false, 
	"expiration_time" text
);