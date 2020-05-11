var findBtn = document.getElementById('find-btn');
		findBtn.addEventListener('click', findItem);	
		
		

		var text = '{ "patient" : [' +
			'{"ssn": "1", "phoneno": "123", "dob": "01/01/1999", "gender": "Male", "name": "A"},' +
			'{"ssn": "2", "phoneno": "456", "dob": "11/05/2000", "gender": "Female", "name": "B"},' +
			'{"ssn": "3", "phoneno": "789", "dob": "19/05/2000", "gender": "Male","name": "C"}]}'; 
		
		var position;
		var patientObj = JSON.parse(text);

		function findItem() {	
			var ssn = document.getElementById("ssn");
			var ssnValue = ssn.value;		
			for (i = 0; i < 3; i++) {
				if (patientObj.patient[i].ssn == ssnValue) {
					position = i;
					document.getElementById("editableResult").innerHTML = 'Result: <br><br>' +
					" phoneno: " + patientObj.patient[i].phoneno + '<br><br>' +
					" dob: " + patientObj.patient[i].dob + '<br><br>' +
					" gender: " + patientObj.patient[i].gender + '<br><br>' +
					" name: " + patientObj.patient[i].name + '<br><br>' +
					'<button id="update-btn">UPDATE</button><br><br>' +
					'<p contenteditable="false" id="readonly"></p>'
				}
			}

			var updateBtn = document.getElementById('update-btn');
			updateBtn.addEventListener('click', updateItem);
		}


		function updateItem() {	
    		var phoneno = document.getElementById('phonenoUpdate');
    		var dob = document.getElementById('dobUpdate');
    		var gender = document.getElementById('genderUpdate');
	   		var name = document.getElementById('nameUpdate');


			var newPhoneno = phoneno.value;
			var newDob = dob.value;
			var newGender = gender.value;
			var newName = name.value;

			if (newPhoneno != null) {
				patientObj.patient[position].phoneno = newPhoneno;
			}
			if (newDob != null) {
				patientObj.patient[position].dob = newDob;
			}
			if (newGender != null) {
				patientObj.patient[position].gender = newGender;
			}
			if (newName != null) {
				patientObj.patient[position].name = newName;
			}
			document.getElementById("readonly").innerHTML = "Updated info:<br><br>" + 
			" ssn: " + patientObj.patient[position].ssn + "<br><br>" +
			" phoneno: " + patientObj.patient[position].phoneno + "<br><br>" +
			" dob: " + patientObj.patient[position].dob + "<br><br>" +
			" gender: " + patientObj.patient[position].gender + "<br><br>" +
			" name: " + patientObj.patient[position].name;
		}


   		document.getElementById("back").onclick = function () {
        	location.href = "index.html";
   		};