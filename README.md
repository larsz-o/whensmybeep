# When's My Beep? 
A full stack web application to help nurses keep track of their "beeps" (an alert from an intravenous drip machine when a medication needs attention). It's important for nurses to stay organized, especially when jumping between multiple rooms with patients who are administered many intravenous drugs. Heaing a "beep" from across the hall can be stressful if it comes when you least expect it. 

This web application helps nurses visualize exactly when their "beeps" will go off by letting them enter a list of all of the drugs they want to track during a shift. Nurses can enter a "expiration time" for each medication and get visual warnings when the timer gets under 5 minutes or completely expires. Most importantly, this application allows nurses to log in and out without disrupting the countdown. This means that they can check in when they are logging medications in any room, on any device. 

When's My Beep? is purposefully simple, reducing the distractions and clicks required to help nurses focus on what really matters: delivering amazing patient care. 

## Built With
* React
* Redux
* Redux-Sagas
* Node
* Express
* PostgreSQL
* Material UI
* Passport 
* Moment.js 

## Getting Started
Fork and clone this repository 
Create a new database called `rn_meds_tracker`. 
Use the database.sql file to create all of the tables you will need to run this project.

Create a .env file at the root of the project and paste this line into the file: `SERVER_SESSION_SECRET=superDuperSecret`

While you're in your new .env file, take the time to replace superDuperSecret with some long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure. Here's a site that can help you: https://passwordsgenerator.net/. If you don't do this step, create a secret with less than eight characters, or leave it as superDuperSecret, you will get a warning.
 `npm install`

When the installation is complete, `npm run server`
Then, `npm run client` and navigate to `localhost:3000`

## Screenshots 

## Completed Features
 - [x] Users can register for an account and log into their personal dashboards
 - [x] Upon logging in, users can quickly and easily add all of the medications they need to keep track in all of the rooms they are working for their shift 
 - [x] Users select their room number, enter the drug name, and can enter an expiration time and date for the drug if they choose. 
 - [x] The drug then populates the table on their dashboard. If they did not enter an expiration time, it appears as 'N/A'
 - [x] If a user would like to start a countdown for a particular drug, they can click "START", which will generate a pop-up dialog where they can enter the expiration time and date. 
 - [x] If the drug will expire (or the "beep" will go off) in less than 5 minutes, the row will turn yellow. If the drug has expired, the row will turn red and the timer will reset to 0. 
 - [x] Users can see when the drug did expire in their table view until they start the timer again and enter a new expiration time. 
 - [x] Data persists and the countdown continues, even if a user logs out. 
 - [x] Drugs remain in the table until they are deleted by a user, which could be helpful if the same drug is being administered in the same room for the next shift. 
 - [x] No personal information is collected. 

## Next Steps
- [ ] Material UI table sorting 

## Author
@larsz-o, Lars Mackenzie 