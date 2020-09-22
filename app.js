const express = require("express");
const app = express();
const fs = require("fs");
const url = require("url");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const port = 8080;
app.use(express.static("App"));

app.use(express.json());

function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrors));

  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map(function (error) {
        return error.properties.explanation;
      })
      .join("\n");
    console.log("errorMessages", errorMessages);
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
  throw error;
}

// Test path for the download file

app.get("/download", (req, res) => {
  console.log(req.body);
  return res.download(__dirname, `App/Templates/template_1.docx`);
});

app.post("/get_report", (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  //Load the docx file as a binary
  var content = fs.readFileSync(
    path.resolve(__dirname, `App/Templates/${queryObject.template}`),
    "binary"
  );

  var zip = new PizZip(content);
  var doc;
  try {
    doc = new Docxtemplater(zip);
  } catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error);
  }

  doc.setData(req.body);
  try {
    // render the document (replace all occurences of {first_name} ...)
    doc.render();
  } catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    errorHandler(error);
  }

  var buf = doc.getZip().generate({ type: "nodebuffer" });
  let filename = `report_${Date.now()}`;
  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(
    path.resolve(__dirname, `App/Reports/${filename}.docx`),
    buf
  );
  res.send({ name: filename });
  //res.download(`App/Reports/${filename}.docx`, `${filename}.docx`);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
