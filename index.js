const express = require("express");
const app = express();
const listingRoute = require("./routes/list");
const XLSX = require("xlsx");

//middleware
app.use(express.json());
app.use("/api/list", listingRoute); //a route to take in the data from the api and store into xlsx sheet. The sheet is generated and stored in the local storage.

app.get("/", (req, res) => {
  const wb = XLSX.readFile("BookListData.xlsx"); //reading the xlsx file

  const ws = wb.Sheets["BookList"]; //storing the sheet in a variable

  const data = XLSX.utils.sheet_to_json(ws); //covnerting the sheet to json

  let flag = false;
  var pos = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].title == req.body.title) {
      //checking if the requested title is present in the book list data
      flag = true;
      pos = i;
      break;
    } else {
      flag = false;
    }
  }
  if (flag === true) res.json(data[pos]);
  //responding with the book information in json
  else res.send("Book not found");
});
app.listen(8800, () => {
  console.log("Backend server is running!");
});
