# epi-use
Schedule Management System for Epi-Use Technical Interview
**Due to me working part-time while studying I have not been able to spend as much time on this project as I would have liked to, and so I unfortunately must submit a project that is not fully functional. However I hope you are able to see my coding style and passion in this project nontheless and consider me for the internship.** The front-end is really just barebones, and I know it should be better, but I did skimp on that in order to add more back-end code.

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

# Login
![image](https://user-images.githubusercontent.com/19359163/185966877-54cbd2fa-bb80-4bc9-b6c3-5b5e4e70161a.png)

# Main Menu Page
The ID of the employee is stored on localstorage to be able to use this with all future operations.
![image](https://user-images.githubusercontent.com/19359163/185966962-0dd3360e-478b-4693-9199-91d04655b2d4.png)

# Responsible Emplyees (Hierarchy) Page
Unfortunately this is not fully functional. An employee can only view themselves in this hierarchy and not all employees underneath them. I did write code to accomplish this but was not able to sort out all the issues I faced in time.

![image](https://user-images.githubusercontent.com/19359163/185967132-88198fbb-0378-4041-ac53-0a9fbcde3f06.png)

# View Schedules
This page unfortunately has no functionality I can show. I did write a lot of code to try and get this working but again was not able to put it all together in time.

# Logout
When the user logs out it resets the local storage and prohibits them from accessing pages by just typing it into the URL. The user is directed to the login page after they click on logout.
