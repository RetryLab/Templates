	
	/*
		Notifications - handle notifications with badges
		Version: 1.0
		Author: Thomas John (http://thomasjohn.eu), 2012
		This software is part od Muffin Admin Cake.
				
		Vars:
		
		notification_array - notification types
		notifications
		badge_array - badges
		
		
		Functions / interface: 
	
		notification_init(ntype, icon, link) - register notification type
		notification_add(text, ntype, time, nid) - add new notification
		notification_remove(nid) - remove notification
		
		badge_init(ntype, ids, counter, changebadges) - register badge
			ntype - notification type
			ids - array of badges id
			counter - 0 by default
			changebadges - array of other badges types for automatic update
	*/
		
	//var
	
	var notification_array = new Array();
	var notifications = new Array();
	var badge_array = new Array();
	
	function notification_init(ntype, icon, link){
	
		if (icon==undefined)
  			icon = null;
  		if (link==undefined)
  			link = null;
  				
		notification_array[ntype]=[icon,link];
	}
	
	function notification_add(text, ntype, time, nid){
	
		//sprawdza
		
		for (i in notifications)
			if (typeof(notifications[i]) == "object" && notifications[i][0]==nid)	//already here
			{
				colog("Already on the list!");
				return;
			}	
			
		notifications.push([nid, ntype, text, time]);
		//render new menu
		notification_refresh();
		
		//update last
		var not_new = notification_render(ntype, text, time)		
		$('#notification_content_last').html( not_new + $('#notification_content_last').html() );
		
		notification_showlast();
		
		//badge
  		badge_plus(ntype);	//add to all badges
  		badge_plus(-1);
	}
	
	function notification_refresh(){
	
		$('#notification_content').html("");
		
		for (var i=0; i<notifications.length; i++){
		
			if (notifications[i]==undefined)
				continue;
				
			var not_new = notification_render(notifications[i][1], notifications[i][2], notifications[i][3]);
		
			$('#notification_content').html( not_new + $('#notification_content').html() ); 
		 		
  		}
	}
	
	function notification_empty(){
	
		for (i in notifications)
			if (notifications[i] != undefined)
				return;
	
		$('#notification_content').html(notification_renderline("icon-ok", "You dont have any new notifications.", "", ""));
	}
	
	function notification_remove(nid){
		
		for (i in notifications)
			if (typeof(notifications[i]) == "object" && notifications[i][0]==nid){	//found
				
				//badge
  				badge_minus(notifications[i][1]);	//add to all badges
  				badge_minus(-1);
  		
  				notifications[i] = undefined;
				notification_refresh();
				
				notification_empty();
				
				return;
			}

	}
		
	function notification_showlast(){
	
		//show  
		
  		if ( !topmenu_check("dropdown_notification") && !topmenu_check("dropdown_toolbox") && !topmenu_check("dropdown_leftmenu2"))	//closed
  		{
  			$('#notification_content').hide();
  			$('#notification_content_last').show();
  			
  			$('#notification').dropdown('toggle');		
  			
  			setTimeout(notification_normal, 2000);
		}
		
	}
	
	function notification_renderline(icon, text, link, time){
	
		var not_1 = "<li><div class=\"topmenu-opt-info notif-info\"><i class=\"";
  		var not_2 = " icon-white tra\"></i><br>"
  		var not_3 = "</div><div class=\"topmenu-opt notif-opt\">";
  		
  		if (link=="")
  			not_4 = "<span class=\"disabled\">"+text+"</span>"
  		else
  			not_4 = "<a href=\""+link+"\">"+text+"</a>"
  			
  		var not_5 = "</div></li>";
  		
  		var not_new = not_1+icon+not_2+time+not_3+not_4+not_5;
		
  		
		return not_new;
	
	}
	
		
	function notification_render(ntype, text, time){	
  		
  		var icon=notification_array[ntype][0];
  		if (icon==null)
  			icon = "icon-bullhorn";
  		
  		var link=notification_array[ntype][1];
  		if (link==null)
  			link = "";
  						
  		return notification_renderline(icon, text, link, time);
  		
	}
	
	function notification_normal(){
	
		$('#notification_content').show();	
		
		$('#notification_content_last').hide();
		$('#notification_content_last').html("");
		
		if ( !topmenu_check("dropdown_notification") )
  			return;
  			
		$('#notification').dropdown('toggle');		
	}
	
	
	
	//badge
	
	function badge_init(ntype, ids, counter, changebadges){
	
		if (counter==undefined)
			counter=0;
			
		badge_array[ntype]=[ids, counter, changebadges];
	}
	
	function badge_plus(ntype){
	
		if (badge_array[ntype]==undefined)
			return;
			
		badge_array[ntype][1]++;
		
		if (badge_array[ntype][2]!=undefined)	//change sum
			for (var i in badge_array[ntype][2])
				badge_plus(badge_array[ntype][2][i]);
			
		badge_update();
	}
	
	function badge_minus(ntype){
	
		if (badge_array[ntype]==undefined)
			return;
			
		if (badge_array[ntype][1]>0)
		{
			badge_array[ntype][1]--;
			
			if (badge_array[ntype][2]!=undefined)	//change sum
				for (var i in badge_array[ntype][2])
					badge_minus(badge_array[ntype][2][i]);
			
			badge_update();
		}
	}
	
	function badge_update(){
	
		for (var ntype in badge_array)
		{
			for (var i in badge_array[ntype][0])
			{
				$('#badge_'+badge_array[ntype][0][i]).html(badge_array[ntype][1]);	
				
				if (badge_array[ntype][1]==0)	//no
					$('#badge_'+badge_array[ntype][0][i]).hide(10);
				else
					$('#badge_'+badge_array[ntype][0][i]).css('display', 'inline-block');
			}
		}
	}
	
	//end
	