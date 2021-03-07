require( 'dotenv' ).config() // looks for .env ; process.env gets it's values

const express = require('express')
const app = express()

// for email sending
const nodemailer = require( 'nodemailer' )

const PORT = process.env.PORT || 8080

// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// for serving all the normal html
app.use( express.static('public') )

// for routes
app.post('/api/email', async function(req, res) {
    console.log( '[POST] received email:', req.body )
    
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {    user : process.env.languageisland980,
                    pass : process.env.Toronto2468 }
    })

    const mailOptions={
        from: process.env.languageisland980,    // sender must be the email account
        // these items are whatever, we send what was posted to us in the form!
        to : req.body.email,
        subject : req.body.title,
        text : req.body.message
    }

    const result = await transporter.sendMail(mailOptions)

    res.send( { status: true, message: `Sent to ${req.body.email}` } )
})

app.listen(PORT, function() {
    console.log( `Serving app on: https://localhost:${PORT}` )
})
