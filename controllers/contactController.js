const nodemailer = require('nodemailer');

exports.contact= async(req,res)=>{

  let {name,email,phone,message}=req.body;
  console.log("the contact api is hit");
  console.log(name,email,phone,message);

  try{
const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: '8e0041001@smtp-brevo.com', 
        pass: '2rDJZRxCk3GnqsQM',          
      },
    });

     const mailOptions = {
      from: 'prabeshgyawali928@gmail.com',
      to: 'samirthap723@gmail.com', // Or another destination email
      subject: `New Contact from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });

  }
  catch(error){
    res.json({message:error})
  }

}