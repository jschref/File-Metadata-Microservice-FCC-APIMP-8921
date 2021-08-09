const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});


//whats to explain? Returns a JSON with the name, type, and size of an uploaded file. All done thanks to multer middleware for node. Of note "upfile" is required as the name, here and in the HTML, to pass the FCC test suite. 
app.post("/api/fileanalyse", multer().single('upfile'), function(req, res){
  res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size })
})