
	/*
		Calendar - Some calendar function
		Version: 1.0
		Author: Thomas John (http://thomasjohn.eu), 2012
		This software is part od Muffin Admin Cake.
				
		Vars:
		
		calendar
		cal_last_id - 
		cal_remove_id - 
		
		
		Functions / interface: 
	
		cal_remove() - remove event
		cal_save() - save changes
	*/

	
	var calendar;	
	var cal_last_id=0;
	var cal_remove_id = -1;
	
	function cal_remove()
	{
		calendar.fullCalendar( 'removeEvents' , cal_remove_id );
		cal_remove_id = -1;
		
		setTimeout(cal_save, 750);
	}
	
	function cal_save()
	{
		alert("Cant connect server.");	//fake
		
		//add code here
	}
	
	
	//end
	