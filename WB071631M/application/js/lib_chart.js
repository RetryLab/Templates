	
	/*
		Charts - Interface for Flot library
		Version: 1.0
		Author: Thomas John (http://thomasjohn.eu), 2012
		This software is part od Muffin Admin Cake.
				
		Vars:
		
		piea - used by animation
		
		
		Functions / interface: 
	
		chart_update(id,data,maintype,type) - render chart
			
			id - div id
			
			data - array of data
				0,3:
				[][0] - x
				[][1] - y
				
				1,2,4,5:
				[] - value
				
			maintype - 
				0 - grid with lines, bars or points
				1 - pie
				2 - donut
				3 - grid with stacking
				4 - animated pie
				5 - animated pie - inverse
				
			type -				
				all maintypes:
				[][0] - label
				[][1] - color
				
				0:
				[][2][0] - lines
				[][2][1] - points
				[][2][2] - bars
				[][2][3] - fill
				
		chart_animpie(pn, value, inverse) - pie animation
	*/
	
	var piea;	
	
	function chart_update(id, data, maintype, type) {
	
		var show_pie=show_donut=false;
        var stack=null;
        var fill=false;
        
		var sp=[];
		
		if (maintype==4 || maintype==5)	//anim
		{
	
			if (maintype==4){
			
				var i1 = 1;
				var i2 = 0.5;
			
				if (data[0]<0){
					i1=0.5;
					i2=1;
				}
			}
			else{
				var i1 = 0.5;
				var i2 = 0.25;
			
				if (data[0]<0){
					i1=0.25;
					i2=0.5;
				}
			}
			
			sp.push( {label: type[0][0], color: "rgba("+type[0][1]+", "+i1+")", data: data[0], lines: { show: false}, points: { show: false}, bars: { show: false} }); 
			
			sp.push( {label: type[1][0], color: "rgba("+type[1][1]+", "+i2+")", data: data[1], lines: { show: false}, points: { show: false}, bars: { show: false} }); 
		}
		else
			for(var i in data)
			{
				switch (maintype)
        		{
        			case 0:	//grid
        			fill=type[i][2][3];
        			break;
        		}
        		
        		
				if (maintype==1 || maintype==2)	//pie,donut
					sp.push( {label: type[i][0], color: "rgba("+type[i][1]+", 0.45)", data: data[i], lines: { show: false }, points: { show: false }, bars: { show: false } });
				else	//grid, grid with stacking
					sp.push( {label: type[i][0], color: "rgba("+type[i][1]+", 0.45)", data: data[i], lines: { show: type[i][2][0], fill: fill }, points: { show: type[i][2][1]}, bars: { show: type[i][2][2]} }); 
			}
		
        
        switch (maintype)
        {		
        	case 1:	//pie
        		show_pie=true;
        		var pie_inner=0;
        		break;
        	
        	case 2:	//donut
        	case 4:	//anim
        	case 5:
        		show_pie=true;
        		pie_inner=0.5;
        		break;
        		
        	case 3:	//stacking
        		stack=true;
        }
        
        return $.plot($(id), 
        
        	sp,	

        	{
            
            series: {
                stack: stack,
                lines: { lineWidth:2, steps: false },
                bars: { lineWidth:0, fill:0.45, barWidth: 0.6, align:"center", horizontal: false },
                points: { lineWidth:2, fill:1, radius:3 },
                pie: { show: show_pie, stroke:{color:'rgba(255,255,255,1)', width:0.1}, lineWidth:0, fill:0.6, innerRadius: pie_inner},
                
                highlightColor: '#303030',
                shadowSize: 0         
            },          
            xaxis: {
            	show:false
    		
    		},
    		
    		grid: {
    			borderWidth: 0,
    			margin: 20
    		},
    		
    		margin: 20
    		
        });
    }
    
    function chart_animpie(pn, value, inverse)
	{
		
		endvalue = piea[pn][0];
		
		
		var data = [];		
		
		if (endvalue<0)
		{
			data[1]=value;		
			data[0]=-100-data[1];
		}
		else
		{
			data[0] = value;
			data[1] = 100-data[0];
		}
	
		
		var type = [];
		if (inverse){
			type[0] = ["","0,0,0"];
			type[1] = ["","0,0,0"]; 
			chart_update("#chart-top"+pn, data, 5, type);	//render
		}
		else{
			type[0] = ["","255,255,255"];
			type[1] = ["","255,255,255"]; 	
			chart_update("#chart-top"+pn, data, 4, type);	//render
    	}
    	
		if (value==endvalue)
		{
			piea[pn][1]=true;
			
			//show value
			
			if (piea[pn][0]>0)
				$('#chart'+pn+'_value').addClass('text-success');
			else
				$('#chart'+pn+'_value').addClass('text-error');
					
			
			document.getElementById("chart"+pn+"_value").innerHTML=endvalue+'%';
			document.getElementById("chart"+pn+"_vframe").style.visibility="visible";
			
			return;
		}
		else
		{	
			if (endvalue>0)
				value++;	
			else
				value--;
		}
		
		
		setTimeout("chart_animpie("+pn+","+value+","+inverse+")", 30);
	}
	
	
	//end
	