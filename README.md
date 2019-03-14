# prometheansolutions

## To Run The Code:
1. Make sure you have Node installed! Here's a basic guide: https://blog.teamtreehouse.com/install-node-js-npm-windows. Make sure you can run `node -v` in the command prompt and get a version out - if you don't then something went wrong :( 

2. Navigate into this repo locally within the command window! Make sure you have the latest master pulled (git pull origin master)

3. In your command window run `npm install`. This will download project dependencies - no worries if that raises questions. All that matters is that they get pulled down using that command! :) 

4. Again in your command window, run `node index.js`. In your console, you should get a message saying `Example app listening on port 8000!`. 

5. Open your browser and go to `localhost:8000`. The webpage should be there!

## How to contribute
1. Nothing fancy here! Basically just pointing out that if you make changes to the index.js folder, they will only be reflected after stopping the server (`ctrl + c` inside your terminal) and restarting it (`node index.js`). HTML / CSS changes should only need a browser refresh.
2. Communicating with the Database
    - File 1 - index.js:
        1. Create a new function
            * At the top of the index.js file, there is a commented out function under the heading Example Database Function. Feel free to copy and paste the function to the bottom of the page!
            * Inside that function, there is a bracketted out area that looks like "[insert route here]". Replace that text with the unique route that AJAX will access. 
            * Again inside the function, there's another bracketted out area "[insert query here]". Replace that with the SQL query you wish to run!
            * At this point, you're either done with this file or wondering how to add dynamic content into that query. For dynamic content, you will receive JSON data from AXAJ. This JSON lives within the request object. You can read about that here: http://www.murvinlai.com/req-and-res-in-nodejs.html or just know that your data lives in `req.query`. So, if you send the data `{'firstName': 'Peter'}`, entering `req.query.firstName` will return `'Peter'`. So, you be looking to query by ID, you mind send the data `{'id': '124'}`. This would be found at `req.query.id`. This data can be inserted into a query string. 
        2. Double check your function! Does it look similar to the other ones in terms of structure and formatting?
        3. Comment! What does your function do?
    - File 2 - the HTML Page:
        1. This is the HTML page which is sending and receiving the data. Add the AJAX function! There is an AJAX function is ajax.js that is there just to copy as a basic example. The AJAX function should go inside of another function that get's called when something happens.
        2. In the AJAX function, there is a bracketted out section ["insert path here"]. Replace that path to match the path used in index.js. 
        3. Do you need to send data to the server like an ID or Name? Uncomment out the line with `data: [INSERT DATA HERE]`. Instead of the brackets, put in the data. This can be pure JSON / JavaScript objects or an variable that holds an object, but it must be in JSON format. 
        4. If the server is sending anything notable back, the `msg` variable is how to handle that. Whatever data you sent in the server will be found there!
3. Modify the Navigation Bar
    - Add To / Remove From:
        1. In main.js, there is a JavaScript object called `constants.nav` (the nav property within `constants`). In that object, the keys become was shows on the navigation bar and the values are references to the html files. For example, `{'Home': 'home'}` will show "Home" as an option on the navbar, and load "home.html" for that link. 
            1. Therefore, to add a page, you decide what it will be called and make that the first string, and make the value the prefix of the file name (everything before .html).
            2. To remove a page, just delete a key value pair!
    - Add the nav to a page:
        1. Add a div with `id='nav'`.
        2. Make sure the `init()` function is being called and `main.js`, `main.css`, and `nav.css` are included at the top of the folder.
    - To change the order, change the order they are are listed in the object!
    - Why are we doing it this way?
        * We don't have to! The system is currently build this way to make it easy to have the navbar match everywhere. Once we have 8+ pages, some of which will only show if the user is authenticated, easily making changes to the navigation becomes ugly and difficult. This sytem may seem overly difficult, but it removes a lot of complications down the road. This is especially true when it comes to showing and hiding the links because of auth status. 

    
