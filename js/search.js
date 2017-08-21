// this function executes our search via an AJAX call
function runSearch( term ) {
    // hide and clear the previous results, if any
    $('#results').hide();
    $('tbody').empty();
    
    // transforms all the form parameters into a string we can send to the server
    var frmStr = $('#gene_search').serialize();
    
    $.ajax({
        url: './search_product.cgi',
        dataType: 'json',
        data: frmStr,
        success: function(data, textStatus, jqXHR) {
            processJSON(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to perform gene search! textStatus: (" + textStatus +
                  ") and errorThrown: (" + errorThrown + ")");
        }
    });
}

function runBlast(term) {
	$('#blast_results').hide();
	$('blast_results tbody').empty();
	
	var frmStr = $('#blast_out').serialize();

	$.ajax({
	   url:'./search_product.cgi',
	   dataType: 'json',
	   data: frmStr,
	   success: function(data, textStatus, jqXHR) {
	       processJSON_blast(data);
	},
	error: function(jqXHR, textStatus, errorThrown){
	   alert("Failed to perform gene search! textStatus: (" + textStatus +
	      ") and errorThrown: (" + errorThrown + ")");
	}
    });
}
// this processes a passed JSON structure representing gene matches and draws it
//  to the result table
function processJSON( data ) {
    // set the span that lists the match count
    $('#match_count').text( data.match_count );
    
    // this will be used to keep track of row identifiers
    var next_row_num = 1;
    
    // iterate over each match and add a row to the result table for each
    $.each( data.matches, function(i, item) {
        var this_row_id = 'result_row_' + next_row_num++;
    
        // create a row and append it to the body of the table
        $('<tr/>', { "id" : this_row_id } ).appendTo('#results tbody');
        
        // add the locus column
        $('<td/>', { "text" : item.uniquename } ).appendTo('#' + this_row_id);
        
        // add the product column
        $('<td/>', { "text" : item.product } ).appendTo('#' + this_row_id);
	
	//add the residues column
	$('<td/>', { "text" : item.residues } ).appendTo ('#' + this_row_id);
    });
    
    // now show the result section that was previously hidden
    $('#results').show();
}

function processJSON_blast(data) {

	var next_row_num = 1; 	
	$.each(data.blast_results, function(i, item){
	    var this_row_id = 'blast_result_row_' + next_row_num++;
	    $('<tr/>', { "id" : this_row_id } ).appendTo('#blast_results tbody');
	    $('<td/>', { "text" : item.query_id } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.subject_id } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.p_identity } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.alignment } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.length } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.mismatches } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.gap_opens } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.q_start } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.q_end } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.s_start } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.s_end } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.evalue } ).appendTo('#' + this_row_id);
	    $('<td/>', { "text" : item.bit_score } ).appendTo('#' + this_row_id);
    });
	$('#blast_results').show();
	
}


// run our javascript once the page is ready
$(document).ready( function() {
    // define what should happen when a user clicks submit on our search form
    $('#submit').click( function() {
        runSearch();
        return false;  // prevents 'normal' form submission
    });
});

$(document).ready( function () {
   $('#blastp').click( function(){
	runBlast();
	return false;
   });
});
