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

const search = async (req,res)=>{

    const valor = req.query.Tag;
    const videos = await Video.find({
    
        Tag: valor
    
    }).limit(5)
console.log(videos)
    res.render('search',{
        videos: videos
    })
}



const Allvideo = async ( req , res ) => {    
   
   try {
    let videos = await Video.find({}); 
    if (req.user.admin){
    res.render('AdmVideos', { videos });
    }else res.render('useV', { videos });
 } catch (error) {   
    res.send(error);
 } 

};


const loadvideo = async ( req , res ) => { 
    let id = req.params.id;

    try {
        let videos = await Video.findById(id); 
        console.log(videos);
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

       let id = req.params.id;
       if(req.user.admin){
       if(!id){
        id = req.body.id;
       }


       try {
       let data =  await Video.findByIdAndUpdate({ _id: id },videos)
         res.redirect("/")
        // res.send('Editado')
       } catch (error) {
         res.render('editVideos', {error, body: req.body });
       }


}
};

 const deletevideo = async ( req , res ) => {


    let id = req.params.id;
    if(req.user.admin){
    if(!id){
        id = req.body.id;
    }

    try {
         await Video.findByIdAndDelete(id)  
         res.redirect('/')
    } catch (error) {
       res.status(404).send(error);
    } 

 }
};

module.exports = {  Allvideo, search, loadvideo, addvideo, editvideos, deletevideo } 