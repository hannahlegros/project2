1. Name of your app
     * Cocktail Dictionary (subject to change!)
2. Tech stack you plan to use
     * Sequelize
     * Node - express, express layouts, ejs, axios, pg
     * Javascript
     * Postgres
3. Simple wireframes
     * https://miro.com/app/board/o9J_ljrdwFw=/?invite_link_id=590707083613
5. API you plan to use
     * https://www.thecocktaildb.com/api.php
6. ERD
     * https://lucid.app/lucidchart/366bd753-c0e6-4aa8-8fc0-ed15f8460fa6/edit?beaconFlowId=14FC3C1F52732E9F&page=0_0&invitationId=inv_ff719815-4bda-4640-9272-60c9de375b21# 
7. Example of how to call/invoke your API, and a description of what data comes back. 
     * Use axios within my controllers to make the API call (use string interpolation to add parameters to URL)
     * The JSON data that is returned for the cocktail by name includes drink id, drink name, type of glass, if it's alcoholic or non, instructions, ingredients, measurements, and a .jpg of the drink.
     * The JSON that is returned for search by ingredient includes the ingredient id, name, description, type, if it's alcoholic or non, and the ABV
8. MVP goals (x3-5) 
     * Users can search for drinks by name or by ingredient
     * Once they have signed up, allow users to add/delete drinks to their list of favorites
     * Once they have signed up, allow users to add/delete ingredients to their "liquor cabinet"
     * Start of styling
9. Stretch goals (x2-5)
     * Allow logged in users to rate their saved drinks
     * Allow logged in users to add/delete drinks to a "try it" list
     * Better styling
10. Any potential roadblocks?
     * I don't fully understand all of this yet 😅

