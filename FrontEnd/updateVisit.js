		var findBtn = document.getElementById('find-btn');
		findBtn.addEventListener('click', findItem);	
		
		

		var text = '{ "visit" : [' +
				'{"id": "1", "cost": "123", "payMethod": "Cash", "checkIn": "1/5", "checkOut": "2/5"},' +
				'{"id": "2", "cost": "456", "payMethod": "Cash", "checkIn": "2/5", "checkOut": "3/5"},' +
				'{"id": "3", "cost": "789", "payMethod": "Cash", "checkIn": "3/5","checkOut": "4/5"}]}';  
		
		var position;
		var visitObj = JSON.parse(text);

		function findItem() {	
			document.getElementById("result").setAttribute("isVisible", "true");
			var id = document.getElementById("id");
			var idValue = id.value;		
			for (i = 0; i < 3; i++) {
				if (visitObj.visit[i].id == idValue) {
					position = i;
					document.getElementById("cost").innerHTML = visitObj.visit[i].cost;
					document.getElementById("costBtn").innerHTML = '<button id="uCostBtn" onclick="updateCost()">UPDATE</button><br><br>';
					document.getElementById("payMethod").innerHTML = visitObj.visit[i].payMethod;
					document.getElementById("payMethodBtn").innerHTML = '<button id="uPayMethodBtn" onclick="updatePayMethod()">UPDATE</button><br><br>';
					document.getElementById("checkIn").innerHTML = visitObj.visit[i].checkIn; 
					document.getElementById("checkInBtn").innerHTML = '<button id="uCheckInBtn" onclick="updateCheckIn()">UPDATE</button><br><br>';
					document.getElementById("checkOut").innerHTML = visitObj.visit[i].checkOut;
					document.getElementById("checkOutBtn").innerHTML = '<button id="uCheckOutBtn" onclick="updateCheckOut()">UPDATE</button><br><br>';
				}
			}
			document.getElementById("readonly").innerHTML = '<button id="done-btn">DONE</button><br><br>';
 			var doneBtn = document.getElementById('done-btn');
			doneBtn.addEventListener('click', displayUpdated);
		}


		function updateCost() {
			document.getElementById("cost").setAttribute("contenteditable", "true");
			document.getElementById("uCostBtn").style.display = "none";
			document.getElementById("costBtn").innerHTML = '<button id="sCostBtn" onclick="saveCost()">SAVE</button><br><br>';
		}
		function updatePayMethod() {
			document.getElementById("payMethod").setAttribute("contenteditable", "true");
			document.getElementById("uPayMethodBtn").style.display = "none";
			document.getElementById("payMethodBtn").innerHTML = '<button id="sPayMethodBtn" onclick="savePayMethod()">SAVE</button><br><br>';
		}
		function updateCheckIn() {
			document.getElementById("checkIn").setAttribute("contenteditable", "true");
			document.getElementById("uCheckInBtn").style.display = "none";
			document.getElementById("checkInBtn").innerHTML = '<button id="sCheckInBtn" onclick="saveCheckIn()">SAVE</button><br><br>';
		}
		function updateCheckOut() {
			document.getElementById("checkOut").setAttribute("contenteditable", "true");
			document.getElementById("uCheckOutBtn").style.display = "none";
			document.getElementById("checkOutBtn").innerHTML = '<button id="sCheckOutBtn" onclick="saveCheckOut()">SAVE</button><br><br>';
		}	

		function saveCost() {
			var value = document.getElementById("cost").innerHTML;			
			visitObj.visit[position].cost = value; 
			document.getElementById("cost").setAttribute("contenteditable", "false");
			document.getElementById("sCostBtn").style.display = "none";
			document.getElementById("costBtn").innerHTML = '<button id="uCostBtn" onclick="updateCost()">UPDATE</button><br><br>';
		}
		
		function savePayMethod() {
			var value = document.getElementById("payMethod").innerHTML;			
			visitObj.visit[position].payMethod = value; 
			document.getElementById("payMethod").setAttribute("contenteditable", "false");
			document.getElementById("sPayMethodBtn").style.display = "none";
			document.getElementById("payMethodBtn").innerHTML = '<button id="uPayMethodBtn" onclick="updatePayMethod()">UPDATE</button><br><br>';
		}	

		function saveCheckIn() {
			var value = document.getElementById("checkIn").innerHTML;			
			visitObj.visit[position].checkIn = value; 
			document.getElementById("checkIn").setAttribute("contenteditable", "false");
			document.getElementById("sCheckInBtn").style.display = "none";
			document.getElementById("checkInBtn").innerHTML = '<button id="uCheckInBtn" onclick="updateCheckIn()">UPDATE</button><br><br>';
		}

		function saveCheckOut() {
			var value = document.getElementById("checkOut").innerHTML;
			visitObj.visit[position].checkOut = value; 
			document.getElementById("checkOut").setAttribute("contenteditable", "false");
			document.getElementById("sCheckOutBtn").style.display = "none";
			document.getElementById("checkOutBtn").innerHTML = '<button id="uCheckOutBtn" onclick="updateCheckOut()">UPDATE</button><br><br>';
		}

		function displayUpdated(){
			document.getElementById("readonly").innerHTML = "Updated info:<br><br>" + 
			"id: " + visitObj.visit[position].id + "<br><br>" +
			"cost: " + visitObj.visit[position].cost + "<br><br>" +
			"pay method: " + visitObj.visit[position].payMethod + "<br><br>" +
			"check in: " + visitObj.visit[position].checkIn + "<br><br>" +
			"check out: " + visitObj.visit[position].checkOut;
			var visitJSON = JSON.stringify(visitObj);
		}

   		document.getElementById("back").onclick = function () {
        	location.href = "index.html";
   		};