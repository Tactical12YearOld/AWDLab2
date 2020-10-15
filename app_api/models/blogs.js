var mongoose = require( 'mongoose' );
var blogSchema = new mongoose.Schema({ 
    blog:{
    blogTitle: {type: String, default: "Untitled", required: true},
    blogText: {type: String, default: "Empty Blog", required: true},
    dateCreated: {type: Date,default: Date.now, required: true}
}});
//compiling schema into models
mongoose.model('blogs', blogSchema);