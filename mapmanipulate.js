var data = [];
var markerContent = [];
var fileAdd ;

if(navigator.onLine==false)
{
	document.getElementById("mapviewer").text = "System is offline. Not able to load the map.";
	alert;
	//return;
}


function initMap(info)
{
//alert("Script Loaded");
var text = info;
if(text=="undefined" || text=="NULL")
	{
		document.getElementById("mapviewer").innerHTML = "There is no place to show in the map";
		alert
		//return;
	}
var arr = text.split('=');
fileAdd = arr[0];
for (var i=0 ; i< arr.length-1 ; i++)
	{
		var arr2 = arr[i+1].split('~');
		data[i] =   {
						"custid": arr2[0],
						"custname": arr2[1],
						"lng": arr2[2],
						"lat": arr2[3],
						"custtype":arr2[4],
						"custAdd":arr2[5],
						"custCity":arr2[6],
						"custState":arr2[7],
					} 
	}
	//alert(data);
	for(var i=0 ; i< data.length;i++)
	{
		markerContent[i] = data[i].custname;
	}

	var mapObj = document.getElementById("mapviewer");
	var latlng = new google.maps.LatLng(data[0].lat, data[0].lng);
	var mapOpt = {center:latlng, zoom:14};
	var mapadd = new google.maps.Map( mapObj, mapOpt);
	var filePath = fileAdd;
	var iconImg=[];
	
	
	var marker=[];
	var infowindow=[];
	for(var i = 0 ; i < data.length; i++)
	{
	
	if (data[i].custtype=="Tech Support")
	{
		iconImg[i] = filePath + "TechSupport.png";
	}
	else if(data[i].custtype=="Opportunity")
	{
		iconImg[i] = filePath + "Opportunity.png";
	}
	else if(data[i].custtype=="Installation")
	{
		iconImg[i] = filePath + "Installation.png";
	}
	else if(data[i].custtype=="Schedule Review")
	{
		iconImg[i] = filePath + "ScheduleReview.png";
	}
	else if(data[i].custtype=="Tag Store")
	{
		iconImg[i] = filePath + "TagStore.png";
	}
		
		
	// Create a marker for the specified locations
	marker[i] = new google.maps.Marker(
		{
		position:new google.maps.LatLng(data[i].lat, data[i].lng),
		map:mapadd,
		icon:iconImg[i],
		animation: google.maps.Animation.DROP
		});
	
	/*
	marker[i].addListener('mouseout', function(event)
		{
			console.log(event);
			//alert();
			marker[i].infowindow.close();
		});
	*/
	marker[i].addListener('dblclick', function(event)
		{
			var latMarker = event.latLng.lat();
			var lngMarker = event.latLng.lng();
			alert("double click");

			for(var i = 0 ; i< data.length ; i++)
			{
				if (latMarker==data[i].lat && lngMarker==data[i].lng) 
				{
					setTimeout(navigateCustomer(data[i].custid ), 2000);
				}
			}
		});
/*
	marker[i].addListener('click', function(event)
		{
			var latMarker = event.latLng.lat();
			var lngMarker = event.latLng.lng();

			for(var i = 0 ; i< data.length ; i++)
			{
				if (latMarker==data[i].lat && lngMarker==data[i].lng) 
				{
					if(infowindow[i])
					{
						infowindow[i].close();
					}
					infowindow[i] = new google.maps.InfoWindow
						({
						content:"<div style='width:180px;height:90px; border:none'>"+
								"<p><I><b> Name :"+ markerContent[i] + "</I></b></br>" +
								"Address :"+ data[i].custAdd + "</br>" +
								"State :"+ data[i].custState + "</br>" +
								"City :"+ data[i].custCity + "</br>" +
								"</p>" +
								"</div>"
						});
					infowindow[i].open(mapadd, marker[i]);
				}
			}
		});
*/
	
	}

}
function navigateCustomer(custid)
{
	var scriptFM = "fmp://$/GasketApp.fmp12?script=NavigateCustomer_TriggerJS&param="+custid;
	//var scriptFM = "fmp://XMLUser:XMLUser@"+ip+"/GasketApp.fmp12?script=NavigateCustomer_TriggerJS&param="+custid;
	alert(scriptFM);
	window.location( scriptFM );
}
