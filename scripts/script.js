//get the browser name and its version
function browserCheck(){
    var ua= navigator.userAgent, tem,
	M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M;
}

/*jQuery ready function*/
$(document).ready(function(){

	var x = browserCheck();
	var oldBrowserFlag = false;
	console.log(x);
	//check for firefox and its version
	if(x[0].toLowerCase() == "firefox" && parseInt(x[1]) < 40){
		window.open("https://www.mozilla.org/en-US/firefox/new/");
		oldBrowserFlag = true;
	}//check for IE and its version
	else if(x[0].toLowerCase() == "msie" && parseInt(x[1]) < 9){
		window.open("https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads");
		oldBrowserFlag = true;
	}//check for chrome and its version
	else if(x[0].toLowerCase() == "chrome" && parseInt(x[1]) < 40){
		window.open("https://www.google.com/chrome/browser/desktop/index.html");
		oldBrowserFlag = true;
	}//check for safari and its version
	else if(x[0].toLowerCase() == "safari" && parseInt(x[1]) < 8){
		window.open("https://support.apple.com/downloads/safari");
		oldBrowserFlag = true;
	}
	
	if(!oldBrowserFlag){
		
	/*for smooth scrolling when clicked on menu bar for navigation*/
	$(".scroll").click(function(event){		
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
	});
	/*end of smooth scrolling*/

	/*to display up arrow always on the right-bottom on window*/
	var defaults = {
		containerID: 'toTop',
		containerHoverID: 'toTopHover',
		scrollSpeed: 1200,
		easingType: 'linear' 
	};			
	$().UItoTop({ easingType: 'easeOutQuart' });
	/*end of up arrow*/

	/*get the 'about' page information*/
	myXHR('get',{'path':'/about/'},'#about').done(function(json){

		/*add retrieved data to variable to display in about section*/
		var abt = '<div><h1>'+json.title+'</h1><hr class="about_hr">';
		abt += '<p class="desc_p" style="font-stretch: extra-expanded;font-size: large;';
		abt += 'font-family: cursive;">'+json.description+'</p>';
		abt += '<p class="quote_p" style="font-stretch: expanded;font-style: oblique;';
		abt += 'font-size: medium;">"'+json.quote+'"</p>';
		abt += '<p class="author_p">- '+json.quoteAuthor+'</p></div>';
		
		$('#about-content').html(abt);
	});
	/*end of about page info*/

	/*get the 'undergraduate degrees' page information*/
	myXHR('get',{'path':'/degrees/undergraduate'},'#undergrad').done(function(json){

		/*add retrieved data to variable to display in undergrad section*/
		var ug = "<ul class='cards'>";
		$.each(json.undergraduate.sort(sortBy("degreeName")),function(i,item){
			
			/*purpose of if-else is to display stream related icons*/
			if(i == 0){
				ug += "<li><span class='image_container'>";
				ug += "<i style='color:brown; margin-top: 4%;' class='fa fa-laptop fa-5x'></i></span>";
			}else if(i == 1){
				ug += "<li><span class='image_container'>";
				ug += "<i style='color:darkgreen; margin-top: 4%;' class='fa fa-hand-paper-o fa-5x'></i></span>";
			}else if(i == 2){
				ug += "<li><span class='image_container'>";
				ug += "<i style='color:yellow; margin-top: 4%;' class='fa fa-globe fa-5x'></i></span>";
			}
			/*end of if-else*/

			ug += "<span class='ugContent'>";
			ug += "<h2>"+item.title+"</h2><p>"+item.description+"</p></span>";
			ug += "<span class='ugContent_bottom'>";
			/*on click of concentration, open popup that displays list of concentration names*/
			ug += "<p class='popupContent_open' onclick='undergradClick(this)' ";
			ug += "data-dash-ugConc='"+item.degreeName+"'>Click Here For More Details<br>";
			ug += "<i class='fa fa-plus fa-2x plus'></i></p></span>";
			ug += "</li>";
		});
		ug += "</ul>";

		$('#undergrad-content').html(ug);
	});
	/*end of undergrad section*/

	/*get the 'graduate degrees' page information*/
	myXHR('get',{'path':'/degrees/graduate'},'#grad').done(function(json){

		/*add retrieved data to variable to display in grad section*/
		var gr = "<div><ul class='card'>";
		/*to display graduate degrees*/
		$.each(json.graduate.sort(sortBy("degreeName")),function(i,item){
			/*if is to divide degrees and certificates section within grad information*/
			if(item.degreeName != "graduate advanced certificates"){
				/*purpose of if-else is to display stream related icons*/
				if(i == 1){
					gr += "<li class='gradList'><span class='image_container'>";
					gr += "<i style='color:green; margin-top: 4%;' class='fa fa-sticky-note-o fa-5x'>";
					gr += "</i></span>";
				}else if(i == 2){
					gr += "<li class='gradList'><span class='image_container'>";
					gr += "<i style='color:yellow; margin-top: 4%;' class='fa fa-keyboard-o fa-5x'>";
					gr += "</i></span>";
				}else if(i == 3){
					gr += "<li class='gradList'><span class='image_container'>";
					gr += "<i style='color:brown; margin-top: 4%;' class='fa fa-server fa-5x'>";
					gr += "</i></span>";
				}
				/*end of if-else*/
				gr += "<span class='gContent'>";
				gr += "<h2>"+item.title+"</h2><p>"+item.description+"</p></span>";
				/*on click of concentration, open popup that displays list of concentration names*/
				gr += "<span class='gContent_bottom'>";
				gr += "<p class='popupContent_open' onclick='gradClick(this)' ";
				gr += "data-dash-gConc='"+item.degreeName+"'>Click Here For More Details<br>";
				gr += "<i class='fa fa-plus fa-2x plus'></i></p></span>";
				gr += "</li>";
			}
		});

		gr += "</ul></div>";
		/*end of degrees section*/

		/*to display graduate degree certificates*/
		$.each(json.graduate.sort(sortBy("degreeName")),function(i,item){
			/*if is to get the certificates*/
			if(item.degreeName == "graduate advanced certificates"){
				gr += "<div class='gradCerti'><h2>Graduate Advanced Certificates</h2>";
				gr += "<hr class='emp_hr'><ul>";
				for(var j=0; j<item.availableCertificates.length;j++){
					/*if-else is to add different icon for each certificate*/ 
					/*onclick of certificate, open link in new tab with certificate info*/
					if(j == 0){
						gr += "<li onclick='gradCertiClick(this)'>";
						gr += "<i class='fa fa-html5 fa-3x'></i>";
						gr += "<br>"+item.availableCertificates[j]+"</li>";
					}else{
						gr += "<li onclick='gradCertiClick(this)'>";
						gr += "<i class='fa fa-sitemap fa-3x'></i>";
						gr += "<br>"+item.availableCertificates[j]+"</li>";
					}
				}
			}
		});
		gr += "</ul>";
		/*end of certificate section*/

		$('#grad-content').html(gr);
	});
	/*end of graduate section*/

	/*get the 'minors' page information*/
	myXHR('get',{'path':'/minors/UgMinors'},'#minors').done(function(json){

		/*add retrieved data to variable to display in minors section*/
		var minor = "<div>";
		minor += "<ul class='ugminors'>";
		$.each(json.UgMinors,function(i,item){
			/*on click of each minor, open popup that displays more info about minor*/
			minor += "<li class='popupContent_open' onclick='minorClick(this)' ";
			minor += "data-dash-minorName='"+item.name+"'><span class='image_container'>";
			/*if-else is to display different icon for each minor*/
			if(i == 0){
				minor += "<br><i class='fa fa-database fa-3x'></i><br>";
				minor += "<p>"+item.title+"</p></span></li>";
			}else if(i == 1){
				minor += "<br><i class='fa fa-map-marker fa-3x'></i><br>";
				minor += "<p>"+item.title+"</p></span></li>";
			}else if(i == 2){
				minor += "<br><i class='fa fa-medkit fa-3x'></i><br>";
				minor += "<p>"+item.title+"</p></span></li>";
			}else if(i == 3){
				minor += "<br><i class='fa fa-code fa-3x'></i><br>";
				minor += "<p>"+item.title+"</p></span></li>";
			}else if(i == 4){
				minor += "<br><i class='fa fa-mobile fa-3x'></i><br>";
				minor += "<p>"+item.title+"</p></span></li>";
			}else if(i == 5){
				minor += "<br><i class='fa fa-sitemap fa-3x'></i><br>";
				minor += "<p>"+item.title+"</p></span></li>";
			}else if(i == 6){
				minor += "<br><i class='fa fa-html5 fa-3x'></i><br>";
				minor += "<p>"+item.title+"</p></span></li>";
			}else if(i == 7){
				minor += "<br><i class='fa fa-object-group fa-3x'></i><br>";
				minor += "<p>"+item.title+"</p></span></li>";
			}
		});
		minor += "</ul></div>";

		$('#minors-content').html(minor);
	});
	/*end of minors section*/

	/*get the 'employment' page information*/
	myXHR('get',{'path':'/employment'},'#careerinfo').done(function(json){
		/*add retrieved data to variable to display in employment section*/
		var emp = "<div class='employment'>";
		/*display the introduction content of employment*/
		$.each(json.introduction.content,function(i,item){
			emp += "<h2>"+item.title+"</h2>";
			emp += "<hr class='emp_hr'>";
			emp += "<p>"+item.description+"</p>";
		});
		emp += "</div>";

		/*display statistics related information in 4 boxes*/
		emp += "<div class='statistics'><h2 class='h2Color'>"+json.degreeStatistics.title+"</h2>";
		emp += "<hr class='emp_hr'>";
		emp += "<ul class='idstats'>";
		$.each(json.degreeStatistics.statistics,function(i,item){
			emp += "<li class='gradList'><span class='image_container'>";
			emp += "<h2>"+item.value+"</h2><p>"+item.description+"</p></span></li>";
		});
		emp += "</ul></div>";

		/*display list of employees*/
		emp += "<div class='employerH'><h2>"+json.employers.title+"</h2>";
		emp += "<hr class='emp_hr'><ul class='employerCareer'>";
		$.each(json.employers.employerNames,function(i,item){
			if(i < json.employers.employerNames.length-1)
				emp += "<li><span class='image_container'>"+item.toUpperCase()+"</span></li>";
		}); 
		emp += "</ul></div>";

		/*display list of positions*/
		emp += "<div class='careerH'><h2>"+json.careers.title+"</h2>";
		emp += "<hr class='emp_hr'><ul class='employerCareer'>";
		$.each(json.careers.careerNames,function(i,item){
			if(i < json.careers.careerNames.length-1)
				emp += "<li><span class='image_container'>"+item.toUpperCase()+"</span></li>";
		}); 
		emp += "</ul></div>";

		$('#careerinfo-content').html(emp);
	});
	/*end of career info section*/

	/*get the 'map' and other statistics related to employment*/
	myXHR('get',{'path':'/employment'},'#careeranalytics').done(function(json){

		/*co-op and employment history information represented in two buttons format
		onclick of which tables are populated in popup*/
		var link = "https://www.ist.rit.edu/api/map";
		var empAnalytic = "<div><iframe style='width: 90%;height: 1000px;border: 0;' src='"+link+"'>";
		empAnalytic += "</iframe></div>";

		empAnalytic += "<h2>Employment and Co-Op History</h2><hr class='empco_hr'>";
		empAnalytic += "<div><input class='popupContent_open employment_buttons one' ";
		empAnalytic += "type='button' onclick='coopClick()'";
		empAnalytic += " value='"+json.coopTable.title+"' /><span style='margin-right:20px'>";
		empAnalytic += "</span>";
		empAnalytic += "<input class='popupContent_open employment_buttons two' ";
		empAnalytic += "type='button' onclick='employClick()'";
		empAnalytic += " value='"+json.employmentTable.title+"' />";
		empAnalytic += "</div>";

		$('#careeranalytics-content').html(empAnalytic);
	});

	/*plugin functions to display data in tabular format*/
	$('.cooptblPopup').DataTable({});
	$('.emplomenttblPopup').DataTable({});

	/*get the 'people' page information*/
	myXHR('get',{'path':'/people'},'#people').done(function(json){
		/*add retrieved data to variable to display in people section*/
		/*display all faculty*/
		var ppl = "<h2>Faculty</h2><hr class='facstaff_hr'><div class='pplContainer'>";
		$.each(json.faculty.sort(sortBy("name")), function(i,item){
			ppl += "<div class='facitem'>";
			ppl += "<img class='popupContent_open' src='"+item.imagePath+"' ";
			/*onclick of faculty image, more info is provided in popup*/
			ppl += "onclick='imageClickFaculty(this)' data-dash-pplimg='"+item.username+"' ";
			ppl += "width='150' height='150' alt='"+item.title+"' />";
			ppl += "<p>"+item.name+"</p>"
			ppl += "</div>";
		});		
		ppl += "</div>";

		/*display all staff*/
		ppl += "<h2>Staff</h2><hr class='facstaff_hr'><div class='pplContainer'>";
		$.each(json.staff.sort(sortBy("name")), function(i,item){
			ppl += "<div class='facitem'>";
			ppl += "<img class='popupContent_open' src='"+item.imagePath+"' ";
			/*onclick of staff image, more info is provided in popup*/
			ppl += "onclick='imageClickStaff(this)' data-dash-pplimg='"+item.username+"' ";
			ppl += "width='150' height='150' alt='"+item.title+"' />";
			ppl += "<p>"+item.name+"</p>"
			ppl += "</div>";
		});
		ppl += "</div>";

		$('#people-content').html(ppl);
	});
	/*end of people section*/

	/*faculty and staff images grid layout plugin*/
	$(".pplContainer").rowGrid({
		itemSelector: ".facitem", 
		minMargin: 10, 
		maxMargin: 25, 
		firstItemClass: "first-item"
	});

	/*get the 'research by area' page information*/
	myXHR('get',{'path':'/research/byInterestArea'},'#rsrchintrst').done(function(json){
		/*add retrieved data to variable to display in research by area section*/
		var rsrch = "<div><ul class='rsrchbyarea'>";
		$.each(json.byInterestArea.sort(sortBy("areaName")), function(i,item){
			/*if-else is to display different icon for each research area*/
			/*onclick of each area, popup is displayed with more information*/
			if(i == 0){
				rsrch += "<li style='background-color:#D64541' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-gg fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 1){
				rsrch += "<li style='background-color:#019875' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-database fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 2){
				rsrch += "<li style='background-color:#3498DB' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-pencil-square-o fa-2x' aria-hidden='true'>";
				rsrch += "</i></li>";
			}
			else if(i == 3){
				rsrch += "<li style='background-color:#34495E' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-map-marker fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 4){				
				rsrch += "<li style='background-color:#3A539B' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-user fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 5){				
				rsrch += "<li style='background-color:#E08283' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-heartbeat fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 6){				
				rsrch += "<li style='background-color:#F64747' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-mobile fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 7){				
				rsrch += "<li style='background-color:#F2784B' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-sitemap fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 8){				
				rsrch += "<li style='background-color:#68C3A3' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-file-o fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 9){				
				rsrch += "<li style='background-color:#22313F' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-server fa-2x' aria-hidden='true'></i></li>";
			}
			else if(i == 10){				
				rsrch += "<li style='background-color:#F4B350' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-caret-square-o-right fa-2x' aria-hidden='true'>";
				rsrch += "</i></li>";
			}
			else if(i == 11){				
				rsrch += "<li style='background-color:#6C7A89' class='popupContent_open' ";
				rsrch += "onclick='rsrchBtnIntrst(this)' data-dash-area='"+item.areaName+"'>";
				rsrch += item.areaName;
				rsrch += "<br><br><i class='fa fa-object-group fa-2x' aria-hidden='true'></i></li>";
			}
		});
		rsrch += "</ul></div>";

		$('#rsrchintrst-content').html(rsrch);
	});
	/*end of research by area section*/

	/*get the 'research by faculty' page information*/
	myXHR('get',{'path':'/research/byFaculty'},'#rsrchppl').done(function(json){
		/*add retrieved data to variable to display in research by faculty section*/
		var rsrchFac = "<div><ul class='rsrchbyfaclty'>";
		$.each(json.byFaculty.sort(sortBy("facultyName")), function(i,item){
			/*onclick of faculty name, more information is provided in popup*/
			rsrchFac += "<li class='popupContent_open' onclick='rsrchBtnFaculty(this)' ";
			rsrchFac += "data-dash-facuname='"+item.username+"'><p>"+item.facultyName+"</p>";
			rsrchFac += "<i class='fa fa-heart'></i></li>";
		});		
		rsrchFac += "</ul></div>"; 

		$('#rsrchppl-content').html(rsrchFac);
	});
	/*end of research by faculty section*/

	/*get the 'resources' page information*/
	myXHR('get',{'path':'/resources'},'#currentstd').done(function(json){
		/*add retrieved data to variable to display in resources section*/
        var stdres = "<div>";
        stdres += "<ul class='rsrcUl'><li onclick='resourceCoop(this)' ";
        /*co-op related information*/
        stdres += "data-dash-rsrctitle='coopEnrollment' class='popupContent_open rsrc1'>";
        stdres += "<p>"+json.coopEnrollment.title+"</p></li>";
        stdres += "<li onclick='resourceForms(this)' data-dash-rsrctitle='forms' ";
        /*different forms*/
        stdres += "class='popupContent_open rsrc2'><p>Forms</p></li>";
        /*student ambassadors*/
        stdres += "<li onclick='resourceAmbassador(this)' ";
        stdres += "data-dash-rsrctitle='studentAmbassadors' class='popupContent_open rsrc3'>";
        stdres += "<p>"+json.studentAmbassadors.title+"</p></li>";
        /*advisors section*/
        stdres += "<li onclick='resourceStdServices(this)' data-dash-rsrctitle='studentServices'";
        stdres += " class='popupContent_open rsrc4'><p>"+json.studentServices.title+"</p></li>";
        /*study abroad button*/
        stdres += "<li onclick='resourceAbroad(this)' data-dash-rsrctitle='studyAbroad' ";
        stdres += "class='popupContent_open rsrc5'><p>"+json.studyAbroad.title+"</p></li>";
        /*about labs and tutoring hours*/
        stdres += "<li onclick='resourceLabs(this)' data-dash-rsrctitle='tutorsAndLabInformation'";
        stdres += " class='popupContent_open rsrc6'><p>"+json.tutorsAndLabInformation.title;
        stdres += "</p></li>";
        stdres += "</ul></div>";
        /*onclick of each above buttons, more information is provided in popup*/

		$('#currentstd-content').html(stdres);
	});
	/*end of resources section*/

	/*get the 'social' media page content*/
	myXHR('get',{'path':'/footer'},'none').done(function(json){
		/*add retrieved data to variable to display in social media section*/
		var soc = "<div>";
		soc += "<p style='font-weight:bolder;font-size:larger;' class='quote_p'>";
		soc += json.social.tweet+"</p>";
		soc += "<p class='author_p'>"+json.social.by+"</p>";		
		soc += "</div><br>";
		/*show fb and twitter icons with links to ist social media page*/
		soc += "<img onclick='socialClick(this)' data-dash-href='"+json.social.twitter;
		soc += "' class='twitter' width='50px' height='50px'></a>";
		soc += "<img onclick='socialClick(this)' data-dash-href='"+json.social.facebook;
		soc += "' class='fb' width='50px' height='50px'></a>";

		$('#social-content').html(soc);
	});
	/*end of social media section*/

	/*footer section quicklinks displayed on left*/
	myXHR('get',{'path':'/footer/quickLinks'},'none').done(function(json){

		var ftr = "";
		ftr += "<ul class='bottom_ul'>";

		/*do not show apply now as it has already been added*/
		$.each(json.quickLinks,function(i,item){
			if(item.title != "Apply Now"){
				ftr += "<li><a href='"+item.href+"' target='_blank' ";
				ftr += "style='color: white;text-decoration: none;'>"+item.title+"</a></li>";
			}
		});

		ftr += "<li onclick='newsClick()' class='popupContent_open news'>News</li></ul>";
		$('#bottom .row .col-md-3').html(ftr);
	});
	/*end of quicklinks section*/

	/*get footer copyright information*/
	myXHR('get',{'path':'/footer/copyright'},'none').done(function(json){

		var ftr = "";
		ftr += json.copyright.html;
		ftr += "<br><div class='row'><p><a href='http://www.rit.edu/maps/' target='_blank'>";
		ftr += "One Lomb Memorial Drive, Rochester, NY 14623-5603</a>";
        ftr += "<br>Questions or comments?<a href='http://www.rit.edu/ask/' target='_blank'>";
        ftr += "Send us feedback.</a>Telephone: 585-475-2700";
        ftr += "</p></div>";

		$('.copyright .row').html(ftr);
	});
	/*end of footer copyright section*/

	/*code to open popup plugin*/
	$('#popupContent').popup({
		horizontal : "center",
		vertical : "center",
		escape : true,
		transition: 'all 0.3s',
		onclose : function(){
			$('#popupContent').html("");	
		}
	});
			
	}
	
});

/*function that runs onclick of undergrad section*/
function undergradClick(items){
	/*get degreename from clicked attribute (this)*/
	var x = items.getAttribute("data-dash-ugConc");
	
	/*get more info about that degree*/
	myXHR('get',{'path':'/degrees/undergraduate/degreeName='+x},'none').done(function(json){
		console.log(json);
		var ugConcentrations = "<div class='ugConcentrationsPopup'><div>";
		ugConcentrations += "<p class='closeP'><i class='popupContent_close fa fa-times fa-2x'>";
		ugConcentrations += "</i></p></div><div><h1>"+json.title+"</h1>";
		ugConcentrations += "<p class='concP'>CONCENTRATIONS</p><hr style='width:15%'><ul>";
		/*display retrieved info in popup*/
		for(var j=0; j<json.concentrations.length;j++){
			ugConcentrations += "<li>"+json.concentrations[j]+"</li>";
		}
		ugConcentrations += "</ul></div></div>";

		$("#popupContent").html(ugConcentrations);
	});
}
/*end of undergradClick*/

/*function that runs onclick of undergrad section*/
function gradClick(items){
	/*get degreename from clicked attribute (this)*/
	var x = items.getAttribute("data-dash-gConc");
	/*get more info about that degree*/
	myXHR('get',{'path':'/degrees/graduate/degreeName='+x},'none').done(function(json){
		console.log(json);
		var gConcentrations = "<div class='gConcentrationsPopup'><div><p class='closeP'>";
		gConcentrations += "<i class='popupContent_close fa fa-times fa-2x'></i></p>";
		gConcentrations += "</div><div><h1>"+json.title+"</h1>";
		gConcentrations += "<p class='concP'>CONCENTRATIONS</p><hr style='width:15%'><ul>";
		/*display retrieved info in popup*/
		for(var j=0; j<json.concentrations.length;j++){
			gConcentrations += "<li>"+json.concentrations[j]+"</li>";
		}
		gConcentrations += "</ul></div></div>";

		$("#popupContent").html(gConcentrations);
	});
}
/*end of gradClick*/

/*function that opens link in new tab onclick of grad certificate*/
function gradCertiClick(certi){
	console.log(certi);
	/*open appropriate link based on clicked certificate*/
	if(certi.textContent == "Web Development Advanced certificate"){
		window.open("http://www.rit.edu/programs/web-development-adv-cert");
	}else{
		window.open("http://www.rit.edu/programs/networking-planning-and-design-adv-cert");
	}
}
/*end of gradCertiClick*/

/*function that runs onclick of minor section*/
function minorClick(minor){
	/*get minor name from clicked attribute (this)*/
	var minorname = minor.getAttribute("data-dash-minorName");
	console.log(minorname);
	/*get more info about minor*/
	myXHR('get',{'path':'/minors/UgMinors/name='+minorname},'none').done(function(json){
		console.log(json);
		var minors = "<div class='minorsPopup'><div><p class='closeP'>";
		minors += "<i class='popupContent_close fa fa-times fa-2x'></i></p></div>";
		minors += "<div><h1>"+json.title+"</h1><hr style='width:25%'>";
		/*if-else is for description manipulation to get minor liasion and minor advisor info
		as format for GIS_MN and MEDINFO-MN is different*/
		var temp = json.description.split(":");
		if(json.name == "GIS-MN" || json.name == "MEDINFO-MN"){
			temp[1] = temp[1].replace("Faculty Minor Liaison","");
			minors += "<p>"+temp[0]+temp[1]+"</p>";
			minors += "<p class='secondP'>Faculty Minor Liaison: ";
			minors += "<span class='pValue'>"+temp[2].replace(". Minor Advisor","")+"</span></p>";
			minors += "<p class='secondP'>Minor Advisor: <span class='pValue'>"+temp[3];
			minors += "</span></p>";
		}else{
			minors += "<p>"+temp[0].replace("Faculty Minor Liaison","")+"</p>";
			minors += "<p class='secondP'>Faculty Minor Liaison: <span class='pValue'>";
			minors += temp[1].replace(". Minor Advisor","")+"</span></p>";
			minors += "<p class='secondP'>Minor Advisor: <span class='pValue'>"+temp[2];
			minors += "</span></p>";
		}

		/*minor related courses*/
		minors += "<p class='courseTitle'>COURSES</p>";
		minors += "<ul>";
		for(var j=0; j<json.courses.length;j++){
			minors += "<li data-dash-coursename='"+json.courses[j]+"' ";
			minors += "onclick='minorCourseClick(this)'>"+json.courses[j]+"</li>";
		}
		minors += "</ul>";

		/*if any content available in note*/
		if(json.note != ""){
			minors += "<p class='note'>NOTE: <span class='notetext'>"+json.note+"</span></p>";
		}
		minors += "</div></div>";

		$("#popupContent").html(minors);
	});
}
/*end of minorClick*/

function minorCourseClick(course){
	/*var courseId = course.getAttribute("data-dash-coursename");
	console.log(courseId);
	myXHR('get',{'path':'/course/courseID='+courseId},'none').done(function(json){

		var courseDtl = "<div class='coursePopup'><h1>"+json.title+"</h1><hr style='width:25%'>";
		courseDtl += "<p style='text-align:center;'>"+json.description+"</p></div>";

		$("#popupContent").html(courseDtl);
	});*/
}

/*function to sort array by any given property*/
function sortBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}
/*end of sortBy function*/

/*function that runs onclick of co-op table button*/
function coopClick(){
	
	var cooptbl = "<div class='cooptablediv'><div><p class='closeP'>";
	cooptbl += "<i class='popupContent_close fa fa-times fa-2x'></i></p></div>";
	cooptbl += "<div class='tableDiv'>";
	/*get co-op history*/
	myXHR('get',{'path':'/employment/coopTable'},'none').done(function(json){

		/*header and footer of table*/
		cooptbl += "<h1 style='text-align: center;'>Recent Student Coop Jobs (6/2013-9/2015)</h1>";
		cooptbl += "<table class='cooptblPopup cell-border' cellspacing='0' width='100%'>";
		cooptbl += "<thead><tr><th style='width:25%'>Degree</th><th style='width:25%'>";
		cooptbl += "Employer</th>";
		cooptbl += "<th style='width:25%'>City</th><th style='width:25%'>Term</th></thead>";
		cooptbl += "<tfoot><tr><th>Employer</th><th>Degree</th><th>City</th><th>Term</th></tfoot>";
		cooptbl += "<tbody>";

		/*content of the table(rows)*/
		$.each(json.coopTable.coopInformation, function(i,item){
			cooptbl += "<tr><td>"+item.degree+"</td>";
			cooptbl += "<td>"+item.employer+"</td>";
			cooptbl += "<td>"+item.city+"</td>";
			cooptbl += "<td>"+item.term+"</td><tr>";
		});

		cooptbl += "</tbody></table></div></div>";

		$("#popupContent").html(cooptbl);
	});
}
/*end of coopClick*/

/*function that runs onclick of employment button */
function employClick(){
	
	var employtbl = "<div class='emplomenttbldiv'><div><p class='closeP'>";
	employtbl += "<i class='popupContent_close fa fa-times fa-2x'></i></p></div>";
	employtbl += "<div class='tableDiv'>";
	/*get employment history*/
	myXHR('get',{'path':'/employment/employmentTable'},'none').done(function(json){

		/*table header and footer information*/
		employtbl += "<h1 style='text-align: center;'>Graduating Student Employment";
		employtbl += " (12/2010-11/2015)</h1>";
		employtbl += "<table class='emplomenttblPopup' width='100%'>";
		employtbl += "<thead><tr><th style='width:20%;'>Degree</th><th style='width:20%;'>";
		employtbl += "Employer</th>";
		employtbl += "<th style='width:20%;'>City</th><th style='width:20%;'>Title</th>";
		employtbl += "<th style='width:20%;'>Start Date</th></thead>";
		employtbl += "<tfoot><tr><th>Employer</th><th>Degree</th><th>City</th>";
		employtbl += "<th>Title</th><th>Start Date</th></tfoot>";
		employtbl += "<tbody>";

		/*table content(rows)*/
		$.each(json.employmentTable.professionalEmploymentInformation, function(i,item){
			employtbl += "<tr><td>"+item.degree+"</td>";
			employtbl += "<td>"+item.employer+"</td>";
			employtbl += "<td>"+item.city+"</td>";
			employtbl += "<td>"+item.title+"</td>";
			employtbl += "<td>"+item.startDate+"</td><tr>";
		});

		employtbl += "</tbody></table></div></div>";

		$("#popupContent").html(employtbl);
	});
}
/*end of employClick*/

/*function that runs onclick of faculty image*/
function imageClickFaculty(uname){
	/*get the faculty username from clicked attributelist(this)*/
	var z = uname.getAttribute("data-dash-pplimg");
	console.log(z);
	var facultyPop = "";
	/*get more info about faculty*/
	myXHR('get',{'path':'/people/faculty/username='+z},'none').done(function(json){
		console.log(json);

		facultyPop += "<div class='facultyPopup'><div><p style='margin-left:120px' ";
		facultyPop += "class='closeP'><i class='popupContent_close fa fa-times fa-2x'></i>";
		facultyPop += "</p></div><div><h2 class='poph2'>"+json.name+" , <span>";
		facultyPop += json.title+"</span></h2><hr>";
		facultyPop += "<div id='facPopup'><div class='facRow'>";
		facultyPop += "<div class='leftCol'><img src='"+json.imagePath+"' ";
		facultyPop += "width='150px' height='150px'></div>";
		facultyPop += "<div class='rightCol copyright'><div class='facRow'><p class='facImageP'>";
		/*show phone, office, email and website if available*/
		if(json.email != ""){
			facultyPop += "<i class='fa fa-envelope-o'></i>&nbsp;&nbsp;"+json.email+"<br><br>";
		}
		if(json.phone != ""){
			facultyPop += "<i class='fa fa-phone'></i>&nbsp;&nbsp;"+json.phone+"<br><br>";
		}
		if(json.office != null && json.office != ""){
			facultyPop += "<i class='fa fa-map-marker'></i>&nbsp;&nbsp;"+json.office+"<br><br>";
		}
		if(json.website != ""){
			facultyPop += "<a href='"+json.website+"' target='_blank'>Click Here</a>";
			facultyPop += "<span>&nbsp; For more details</span>";
		}
		facultyPop += "</p></div></div></div></div>";

		$("#popupContent").html(facultyPop);
	});
}
/*end of imageClickFaculty*/

/*function that runs onclick of staff image*/
function imageClickStaff(uname){
	/*get the staff username from clicked attributelist(this)*/
	var z = uname.getAttribute("data-dash-pplimg");
	console.log(z);
	var staffPop = "";
	/*get more info about staff*/
	myXHR('get',{'path':'/people/staff/username='+z},'none').done(function(json){
		console.log(json);
		staffPop += "<div class='staffPopup'><div><p style='margin-left:120px' ";
		staffPop += "class='closeP'><i class='popupContent_close fa fa-times fa-2x'>";
		staffPop += "</i></p></div>";
		staffPop += "<div><h2 class='poph2'>"+json.name+" , <span>"+json.title+"</span>";
		staffPop += "</h2><hr>";
		staffPop += "<div id='facPopup'><div class='facRow'>";
		staffPop += "<div class='leftCol'><img src='"+json.imagePath+"' width='150px' ";
		staffPop += "height='150px'></div>";
		staffPop += "<div class='rightCol copyright'><div class='facRow'><p class='facImageP'>";
		/*show phone, office, email and website if available*/
		if(json.email != ""){
			staffPop += "<i class='fa fa-envelope-o'></i>&nbsp;&nbsp;"+json.email+"<br><br>";
		}
		if(json.phone != ""){
			staffPop += "<i class='fa fa-phone'></i>&nbsp;&nbsp;"+json.phone+"<br><br>";
		}
		if(json.office != null && json.office != ""){
			staffPop += "<i class='fa fa-map-marker'></i>&nbsp;&nbsp;"+json.office+"<br><br>";
		}
		if(json.website != ""){
			staffPop += "<a href='"+json.website+"' target='_blank'>Click Here</a>";
			staffPop += "<span>&nbsp; For more details</span>";
		}
		staffPop += "</p></div></div></div></div>";

		$("#popupContent").html(staffPop);
	});
}
/*end of imageClickStaff*/

/*function that runs onclick of research by area button*/
function rsrchBtnIntrst(interest){
	/*get the research area name*/
	var w = interest.getAttribute("data-dash-area");
	/*in URL, if space is not replaced by %20, it returns wrong results*/
	w = w.toString().replace(" ","%20");
	console.log(w);
	/*get more info about research area*/
	myXHR('get',{'path':'/research/byInterestArea/areaName='+w},'none').done(function(json){
		console.log(json);
		var rsrchByDom = "<div class='researchDomainPopup'><div><p class='closeP'>";
		rsrchByDom += "<i class='popupContent_close fa fa-times fa-2x'></i></p></div>";
		rsrchByDom += "<div><h1 style='color: orange;'> Research By Domain Area: ";
		rsrchByDom += json.areaName+"</h1><ul>";
		
		$.each(json.citations, function(i,item){
			rsrchByDom += "<li>"+item+"</li>";
		});

		rsrchByDom += "</ul></div></div>";
		$("#popupContent").html(rsrchByDom);
	});
}
/*end of rsrchBtnIntrst*/

/*function that runs onclick of research by faculty button*/
function rsrchBtnFaculty(faculty){
	/*get faculty username*/
	var w = faculty.getAttribute("data-dash-facuname");
	console.log(w);

	/*get more info about research by faculty*/
	myXHR('get',{'path':'/research/byFaculty/username='+w},'none').done(function(json){
		console.log(json);
		var rsrchByFac = "<div class='researchFacultyPopup'><div><p class='closeP'>";
		rsrchByFac += "<i class='popupContent_close fa fa-times fa-2x'></i></p></div>";
		rsrchByFac += "<div><h1 style='color: orange;'>"+json.facultyName+"</h1>";
		rsrchByFac += "<ul>";
		
		$.each(json.citations, function(i,item){
			rsrchByFac += "<li>"+item+"</li>";
		});

		rsrchByFac += "</ul></div></div>";
		$("#popupContent").html(rsrchByFac);
	});
}
/*end of rsrchBtnFaculty*/

/*function that runs onclick of co-op resource*/
function resourceCoop(resrces){
	var x = resrces.getAttribute("data-dash-rsrctitle");
	console.log(x);

	/*get co-op resource information*/
	myXHR('get',{'path':'/resources/'+x},'none').done(function(json){
		var coop = "<div class='rsrcPopup'><div><p class='closeP'>";
		coop += "<i class='popupContent_close fa fa-times fa-2x'></i></p></div>";
		coop += "<div><h1 style='color: #F2A7C4;text-align:center'>";
		coop += json.coopEnrollment.title+"</h1>";
		coop += "<hr style='width:15%'><ul>";
		
		$.each(json.coopEnrollment.enrollmentInformationContent, function(i,item){
			coop += "<li><p class='coopP'>"+item.title+"</p>";
			coop += "<p>"+item.description+"</li>";
		});

		coop += "</ul></div></div>";
		$("#popupContent").html(coop);
	});
}
/*end of resourceCoop*/

/*function that runs onclick of form resource*/
function resourceForms(resrces){
	var x = resrces.getAttribute("data-dash-rsrctitle");
	console.log(x);
	/*get forms information*/
	myXHR('get',{'path':'/resources/'+x},'none').done(function(json){
		var form = "<div class='rsrcPopup'><div><p class='closeP'><i class='popupContent_close fa fa-times fa-2x'></i></p></div><div><h1 style='color: #F2A7C4;text-align:center'>Forms</h1>";
		form += "<hr style='width:15%'><h3>Graduate Forms</h3><ul>";
		
		$.each(json.forms.graduateForms, function(i,item){
			form += "<li><a href='http://www.ist.rit.edu/"+item.href+"'>"+item.formName+"</a></li>";
		});

		form += "</ul><h3>Undergraduate Forms</h3><ul>";

		$.each(json.forms.undergraduateForms, function(i,item){
			form += "<li><a href='http://www.ist.rit.edu/"+item.href+"'>"+item.formName+"</a></li>";
		});

		form += "</ul></div></div>";
		$("#popupContent").html(form);
	});
}
/*end of resourceForms*/

/*function that runs onclick of std ambassador resource*/
function resourceAmbassador(resrces){
	var x = resrces.getAttribute("data-dash-rsrctitle");
	console.log(x);
	/*get std ambassador information*/
	myXHR('get',{'path':'/resources/'+x},'none').done(function(json){
		var ambasdr = "<div class='rsrcPopup'><div><p class='closeP'><i class='popupContent_close fa fa-times fa-2x'></i></p></div><div><h1 style='color: #F2A7C4;text-align:center'>"+json.studentAmbassadors.title+"</h1>";
		ambasdr += "<hr style='width:30%'><ul>";
		
		$.each(json.studentAmbassadors.subSectionContent, function(i,item){
			ambasdr += "<li><p class='coopP'>"+item.title+"</p>";
			ambasdr += "<p>"+item.description+"</li>";
		});

		ambasdr += "</ul></div></div>";
		$("#popupContent").html(ambasdr);
	});
}
/*end of resourceAmbassador*/

/*function that runs onclick of student services resource*/
function resourceStdServices(resrces){
	var x = resrces.getAttribute("data-dash-rsrctitle");
	console.log(x);
	/*get std services information*/
	myXHR('get',{'path':'/resources/'+x},'none').done(function(json){
		var stdservices = "<div class='rsrcPopup'><div><p class='closeP'><i class='popupContent_close fa fa-times fa-2x'></i></p></div><div><h1 style='color: #F2A7C4;text-align:center'>"+json.studentServices.title+"</h1>";
		stdservices += "<hr style='width:7%'><p class='coopP'>"+json.studentServices.academicAdvisors.title+"</p>";
		stdservices += "<p>"+json.studentServices.academicAdvisors.description+"</p>";
		stdservices += "<p class='coopP'>"+json.studentServices.facultyAdvisors.title+"</p>";
		stdservices += "<p>"+json.studentServices.facultyAdvisors.description+"</p>";
		
		stdservices += "<p class='coopP'>"+json.studentServices.professonalAdvisors.title+"</p><ul>";
		$.each(json.studentServices.professonalAdvisors.advisorInformation, function(i,item){
			stdservices += "<li>"+item.department+" - "+item.name+" ("+item.email+")</li>";
		});

		stdservices += "</ul><p class='coopP'>"+json.studentServices.istMinorAdvising.title+"</p><ul>";
		$.each(json.studentServices.istMinorAdvising.minorAdvisorInformation, function(i,item){
			stdservices += "<li>"+item.title+" - "+item.advisor+" ("+item.email+")</li>";
		});

		stdservices += "</ul></div></div>";
		$("#popupContent").html(stdservices);
	});
}
/*end of resourceStdServices*/

/*function that runs onclick of abroad resource*/
function resourceAbroad(resrces){
	var x = resrces.getAttribute("data-dash-rsrctitle");
	console.log(x);
	/*get abroad information*/
	myXHR('get',{'path':'/resources/'+x},'none').done(function(json){
		var stdyabrd = "<div class='rsrcPopup'><div><p class='closeP'><i class='popupContent_close fa fa-times fa-2x'></i></p></div><div><h1 style='color: #F2A7C4;text-align:center'>"+json.studyAbroad.title+"</h1>";
		stdyabrd += "<hr style='width:12%'><p>"+json.studyAbroad.description+"</p><ul>";
		
		$.each(json.studyAbroad.places, function(i,item){
			stdyabrd += "<li><p class='coopP'>"+item.nameOfPlace+"</p>";
			stdyabrd += "<p>"+item.description+"</li>";
		});

		stdyabrd += "</ul></div></div>";
		$("#popupContent").html(stdyabrd);
	});
}
/*end of resourceAbroad*/

/*function that runs onclick of labs resource*/
function resourceLabs(resrces){
	var x = resrces.getAttribute("data-dash-rsrctitle");
	console.log(x);
	/*get labs information*/
	myXHR('get',{'path':'/resources/'+x},'none').done(function(json){
		var labhrs = "<div class='rsrcPopup'><div><p class='closeP'><i class='popupContent_close fa fa-times fa-2x'></i></p></div><div><h1 style='color: #F2A7C4;text-align:center'>"+json.tutorsAndLabInformation.title+"</h1>";
		labhrs += "<hr style='width:15%'><p>"+json.tutorsAndLabInformation.description+"</p>";
		labhrs += "<p><a style='text-decoration: none;' href='"+json.tutorsAndLabInformation.tutoringLabHoursLink+"' target='_blank'>Click Here</a> for lab hours.</p></div></div>";

		$("#popupContent").html(labhrs);
	});
}
/*end of resourceLabs*/

/*function that runs onclick of social media*/
function socialClick(share){
	var link = share.getAttribute("data-dash-href");
	window.open(link);
}
/*end of socialClick*/

/*function that runs onclick of news section in footer*/
function newsClick(){

	var news = "<div class='newsPopup'><div><p class='closeP'><i class='popupContent_close fa fa-times fa-2x'></i></p></div>";
	myXHR('get',{'path':'/news'},'none').done(function(json){
		
		var temp;
		news += "<ul style='list-style:none;'>";
		/*get current year news*/
		$.each(json.year, function(i, item){
			if(item.description != null && item.description != ""){
				news += "<li><h3 style='font-size: x-large;'>"+item.title+"</h3>";
				temp = item.date.split(" ");
				news += "<p style='font-style:italic'>"+temp[0]+"</p>";
				news += "<p style='font-size: small;'>"+item.description+"</p></li>";
			}
		});

		/*get older news*/
		$.each(json.older, function(i, item){
			if(item.description != null && item.description != ""){
				news += "<li><h3 style='font-size: x-large;'>"+item.title+"</h3>";
				temp = item.date.split(" ");
				news += "<p style='font-style:italic'>"+temp[0]+"</p>";
				news += "<p style='font-size: small;'>"+item.description+"</p></li>";
			}
		});

		news += "</ul></div>";
		$("#popupContent").html(news);
	});
}
/*end of newsClick*/

////////////////Ajax Util///////////////////
// in: (t,d) 
//		t="get" or "post"
//		d={"path":"/undergrad/"}
// return: ajax object ready to consume the callback
////////////////////////////////////
function myXHR(t,d,id){
	return $.ajax({
		type:t,
		cache:false,
		async:true,
		dataType:'json',
		url:'proxy.php',
		data:d,
		beforeSend:function(){
			/*in case of popup*/
			if(id != "none"){
				var x = "<div class='bubblingG'><span id='bubblingG_1'></span>";
				x += "<span id='bubblingG_2'></span><span id='bubblingG_3'></span>";
				x += "</div><div class='bg_transparent'></div>";
				
				var tempArr = $(id).children();
				$(x).insertBefore(tempArr[0]);
				showBusy(id);
			}
		}
	}).always(function(){
		/*in case of popup*/
		if(id != "none"){
			$(id).find('.bubblingG').fadeOut(2000, function(){
				$(this).hide();
			});
			$(id).find('.bg_transparent').fadeOut(2000, function(){
				$(this).hide();
			});
		}

	}).fail(function(){
		//handle failure...
	});
}