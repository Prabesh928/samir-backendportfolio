let express = require('express');
let mongoose = require('mongoose');
let app = express();
require('dotenv').config();
app.use(express.json());

let cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
let fileupload = require('express-fileupload');
let cloudinary = require('cloudinary').v2;



const authRoutes = require('./routes/authRoutes');
const workRoutes = require('./routes/workRoutes');
const testinomialRoutes = require('./routes/testinomialRoutes');
const contactRoutes = require('./routes/contactRoutes')




app.use(fileupload({
    useTempFiles:true
}))

cloudinary.config({ 
        cloud_name: 'dulssblpl', 
        api_key: '748773726748463', 
        api_secret: 'q3sjHsepj7G4dF32suSBtIUCTxo' 
    });

app.use(cors({
  origin: 'http://192.168.2.27:5174', 
  credentials: true,               
}));



// Routes
app.use('/auth', authRoutes);
app.use('/work', workRoutes);
app.use('/testinomial', testinomialRoutes);
app.use('/contact', contactRoutes);




mongoose.connect(process.env.DBURL).then(()=>{

    console.log("connected sucessfully");
    app.listen(process.env.PORT,()=>{
        console.log("server is running on the port ")
    })
})




