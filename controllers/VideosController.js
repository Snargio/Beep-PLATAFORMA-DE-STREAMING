const { link } = require('fs');

const Video = require('../Models/Videos');


const addvideo = async (req , res) => {
    let Videos = new Video(req.body)
    try{
        await Videos.save()
        res.redirect('/')
        // res.send('Link adicionado com sucesso')
    } catch (error) {
        res.render('index', {error, body: req.body})
    }

};



const Allvideo = async ( req , res ) => {    
    try {
        let videos = await Video.find({}); 
        res.render('AdmVideos', { videos }); // TODO Arrumar a rota para array 
    } catch (error) {   
       res.send(error);
    }  
};


const loadvideo = async ( req , res ) => { 
    let id = req.params.id;

    try {
        let videos = await Video.findById(id); 
        res.render('editVideos', { error:false,  body: videos }); // TODO Arrumar a rota para array 
    } catch (error) {   
       res.status(404).send(error);
    } 
};


const editvideos = async (req , res) =>{

    let videos = {};
     videos.URl = req.body.URl;
     videos.Title = req.body.Title;
     videos.Description = req.body.Description;
     videos.Tag = req.body.Tag;

       let id = req.param.id;
       if(!id){
        id = req.body.id;
       }


       try {
        await Video.updateOne({ _id: id },videos)
         res.redirect("/")
        // res.send('Editado')
       } catch (error) {
         res.render('editVideos', {error, body: req.body });
       }


}


 const deletevideo = async ( req , res ) => {
   
    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }

    try {
         await Video.findByIdAndDelete(id)  
         res.redirect('/')
    } catch (error) {
       res.status(404).send(error);
    } 

 };


module.exports = {  Allvideo, loadvideo, addvideo, editvideos, deletevideo } 