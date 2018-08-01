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
	var mapOpt = {center:latlng, zoom:parseInt(paramzoom)||10, disableDefaultUI: true};
	mapadd = new google.maps.Map( mapObj, mapOpt);
	mapadd.setCenter(latlng);
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
	else if(data[i].custtype=="Estimate")
	{
		iconImg[i] = filePath + "Estimate.png";
	}
	else
	{
		iconImg[i] = filePath + "Unassigned.png";
	
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
					if (data[i].custtype=='Opportunity') 
					{ 
						var notestyle = 'transparent';
						var tagstyle = 'transparent';
						var oppstyle = 'lightblue';
					}
					else if (data[i].custtype=='Tag Store')
					{
						var notestyle = 'transparent';
						var tagstyle = 'lightblue';
						var oppstyle = 'transparent';
					}
					else if (data[i].custtype=='Estimate')
					{
						var notestyle = 'lightblue';
						var tagstyle = 'transparent';
						var oppstyle = 'transparent';
					}

					infowindow[i] = new google.maps.InfoWindow
						({
						content:"<div id='custdetails' style='width:230px;height:230px; border:1px solid #3F691E; border-radius: 2px'><p style='font-size:16px; border:1px solid #3F691E ; margin: 4px;padding: 4px;border-radius: 4px;'> <I><b>" + markerContent[i] + "</I></b> </br>" + data[i].custAdd + "</br>"+ data[i].custCity +"</br>"+ data[i].custState + "</br>" + data[i].storeContact + "</br> <button style='position:relative; left:10px;width:160px;height:25px; text-align:center;font-size:14px;margin:auto; background-color: #3F691E; color:white; font-weight: 300;border-radius: 4px; padding: 4px' onclick='NavCust(" + data[i].custid + ")'>GO TO CUSTOMER </button></p><p style='font-size: 14px; color:black;position: relative; width: 140px; text-align: center;margin:auto;padding: 2px;height:10px'> MAP STATUS</p><p style='font-size: 12px; color:black;position: relative; width: 140px; text-align: center;margin:auto;padding: 2px;height:10px'></p><div style='padding: 5px 0px;width: 185px;height: 45px;display: block;margin: auto;position: relative;'><div id='"+ data[i].custid +"moneybag' style='border:.5px solid #3F691E;width: 38px;height: 35px;border-radius: 2px;padding: 2px;display: inline-block; background-color:"+oppstyle+"'> <img src='https://cdn.rawgit.com/atismohanty/joanne/4e46edc7/money-bag.svg' style='width: 30px;height: 30px; padding: 1px 3px' onclick='changeStatus(1," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'></img></div><div id='"+ data[i].custid +"tagblack' style='border:.5px solid #3F691E;width: 38px;height: 35px;border-radius: 2px;padding: 2px;display: inline-block;background-color:"+tagstyle+"'> <img src='https://cdn.rawgit.com/atismohanty/joanne/4e46edc7/tag-black.svg' style='width: 30px;height: 30px; padding: 1px 3px' onclick='changeStatus(2," + data[i].custid +"," + data[i].lat + "," + data[i].lng +")'></img></div><div id='"+ data[i].custid +"notepencil' style='border:.5px solid #3F691E;width: 38px;height: 35px;border-radius: 2px;padding: 2px;display: inline-block;background-color:"+notestyle+"'> <img src='https://cdn.rawgit.com/atismohanty/joanne/4e46edc7/note-pencil.svg' style='width: 30px;height: 30px; padding: 1px 3px' onclick='changeStatus(3," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'></img></div><div id='"+ data[i].custid +"alarm' style='border:.5px solid #3F691E;width: 38px;height: 35px;border-radius: 2px;padding: 2px;display: inline-block;'> <img src='https://cdn.rawgit.com/atismohanty/joanne/4e46edc7/alarm-icon.svg' style='width: 30px;height: 30px; padding: 1px 3px' onclick='changeStatus(4," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'></img></div></div></div>"});
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
	var userOpt = confirm("Create a new customer for the selected location?");
	if (userOpt == true) 
	{
		var scriptFM = "fmp://$/GasketApp.fmp12?script=CreateNewCustomerWeb_TriggerJS&param="+fmData;
		window.location.href= scriptFM;
	}
}

function NavCust(id)
{
	setTimeout(navigateCustomer(id), 2000);
}
function changeStatus(opps, custid, lat, lng)
{
	if (opps==1) opps="opportunity";
	else if (opps==2) opps="tagstore";
	else if (opps==3) opps="estimate";
	else if (opps==4) opps="alarm";

	var paramfm = opps +"~"+ custid +"~"+ lat +"~"+ lng;
	//alert(paramfm);
	var scriptFM = "fmp://$/GasketApp.fmp12?script=UpdateCustomer_TriggerJS&param="+paramfm;
	window.location.href=scriptFM;
}
