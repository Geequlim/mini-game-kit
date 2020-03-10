(function() {
    var Design_Width = 1080;//设计宽度
    var Design_Height= 1920;//设计高度
    var Scaling = 1;//当前屏幕缩放比例
    var updataTime = 600000;//排行榜数据刷新时间
    var rankPreFix = "";//排行榜前缀
    var rankSuffix = "";//排行榜后缀
    var SelfOpenID = "";//自己的开放ID;
    var platform = '';
    /** 平台环境 */
    var getPlane = function()
    {
      if (wx != undefined) {
        platform = wx;
      }
      else if (swan != undefined) {
        platform = swan;
      }
      console.log("平台:", platform);
    }
    //取绘制尺寸
    var sz = function(num)
    {
        return num * Scaling;
    };
    //切割名字,如果用户名字过长用...显示
    var cutName = function(sName, len)
    {
        if (!sName)
        {
            return sName;
        }
        var c = 0;
        var d = 0;
        var e = 0;
        var f = 0;
        var g = 0;
        for (g = 0; g < sName.length; g++)
        {
            d = sName.charCodeAt(g);
            if(0 <= d && 128 >= d)
            {
                f += 1;
            }
            else
            {
                f += 2;
            }
            if(f <= len - 2)
            {
                e++;
            }
        }
        return f <= len ? c = sName.slice(0) : (c = sName.slice(0, e), c += ".."), c;
    };

    //设置舞台尺寸
    var onSetStageSize = function(sWidth,sHeight)
    {
        Scaling = sWidth / Design_Width;
        console.log("OpenDate ChangeSize ---> ",sWidth,sHeight);
    };

    //获取用户信息
    var onGetUserInfo = function(msg)
    {
        platform.getUserInfo({
            openIdList: ["selfOpenId"],
            lang: "zh_CN",
            success: function(res)
            {
                var canv = platform.getSharedCanvas();
                var cont = canv.getContext("2d");
                cont[msg.method_id] = {
                    data: res.data,
                    status: true
                };
            },
            fail: function(erro)
            {
                var canv = platform.getSharedCanvas();
                var cont = canv.getContext("2d");
                cont[msg.method_id] = {
                    data: erro,
                    status: false
                };
            }
        });
    };

    //获取好友排名数据
    var onGetFriendRank = function(msg)
    {
        platform.getFriendCloudStorage({
            keyList: ["avatarUrl", "nickName", "userId", "maxscore", "maxscore2"],
            success: function(res)
            {
                var canv = platform.getSharedCanvas();
                var cont = canv.getContext("2d");
                cont[msg.method_id] = {
                    data: res.data,
                    status: true
                };
            },
            fail: function(erro) {
                var canv = platform.getSharedCanvas();
                var cont = canv.getContext("2d");
                cont[msg.method_id] = {
                    data: erro,
                    status: false
                };
            },
            complete: function() {}
        });
    };

    //更新分数
    var onUpdateScore = function(msg)
    {
        var arr = [];
        if(msg.maxscore != undefined)
        {
            arr.push({key: "maxscore",value: msg.maxscore + ""})
        }
        if(msg.maxscore2 != undefined)
        {
            arr.push({key: "maxscore2",value: msg.maxscore2 + ""});
        }
        arr.push( {key: "userId",value: msg.userId + ""})
        platform.setUserCloudStorage({
            KVDataList: arr,
            success: function()
            {
                console.log("OpenData setUserCloudStorage ---> success", msg.maxscore,msg.maxscore2,arguments);
            },
            fail: function()
            {
                console.log("OpenData setUserCloudStorage ---> fail", arguments);
            },
            complete: function()
            {

            }
        });
    };
    var rankDataList;
    var lastReqTime = 0;
    //显示好友排行榜
    var onShowFriendRank = function(msg)
    {
        // console.log("OpenData onShowFriendRank ---> start");
        var canv = platform.getSharedCanvas();
        var cont = canv.getContext("2d");
        cont.clearRect(0, 0, sz(Design_Width), sz(Design_Height));//清除已绘制的区域
        cont.globalAlpha = 0;//隐藏显示
        if(!msg.pageNum)
        {
            msg.pageNum = 7
        }
        if(rankDataList)//检查缓存
        {
            var nowTime = new Date().getTime();
            if(nowTime - lastReqTime < updataTime)//缓存时间:10分钟
            {
                console.log("排行榜刷新时间未到:" + nowTime + "->" + lastReqTime);
                //10分钟更新一次数据
                cont.globalAlpha = 1;
                renderRankList(rankDataList, msg);
                return;
            }
        }
        platform.getFriendCloudStorage({
            keyList: ["avatarUrl", "nickName", "userId", "maxscore", "maxscore2"],
            success: function(res)
            {
                cont.globalAlpha = 1;//开发显示
                rankDataList = res.data;
                lastReqTime = new Date().getTime();
                renderRankList(rankDataList, msg);
            },
            fail: function() {
                b(null, JSON.stringify(arguments));
            },
            complete: function() {}
        });
    };

    var e = function(a)
    {
        var b = "0",
            c = 0,
            d = 0;
        if (a.KVDataList && 0 < a.KVDataList.length)
            for (var e, f = 0; f < a.KVDataList.length; f++) e = a.KVDataList[f].key,
                "userId" == e && (b = a.KVDataList[f].value), "maxscore" == e && (c = parseInt(a.KVDataList[f].value)),
                "maxscore2" == e && (d = parseInt(a.KVDataList[f].value));
        a.userId = b, a.maxscore = c, a.maxscore2 = d;
    };
    var currentPage = 0;
    var maxPage = 0;
    //绘制排行榜界面
    var renderRankList = function(arr,d)
    {
        var f;
        var g = 0;
        for (g = 0; g < arr.length;g++)
        {
            f = arr[g];
            if(!f)
            {
                continue;
            }
            e(f);
            var h;
            var j;
            if(d.index == 0)
            {
                j = f.maxscore2;
            }
            else
            {
                j = f.maxscore;
            }
            for (var l = g - 1; l >= 0;l--)
            {
                if(d.index == 0)
                {
                    h = arr[l].maxscore2;
                }
                else
                {
                    h = arr[l].maxscore;
                }
                if(j > h)
                {
                    arr[l + 1] = arr[l];
                    arr[l] = f;
                }
            }
        }
        var canv = platform.getSharedCanvas();
        var cont = canv.getContext("2d");
        var pageNum = d.pageNum;//每一页显示多少个人.
        if(arr.length % pageNum == 0)
        {
            maxPage = parseInt( arr.length / pageNum) - 1;
        }
        else
        {
            maxPage = parseInt( arr.length / pageNum);
        }
        console.log("好友总页数:" + maxPage, currentPage);
        if(currentPage >= maxPage)
        {
            currentPage = maxPage;
        }
        cont.textBaseline = "middle";
        cont.textAlign = "center";
        if (arr && arr.length > 0)
        {
            showSelfRank(pageNum,d);
            for (var n = 0; n < pageNum; n++)
            {
                var rankID = currentPage * pageNum + n;//当前需要显示的排名
                if(arr[rankID])
                {
                    var i = sz(105) * n + n * sz(15);
                    //绘制背景图
                    var bgPic = platform.createImage();
                    bgPic.toY = i;
                    bgPic.rank = rankID;
                    bgPic.dex = n;
                    bgPic.src = "openDataContext/res/rank/bg_ranking_1.png";
                    bgPic.onload = function(a)
                    {
                        var c = a.target;
                        cont.drawImage(c, 0, c.toY, sz(794), sz(105));
                        //绘制排名图标
                        if(c.rank < 3)
                        {
                            //前三名, 有图标的哦!~
                            var pic = platform.createImage();
                            pic.toY = c.toY;
                            var url = "";
                            url = "openDataContext/res/rank/icon_no." + (c.rank + 1) + ".png";
                            pic.src = url;
                            pic.onload = function(a)
                            {
                                var c = a.target;
                                cont.drawImage(c, sz(54), c.toY, sz(79), sz(99));
                            }
                        }
                        else
                        {
                            //绘制排名文字
                            cont.font = sz(42) + "px Arial bolder";
                            cont.fillStyle = "#7D4043";
                            cont.textAlign = "center";
                            var rankIDStr = c.rank + 1 + "";
                            cont.fillText(c.rank + 1 + "", sz(88), c.toY + sz(55),sz(100));
                        }
                        //头像底
                        var headBG = platform.createImage();
                        headBG.toY = c.toY;
                        headBG.src = "openDataContext/res/rank/icon_tou_di.png";
                        headBG.rank = c.rank;
                        headBG.onload = function(evt)
                        {
                            var img = evt.target;
                            cont.drawImage(img,sz(164), img.toY + sz(8), sz(88),sz(88));
                            //绘制玩家头像
                            var friend = arr[img.rank];
                            var head = platform.createImage();
                            head.toY = img.toY;
                            head.src = friend.avatarUrl;
                            head.onload = function(evt)
                            {
                                var img = evt.target;
                                cont.drawImage(img,sz(167),img.toY + sz(11), sz(82),sz(82));
                            };
                        };
                        var friend = arr[c.rank];
                         //绘制玩家名字
                        cont.font = sz(26) +"px Arial bolder";
                        cont.fillStyle = "#7D4043";
                        cont.textAlign = "left";
                        cont.fillText(cutName(friend.nickname, 14), sz(274),c.toY + sz(55));
                        //绘制分数
                        cont.font = sz(42) + "px Arial bolder";
                        cont.fillStyle = "#7D4043";
                        cont.textAlign = "center";
                        var score = "0"
                        if(d.index == 0)
                        {
                            if(friend.maxscore2)
                            {
                                score = friend.maxscore2
                            }
                        }
                        else
                        {
                            if(friend.maxscore)
                            {
                                score = friend.maxscore
                            }
                        }
                        cont.fillText(rankPreFix + score + rankSuffix, sz(677), c.toY + sz(55))
                    }
                }
                else
                {
                    //数据已到底部,没有需要绘制的.
                }
            }
        }
    };

    var showSelfRank = function(pageNum,d)
    {
        var canv = platform.getSharedCanvas();
        var cont = canv.getContext("2d");
        var i = sz(105) * pageNum + pageNum * sz(15);
        var bgPic = platform.createImage();
        bgPic.toY = i;
        bgPic.src = "openDataContext/res/rank/bg_ranking.png";
        var rankID = getselfVo()
        var f = rankDataList[rankID];
        bgPic.rank = rankID;
        bgPic.onload = function(a)
        {
            var c = a.target;
            cont.drawImage(c, 0, c.toY, sz(794), sz(105));
             //绘制排名图标
             if(c.rank < 3)
             {
                 //前三名, 有图标的哦!~
                 var pic = platform.createImage();
                 pic.toY = c.toY;
                 var url = "";
                 url = "openDataContext/res/rank/icon_no." + (c.rank + 1) + ".png";
                 pic.src = url;
                 pic.onload = function(a)
                 {
                     var c = a.target;
                     cont.drawImage(c, sz(54), c.toY, sz(79), sz(99));
                 }
             }
             else
             {
                 //绘制排名文字
                 cont.font = sz(42) + "px Arial bolder";
                 cont.fillStyle = "#7D4043";
                 cont.textAlign = "center";
                 var rankIDStr = c.rank + 1 + "";
                 cont.fillText(rankIDStr, sz(88), c.toY + sz(55),sz(100));
             }
             //头像底
             var headBG = platform.createImage();
             headBG.toY = c.toY;
             headBG.src = "openDataContext/res/rank/icon_tou_di.png";
             headBG.rank = c.rank;
             headBG.onload = function(evt)
             {
                 var img = evt.target;
                 cont.drawImage(img,sz(164), img.toY + sz(8), sz(88),sz(88));
                 //绘制玩家头像
                 var head = platform.createImage();
                 head.toY = img.toY;
                 head.src = f.avatarUrl;
                 head.onload = function(evt)
                 {
                     var img = evt.target;
                     cont.drawImage(img,sz(167),img.toY + sz(11), sz(82),sz(82));
                 };
             };
              //绘制玩家名字
             cont.font = sz(26) +"px Arial bolder";
             cont.fillStyle = "#7D4043";
             cont.textAlign = "left";
             cont.fillText(cutName(f.nickname, 14), sz(274),c.toY + sz(55));
             //绘制分数
             cont.font = sz(42) + "px Arial bolder";
             cont.fillStyle = "#7D4043";
             cont.textAlign = "center";
             var score = "0"
             if(d.index == 0)
             {
                 if(f.maxscore2)
                 {
                     score = f.maxscore2
                 }
             }
             else
             {
                 if(f.maxscore)
                 {
                     score = f.maxscore
                 }
             }
             cont.fillText(rankPreFix + score + rankSuffix, sz(677), c.toY + sz(55))
        }
    }

    var getselfVo = function()
    {
        if(!rankDataList)
        {
            return 0;
        }
        for(var i = 0 ; i < rankDataList.length;i++)
        {
            if(rankDataList[i].userId == SelfOpenID)
            {
                return i;
            }

        }
        return 0;
    }
    getPlane();
    platform.onMessage(function(msg)
    {
        if(msg.rankPreFix)
        {
            rankPreFix = msg.rankPreFix;
        }
        if(msg.rankSuffix)
        {
            rankSuffix = msg.rankSuffix;
        }
        if(msg.userId)
        {
            SelfOpenID = msg.userId
        }
        console.log("OpenData GET Message --->", msg);
        switch (msg.method)
        {
            case "resize":
            {
                onSetStageSize(msg.width,msg.height);
                break;
            }
            case "getUserInfo":
            {
                onGetUserInfo(msg);
                break;
            }
            case "getFriendRankData":
            {
                onGetFriendRank(msg);
                break;
            }
            case "updateMaxScore":
            {
                onUpdateScore(msg);
                break;
            }
            case "showFriendRank":
            {
                currentPage = 0;
                onShowFriendRank(msg);
                break;
            }
            case "changePage"://修改显示的页码
            {
                if(!rankDataList)
                {
                    console.log("还没初始化好数据,无法翻页");
                    return;
                }
                if(currentPage == 0)
                {
                    if(currentPage + msg.page < 0)
                    {
                        //没有上一页了
                        return;
                    }
                }
                else if(currentPage >= maxPage && msg.page > 0)
                {
                    //没有下一页了.
                    return;
                }
                currentPage += msg.page;
                onShowFriendRank(msg);
                break;
            }
        }
    });
})();
