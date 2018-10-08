const {Router}  =require('express')
const router=Router()
const articleModel =require('../model/article')


router.post('/article', async (req,res,next)=>{
    try{
         if(req.session.user){
         const {content,contentText,title,category}=req.body
         const data= await articleModel.create({
             content,
             title,
             contentText,
             category,
             author:req.session.user._id
         })
         res.json({
             code:200,
             msg:'笔记发布成功！'
         })
        }else{
           res.json({
           code:402,
           msg:'登录状态失效，请刷新再试一下！'
           })
   }

    }
    catch(err){
      next(err)
    }
   
})
router.get('/article',(req,res)=>{
    let {pn=1,size=10}=req.query
    pn=parseInt(pn)
    size=parseInt(size)
    articleModel.find().skip((pn-1)*size).limit(size).populate({
       path:'author', select:'-password -email'
    }).populate({path:'category'}).then(data=>{
     res.json({
         code:200,
         data
     })
    })
})
router.get('/article/:id',(req,res)=>{
      let {id}=req.params
      articleModel.findById(id)
       .populate({
        path:'author' ,
        select:'-password -email'
         }).populate({path:'category'})
     .then(data=>{
      res.json({
          code:200,
          data
      })
})
})
module.exports=router