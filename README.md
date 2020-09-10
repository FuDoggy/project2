# EXPRESS BARTENDER
![image](https://img.shields.io/badge/license-MIT%20License-green)


## CONCEPT

This application was designed for the purpose of providing a unique, one-stop application experience where members are able to research and retrieve recipes for their favorite drinks, learn about the history of spirits, add/update their own recipes to our database, and review testimonials.  With most bars and pubs closed due to the pandemic, this application gives the user the opportunity to become their own home bartender.  


## USAGE

This application utilized the Cocktail DB API in order to produce a unique user experience across 3 webpages and 10 website sections.  In the home/landing page, the user is presented with a navigation bar with the following sections:

<p>Home</p>
<p>About</p>
<p>Cocktails</p>
<p>Non-Alcoholic</p>
<p>Spirit Guide</p>
<p>Testimonials</p>
<p>Gallery</p>
<p>Mixologists</p>
<p>Contact</p>
<p>Add Your Own Drink</p>

Upon landing on the sign-up/log-in page page, the user will be asked to sign-up as a member or enter their log-in credentials.  They will then be redirected to the members page and presented with a navigation bar with the above titles.  In the Cocktails section, the user is able to search dynamically (search results change as user types) for their drinks, spirits, or ingredients of choice.  They also have the ability to browse through a list of randomly generated drinks from the database.  In addition, users may add, update, and delete drink recipes to the database.  The application will also capture their submissions on their member profiles for future reference.  The Spirit Guide offers information and history on five of the most common spirits. 


## TECHNOLOGIES USED
 
<p>bcrypt</p>
<p>Bootstrap </p>
<p>owasp password strength test NPM package</p>
<p>dotenv NPM package</p>
<p>Express library</p>
<p>Heroku</p>
<p>JavaScript/HTML/CSS</p>
<p>jQuery</p>
<p>mySQL</p>
<p>mySQL Workbench</p>
<p>Node.js</p>
<p>Passport NPM package</p>
<p>Postman</p>
<p>Python</p>
<p>Sequelize</p>


## PROCESS

Two of our greatest strengths were our ability to communicate and collaborate.  We were able to take advantage of each group member's specializations and unique skillsets.  It was this concept that allowed us to assign and manage tasks within the project effectively.  If a group member was didn't understand or was overwhelmed by a task, we quickly called a meeting to resolve those issues.  We adapted to each member's interests with respect to assignments and deliverables.  We found that we worked more effectively when we were able to choose work that interested us, rather than relying on random assignment.  We had a review session for virtually every push to GitHub, and went over the changes to the code several times daily as a group.  This way, we were able to review pull requests and merge conflicts as group before merging from branches to the master.  We have a mutual respect for one another, and feel that we collectively complement each other nicely.


## CHALLENGES

There were a few back-end API issues which took some time to resolve. Among those challenges were customizing the database to fit our objectives.  The information that we received from the Cocktail DB API was not formatted and didn't offer a functional foundation for our app.  On the front-end side, we encountered several challenges with navigating through the Bootstrap template's configuration and structure. 


## SUCCESSES

We successfully executed a well-designed app that is both highly unique and useful. We were very collaborative and communicated well. We held scrum meetings before starting work on a daily basis to collectively share what we worked on the day before, what we would be working on that day, and any problems that we were facing. By doing this daily, we were able to stay on top of issues and to proactively discuss potential challenges that may be coming down the road. We were also able to utilize Agile methodology to complete small concept pieces of the project in order to test functionality and verify design.

On an individual level, we all came up with some examples of obstacles that we faced, and how we were able to overcome them.

Anissa - From a styling perspective, the main issue was figuring out how to align buttons on the recipe submission form without interfering with the functionality of another form button. Bryan was able to help navigate the code to ensure all buttons appeared as intended and the functionality left in tact to achieve the desired outcome.

Tim - For me, the biggest challenge I faced was in retrieving information from the database and transferring that information to the front-end; occasionally there would be code in the bootstrap template that prevented certain pieces of information from displaying and the headache involved locating that code and understanding why it worked the way it did.  Navigating through the bootstrap template was an occasionally overwhelming task - going through files upon files and pages upon pages to locate a single piece of code.

Kevin F. - One of my biggest challenges was getting the dynamic search function to work.  This functionality was difficult as the search results changes as the user types in the search bar.  This was something that I hadn't done before. It was persistence, Googling, and collaboration with my teammates that contributed to the completion of this task.  Another challenge was getting a functioning drink database from an API that wasn't very user friendly.  Again, persistence and teamwork triumphed over this challenge as well.

Kevin M. - Careful database design was also an important part of project. The main functionality of searching through drinks, authenticating users, and allowing users to create and edit drinks was all connected through the database. Database management and testing was accomplished through the use of mySQL, Postman, and the Sequelize library, among other technologies. This part of the project was important to design early, so that other members of the team could design around and make use of the database.

Routing for the website also needed to be designed in such a way that data from multiple SQL tables was easily retrievable. Routing functions were performed with the extensive use of the Node.js Express library. Although the routing, database design, and scripting was somewhat complex to navigate, careful organization helped every member of the team contribute to different parts of the project.


## DIRECTIONS FOR FUTURE DEVELOPMENT

The groundwork has been laid, but there are several enhancements that could greatly improve the user experience:

Development of an occasion section that matches user with drinks that are appropriate for particular occasions (i.e. weddings, Valentine's Day, etc.)

Development of a profile tracking system that keeps track of user preferences and generates drink recommendations based on those preferences/searches.  

Allow users to input missing ingredients in drink recipes and connect them with local retailers of those ingredients. 

Ability to add/save testimonials


## IMAGE OF DEPLOYED APPLICATION
![image](https://user-images.githubusercontent.com/64618290/92814775-6edfb080-f378-11ea-85d1-9937f797d155.png)


## AUTHORS AND ACKNOWLEDGEMENT

This project was collaboratively constructed by two teams:

<p>Front-End:  Anissa Shanks</p>
<p>            Tim Hellman</p>

<p>Back-End:   Kevin Miller</p>
<p>            Kevin Fujimoto</p>

We also had the assistance of our instructor, Bryan Swarthout, TA, Wilson Lam, and tutor, Chad Tao.