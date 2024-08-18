const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Feedback = require('./models/Feedback');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/FeedbackCollectionSystem')
.then(() => console.log('Database Connected'))
.catch(err => console.log('Error in connection', err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/viewws/index.html');
});

app.post('/submit-feedback', async(req, res) =>{

   const{name, contactNumber, email, feedback: feedbackText} = req.body;
    
    const feedback = new Feedback({
        name,
        contactNumber,
        email,
        feedback: feedbackText
    });
    
    try{
        await feedback.save();
        console.log('Feedback saved successfully');
        res.send(`
            <html>
                <head>
                    <title>Feedback Submitted</title>
                </head>
                <body>
                    <h1> Thank You!</h1>
                    <p> Your feedback has been successfully submitted</p>
                    <a href= "/">Go back to Form</a>
                </body>
            </html>`  
        );
    }
    catch(err){
        console.error('Error: ', err);
        res.status(500).send('There is an error in submitting your feedback');
    }
});


app.listen(port, () =>{
    console.log(`Serever is running on http://localhost:${port}`)
})












