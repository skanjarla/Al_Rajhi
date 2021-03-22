const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater"); 
const cors = require("cors"); 

const port = 8080; 
app.use(express.static("App"));
app.use(express.json());
app.use(cors());

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
    // errorMessages is a humanly readable message looking like this : 'The tag beginning with "foobar" is unopened'
  }
  throw error;
}

// Generate document from template using form data
function generateDocument(inputTemplateFilename, payload) {
  const outputFileName = inputTemplateFilename+"_"+(Math.floor(Math.random() * 9000) + 1000)+"_"+Date.now();
  //Load the docx file as a binary  
  var content = fs.readFileSync(path.resolve(__dirname, 'App/MortgageTemplates/'+inputTemplateFilename+'.docx'),"binary");
  var zip = new PizZip(content);
  var doc;
  try {
    doc = new Docxtemplater(zip);
  } catch (error) {
  // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error);
  }
  doc.setData(payload);
  try {
    // render the document (replace all occurences of {label} )
    doc.render();
  } catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    errorHandler(error);
  }
  var buf = doc.getZip().generate({ type: "nodebuffer" });   
  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(path.resolve(__dirname, `App/MortgageReports/${outputFileName}.docx`),buf);   
  return outputFileName;
}

// Delete Documents
function deleteDocument(docs) {         
    docs.map((doc) => {
      // console.log(doc);
      fs.unlink((__dirname, `App/MortgageReports/${doc}.docx`), (err) => {
        if (err) {
          throw err;
        }
      });
    });
}

// Test path for the download file
app.post("/generate_documents", (req, res) => {   
  if(req.body && req.body.data){     
    // let outputDocument  = generateDocument(inputTemplateFile, req.body.data);    
  
    let templatesArray = ["ارادة الشراء الحقيقي","أقرار معاينة عقار قابل للتأجير","إقرار معاينة","الإقرار الضريبي للمالك", "التعهد","تعهد والتزام بمراحل البناء","خيار الشرط","فاتورة بيع عقار","نموذج إرادة شراء","نموذج عرض السعر","تعهد بتوفير مستند رخصة البناء في منتج البناء الذاتي"] ;
    let docsArr = [];
    
    templatesArray.map((template) => {
        docsArr.push(generateDocument(template, req.body.data));
      });
 
  //Delete generated documents after 50 seconds
  setTimeout(() => {
    deleteDocument(docsArr);
  }, 50000);

  console.log(docsArr);
  res.status(200).send({filenames:docsArr}); 
  }    
}); 
app.listen(port, () => {
  console.log(`application running at port : ${port}`);
});
