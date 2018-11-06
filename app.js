const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', { title: 'Computer not working?' });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact/send', (req, res) => {
    const transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'someuser@example.com',
            pass: ''
        }
    });

    const mailOptions = {
        from: 'nodemailer <someuser@example.com>',
        to: 'otheruser@example.com',
        subject: 'Website Submission',
        text: `You have a submission with the following details... Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
        html: `<p>You have a submission with the following details...</p><ul><li>Name: ${req.body.name}</li><li>Email: ${req.body.email}</li><li>Message: ${req.body.message}</li></ul>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log(`Message sent: ${info.response}`)
        }
    })
});

app.listen(3000, () => console.log("Server is running on port 3000"));