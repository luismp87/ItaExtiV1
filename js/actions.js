var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
		window.location.href = '#inicio';
		// LOGIO EN EL SERVIDOR --> $('#btnautentificar').tap(fn.autentificar);
        $('#btnautentificar').tap(fn.autentificarJSON);
        $('#btnleercodigo').tap(fn.leerCodigoDeBarras);
        $('#btnbuscar_info_extintor').tap(fn.buscar_info_extintor);	        
		//$('#btnprueba').tap(fn.myFunction);
        $('#btnGuardarDB').tap(fn.GuardarDB);
        $('#btnMostrarDB').tap(fn.MostrarDB);
        $('#btnActualizarBDDesdeServer').tap(fn.ActualizarBDDesdeServer);

        
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
                            window.location.href = '#TiposDeCaptura';
                            }
                        else
                            {
                            navigator.notification.alert("Usuario o contraseña incorrectos",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
				}
			});
		}
		else{
			navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			//alert("todos los campos son requeridos");
		}	
    },
    leerCodigoDeBarras: function(){
		cordova.plugins.barcodeScanner.scan(
		  function (result) {			  
			                 //***navigator.notification.alert("Resultado: " + result.text,null,"Felicidades","Aceptar");
                            $("#txtitaextiV1").val("" + result.text); 
		  }, 
		  function (error) {
              navigator.notification.alert("Scanning failed: " + error,null,"Error","Aceptar");
			  //alert("Scanning failed: " + error);
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
                            $("#pUBICACION").text(msg[i].UBICACION);
                            $("#pCAPACIDAD").text(msg[i].CAPACIDAD);
                            $("#pCLASE").text(msg[i].CLASE);
                            $("#pAGENTE").text(msg[i].AGENTE);
                            $("#pMARCA").text(msg[i].MARCA);
                            $("#pFRECARGA").text(msg[i].FRECARGA);
                            $("#pFFABRICACION").text(msg[i].FFABRICACION);
                            $("#pFPROXSERVICIO").text(msg[i].FPROXSERVICIO);                            
                            }
                        else
                            {
                            navigator.notification.alert("Usuario o contraseña incorrectos",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
				}
			});
		}
		else{
			navigator.notification.alert("Ingrese el ID del extintor",null,"Error al Ingresar","Aceptar");
			//alert("Ingrese el ID del extintor");
		}	
    },
    autentificarJSON : function() { 
    var usuariof = $('#txtusuario').val();
    var passf =   $('#txtcontrasena').val();  
    var out = "";
    var i;
    var encontrado = "false";
    //alert("hola1");
    for(i = 0; i<usuarios.length; i++) {
        if(( usuarios[i].usuario == usuariof) && (usuarios[i].pass == passf)){
        window.location.href = '#TiposDeCaptura';
        encontrado = "true";
        break;
        }        
    	//alert("hola" + myArray.length);
        //out += '<a href="' + myArray[i].usuario + '">' + myArray[i].pass + '</a><br>';
    }
    if(encontrado == "false")
    {
      //alert("Verifique el usuario y la contraseña");
      navigator.notification.alert("Verifique el usuario y la contraseña",null,"Error al Ingresar","Aceptar");  
    }
    //document.getElementById("id01").innerHTML = out;
	},
    id_ext: '',
    ubicacion: '',
    capacidad: '',
    clase: '',
    agente: '',
    marca : '',
    frecarga: '',
    ffabricacion: '',
    fproxservicio: '',
    GuardarDB : function() {

fn.id_ext = $('#txtusuario').val(); 
fn.ubicacion= $('#txtusuario').val(); 
fn.capacidad= $('#txtusuario').val(); 
fn.clase= $('#txtusuario').val(); 
fn.agente= $('#txtusuario').val(); 
fn.marca= $('#txtusuario').val(); 
fn.frecarga= $('#txtusuario').val(); 
fn.ffabricacion= $('#txtusuario').val(); 
fn.fproxservicio= $('#txtusuario').val(); 
        almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
    },
    MostrarDB : function(){
        navigator.notification.alert("" + almacen.leerExtintor(),null,"Error al Ingresar","Aceptar");  
        //almacen.leerExtintor();
    },
    ActualizarBDDesdeServer :function(){

    }
};
$(fn.ready);
//$(fn.init);