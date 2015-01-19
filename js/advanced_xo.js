/*
 * @title: Advance XnO
 * @type: Game developed with jquery
 * @version: 1.0
 * @author: Yuvraj Singh Babrah 
 * @last edited: 19 January 2015
 * @licence: MIT
 * @demo: http://yuvrajbabrah.host22.com/attt
 */

$(document).ready(function()
{	
	//basic initialization
	var currentversion = "1.0";
	/*
	var inheight = document.documentElement.clientHeight;
	var inwidth = document.documentElement.clientWidth;
	if(inheight-20<670){
		$(".gamepanel").css("height","670px");
	}
	else{
		$(".gamepanel").css("height",(inheight-20)+"px");	
	}
	$(".leftpanel").css("marginLeft",(inwidth-200)/2+"px");
	//$(".leftpanel").height(inheight-20);
	var martop = ((inheight-20-500)/2)+30;
	martop = martop+"px";*/
	//$(".leftpanel").css("marginTop",martop);
	var playerturn = null;
	var level = readCookie("levelnum");
	if(level==null)
	level = 3;
	level = parseInt(level);
	$(".levelnum").html("level "+level);
	$(".resultbox").hide();
	$(".scoreboard").hide();
	
	//Cookies
	function createCookie(name,value,days){
		if(days){
			cdate=new Date();
			cdate.setTime(cdate.getTime()+(days*24*60*60*1000));
			expires="; expires="+cdate.toGMTString();
		}//days
		else expires="";
		document.cookie=name+"="+value+expires+"; path=/";
	}//createcookie
	
	function readCookie(name){
		nameEQ=name+"=";
		ca=document.cookie.split(';');
		for(cook=0;cook<ca.length;cook++){
			cc=ca[cook];
			while(cc.charAt(0)==' ') cc=cc.substring(1,cc.length);
			if(cc.indexOf(nameEQ)==0) return cc.substring(nameEQ.length,cc.length);
		}//for
		return null;
	}//readcookie
	
	function eraseCookie(name){
		createCookie(name,"",-1);
	}//erasecookie
	
	function addbox(level){
		for(var i=1;i<=level*level;i++){
			if(level>10)
			var gap = (level+1)*3;
			else
			var gap = (level+1)*5;
			var left = 377-gap;
			var width = left/level;
			var finalw = width+"px";
			$(".gameboard").addClass(".box"+i);
			$(".box"+i).css({'float':'left','width':finalw,'height':finalw,'background-color':'#EDEDED','margin':'5px 0 0 5px','font-size':'0px','border-radius':'10px'});
			if(level>10)
			$(".box"+i).css({'margin':'4px 0 0 3px'});	
		}	
	}
	
	//updating player's score
	function updatescore(initial,howmuch){
		if(player1==initial){
				player1_score+=howmuch;
				createCookie("player1_score",player1_score,"31");
				$(".player1").html(player1_score);
			}
			else{
				player2_score+=howmuch;
				createCookie("player2_score",player2_score,"31");
				$(".player2").html(player2_score);
			}
			//updating the winbar
			var total_score = player1_score + player2_score;
			var win1_width = (player1_score/total_score)*178;
			var win2_width = (player2_score/total_score)*178;
			$(".win1").css("width",win1_width+"px");
			$(".win2").css("width",win2_width+"px");
	}
	
	//set the bars
	function barsettup(player1_score,player2_score){
		var total_score = player1_score + player2_score;
		var win1_width = (player1_score/total_score)*178;
		var win2_width = (player2_score/total_score)*178;
		if(total_score==0){
			win1_width = win2_width = 0;
		}
		$(".win1").css("width",win1_width+"px");
		$(".win2").css("width",win2_width+"px");
	}
	
	//finding the player and incrementing it's score
	function validate(initial,test2,test3){
		//alert(initial+":"+test2+":"+test3);
		//successful condition
		if(initial==test2&&initial==test3){
			updatescore(initial,1);
		}
	}
	
	function validatemore(initial,test2,test3,test4,test5){
		//alert(initial+":"+test2+":"+test3+":"+test4+":"+test5);
		//successful condition
		var win = 0;
		if(initial==test2&&initial==test3){
			win++;
		}
		if(initial==test2&&initial==test4){
			win++;
		}
		if(initial==test3&&initial==test5){
			win++;
		}
		if(win!=0){
			updatescore(initial,win);
		}
	}
	
	function validatediag(initial,test2,test3,test4,test5){
		//successful conditions
		var win = 0;
		if(initial==test2&&initial==test4)
		win++;
		if(initial==test3&&initial==test5)
		win++;
		if(win!=0){
			updatescore(initial,win);
		}
	}
	
	function checkwin(boxnum){
		totalmoves++;
		var boxclick = parseInt(boxnum);
		var leftalign = 0;
		var rightalign = 0;
		var topalign = 0;
		var bottomalign = 0;
		//horizontal
		var initial = $(".box"+boxclick).html();
		if((boxclick-1)%level==0){
			//extreme left of lxl
			leftalign = 1;
			var test2 = $(".box"+(boxclick+1)).html();
			var test3 = $(".box"+(boxclick+2)).html();
			validate(initial,test2,test3);
		}
		else if((boxclick%level)==0){
			//extreme right of lxl
			var test2 = $(".box"+(boxclick-1)).html();
			var test3 = $(".box"+(boxclick-2)).html();
			rightalign = 1;
			validate(initial,test2,test3);
		}
		else{
			//middle
			var test2 = $(".box"+(boxclick+1)).html();
			var test3 = $(".box"+(boxclick-1)).html();
			if((boxclick+1)%level==0)
			var test4 = null;
			else
			var test4 = $(".box"+(boxclick+2)).html();
			if((boxclick-2)%level==0)
			var test5 = null;
			else
			var test5 = $(".box"+(boxclick-2)).html();
			validatemore(initial,test2,test3,test4,test5);
		}
		//alert("horizontal\n"+test2+":"+test3+":"+test4+":"+test5);
		//vertical
		if((boxclick+(level))>level*level){
			//bottom of lxl
			bottomalign = 1;
			var test2 = $(".box"+(boxclick-(level))).html();
			var test3 = $(".box"+(boxclick-2*(level))).html();
			validate(initial,test2,test3);
		}
		else if((boxclick-(level))<1){
			//top of lxl
			topalign = 1;
			var test2 = $(".box"+(boxclick+(level))).html();
			var test3 = $(".box"+(boxclick+2*(level))).html();
			validate(initial,test2,test3);
		}
		else{
			//middle
			var test2 = $(".box"+(boxclick+(level))).html();
			var test3 = $(".box"+(boxclick-(level))).html();
			if(boxclick+2*level>level*level)
			var test4 = null;
			else
			var test4 = $(".box"+(boxclick+2*level)).html();
			if(boxclick-2*level<1)
			var test5 = null;
			else
			var test5 = $(".box"+(boxclick-2*level)).html();
			validatemore(initial,test2,test3,test4,test5);
		}
		//alert("vertical\n"+test2+":"+test3+":"+test4+":"+test5);
		//diagonals
		if(leftalign==1){
			var test2 = $(".box"+(boxclick+(level+1))).html();
			var test4 = $(".box"+(boxclick+2*(level+1))).html();
			var test3 = $(".box"+(boxclick-(level-1))).html();
			var test5 = $(".box"+(boxclick-2*(level-1))).html();
			validatediag(initial,test2,test3,test4,test5);
		}
		else if(rightalign==1){
			var test2 = $(".box"+(boxclick+(level-1))).html();
			var test4 = $(".box"+(boxclick+2*(level-1))).html();
			var test3 = $(".box"+(boxclick-(level+1))).html();
			var test5 = $(".box"+(boxclick-2*(level+1))).html();
			validatediag(initial,test2,test3,test4,test5);
		}
		else{
			var test2 = $(".box"+(boxclick+(level+1))).html();
			var test4 = $(".box"+(boxclick-(level+1))).html();
			var test3 = $(".box"+(boxclick+(level-1))).html();
			var test5 = $(".box"+(boxclick-(level-1))).html();
			validatediag(initial,test2,test3,test4,test5);
			if((boxclick+(level+1))%level==0)
			var test6 = null
			else
			var test6 = $(".box"+(boxclick+2*(level+1))).html();
			if((boxclick-(level+1)-1)%level==0)
			var test8 = null;
			else
			var test8 = $(".box"+(boxclick-2*(level+1))).html();
			if((boxclick+(level-1)-1)%level==0)
			var test7 = null;
			else
			var test7 = $(".box"+(boxclick+2*(level-1))).html();
			if((boxclick-(level-1))%level==0)
			var test9 = null;
			else
			var test9 = $(".box"+(boxclick-2*(level-1))).html();
			if(level==3){
				test7 = test6 = test9 = test8 = null;
			}
			//alert(test4+":"+test8);
			//if(boxclick==3)
			//alert(test2+":"+test3+":"+test4+":"+test5+":"+test6+":"+test7+":"+test8+":"+test9);
			validatediag(initial,test2,test3,test6,test7);
			validatediag(initial,test4,test5,test8,test9);
		}
		//alert("diag\n"+test2+":"+test3+":"+test4+":"+test5);	
		if(totalmoves==level*level){
			progress = readCookie("progress");
			if(progress=="yes"){
				for(var i=0;i<=level*level;i++){
					$(".box"+i).remove();
				}
					if(player1_score>player2_score)
					$(".smalltext").html("player 1 won the last round!");
					else if(player2_score>player1_score)
					$(".smalltext").html("player 2 won the last round!");
					else
					$(".smalltext").html("both players are doing great. Last game was a draw!");
					var cs = readCookie("continue");
					if(cs=="no"||cs==null){
						player1_score = player2_score = 0;
						$(".win1").css("width","0px");
						$(".win2").css("width","0px");
						$(".player1").html("0");
						$(".player2").html("0");
						createCookie("player1_score",0,"31");
						createCookie("player2_score",0,"31");	
					}
				if(level==15){
					for(var i=1;i<=level*level;i++){
							$(".box"+i).remove();
							//$(".gameboard").removeClass(".box"+i);
							$(".box"+i).hide();
							$(".gameboard").css("background-image","url('data/winback.jpg')");
							if(player1_score>player2_score)
							$(".declare").html("player 1 leads");
							else if(player2_score>player1_score)
							$(".declare").html("player 2 leads");
							else
							$(".declare").html("it's a draw!!");
							$(".resultbox").fadeIn();
					}
					return 0;	
				}
				level++;
				createCookie("levelnum",level,"31");
				$(".levelnum").html("level "+level);
				addbox(level);
				for(var i=1;i<=level*level;i++){
					$(".gameboard").append("<div class=box"+i+">"+i+"</div>");
					$(".box"+i).html(i).hide();
				}
				$(".gameboard").css("background-image","url('')");
				//$(".playerselect").fadeIn();
				totalmoves = 0;
				addbox(level);
				for(var i=1;i<=level*level;i++){
					$(".box"+i).fadeIn();
				}	
				loadbox(level);
			}//progress=yes
			else{
				for(var i=1;i<=level*level;i++){
					$(".box"+i).remove();
					//$(".gameboard").removeClass(".box"+i);
					$(".box"+i).hide();
					/*$(".gameboard").css("background-image","url('data/winback.jpg')");*/
					if(player1_score>player2_score)
					$(".smalltext").html("player 1 wins");
					else if(player2_score>player1_score)
					$(".smalltext").html("player 2 wins");
					else
					$(".smalltext").html("it's a draw!!");
					$(".resultbox").fadeIn();
				}	
			}//else
		}//big if
	}
	
	//hiding the boxes
	for(var i=1;i<=level*level;i++){
		$(".box"+i).hide();
	}
	var totalmoves = 0;
	var playerselectflag = 0;
	var player1_score;
	var player2_score;
	var continue_score = readCookie("continue");
	if(continue_score==null||continue_score=="no"){
		player1_score = player2_score = 0;
		$("#cont").html("<img src=data/no.png title=No />");
	}
	else if(continue_score=="yes"){
		$("#cont").html("<img src=data/yes.png title=Yes />");
		player1_score = readCookie("player1_score");
		player2_score = readCookie("player2_score");
		if(player1_score==null)
		player1_score = 0;
		if(player2_score==null)
		player2_score = 0;
		player1_score = parseInt(player1_score);
		player2_score = parseInt(player2_score);
		barsettup(player1_score,player2_score);
	}
	$(".player1").html(player1_score);
	$(".player2").html(player2_score);
	var player1 = null, player2 = null;
	var progress = readCookie("progress");
	if(progress==null||progress=="no"){
		progress = "no";
		$("#progress").html("<img src=data/no.png title=No />");	
	}
	else
	$("#progress").html("<img src=data/yes.png title=Yes />");
	
	
	//asking player to select in order to continue
	$(".opt1,.opt2").mousedown(function(){
		playerselectflag = 1;
		$(this).css({'opacity':'0.8','filter':'alpha(opacity=80)'});
		var optval = $(this).html();
		if(optval=="cross"){
			player1 = "cross";
			player2 = "zero";
			$(".player1box").fadeIn().css("background-color","rgb(50,34,125)");
			$(".player2box").fadeIn().css("background-color","rgb(55,18,75)");
			$(".win1").fadeIn().css("background-color","rgb(50,34,125)");
			$(".win2").fadeIn().css("background-color","rgb(55,18,75)");
		}
		else{
			player1 = "zero";
			player2 = "cross";
			$(".player2box").fadeIn().css("background-color","rgb(50,34,125)");
			$(".player1box").fadeIn().css("background-color","rgb(55,18,75)");
			$(".win2").fadeIn().css("background-color","rgb(50,34,125)");
			$(".win1").fadeIn().css("background-color","rgb(55,18,75)");
		}
		player_selected_last = player1;
		var swap = readCookie("swap");
		var cs = readCookie("continue");
		if(cs=="yes"){
			var player_selected = readCookie("player_selected_last");
			if(player_selected!=null){
				if(player1!=player_selected){
					createCookie("swap","1","31");
					var temp = player1_score;
					player1_score = player2_score;
					player2_score = temp;
					$(".player1").html(player1_score);
					$(".player2").html(player2_score);
					createCookie("player1_score",player1_score,"31");
					createCookie("player2_score",player2_score,"31");
					barsettup(player1_score,player2_score); 
				}
				else if(player1==player_selected&&swap==1){
					createCookie("swap",null,"31");
					var temp = player1_score;
					player1_score = player2_score;
					player2_score = temp;
					$(".player1").html(player1_score);
					$(".player2").html(player2_score);
					createCookie("player1_score",player1_score,"31");
					createCookie("player2_score",player2_score,"31");
					barsettup(player1_score,player2_score);
				}
			}
			else{
				createCookie("player_selected_last",player_selected_last,"31");
			}
		}
		$(".gameboard").css("background-image","url('')").width("380");
		playerturn = player1;//default
		if(playerturn!=null){
			$(".playerselect").hide();
			addbox(level);
			for(var i=1;i<=level*level;i++){
				$(".box"+i).fadeIn();
			}
			$(".scoreboard,.winbar").fadeIn();
			$(".smalltext").hide().html("Alright!! Everything's in place. <i>Conquer!</i>").fadeIn();
			loadbox(level);
		}
	}).mouseup(function(){
		$(this).css({'opacity':'1','filter':'alpha(opacity=100)'});
	});
	
	//click events
	function loadbox(level){
		for(var i=1;i<=level*level;i++){
			$(".box"+i).click(function(){
				res = $(this).html();
				if(res=="cross"||res=="zero")
				return 0; //do nothing
				if(playerturn=="zero"){
					//$(this).css("background-color","rgb(55,18,75)");
					$(this).css("background-image","url('data/x.png')");
					$(this).css("background-size","100%");
					$(this).html("zero");
					playerturn = "cross";
				}//player1
				else if(playerturn=="cross"){
					//$(this).css("background-color","rgb(50,34,125)");
					$(this).css("background-image","url('data/o.png')");
					$(this).css("background-size","100%");
					$(this).html("cross");
					playerturn = "zero";
				}//player2
				//check for winning condition
				checkwin(res);
			});	
		}
	}
	//next level
	$(".next").mousedown(function(){
		$(this).css({'opacity':'0.8','filter':'alpha(opacity=80)','margin-top':'2px'});
	}).mouseup(function(){
		$(this).css({'opacity':'1','filter':'alpha(opacity=100)','margin-top':'0px'});
	}).click(function(){
		if(level==15){
			return 0;
		}
		$(".gameboard").css("background-image","url('')");
		$(".playerselect,.resultbox").hide();
		for(var i=0;i<=level*level;i++){
			$(".box"+i).remove();
			//$(".gameboard").removeClass(".box"+i);
		}
		level++;
		createCookie("levelnum",level,"7");
		$(".levelnum").html("level "+level);
		addbox(level);
		for(var i=1;i<=level*level;i++){
			$(".gameboard").append("<div class=box"+i+">"+i+"</div>");
			$(".box"+i).html(i).hide();
		}
		if(playerselectflag==1){
			addbox(level);
			for(var i=1;i<=level*level;i++){
				$(".box"+i).fadeIn();
			}
			loadbox(level);
		}
		else{
			$(".gameboard").css("background-image","url('data/html.jpg')");
			$(".playerselect").fadeIn();
		}
		totalmoves = 0;
	});
	//back level
	$(".back").mousedown(function(){
		$(this).css({'opacity':'0.8','filter':'alpha(opacity=80)','margin-top':'37px'});
	}).mouseup(function(){
		$(this).css({'opacity':'1','filter':'alpha(opacity=100)','margin-top':'35px'});
	}).click(function(){
		if(level==3){
			return 0;
		}
		$(".gameboard").css("background-image","url('')");
		$(".playerselect,.resultbox").hide();
		for(var i=0;i<=level*level;i++){
			$(".box"+i).remove();
		}
		level--;
		createCookie("levelnum",level,"31");
		$(".levelnum").html("level "+level);
		addbox(level);
		for(var i=1;i<=level*level;i++){
			$(".gameboard").append("<div class=box"+i+">"+i+"</div>");
			$(".box"+i).html(i).hide();
		}
		if(playerselectflag==1){
			addbox(level);
			for(var i=1;i<=level*level;i++){
				$(".box"+i).fadeIn();
			}
			loadbox(level);
		}
		else{
			$(".gameboard").css("background-image","url('data/html.jpg')");
			$(".playerselect").fadeIn();
		}
		totalmoves = 0;
	});
	//leftpanel buttons
	$(".tick,.reload,").mousedown(function(){
		$(this).css({'opacity':'1.0','margin-top':'3px','filter':'alpha(opacity=100)'});
	}).mouseup(function(){
		$(this).css({'opacity':'0.8','margin-top':'2px','filter':'alpha(opacity=80)'});
	}).mouseenter(function(){
		$(this).css({'opacity':'1.0','filter':'alpha(opacity=100)'});
	}).mouseleave(function(){
		$(this).css({'opacity':'0.8','filter':'alpha(opacity=80)'});
	});
	$("#cont").click(function(){
		continue_score = readCookie("continue");
		if(continue_score==null||continue_score=="no"){
			$(this).html("<img src=data/yes.png title=Yes />");
			createCookie("continue","yes","31");	
			createCookie("player_selected_last",player_selected_last,"31");
		}
		else if(continue_score=="yes"){
			player1_score = player2_score = 0;
			$(".win1").css("width","0px");
			$(".win2").css("width","0px");
			createCookie("player1_score","0","31");
			createCookie("player2_score","0","31");
			$(".player1").html(player1_score);
			$(".player2").html(player2_score);
			$(this).html("<img src=data/no.png title=No />");
			createCookie("continue","no","31");
		}
	});
	$("#progress").click(function(){
		progress = readCookie("progress");
		if(progress=="no"||progress==null){
			$(this).html("<img src=data/yes.png title=Yes />")
			createCookie("progress","yes","31");
		}
		else if(progress=="yes")
		{
			$(this).html("<img src=data/no.png title=No />")
			createCookie("progress","no","31");
		}
	});
	//resultbox
	$(".reload").click(function(){
		$(".resultbox").hide();
		$(".gameboard").css("background-image","url('')");
		addbox(++level);
		for(var i=1;i<=level*level;i++){
			$(".gameboard").append("<div class=box"+i+">"+i+"</div>");
			$(".box"+i).html(i).hide();
		}
		addbox(level);
		for(var i=1;i<=level*level;i++)
		$(".box"+i).fadeIn();
		totalmoves = 0;
		loadbox(level);
		if(player1_score>player2_score)
		$(".smalltext").html("Player 1 won the last round!");
		else if(player2_score>player1score)
		$(".smalltext").html("Player 2 won the last round!");
		else
		$(".smalltext").html("Last game was a draw!");
		//player1_score = player2_score = 0;
		$(".player1").html(player1_score);
		$(".player2").html(player2_score);
		barsettup(player1_score,player2_score);
	});
	$(".continue").click(function(){
		$(".resultbox").hide();
		$(".gameboard").css("background-image","url('')");
		for(var i=0;i<=level*level;i++){
			$(".box"+i).remove();
		}
		if(level==15){
			return 0;
		}
		level++;
		$(".levelnum").html("level "+level);
		createCookie("levelnum",level,"31");
		addbox(level);
		for(var i  =1;i<=level*level;i++){
			$(".gameboard").append("<div class=box"+i+">"+i+"</div>");
			$(".box"+i).html(i).hide();
		}
		addbox(level);
		for(var i=1;i<=level*level;i++){
			$(".box"+i).fadeIn();
		}
		totalmoves = 0;
		loadbox(level);
		var cs = readCookie("continue");
		if(cs=="no"||cs==null){
			if(player1_score>player2_score)
			$(".smalltext").html("Player 1 won the last round!");
			else if(player2_score>player1score)
			$(".smalltext").html("Player 2 won the last round!");
			else
			$(".smalltext").html("Last game was a draw!");
			player1_score = player2_score = 0;
			$(".player1").html(player1_score);
			$(".player2").html(player2_score);
			barsettup(player1_score,player2_score);
		}
	});
	$("#bin").click(function(){
		var conf = confirm("Are you sure? This action cannot be reverted!!\n\n[ This will remove all the game related data and cookies ]");
		if(conf==true){
			eraseCookie("player1_score");
			eraseCookie("player2_score");
			eraseCookie("levelnum");
			eraseCookie("progress");
			eraseCookie("continue");
			eraseCookie("swap");
			eraseCookie("player_selected_last");
			location.reload();	
		}
	});
	$("#fb").click(function(){
		window.open("https://facebook.com/ohyesg8uv");
	});
	$("#twitter").click(function(){
		window.open("https://twitter.com/YuvrajB");
	});
	$("#mail").click(function(){
		window.open("mailto:yuvrajbabrah@live.com");
	});
	
	//leftpanel
	$(".leftpanel").click(function(){
		$(this).animate({"marginTop":"0px"},500);
	});
	
	//anywhere click
	$(".gamepanel").click(function(){
		$(".leftpanel").animate({"marginTop":"-220px"},500);
	});
	
	//end of code
});