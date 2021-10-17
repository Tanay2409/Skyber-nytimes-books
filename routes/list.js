const router = require("express").Router();
const dotenv = require("dotenv");
const axios = require("axios");
const XLSX = require("xlsx");
dotenv.config();

axios
  .get(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.KEY}` //getting the data from the api using key
  )
  .then((result) => {
    const workSheet = XLSX.utils.json_to_sheet(result.data.results.books); //only storing the books value from the data and storing as a sheet
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "BookList");

    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, "BookListData.xlsx");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = router;
