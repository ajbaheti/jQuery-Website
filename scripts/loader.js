function showBusy(id){
	/*$(".bubblingG").css( "left", (window.innerWidth)/2 - 80 );
	$(".bubblingG").css( "top", (window.innerHeight)/2 - 20 );*/
	$(id+" .bubblingG").show();
	$(id+" .bg_transparent").show();
}
function hideBusy(id){
	$(id+" .bubblingG").hide();
	$(id+" .bg_transparent").hide();
}