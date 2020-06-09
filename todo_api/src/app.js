const express=require('express')
const app=express()
const bodyParser=require('body-parser')
app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended:true}))
app.get('/list/:status/:page',async (req,res)=>{
    // 根据客户端传递过来的不同参数（状态，页码）获取查询任务的列表
    res.json({
        list:[]
    })
})
app.post('/create',async (req,res)=>{
    // 实现新增一个任务的功能（任务名称，描述，截止日期）
    let {name,deadline,content}=req.body
    res.json({
        todo:true
    })
})
app.post('/edit',async (req,res)=>{
    // 根据客户端传递过来的任务对象进行编辑（id,任务名称，描述，截止日期）
    let {id,name,deadline,content}=req.body
    res.json({
        todo:true,
        id
    })
})
app.post('/editStatus',async (req,res)=>{
    // 修改任务的状态(id,状态【待办，完成】)
    let {id,status}=req.body
    res.json({
        id,
        status
    })
})
app.get('/delete/:id',async (req,res)=>{
    // 实现删除一个任务的功能（id）
    let {id}=req.query
    res.json({
        todo:true,
        id
    })
})
app.use((err,req,res)=>{
    if(err){
        res.status(500).json({
            message:err.message
        })
    }
})
app.listen(3000,function(){
    console.log("服务启动成功!")
})