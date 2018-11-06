var data = [];
var markerContent = [];
var fileAdd ;
var fmData;
var mapadd;
var oppType =["opportunity","tagstore","estimate","alarm"]
if(navigator.onLine==false)
{
	document.getElementById("mapviewer").text = "System is offline. Not able to load the map.";
	alert;
	//return;
}


function initMap(info,paramlat,paramlng,paramzoom)
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
							"lng": arr2[3],
							"lat": arr2[2],
							"custtype":arr2[4],
							"custAdd":arr2[5],
							"custCity":arr2[6],
							"custState":arr2[7],
							"storeContact":arr2[8],
							"flag":arr2[9],
						} 
		}

	for(var i=0 ; i< data.length;i++)
	{
		markerContent[i] = data[i].custname;
	}

	var mapObj = document.getElementById("mapviewer");
	var latlng = new google.maps.LatLng(paramlat||data[0].lat, paramlng||data[0].lng);
	var mapOpt = {
		center:latlng,
		 zoom:parseInt(paramzoom)||10,
		 mapTypeControl: false,
		 draggable: true,
		 scaleControl: false,
		 scrollwheel: false,
		 navigationControl: false,
		 streetViewControl: false,
		 zoomControl: (navigator.platform.toLowerCase().indexOf('iphone') < 0 && navigator.platform.toLowerCase().indexOf('ipad')< 0 ) ? true : false,
		 }; //zoomControl: false
	mapadd = new google.maps.Map( mapObj, mapOpt);
	mapadd.setCenter(latlng);
	var filePath = fileAdd;
	var iconImg=[];
	
	
	var marker=[];
	var infowindow=[];
	for(var i = 0 ; i < data.length; i++)
	{
	
	// if (data[i].custtype=="Tech Support")
	// {
	// 	iconImg[i] = filePath + "TechSupport.png";
	// }
	// else if(data[i].custtype=="Opportunity")
	// {
	// 	iconImg[i] = filePath + "Opportunity.png";
	// }
	// else if(data[i].custtype=="Installation")
	// {
	// 	iconImg[i] = filePath + "Installation.png";
	// }
	// else if(data[i].custtype=="Schedule Review")
	// {
	// 	iconImg[i] = filePath + "ScheduleReview.png";
	// }
	// else if(data[i].custtype=="Tag Store")
	// {
	// 	iconImg[i] = filePath + "TagStore.png";
	// }
	// else if(data[i].custtype=="Estimate")
	// {
	// 	iconImg[i] = filePath + "Estimate.png";
	// }
	// else if (data[i].custtype=="Unassigned")
	// {
	// 	iconImg[i] = filePath + "Unassigned.png";
	
	// }
	// else if(data[i].custtype=="Current User")
	// {
	// 	iconImg[i] = filePath + "gps-fixed-indicator.svg";
	// }


	if (data[i].custtype=="Unassigned")
	{
		iconImg[i] = filePath + "Unassigned.png";
	
	}
	else if(data[i].custtype=="Opportunity")
	{
		iconImg[i] = filePath + "Opportunity.png";
	}
	else if(data[i].custtype=="Tag Store")
	{
		iconImg[i] = filePath + "TagStore.png";
	}
	else if(data[i].custtype=="Estimate")
	{
		iconImg[i] = filePath + "Estimate.png";
	}
	else if(data[i].custtype=="Work Order")
	{
		iconImg[i] = filePath + "WorkOrder.png";
	}
	else if(data[i].custtype=="Installation")
	{
		iconImg[i] = filePath + "Installation.png";
	}
	else if(data[i].custtype=="Successful Delivery")
	{
		iconImg[i] = filePath + "Delivery.png";
	}
	else if(data[i].custtype=="No Activity")
	{
		iconImg[i] = filePath + "smile.png";
	}
	
	

	else if(data[i].custtype=="Current User")
	{
		iconImg[i] = filePath + "gps-fixed-indicator.svg";
	}
		
		
	// Create a marker for the specified locations
	marker[i] = new google.maps.Marker(
		{
		position:new google.maps.LatLng(data[i].lat, data[i].lng),
		map:mapadd,
		icon:iconImg[i],
		animation: google.maps.Animation.DROP
		});

	marker[i].addListener('click', function(event)
		{

			var latMarker = event.latLng.lat().toFixed(6);
			var lngMarker = event.latLng.lng().toFixed(6);

			for(var i = 0 ; i< data.length ; i++)
			{
				if (latMarker==parseFloat(data[i].lat).toFixed(6)&& lngMarker==parseFloat(data[i].lng).toFixed(6)) 
				{
					if(infowindow[i])
					{
						infowindow[i].close();
					}

					var unassstyle = 'background:white; border:solid 2px #666666';
					var oppstyle = 'background:white; border:solid 2px #009833';
					var tagstyle = 'background:white; border:solid 2px #FF9833';
					var eststyle = 'background:white; border:solid 2px #722CFD';
					var wostyle = 'background:white; border:solid 2px #FF0000';
					var instlstyle = 'background:white; border:solid 2px #00BAFB';
					var succstyle = 'background:white; border:solid 2px #0000FF';
					var noactstyle = 'background:white; border:solid 2px #FFFF33';

					switch (data[i].custtype)
					{
						case 'Unassigned':
						var unassstyle  = 'background:#666666; border:solid 2px white' ;
						break;

						case 'Opportunity' :
						var oppstyle = 'background:#009833; border:solid 2px white';
						break;

						case 'Tag Store':
						var tagstyle = 'background:#FF9833; border:solid 2px white';
						break;

						
						case 'Estimate':
						var eststyle = 'background:#722CFD; border:solid 2px white';
						break;

						case 'Work Order':
						var wostyle = 'background:#FF0000; border:solid 2px white';
						break;

						case 'Installation':
						var instlstyle  = 'background:#00BAFB; border:solid 2px white';
						break;

						case '"Successful Delivery"':
						var succstyle  = 'background:#0000FF; border:solid 2px white';
						break;

						case 'No Activity':
						var noactstyle  = 'background:#FFFF33; border:solid 2px white';
						break;
					}


					infowindow[i] = new google.maps.InfoWindow
						({
						content:"<div id='custdetails' style='width:200px;height:auto; border:none #3F691E; border:.5px solid grey; padding: 5px 0px ; border-radius:5px'> <button style='position:relative; width:180px;margin:0px 10px; height:25px; text-align:center;font-size:14px; background-color: #3F691E; color:white; font-weight: 300;border-radius: 4px; padding: 4px' onclick='NavCust(" + data[i].custid + ")'>GO TO CUSTOMER </button> <p style='font-size:16px; border:1px solid #3F691E ; margin: 4px;padding: 4px;border-radius: 4px;'> <b>" + markerContent[i] + "</b> </br>" + data[i].custAdd + "</br>"+ data[i].custCity +"</br>"+ data[i].custState + "</br>" + data[i].storeContact + "</br> </p><div style='padding: 0px 0px;width: 195px;height: auto;display: block;margin: auto;position: relative; background-color:#f1e8e8; border:.5px solid grey'> <p style='font-size: 14px; color:black;position: relative; width: 140px; text-align: center;margin:auto;padding: 2px;height:10px'><b> STATUS</b></p></br> <div id='"+ data[i].custid +"unassigned' style='border: 2px solid #666666;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px;display: inline-block;"+ unassstyle +"' onclick='changeStatus(1," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> </div><div id='"+ data[i].custid +"opportunity' style='border: 2px solid #009833;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px;display: inline-block; "+oppstyle+"' onclick='changeStatus(2," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> </div><div id='"+ data[i].custid +"tagstore' style='border: 2px solid #FF9833;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px;display: inline-block;"+tagstyle+"' onclick='changeStatus(3," + data[i].custid +"," + data[i].lat + "," + data[i].lng +")'> </div><div id='"+ data[i].custid +"estimate' style='border: 2px solid #722CFD;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px;display: inline-block;"+eststyle+"' onclick='changeStatus(4," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> </div><div id='"+ data[i].custid +"workorder' style='border: 2px solid #FF0000;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px;display: inline-block; "+wostyle+"' onclick='changeStatus(5," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> </div><div id='"+ data[i].custid +"installation' style='border: 2px solid #00BAFB;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px;display: inline-block; "+instlstyle+"' onclick='changeStatus(6," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> </div><div id='"+ data[i].custid +"delivery' style='border: 2px solid #0000FF;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px;display: inline-block; "+succstyle+"' onclick='changeStatus(7," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> </div><div id='"+ data[i].custid +"noactivity' style='border: 2px solid #FFFF33;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; position:absolute;display: inline-block; "+noactstyle+"' onclick='changeStatus(8," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> <img src='https://cdn.jsdelivr.net/gh/atismohanty/QT4GICONS@latest/happiness.png' style='height: 100%;width: 100%;'> </div></div></div>"});
					infowindow[i].open(mapadd, marker[i]);
				}
			}
		});
	}
	google.maps.event.addListener(mapadd,"click", function (event) 
	{
	    var lat = event.latLng.lat().toFixed(6);
	    var lng = event.latLng.lng().toFixed(6);
	    var latlng = new google.maps.LatLng(lat, lng);
	    var geocoder  = new google.maps.Geocoder;
	    var placeId = event.placeId;
	geocoder.geocode({'placeId':placeId}, function(result, status)
	    {
		if(status=='OK')
	    	{
	    		if(result[0])
	    		{
	    			var addressFull = result[0].formatted_address;
	    			var address="";
	    			for(var i=result[0].address_components.length-1 ; i >=0 ; i--)
	    			{
	    				if (result[0].address_components[i].types[0]=='postal_code') 
	    				{
	    					var postcode = result[0].address_components[i].long_name;
	    				}
	    				else if(result[0].address_components[i].types[0]=='country')
	    				{
	    					var country =  result[0].address_components[i].long_name;
	    				}
	    				else if(result[0].address_components[i].types[0]=='administrative_area_level_1')
	    				{
	    					var state = result[0].address_components[i].long_name;
	    				}
	    				else if(result[0].address_components[i].types[0]=='locality')
	    				{
	    					var city = result[0].address_components[i].long_name;
	    				}
	    				else if(result[0].address_components[i].types[0]=='intersection')
	    				{
	    					var address = result[0].address_components[i].long_name + ',' + address ;
	    				}
	    				else if(result[0].address_components[i].types[0]=='route')
	    				{
	    					var address = result[0].address_components[i].long_name + ',' + address ;
	    				}
	    				else if(result[0].address_components[i].types[0]=='street_address')
	    				{
	    					var address = result[0].address_components[i].long_name + ',' + address ;
	    				}
	    				else if(result[0].address_components[i].types[0]=='street_number')
	    				{
	    					var address = result[0].address_components[i].long_name + ',' + address ;
	    				}
	    				else if(result[0].address_components[i].types[0]=='"postal_code_suffix"')
	    				{
	    					// No need to get the address level of this
	    				}
	    			}
				fmData = address + '~' + state + '~' + city + '~' + country + '~' + postcode + '~' + placeId + '~' + lat+ '~' + lng + '~' + mapadd.getZoom();
	    			createNewCustomer();
			}
		}
		
	    });
	 });

	 searchLocationAlt();

}

function searchLocation()
{

	var srchVal = document.getElementById("inpSearch").value;
	if(srchVal.length> 3)
	{
		var service =  new google.maps.places.PlacesService(mapadd);
		var request = {
			query: srchVal,
			fields: [ 'formatted_address', 'geometry', 'icon', 'id', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'scope', 'types'],
		  };
		service.findPlaceFromQuery(
			request , function(results, status)
		{
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					createMarker(results[i]);
					
				}
			  }
		});
	}
}


function searchLocationAlt()
{
	var markersSearch = [];
	srchInput = document.getElementById("inpSearch");
	//var srchVal = srchInput.value;
	//var srchVal  ='McDonalds';
	var searchBox = new google.maps.places.SearchBox(srchInput);
	mapadd.addListener('bounds_changed', function() {
		searchBox.setBounds(mapadd.getBounds());
	  });
	  searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();
		markersSearch.forEach(function(marker) {
			marker.setMap(null);
		});
		markersSearch = [];
		var bounds = new google.maps.LatLngBounds();
		if(places)
		{
			places.forEach(function(place) 
			{
				markersSearch.push(new google.maps.Marker({
					map: mapadd,
					position: place.geometry.location
				}));
			});
			}
		});

}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: mapadd,
		position: place.geometry.location
	});
}

// Functions for calling the Filemaker scripts
function navigateCustomer(custid)
{
	var scriptFM = "fmp://$/GasketApp.fmp12?script=NavigateCustomer_TriggerJS&param="+custid;
	//var scriptFM = "fmp://XMLUser:XMLUser@"+ip+"/GasketApp.fmp12?script=NavigateCustomer_TriggerJS&param="+custid;
	//alert(scriptFM);
	window.location.href= scriptFM;
}

function createNewCustomer()
{
	//var userOpt = confirm("Create a new customer for the selected location?");
	setTimeout(function()
	{
		var prmptbox = prompt('To create a new customer enter the name and click ok, else cancel.');
		if(prmptbox!==null && prmptbox!=='')
		{
			//alert(prmptbox);
			fmData =  fmData + '~' + prmptbox;
			var scriptFM = "fmp://$/GasketApp.fmp12?script=CreateNewCustomerWeb_TriggerJS&param="+fmData;
			window.location.href= scriptFM;
		}
		else
		{
			alert('Customer name not entered or process aborted. Please try again.');
		}
	}, 500 );
	
}

function NavCust(id)
{
	setTimeout(navigateCustomer(id), 2000);
}
function changeStatus(opps, custid, lat, lng)
{
	
	if (opps==1) opps="unassigned";
	else if (opps==2) opps="opportunity";
	else if (opps==3) opps="tagstore";
	else if (opps==4) opps="estimate";
	else if (opps==5) opps="workorder";
	else if (opps==6) opps="installation";
	else if (opps==7) opps="successfuldelivery";
	else if (opps==8) opps="noactivity";

	var paramfm = opps +"~"+ custid +"~"+ lat +"~"+ lng;
	//alert(paramfm);
	var scriptFM = "fmp://$/GasketApp.fmp12?script=UpdateCustomer_TriggerJS&param="+paramfm;
	window.location.href=scriptFM;
}
