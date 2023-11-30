# Note-App

To Run The App on The front end navigate to notes-frontend folder
run `npm i` 

To Run The App on the back end navigate to basic-api folder
run `npm i`

For this App to work MongoDB needs to be installed ( [Specifically MongoDB Shell](https://www.mongodb.com/try/download/shell)
Steps to create the Database:
1) open Terminal
2) Type mongosh ( pay attention to the port that MongoDB is running on)
3) Create the Document Database by writing `use notes-db` in the MongoDB shell
4) Create the note collection by typing `db.createCollection("notes")`
   The notes collection would look like 
      `
      {
        text: "text",
        link: "link"
      }
      `
  note that the `id_` will be generated automatically
5) To add some dummy data in the notes collection 
  `db.notes.insertOne({text:"first note", link:"HTTP://first-note"})`

6) to check all the elements available in the notes document
   `db.notes.find()`

P.S. To test the backend seperatly you can install Insomnia and test all the endpoints

