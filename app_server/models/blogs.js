var mongoose = require( 'mongoose' );

var blogSchema = new mongoose.Schema({ 
    
    blogTitle: {type: String, default: "Untitled", required: false},
    blogText: {type: String, default: "Empty Blog", required: false},
    _id: {type: String, ObjectId},
    dateCreated: {type: Date,default: Date.now}
});
//compiling schema into models
mongoose.model('Blog', blogSchema);