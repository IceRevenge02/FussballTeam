var currentFormation = 0, lastFormation = 0, selectedPlayers = [], allPlayers = [], sortBy = "name"; 
function fnOnload() {
	setUpSelectFormation();
}
function setUpSelectFormation() {
	for (var formationId in formations) {
		var formation = formations[formationId];
		var opt = document.createElement("option");
        opt.value = formationId;
        opt.text = formation.name;
        document.getElementById("selectFormation").appendChild(opt);
	}
	for (var i = 0; i < 4; i++) {
		setUpSelectPlayer(i);
	}
}
function setUpSelectPlayer(i) {
	var formation = formations[i].position;
	for (var positionId in formation) {
		var position = formation[positionId];
		for (var player in position) {
			player = position[player];
			var opt = document.createElement("option");
			opt.value = player;
			opt.text = player;
			document.getElementById("selectPlayer" + i + positionId).appendChild(opt);
		}  
		selectedPlayers[positionId] = players[document.getElementById("selectPlayer" + i + positionId).value];
		document.getElementById("img" + i + positionId).src = "./img/" + selectedPlayers[positionId].nr + ".gif";
	}
	setUpAllPlayers();
}
function clearSelectPlayer(dontClearId) {
	var player = document.getElementById("selectPlayer" + currentFormation + dontClearId).value;
	for (var i = 0; i < 11; i++) {
		if (i == dontClearId)
			continue;
		var selectPlayer = document.getElementById("selectPlayer" + currentFormation + i);
		if (selectPlayer.value == player) {
			selectPlayer.selectedIndex = 0;
			document.getElementById("img" + currentFormation + i).src = "./img/0.gif";
		}
	}
}
function setUpAllPlayers() {
	allPlayers = [];
	for (var player in players) {
		allPlayers.push(players[player][sortBy]); 
	}
	allPlayers.sort();
}
function formationOnchange() {
	lastFormation = currentFormation;
	currentFormation = document.getElementById("selectFormation").value;
	document.getElementById("formation" + lastFormation).style.display = "none";
	document.getElementById("formation" + currentFormation).style.display = "block";
}
function imgOnclick(id) {
	var player = "";
	var idArr = id.split("");
	
	if (idArr.length == 6)
		player = idArr[4] + idArr[5];
	else if (idArr.length == 5)
		player = idArr[4];
	
	changeData(selectedPlayers[player]);
}
function playerOnchange(id) {
	var position = "";
	var idArr = id.split("");
	
	if (idArr.length == 15)
		position = idArr[13] + idArr[14];
	else if (idArr.length == 14)
		position = idArr[13];
	
	selectedPlayers[position] = players[document.getElementById(id).value];
	document.getElementById("img" + currentFormation + position).src = "./img/" + selectedPlayers[position].nr + ".gif";
	changeData(selectedPlayers[position]);
	
	clearSelectPlayer(position);
}
function changeData(player) {
	if (player.name == "---------------------")
		return;
	document.getElementById("data").style.display = "block";
	document.getElementById("dataname").innerHTML = player.name;
	document.getElementById("dataalter").innerHTML = player.alter;
	document.getElementById("datagroesse").innerHTML = player.groesse + " cm";
	document.getElementById("datagewicht").innerHTML = player.gewicht + " kg";
	document.getElementById("datanr").innerHTML = player.nr;
	document.getElementById("dataposition").innerHTML = player.position;
	document.getElementById("dataverein").innerHTML = player.verein;
	document.getElementById("dataimg").src = player.img;
}
function fnSetUpTable() {
	var table = document.getElementById("table");
	for (var playerId in players) {
		var player = players[playerId];
		if (player.name == "---------------------")
			continue;
		var tr = table.insertRow();
		for (var i = 0; i < 7; i++) {
			var td = tr.insertCell(), p = document.createElement('p');
			if (i == 0)
				p.innerHTML = player.name;
			else if (i == 1)
				p.innerHTML = player.nr;
			else if (i == 2)
				p.innerHTML = player.alter;
			else if (i == 3)
				p.innerHTML = player.groesse + " cm";
			else if (i == 4)
				p.innerHTML = player.gewicht + " kg";
			else if (i == 5)
				p.innerHTML = player.verein;
			else if (i == 6)
				p.innerHTML = player.position;
			td.appendChild(p);
		}
	}
}
function fnOnclick() {
	var points;
	for (var playerId in selectedPlayers) {
		var player = selectedPlayers[playerId];
		if (player.name == "---------------------") {
			if (playerId == 0)
				alert("Willst du wirklich ohne Torwart fahren?");
			else
				alert("An der " + (parseInt(playerId) + 1) + ". Position hast du keinen Spieler ausgewählt.");
			return;
		}
	}
	points = fnGetPoints();
	alert("Glückwunsch! Du hast " + points + " Punkte erreicht!!!");
}
function fnGetPoints() {
	var points = 0;
	for (var player in selectedPlayers) {
		player = selectedPlayers[player];
		points = points + player.points;
	}
	return points;
}