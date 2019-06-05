var NEWIP={
    'login':{
        'ip':'',
        'port':':8080/'
    },
    'ecn':{
        // 'ip':'http://cnwhnb027',   
        // 'port':':8080'
        'ip':'',   
        'port':':'

    }
}
var loginip = (NEWIP.login.ip)+(NEWIP.login.port);
// 定义各个模块api对象,api对象名 调用NewApiFn.makeapi时需要填入
var  [ECNAPI]=[
    // ecn
    {
      getSystemNotificationData:`https://randomuser.me/api`,
    }

]
//  [ECNAPI]
// api过滤器
var NewApiFn={
        makeip:function(modelname){
            // console.log(NEWIP,modelname, NEWIP[modelname])
            return NEWIP[modelname].ip+NEWIP[modelname].port;
        },
        makeapi:function(modelname,apiname){
            switch(modelname){
                    case 'ecn':
                        return ECNAPI[apiname];
                    break;
                    default:
                        return '';
             }
            
        },
        makequery:function(json,fn){
            if(fn){
                fn(json)
            }else{
                return `?param=${JSON.stringify(json)}`;
            }
            
            
        },
        res:function(res){ //处理res仅返回其主干内容部分，对于需要错误代码和消息
            return res.rows;
        }
    }
// api过滤器方法调用封装，不强制使用，
// url:ccip+ccport+'SIS/PIM/File/findAllFileByPartNo?param={"partNo":"'+partNo+'"}',
// makeurl1_7(pim,findAllFileByPartNo,{"partNo":partNo})
function makeurl1_7(modelname,apiname,json){
    let url;
    console.log(modelname,apiname);
    if(json){
        url=( typeof json=='string'?NewApiFn.makeip(modelname)+NewApiFn.makeapi(modelname,apiname)+'?param='+json:NewApiFn.makeip(modelname)+NewApiFn.makeapi(modelname,apiname)+NewApiFn.makequery(json));       
    }else{
        url=NewApiFn.makeip(modelname)+NewApiFn.makeapi(modelname,apiname);
    }
     return url;
}

function makeres1_7(data){
    return NewApiFn.res(data); 
}

function apost(url,subdata,fn){
    if(typeof subdata=='object'){
        subdata=JSON.stringify(subdata);
    }
    $.ajax({
    type: "post",
    url:url,
    async: true,
    data: { param: subdata },
    // dataType: "x-www-form-urlencoded",
        success: function(data) {
           fn(data)
        }
    });
}
