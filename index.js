const express=require('express');
const app = express();

const bodyparser = require('body-parser');
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// firebase
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://mobile-pushnotifications-83bd3-default-rtdb.firebaseio.com"
});
admin.firestore().settings({ignoreUndefinedProperties:true});

//firebase storage
let db=admin.firestore();
let collectionName=db.collection('Message'); // Message is collection name
//Post Method
app.post('/Create/Pushnotifications',async (req,res)=>{
    try{
        let docRef=collectionName.doc(req.body.topic);  
        await docRef.set({
        title: req.body.title,
        body: req.body.body,
    });
    res.status(200).send('Notification send successfully'); 
    }
    catch(error){
        res.status(200).send('something went to wromg', err);
    }
});
app.listen(port, (req,res)=>{
console.info(`Running on ${port}`)
})