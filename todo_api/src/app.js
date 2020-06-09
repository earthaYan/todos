const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const models=require('../db/models')
app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended:true}))
app.get('/list/:status/:page',async (req,res)=>{
    // 根据客户端传递过来的不同参数（状态，页码）获取查询任务的列表
    //状态、分页 1待办 2 完成 3删除  -1全部
    let {status,page}=req.params
    let  where={}
    if(status!=-1){
        where.status=status
    }
    let limit=10
    // 开始读取数据的角标
    let offset=(page-1)*limit
    let list=await models.Todo.findAndCountAll({
        where,
        offset,
        limit:10
    })
    res.json({
        list,
        message:'列表查询成功'
    })
})
app.post('/create',async (req,res,next)=>{
    // 实现新增一个任务的功能（任务名称，描述，截止日期）
    try{
        let {name,deadline,content}=req.body
        //数据持久化到数据库
        let newTask=await models.Todo.create({
            name,
            deadline,
            content
        })
        res.json({
            newTask,
            message:'任务创建成功'
        })
    } catch(error){
        next(error)
    }

})
app.post('/edit',async (req,res,next)=>{
    // 根据客户端传递过来的任务对象进行编辑（id,任务名称，描述，截止日期）
    try{
        let {id,name,deadline,content}=req.body
        let task=await models.Todo.findOne({
            where:{
                id
            }
        })
        if(task){
            // 执行更新
            task=task.update({
                name,
                deadline,
                content
            })
        }
        res.json({
            id,
            task
        })
    }catch(error){
        next(error)
    }

})
app.post('/editStatus',async (req,res,next)=>{
    // 修改任务的状态(id,状态【待办，完成】/删除)
    try{
        let {id,status}=req.body
        let del=await models.Todo.findOne({
            where:{
                id
            }
        })
        if(del&&status!=del.status){
            del.update({
                status
            })
        }
    }catch(error){
        next(error)
    }

})
app.get('/delete/:id',async (req,res)=>{
    // 实现删除一个任务的功能（id）
    let {id}=req.query
    res.json({
        todo:true,
        id
    })
})
app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({
            message:err.message
        })
    }
})
app.listen(3000,function(){
    console.log("服务启动成功!")
})