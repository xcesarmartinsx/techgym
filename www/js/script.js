var contLinha = 1;
var contTabela = 1;
var contFinalizados = 1;
$(document).ready(function(){ 
	//$("#nome1").tooltip();
	
	$("#adicionar").click(function(){
		contLinha ++;
		contTabela++;

		var tabela =  "<div class=\"row todaTabela"+ contTabela + "\" style=\"Display:none;\">" +
							"<h3 class=\"personal\"><input class=\"inputPersonal\" placeholder=\"Personal("+ contTabela +")\" id=\"personalNome"+ contTabela +"\" onkeyup=\"alteraTopo("+ contTabela +")\"/></h3>" +
	              	  "</div>" +
					"<div class=\"panel panel-default\ todaTabela"+ contTabela + "\" style=\"Display:none;\">" +
							"<table class=\"table table-hover table-bordered\" id=\"tabela"+contTabela+"\">" +
						 	"<tr>"+
						 			"<th>Nome do Aluno</th>"+
						 			"<th>Início</th>"+
						 			"<th>Fim</th>"+
						 			"<th>Ação</th>"+
						 	"</tr>"+
						 	"<tr class=\"\" id=\"linha"+ contLinha +"\">"+
						 			"<td><input class=\"aluno\" id=\"nome"+ contLinha +"\" placeholder=\"nome\" "+
						 			" placeholder=\"nome\" data-placement=\"top\" data-trigger=\"manual\" data-title=\"<div style='text-align: center; color: #d9534f;'><strong >Campo obrigatório</strong></div>\"data-content=\"Insira o nome do aluno.\"/></td>"+
						 			"<td><input id=\"inicio"+ contLinha +"\" disabled=\"disabled\" style=\"Display:none;\"/><div id=\"MostrarInicio"+ contLinha +"\"></div></td>"+
						 			"<td><input id=\"fim"+ contLinha +"\" disabled=\"disabled\"style=\"Display:none;\"/><div id=\"MostrarFim"+ contLinha +"\"></div></td>"+
						 			"<td>"+
				  					 "<button class=\"btn btn-success fixo2\" type=\"button\" onclick=\"inicio("+ contLinha +", "+ contTabela +")\" id=\"btnIniciar"+ contLinha +"\"><span class=\"glyphicon glyphicon-plus brown\"></span></button>"+
  				  					  "<button class=\"btn btn-primary fixo2\" type=\"button\" onclick=\"fim("+ contLinha +"," + contTabela + " )\" id=\"btnFim"+ contLinha +"\" style=\"display:none\"><span class=\"glyphicon glyphicon-ok brown\"></span></button>"+
  				  					  "<button class=\"btn btn-danger remover confirm\" onclick=\"confirma("+ contLinha +", true, null)\"><span class=\"glyphicon glyphicon-remove brown\"></span></button>"+			  
						 			"</td>"	+					 			
						 	"</tr>"	+
						"</table>" +
					"</div>";
		$("#tabelas").append(tabela);
		$('html, body').animate({scrollTop: '+=230px'}, 800);
		$(".todaTabela"+contTabela).fadeIn();

		menu = "<li onclick=\"ir("+contTabela+")\"><a href=\"#\" id=\"menu"+ contTabela +"\">Personal ("+ contTabela +")</a></li>";
		$("#incluirMenu").append(menu);
	});
});

function confirma(id, primeiro, handler, tabelaId){
	if($("#btnIniciar"+id).css('display') == "none"){
		var tr = $(handler).closest('tr');
		$.confirm({
		    text: "Deseja <strong style='color:#f81713;'>EXCLUIR</strong> o aluno <strong>"+$("#nome"+id).val()+"</strong>?",
		    title: "Confirmação",
		    confirm: function(button) {
	     		
					$.when($("#linha"+id).fadeOut()).done( function() {
						tr.remove();
					});
	  
		    },
		    cancel: function(button) {
		        
		    },
		    confirmButton: "Sim",
		    cancelButton: "Não",
		    post: true
		});
	}
}

function inicio(id, tabela){
	if($("#nome"+id).val() == ""){
		$("#nome"+id).popover('show');
		$("#nome"+id).focus();
		setTimeout(function(){
      		 $("#nome"+id).popover('hide');
   		 }, 4000);
		$("#nome"+id).keyup(function() {
			$("#nome"+id).popover('hide');
		});

	}else{

		contLinha ++;
		var myDate = new Date();
		var displayDate
		if(myDate.getMinutes() <10)
			displayDate = myDate.getHours() + ':0' + myDate.getMinutes();
		else
			displayDate = myDate.getHours() + ':' + myDate.getMinutes();
		$("#inicio"+id).val(displayDate);
		$("#MostrarInicio"+id).html(displayDate+"h");
		$("#btnIniciar"+id).hide();
		$("#btnFim"+id).show();
		var linha = "<tr id=\"linha"+ contLinha  +"\" style=\"Display:none\">"+
							 			"<td><input class=\"aluno\" id=\"nome"+ contLinha +"\"  autofocus=\"autofocus\" placeholder=\"nome\" "+
							 			" placeholder=\"nome\" data-placement=\"top\" data-trigger=\"manual\" data-title=\"<div style='text-align: center; color: #d9534f;'><strong >Campo obrigatório</strong></div>\"data-content=\"Insira o nome do aluno.\"/></td>"+
							 			"<td><input id=\"inicio"+ contLinha +"\" disabled=\"disabled\" style=\"Display:none;\"/><div id=\"MostrarInicio"+ contLinha +"\"></div></td>"+
							 			"<td><input id=\"fim"+ contLinha  +"\" disabled=\"disabled\" style=\"Display:none;\"/><div id=\"MostrarFim"+ contLinha +"\"></div></td>"+
							 			"<td>"+					
					  					  "<button class=\"btn btn-success fixo2\" type=\"button\" onclick=\"inicio("+ contLinha +", "+ tabela +")\" id=\"btnIniciar"+ contLinha +"\"><span class=\"glyphicon glyphicon-plus brown\"></span></button>"+
	  				  					  "<button class=\"btn btn-primary fixo2\" type=\"button\" onclick=\"fim("+ contLinha  +", "+ tabela +")\" id=\"btnFim"+ contLinha  +"\" style=\"display:none\"><span class=\"glyphicon glyphicon-ok brown\"></span></button>"+
									      "<button class=\"btn btn-danger remover\" onclick=\"confirma("+ contLinha +", false, this, "+ tabela +")\"><span class=\"glyphicon glyphicon-remove brown\"></span></button>"+
							 			"</td>"+					 			
							 	"</tr>";
		$("#tabela"+tabela).last().append(linha);

		var row = $("#linha"+contLinha).closest('tr');
	    row.insertBefore("#tabela"+ tabela +" .finalizados");

		$("#linha"+contLinha).fadeIn();
		$('html, body').animate({scrollTop: '+=120px'}, 800);
	}
}

function fim(id, tabela){

	$.confirm({
	    text: "Deseja <strong style='color:#3276b1;'>finalizar</strong> o treino do aluno <strong>"+$("#nome"+id).val()+"<strong>?",
	    title: "Confirmação",
	    confirm: function(button) {

			var myDate = new Date();
			var displayDate;
			if(myDate.getMinutes()<10)
				displayDate = myDate.getHours() + ':0' + myDate.getMinutes();
			else
				displayDate = myDate.getHours() + ':' + myDate.getMinutes();

			$("#fim"+id).val(displayDate);
			$("#MostrarFim"+id).html(displayDate+"h");
			horaInicio = $("#inicio"+id).val().split(':');
			tempo = myDate.getHours() - horaInicio[0];

			$("#btnFim"+id).attr("disabled","disabled");
			if(tempo > 0)
				$("#linha"+id).attr("class", "danger finalizados");
			else
				$("#linha"+id).attr("class","success finalizados");
			$("#nome"+id).attr("disabled","disabled");
			$.when($("#linha"+id).delay(800).fadeOut()).done( function() {
				var row = $("#linha"+id).closest('tr');
			    row.insertAfter("#tabela"+ tabela +" tbody>tr:last");
			    $("#linha"+id).fadeIn();
			});
	       	
	    },
	    cancel: function(button) {
	        
	    },
	    confirmButton: "Sim",
	    cancelButton: "Não",
	    post: true
	});

}

function alteraTopo(idTabela){

	if($("#personalNome"+idTabela).val() == "")
		$("#menu"+idTabela).html("Personal("+idTabela+")");
	else		
		$("#menu"+idTabela).html($("#personalNome"+idTabela).val().substr(0,8));

}

function ir(idTabela){

	$('.navbar-collapse').collapse('hide');
	$('html, body').animate({
   		 scrollTop: $("#personalNome"+idTabela).offset().top - 100
	}, 800);
}