$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//shuffle the deck
	
	deck = _.shuffle(deck);
	
	
	var cards_player_1 = [];
	var cards_player_2 = [];
	//divide out the cards into the two arrays
	for (var i = 0; i < deck.length; i++){
		if (i < 26){
		cards_player_1.push(deck[i]);
		}
		else{
		cards_player_2.push(deck[i]);	
		}
	}
	console.log(cards_player_2);
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	function war(player1, player2) {
		if (player1.number > player2.number){
			return player1;
		}
		if (player2.number > player1.number){
			return player2;			
		}
		else{
			return false;
		}
	}
	function player1Shift(){
		var temp = cards_player_2.shift();
		cards_player_1.push(temp);
		var temp2 = cards_player_1.shift();
		cards_player_1.push(temp2);
	}
	function player2Shift(){
		var temp = cards_player_1.shift();
		cards_player_2.push(temp);
		var temp2 = cards_player_2.shift();
		cards_player_2.push(temp2);
	}
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {
		var winner = war(cards_player_1[0], cards_player_2[0]);
		if (winner === cards_player_1[0]){
			player1Shift();
		}
		if (winner === cards_player_2[0]){
			player2Shift();
		}
		else{
			var cardsAtWar = 4
			while(cards_player_1.length > cardsAtWar || cards_player_2.length > cardsAtWar){

				var warWinner = war(cards_player_1[cardsAtWar], cards_player_2[cardsAtWar]);
				console.log(cardsAtWar);

				if (warWinner === cards_player_1[4]){
					for (var i = 0; i < cardsAtWar; i++){
						player1Shift();
					}
				}
				if (warWinner === cards_player_2[4]){
					for (var i = 0; i < cardsAtWar; i++){
						player2Shift();
					}
				}
				else{
					cardsAtWar += 4;
				}
			}



		}

		//this function (defined below) will continue to the next turn
		advance();
		
	}
	
	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	
	$(".btn").click(function() {
		play();
	});
});