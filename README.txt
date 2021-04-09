
SETUP:

    Create a postgresSQL database with that follows the example in .env.
    I didn't bother hiding it since this isn't production grade and doesn't use any personal
    passwords that I use. Feel free to change it if you want

    run pipenv install
    run pipenv shell
    run flask upgrade
    run flask seed all
    split your terminal
    In one terminal, run "flask run" to run the backend server
    In the other, cd into front-end and run npm install and then npm start
    You should be able to access the front-end on localhost 3000

    This ought to do it. If you run into problems, feel free to email me 
    at brandonperryofficial@gmail.com and I'll get back to as fast as I can

USEAGE NOTES:
    Press enter to commit a new task, list, comment, or edits while you have the textbox selected

REQUIEMENTS:
    Lists:
    ● When rendering the application, the homepage should render all lists with all associated tasks
        Done

    ● There should be a way for users to edit the title of a list,
        or completely delete it AND all its associated tasks,
        as well as the comments of those tasks
            Done, though perhaps a little cludgy imo
    Tasks:
    ● By default, the tasks should only display the title and status
        Done. The status is displayed implicetly through the styling (completed tasks are checked, crossed out, and darkened)

    ● When an individual task is clicked, the application should display the full details of that task,
        such as it’s title, description, status, and all associated comments.
        Done
    
    ● When viewing an individual task there should be ways for users to:
        ○ Add new comments
        ○ Edit / delete posted comments
        ○ Edit the status
        Done, but note that in the sidebar there isn't a way to edit the status since the user can click the checkbox 
        right next to it. Adding a way to change status in the sidebar seems a bit redundant considering

    Backend:
    ● Utilize a backend server and with API endpoints for lists, tasks, and comments
    using your preferred API architecture (EX: REST, GraphQL, gRPC, etc.)
        Done
    ● The Lists and Comments endpoints should allow create, read, and delete actions
        Done, though I think you're missing edit actions, they're listed above
    ● The Tasks endpoints should allow create, read, update, and delete actions
        Done

KNOWN BUGS
    When tasks or comments are edited, they end up at the end of the stored
    array, so they get pushed down to the bottom of their respective displays.


    
    