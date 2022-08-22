# epi-use
Schedule Management System for Epi-Use Technical Interview

# Overview of project functionality
- A user will be able to login to the web app using their login credentials as provided in the registered_users json file.
- Users will not be able to access pages of the web app if they are not logged in, and if attempted to do so, will be redirected to the login page.
- Once a user has logged in, they can navigate to the main menu page. 
- From the main menu, a user is able to navigate to either the page to view all employees they are responsible for, or to view the schedules of all their responsible employees, as well as their own.

# Architecture Diagram
![image](https://user-images.githubusercontent.com/19359163/185963378-c1e6cb49-7be2-4000-bd15-227823c5869f.png)

# Setup Instructions
- Make a clone of this directory
- Direct to the main schedule-manager folder in your terminal
- Assuming that the computer has no packages and dependencies installed, run **npm install** to download all the required dependencies
- Run **ng serve** in your terminal to open the web app
- Navigate to http://localhost:4200/login on your browser
