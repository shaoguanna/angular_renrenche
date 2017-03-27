//1.引入模块 express
const express=require('express');
const static=require('express-static')//引入静态页面模块
const mysql=require('mysql');//引入数据库模块

//2.创建服务器对象
let server=express();

//3.监听：开始等待客户端连接
server.listen(2000);//1926---端口号

//创建一个数据库对象，链接数据库
let db=mysql.createConnection({host:'localhost',user:'root',password:'admin',database:'20170228'})

// db.query('SELECT * FROM brand',(err,data)=>{
//   	console.log(data);
//
//   });

//4.产出数据   后面的函数是回调
// 顶部地区数据
 server.get('/getcity',(req,res)=>{
 	//数据库查询
 	db.query('SELECT * FROM city',(err,data)=>{
 		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}
		else{
			res.send({ok:true,msg:data});
 		}
 		res.end()
 	})
});

//banner数据
server.get('/banner',(req,res)=>{
	//数据库查询
	db.query('SELECT * FROM banner',(err,data)=>{
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}
		else{
			res.send({ok:true,msg:data});
		}
		res.end()
	})
});

//更多的品牌数据
server.get('/brand',(req,res)=>{
	//数据库查询
	db.query('SELECT * FROM brand',(err,data)=>{
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}
		else{
			res.send({ok:true,msg:data});
		}
		res.end()
	})
});
//搜索下拉
server.get('/xiala',(req,res)=>{
	if(req.query.shou){
		db.query(`SELECT * FROM brand WHERE shouzim='${req.query.shou}'`,(err,data)=>{
			if(err){
				res.send({ok: false, msg: '数据库出错了'});
			}
			else{
				res.send({ok:true,msg:data});
			}
		res.end()
		})
	}else{
		res.send({ok:true,msg:''});
	}

});

//注册数据
server.get('/signup',(req,res)=>{
	//先查询
	db.query(`SELECT * FROM user_tab WHERE username='${req.query.user}'`,(err,data)=>{
		if(err){
			res.send({ok:false,msg:'数据库出错了'});
		}else{
			if(data.length>0){
				res.send({ok:false,msg:'注册失败：用户名已存在'});
				res.end()
			}else{
				db.query(`INSERT INTO user_tab VALUES(0,'${req.query.user}','${req.query.pass}',${req.query.age},'${req.query.sex}')`,(err,data)=>{
					if(err){
						res.send({ok:false,msg:'数据库出错了1'});
						res.end()
					}else{
						res.send({ok:true});
						res.end()
					}

				})
			}

		}

	})

});

//登录数据
server.get('/login',(req,res)=>{
	db.query(`SELECT * FROM  user_tab WHERE username='${req.query.user}'`,(err,data)=>{
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}
		else{
			if(data.length>0){
				if(data[0].password==req.query.pass){
					res.send({ok:true});
				}else{
					res.send({ok: false, msg: '密码错误'});
				}
			}else{
				res.send({ok: false, msg: '用户名错误'});
			}
		}
		res.end()
	})
})
//获取用户
server.get('/user',(req,res)=>{
	db.query('SELECT * FROM user_tab',(err,data)=>{
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: data});
		}
		res.end()
	})
})


//价格数据
server.get('/jiage',(req,res)=>{
	db.query('SELECT * FROM jiage ',(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: data});
		}
		res.end()
	})
});
//型号数据
server.get('/xhao',(req,res)=>{
	db.query('SELECT * FROM xhao ',(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: data});
		}
		res.end()
	})
});
//论坛数据
server.get('/luntan',(req,res)=>{
	db.query('SELECT * FROM luntan',(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: data});
		}
		res.end()
	})
});
//卖车的一些数据
server.get('/showcar',(req,res)=>{
	db.query('SELECT * FROM showcar ',(err,data)=> {
	if(err){
		res.send({ok: false, msg: '数据库出错了'});
	}else{
		res.send({ok: true, msg: data});
	}
	res.end()
	})
})
//车主故事的数据
server.get('/gushi',(req,res)=>{
	db.query('SELECT * FROM gushi',(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: data});
		}
	res.end()
	})
})
//媒体报道数据
server.get('/news',(req,res)=>{
	db.query('SELECT * FROM news',(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: data});
		}
		res.end()
	})
})

//删除用户
server.get('/user_del',(req,res)=>{
	db.query('DELETE FROM user_tab WHERE ID='+req.query.id+' ',(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: '删除成功'});
		}
		res.end()
	})

});

//添加城市
//`SELECT * FROM  city WHERE name='${req.query.name}'`
server.get('/add_city',(req,res)=>{
	db.query('SELECT * FROM  city WHERE name="'+req.query.name+'"',(err,data)=>{
		if(err){
			res.send({ok:false,msg:'数据库出错了'});
		}else{
			if(data.length>0){
				res.send({ok:false,msg:'添加失败：城市已存在'});
				res.end()
			}else{
				db.query(`INSERT INTO city VALUES(0,'${req.query.name}','${req.query.shouzimu}',${req.query.zhoubian},'${req.query.cityhot}')`,(err,data)=>{
					if(err){
						res.send({ok:false,msg:'数据库出错了1'});
						res.end()
					}else{
						res.send({ok:true,msg:'添加成功'});
						res.end()
					}

				})
			}

		}

	})

});
//删除城市
server.get('/city_del',(req,res)=>{
	db.query('DELETE FROM city WHERE ID='+req.query.id+' ',(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: '删除成功'});
		}
		res.end()
	})

});

//删除banner广告
server.get('/banner_del',(req,res)=>{
	db.query('DELETE FROM banner WHERE ID='+req.query.id+' ',(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了'});
		}else{
			res.send({ok: true, msg: '删除成功'});
		}
		res.end()
	})
});

//添加banner广告
server.get('/add_banner',(req,res)=>{
	db.query(`INSERT INTO banner VALUES(0,'${req.query.title}','${req.query.src}','${req.query.herf}','${req.query.beijing}')`,(err,data)=> {
		if(err){
			res.send({ok: false, msg: '数据库出错了1'});
			res.end()
		}else{
			res.send({ok: true, msg: '添加成功'});
		}
		res.end()
	})

});

server.use(static('www'))//指向www文件夹