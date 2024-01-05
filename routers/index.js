const imageRouter = require("./image.router");
module.exports = (app)=>{
    app.use("/api/image", imageRouter);
}