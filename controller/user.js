var {Router} = require('express');
const router =Router();
const userModel=require('../model/user')
/* GET user.js listing. */
router.post('/user', async (req, res,next) =>{
    try {
        const {username,password,email}=req.body
        const avatarNumber=Math.ceil(Math.random()*8)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`
        if(password&&password.length>5){
            const data = await userModel.create({ username,password,email,avatar})
            res.json({
                code:200,
                msg:'注册成功'
            })
        }else{
            throw '密码少于6位'
        }
    } catch (err) {
        res.json({
            code:400,
            msg:'请填写完整信息',
            err
        })
         next(err)
    }

});
router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body
        const userData= await userModel.findOne({email})
       if(!userData){
           res.json({
               code:400,
               msg:'账号不存在!'
           })
       }else {
           if(password&&password===userData.password){
               req.session.user=userData
               res.json({
                   code:200,
                   msg:'登录成功',
                   userData:{
                       avatar:userData.avatar,
                       email:userData.email,
                       desc:userData.desc,
                       username:userData.username,
                   }
               })
           } else{
               res.json({
                   code:401,
                   msg:'密码错误，请重试！'
               })
           }
       }
    } catch (err) {

    }

})
router.get('/logout',(req,res)=>{
 if(req.session.user){
     req.session.user = null
     res.json({
         code:200,
         msg:'退出登录成功'
     })
 }else{
     res.json({
         code:403,
         msg:'退出失败，请重试！'
     })
 }

})

module.exports = router;
