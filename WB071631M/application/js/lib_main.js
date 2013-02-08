
	/*
		Main - common code
		Author: Thomas John (http://thomasjohn.eu), 2012
		This software is part od Muffin Admin Cake.
				
		Vars:
		
		log - shoud write messages? - console.log
		table_demodata1 - table demo
		table_demodata2 - table demo
		
		
		Functions: 
	
		colog(e) - log to the console
		topmenu_check(id_dropdown)
	*/
	
	
	//var
	
	var log = true;
	 
    var opt_not = false;
    var table_demodata1 = 0;
    var table_demodata2 = 0;
    
   
    
    //events
    
    $(window).resize(function() {

	});	
	
	
	//
	
	function colog(e)
	{
		if (log)
			console.log(e);	
	}
    
    function topmenu_check(id_dropdown)
    {
    	return $('#'+id_dropdown).hasClass('open'); 
    }    
    
    function topmenu_register(id)
    {
    	$('#'+id).on('mouseover', function () {
		
			if (topmenu_check("dropdown_"+id))
				return;
			
			$('#'+id).dropdown('toggle');
		
		})
    }
    
    
    //live
    
    function live_commonhandleData(txtres){
    	
    	var res=[];

    	colog("Live - result: "+txtres);
    	
    	
    	//decode txtres
    	//...
    	
    	
    	//fake
    	
    	switch (live_counter)
    	{
    		case 1:
    			notification_add('Welcome to Muffin Admin Cake!', 0, '2 hours', 1);
				notification_add('New message from social network.', 5, '1 hour',2);
    			notification_add('New user registered!', 2, '1 min',4);
    			notification_add('New order.', 3, '1 min',5);
    			notification_add('Check Products.', 6, '1 min',6);
				notification_add('Check Calendar.', 7, '1 min',3);				
    			notification_add('Over 6 months without any new product?', 8, '1 min',7);
    			break;
    	}
 		
    }   
    	
    	
    //handle all tables
    
	function table_getData(par){
	
		var id = par[0];

		//data request
		var req = "";
		
		//get options
		
		var sortcol, sortdesc, from, rowsn;
		
		sortcol = tables[id][4];
		sortdesc = tables[id][5];
		from = tables[id][10][1];
		rowsn = tables[id][10][2];
		
		//new values
		switch (par[1]){
		
			case 1:	//table update
				break;
			
			case 2:	//sort
				sortcol = par[2];
				sortdesc = par[3];
				break;
			
			case 3: //change row size
				rowsn = par[2];
				break;
				
			case 4:	//change index
				from = par[2];
				break;
		}

		//based on par and search form build req
		
		
		//build server request
		//code...
		req = "r=fakeorders";	//fake request
		
		
		//make request
		$("#"+id).html("<div class=\"alert alert\">Loading data…</div>");		
		
		live_request(req, table_setData, par);
	}
	
	
	function table_setData(txtres, par){
		
		var id, data, alldata, datasize;

			
		//parse data and table id
		
		id = par[0];
		
		
		//fake answer
		
		switch (id){
		
			case "tab_1":
			case "tab_3":
			case "tab_4":
				if (table_demodata1==0)
				{
					colog("No server access - demo data loaded.");
					table_demodata1++;
				}
				data = getFakeData();
				
				alldata = true;
				datasize = null;
				
				break;
				
			case "tab_2":
				if (table_demodata2==1)
					colog("No server access - demo data loaded.");
				
				table_demodata2++;
				data = getFakeData();
				
				alldata = false;
				datasize = 43;	//example
				
				break;
		}
		
	
		table_imback(id, par, data, alldata, datasize);
		
	}
			
	function table_open(id, row){
		
		alert("Open row: '"+id+"', "+row);
		
		//add code here
		
	}
	
	function table_action(id, type){
		
		alert("Action ("+type+") on table: "+id);
		
		//add code here
		
	}
	
	function label(data){
	
		switch (data)
		{
			case "OK":
			case "Active":
			case "Available":
				return "<span class=\"label label-success label-90\"><data></span>";
				break;
	
			case "Not Available":
				return "<span class=\"label label-important label-90\"><data></span>";
				break;
	
			default:
				return "<span class=\"label label-info label-90\"><data></span>";
		}
	}

	function owncompare(v1, v2, desc)	//example
	{
		//own compare example
	
		var comp=false;
				
		//compare here
		comp=v2<v1; //standard
		
		//common
		if (desc)
			return !comp;
		return comp;
	}
	
	
	
	
    function main()
    {
    	//colog("all pages");    	
	
		
		//menu
		
    	topmenu_register("leftmenu2");
    	topmenu_register("toolbox");
    	topmenu_register("notification");
    	
	
		//notifications
		
		//types
		//-1 - all notifications
		//0 - no-name message
		//1 - message from message page
		//2 - user
		//3 - order
		//4 - new dashboard event

  		//init notificatio types with default icon and no link
  		notification_empty();
  		notification_init(0);

		notification_init(1, "icon-envelope");
		notification_init(5, null, "index.html");
		notification_init(2, "icon-user", "users.html");
		notification_init(3, "icon-shopping-cart", "orders.html");
		notification_init(6, null, "products.html");
		notification_init(8, null, "ptypes.html");
		notification_init(7, "icon-calendar", "index.html");
		
		//example: badge_init(0, null, 0, [4]); - will change type 4
		badge_init(-1, ["notif", "notif2"]);	//Notification topmenu option - automaticaly
		
		badge_init(4, ["lm1", "status"]);
		badge_init(5, ["social"], 0, [4]);	//should increase 4 (dashboard)
		badge_init(7, ["cal"], 0, [4]);
		
		badge_init(2, ["lm3", "users"]);
		badge_init(3, ["lm2", "orders"]);
		
		badge_init(9, ["lm4"]);
		badge_init(6, ["products"], 0, [9]);
		badge_init(8, ["lm4_1", "ptypes"], 0, [9]);
	
	}
	
	
	$(function () {
	
		//ios FIX
		$('.dropdown-menu').on('touchstart.dropdown.data-api', function () {
    		event.stopPropagation();    		
    	})
    	
    	$('body').on('click', function () {
    		//opt_not = false;
    	})
    	
	
    	
		main();	//common code
  		thispage();
  	
  	});