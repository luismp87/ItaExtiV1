var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
       //alert("hola");
		// FUNCION PARA INICIO
		window.location.href = '#inicio';
		$('#btnautentificar').click(fn.autentificar);
		/*$('#BtnNueva').tap(fn.leerLpn);
		$('#BtnReimpresion').tap(fn.reimprimir);
		$('#generaReimpresion').tap(fn.generarReimpresion);*/
	},
	autentificar: function(){         
		// FUNCION PARA LOGUEARSE
		var nom = $('#txtusuario').val();
		var passw = $('#txtcontrasena').val();
		//alert(passw);
		if(nom != '' && passw != ''){	
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/autentificar',
				 //data: '{ usuario: "' + $("#txtusuario").val() + '", contrasena: "' + $("#txtcontrasena").val() + '" }',
                data: {usuario: nom, contrasena: passw},
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				success: function (msg){
					$.mobile.loading("hide");
					if (msg.valor1 == "correcto"){
						alert("correcto");
                        //window.location.href="#menu";
				        navigator.notification.alert(msg.valor1,null,"Felicidades","Aceptar");
					}
					else{
                        alert("incorrecto");
						navigator.notification.alert("Usuario y/o Contraseña Incorrecto",null,"Error","Aceptar");
					}					
                },
				error: function(jq, txt){
					alert(jq + txt.responseText);
				}
			});
		}
		else{
			//navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			alert("todos los campos son requeridos");
		}	
    }
};
//$(fn.ready);
$(fn.init);