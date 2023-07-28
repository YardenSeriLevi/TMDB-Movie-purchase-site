[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7Tmn2VQK)

# Authors

* Yarden Seri Levi , Email:yardenco@edu.hac.ac.il

* Anael Mizrahi ,Email: anaelmi@edu.hac.ac.il

# Explanations

    The way to choose movies with us is on the search bar, where you can choose a movie by the name of the movie or the name
    of an actor and in addition you can choose movies by choosing a genre

    In case the movie does not have an image,we chose to display a defult image that is under the images folder and name
    defult pic.

   

---------------------

# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M"
   icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose
   your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration "ex4" at the top right. Make sure the "Main class" is set to "hac.DemoApplication" and that
   Java is set

Everything ok?

1. Run the SQL server as shown in the video (week 6) and create a database named "ex4". The DB credentials are stored in
   the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running
on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client
from there.

## Using the provided code to store purchases in the DB

We provide you with ready-to-use code to store purchases in the DB, in order to give you a taste of what Spring can do
for you.
Look at the DebugController class. It has a method called "addPurchase" that receives a Purchase object and stores it in
the DB.
When you develop your own controller, you must declare the repository member exactly as it is declared in the
DebugController class.
Then you can use it to store purchases in the DB (repository.save(purchase)).


## Important:
To work with this project, you need to add a constant named: API_KEY in the search page component
that will be a key you will receive from the TMDB API