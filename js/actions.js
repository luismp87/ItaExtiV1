var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
		// FUNCION PARA INICIO
		window.location.href = '#inicio';
		$('#btnautentificar').click(fn.autentificar);
        //tap
        $('#btnleercodigo').click(fn.leerCodigoDeBarras);
        $('#btnbuscar_info_extintor').click(fn.buscar_info_extintor);	        

	},
	autentificar: function(){         
		var nom = $('#txtusuario').val();
		var passw = $('#txtcontrasena').val();
		if(nom != '' && passw != ''){	
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/autentificar',				
                data: {usuario: nom, contrasena: passw},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 = "correcto")
                            {
                            window.location.href = '#captura';
                            }
                        else
                            {
                            //navigator.notification.alert("Usuario o contraseña incorrectos",null,"Error al Ingresar","Aceptar");   
                            alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){
					alert(jq + txt.responseText);
                    //navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
				}
			});
		}
		else{
			//navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			alert("todos los campos son requeridos");
		}	
    },
    leerCodigoDeBarras: function(){
		cordova.plugins.barcodeScanner.scan(
		  function (result) {			  
			                 //navigator.notification.alert("Resultado: " + result.text,null,"Felicidades","Aceptar");
                            $("#txtitaextiV1").val("" + result.text); 
		  }, 
		  function (error) {
              //navigator.notification.alert("Scanning failed: " + error,null,"Error","Aceptar");
			  alert("Scanning failed: " + error);
		  }
	   );
	},
    buscar_info_extintor : function(){         
		var id = $('#txtitaextiV1').val();		
		if(id != ''){	
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/buscar_info_extintor',				
                data: {id: id},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 = "encontro")
                            {
                            $("#pID").text(msg[i].ID);
                            $("#pUBICACION").text(msg[i].UBICACION);

                            }
                        else
                            {
                            //navigator.notification.alert("Usuario o contraseña incorrectos",null,"Error al Ingresar","Aceptar");   
                            alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){
					alert(jq + txt.responseText);
                    //navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
				}
			});
		}
		else{
			//navigator.notification.alert("Ingrese el ID del extintor",null,"Error al Ingresar","Aceptar");
			alert("Ingrese el ID del extintor");
		}	
    }
};
//$(fn.ready);
$(fn.init);