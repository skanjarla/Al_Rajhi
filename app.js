const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const docxConverter = require('docx-pdf');
const cors = require("cors"); 

const port = 8080;
//const port = process.env.PORT || 8080; // process.env.PORT for heroku hosting
app.use(express.static("App"));
app.use(express.json());
app.use(cors());

// const TemplateFileName = 'mortgageTemplateDocument';
const inputTemplateFile = path.resolve(__dirname, 'App/MortgageTemplates/mortgageTemplateDocument.docx');
const outputFileName = "mortgageForms_"+Date.now();
 
 
// let outputFile = './docxtopdfoutput.pdf';
 
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
 
// function convertDocxToPdf(){
//   docxConverter(inputTemplateFile,"./mortgageForms.pdf",function(err,result){
//     if(err){
//       console.log(err);
//     }    
//   });
// }
 
// convertDocxToPdf();

// Generate document from template using form data

function generateDocument(inputTemplateFile, payload) {
  //Load the docx file as a binary  
  var content = fs.readFileSync(inputTemplateFile,"binary");
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
function deleteDocument(tempOutputDocument) {        
    fs.unlink(tempOutputDocument, (err) => {
      if (err) {
        throw err;
      }
    }); 
}

// app.get("/convertToPDF",(req,res)=>{
//   let inputFilePath = path.resolve(__dirname, 'App/MortgageTemplates/mortgageTemplateDocument.docx');
//   let outputFilePath = path.resolve(__dirname, 'App/MortgageReports/mortgageTemplateDocument.pdf');
//   const convertToPDF = async()=>{
//     const pdfdoc = await PDFNet.PDFDoc.create();
//     await pdfdoc.initSecurityHandler();
//     await PDFNet.Convert.toPdf(pdfdoc,inputFilePath);
//     pdfdoc.save(outputFilePath,PDFNet.SDFDoc.SaveOptions.e_linearized);    
//   }
//   PDFNet.runWithCleanup(convertToPDF).then(()=>{
//     fs.readFile(outputFilePath,(err,data)=>{
//       if(err){
//         res.statusCode = 500;
//         res.end(err);
//       }
//       else{
//         res.setHeader("ContentType","application/pdf");
//         res.end(data);
//       }
//     })
//     .catch(err=>{
//       res.statusCode = 500;
//       res.end(err);
//     })
//   })
// })
 

// Test path for the download file
app.post("/generate_documents", (req, res) => {   
  if(req.body && req.body.data){     
    let outputDocument  = generateDocument(inputTemplateFile, req.body.data);    
    //Delete generated documents after 40 seconds
  setTimeout(() => {
    deleteDocument(path.resolve(__dirname, `App/MortgageReports/${outputDocument}.docx`));
  }, 40000);

  res.status(200).send({filenames:[outputDocument]}); 
  }
    
}); 
app.listen(port, () => {
  console.log(`application running at port : ${port}`);
});
