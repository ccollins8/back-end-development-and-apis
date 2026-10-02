import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api{/:date}", (req, res) => {
  let dateInput = req.params.date

  // if no date paramater is given
  if (!dateInput) {
    const now = new Date()
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    })
  }
  
  if (!isNaN(dateInput)) {
    dateInput = Number(dateInput)
  }

  const date = new Date(dateInput)
  // let date
  // if (!isNaN(dateInput)) {
  //   date = new Date(Number(dateInput))
  // } else {
  //   date = new Date(dateInput)
  // }

  if (date.toString() === 'Invalid Date') {
    return res.json({
      error: "Invalid Date"
    })
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
