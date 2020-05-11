		var findBtn = document.getElementById('find-btn');
		findBtn.addEventListener('click', findItem);	
		
		

		var text = '{ "patient" : [' +
			'{"ssn": "1", "phoneno": "123", "dob": "01/01/1999", "gender": "Male", "name": "A"},' +
			'{"ssn": "2", "phoneno": "456", "dob": "11/05/2000", "gender": "Female", "name": "B"},' +
			'{"ssn": "3", "phoneno": "789", "dob": "19/05/2000", "gender": "Male","name": "C"}]}'; 
		
		var position;
		var patientObj = JSON.parse(text);

		function findItem() {	
			document.getElementById("result").setAttribute("isVisible", "true");
			var ssn = document.getElementById("ssn");
			var ssnValue = ssn.value;		
			for (i = 0; i < 3; i++) {
				if (patientObj.patient[i].ssn == ssnValue) {
					position = i;
					document.getElementById("phoneno").innerHTML = patientObj.patient[i].phoneno;
					document.getElementById("phonenoBtn").innerHTML = '<button id="uPhonenoBtn" onclick="updatePhoneno()">UPDATE</button><br><br>';
					document.getElementById("dob").innerHTML = patientObj.patient[i].dob;
					document.getElementById("dobBtn").innerHTML = '<button id="uDobBtn" onclick="updateDob()">UPDATE</button><br><br>';
					document.getElementById("gender").innerHTML = patientObj.patient[i].gender; 
					document.getElementById("genderBtn").innerHTML = '<button id="uGenderBtn" onclick="updateGender()">UPDATE</button><br><br>';
					document.getElementById("name").innerHTML = patientObj.patient[i].name;
					document.getElementById("nameBtn").innerHTML = '<button id="uNameBtn" onclick="updateName()">UPDATE</button><br><br>';
				}
			}
			document.getElementById("readonly").innerHTML = '<button id="done-btn">DONE</button><br><br>';
 			var doneBtn = document.getElementById('done-btn');
			doneBtn.addEventListener('click', displayUpdated);
		}


		function updatePhoneno() {
			document.getElementById("phoneno").setAttribute("contenteditable", "true");
			document.getElementById("uPhonenoBtn").style.display = "none";
			document.getElementById("phonenoBtn").innerHTML = '<button id="sPhonenoBtn" onclick="savePhoneno()">SAVE</button><br><br>';
		}
		function updateDob() {
			document.getElementById("dob").setAttribute("contenteditable", "true");
			document.getElementById("uDobBtn").style.display = "none";
			document.getElementById("dobBtn").innerHTML = '<button id="sDobBtn" onclick="saveDob()">SAVE</button><br><br>';
		}
		function updateGender() {
			document.getElementById("gender").setAttribute("contenteditable", "true");
			document.getElementById("uGenderBtn").style.display = "none";
			document.getElementById("genderBtn").innerHTML = '<button id="sGenderBtn" onclick="saveGender()">SAVE</button><br><br>';
		}
		function updateName() {
			document.getElementById("name").setAttribute("contenteditable", "true");
			document.getElementById("uNameBtn").style.display = "none";
			document.getElementById("nameBtn").innerHTML = '<button id="sNameBtn" onclick="saveName()">SAVE</button><br><br>';
		}	

		function savePhoneno() {
			var value = document.getElementById("phoneno").innerHTML;
			patientObj.patient[position].phoneno = value; 
			document.getElementById("phoneno").setAttribute("contenteditable", "false");
			document.getElementById("sPhonenoBtn").style.display = "none";
			document.getElementById("phonenoBtn").innerHTML = '<button id="uPhonenoBtn" onclick="updatePhoneno()">UPDATE</button><br><br>';
		}
		
		function saveDob() {
			var value = document.getElementById("dob").innerHTML;
			patientObj.patient[position].dob = value; 
			document.getElementById("dob").setAttribute("contenteditable", "false");
			document.getElementById("sDobBtn").style.display = "none";
			document.getElementById("dobBtn").innerHTML = '<button id="uDobBtn" onclick="updateDob()">UPDATE</button><br><br>';
		}	

		function saveGender() {
			var value = document.getElementById("gender").innerHTML;
			patientObj.patient[position].gender = value; 
			document.getElementById("gender").setAttribute("contenteditable", "false");
			document.getElementById("sGenderBtn").style.display = "none";
			document.getElementById("genderBtn").innerHTML = '<button id="uGenderBtn" onclick="updateGender()">UPDATE</button><br><br>';
		}

		function saveName() {
			var value = document.getElementById("name").innerHTML;
			patientObj.patient[position].name = value; 
			document.getElementById("name").setAttribute("contenteditable", "false");
			document.getElementById("sNameBtn").style.display = "none";
			document.getElementById("nameBtn").innerHTML = '<button id="uNameBtn" onclick="updateName()">UPDATE</button><br><br>';
		}

		function displayUpdated(){
			document.getElementById("readonly").innerHTML = "Updated info:<br><br>" + 
			"ssn: " + patientObj.patient[position].ssn + "<br><br>" +
			"phoneno: " + patientObj.patient[position].phoneno + "<br><br>" +
			"dob: " + patientObj.patient[position].dob + "<br><br>" +
			"gender: " + patientObj.patient[position].gender + "<br><br>" +
			"name: " + patientObj.patient[position].name;
			var patientJSON = JSON.stringify(patientObj);
		}

   		document.getElementById("back").onclick = function () {
        	location.href = "index.html";
   		};