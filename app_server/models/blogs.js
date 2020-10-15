var mongoose = require( 'mongoose' );

var blogSchema = new mongoose.Schema({ 
    
    blogTitle: {type: String, default: "Untitled", required: false},
    blogText: {type: String, default: "Empty Blog", required: false},
    dateCreated: {type: Date,default: Date.now}
});
//compiling schema into models
mongoose.model('Blog', blogSchema);