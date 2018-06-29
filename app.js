const express = require("express");
const request = require("request");
const fs      = require("fs");
const app = express();
const solr_url = {
    json: "http://localhost:8983/solr/pdf_core_sample/update?commit=true",
    pdf: "http://localhost:8983/solr/pdf_core_sample/update/extract"
}

var headers = {
    'Content-Type': 'application/json'
};

var jsonData = {
    "add": {
        "doc": {
            "name":"Denis",
            "age":"42"
        }
    }
}
app.post("/upload/json", (req, res, next) => {
    let options = {
        url: solr_url.json,
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(jsonData)
    };
    let response = sendToSolr(options);
    res.send(response);
});

app.post("/upload/pdf", (req, res, next) => {
    let response;
    let options = {
        url: solr_url.pdf,
        method: "POST",
        headers: {
            "Content-Type":"application/pdf"
        },
    };

    fs.readFile("./files/pdf_sample.pdf", (error, data) => {
        if(error) return error;
        options.body = data;
        console.log(options.body);
        response = sendToSolr(options);
    });

    res.send(response);
});

function sendToSolr(options) {
    request(options, function(error, res, body) {
        if(error) return error;
        return res;
    });
}

app.listen(9080, () => {
   console.log("Listening on port: 9080");
});
