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
        $('#btnActualizarBDDesdeServer').tap(fn.ActualizarBDDesdeServer);
        $('#btnMigrarExtintoresRM').tap(fn.MigrarExtintoresRM);
        $('#btnEliminarExtintores').tap(fn.EliminarExtintores);
        $('#ablanqueaCext1').tap(fn.blanqueaCext1);
        $('#capturaExt2 div[data-role=footer] #btnGuardarRegExt').tap(fn.GuardarRegExt);
        
        
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
            almacen.leerinformacionEXT();
            $.mobile.loading("hide");
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
    ActualizarBDDesdeServer :function(){
        almacen.leerExt();  
        window.location.href = '#RemotaALocal';
    },
    MigrarExtintoresRM : function(){ 
        var myArray = new Array(500); 
        var registros = $('#NumDeExtintores').val();  
        if(registros == 0)
            {
                $.mobile.loading("show",{theme: 'b'});
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/enviarcatalogocompletodeextintores',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        myArray[i] = msg[i].ID_EXT + "','" + msg[i].UBICACION + "','" + msg[i].CAPACIDAD+ "','" + msg[i].CLASE+ "','" + msg[i].AGENTE+ "','" + msg[i].MARCA+ "','" + msg[i].FRECARGA+ "','" + msg[i].FFABRICACION+ "','" + msg[i].FPROXSERVICIO+ "','" + msg[i].PLANTA;
                    }); 
                    almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio,myArray);
                    almacen.leerExt();  
                    navigator.notification.alert("Migración Correcta",null,"Listo","Aceptar");               
        },
        error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
                }
            });
                    //navigator.notification.alert("a guardar",null,"Error al Ingresar","Aceptar");    
                            //almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
                    
                    }
                    else
                    {
                       navigator.notification.alert("Se tienen registros en la base de datos, antes eliminelos",null,"Advertencia","Aceptar");    
                    }
        },
        EliminarExtintores : function(){
            almacen.eliminarExt();
            almacen.leerExt();  
        },
        blanqueaCext1: function(){
                            $("#pPLANTA").text("");
                            $("#pUBICACION").text("");
                            $("#pCAPACIDAD").text("");
                            $("#pCLASE").text("");
                            $("#pAGENTE").text("");
                            $("#pMARCA").text("");
                            $("#pFRECARGA").text("");
                            $("#pFFABRICACION").text("");
                            $("#pFPROXSERVICIO").text("");              
        },
            presion: '',
            manometro: '',
            segurosello: '',
            manguera: '',
            soporte: '',
            pintura: '',
            valvula: '',
            cilindro: '',
            nemotecnia: '',
            senalamiento: '',
            gabinete: '',
            observaciones: '',
        GuardarRegExt: function(){
           
            fn.id_ext = $('#txtitaextiV1').val();
            fn.presion= $('#textPRESION').val();
            fn.manometro = $('#textMANOMETRO').val();
            fn.segurosello = $('#textSEGUROSELLO').val();
            fn.manguera = $('#textMANGUERA').val();
            fn.soporte = $('#textSOPORTE').val();
            fn.pintura = $('#textPINTURA').val();
            fn.valvula = $('#textVALVULA').val();
            fn.cilindro = $('#textCILINDRO').val();
            fn.nemotecnia = $('#textNEMOTECNIA').val();
            fn.senalamiento = $('#textSENALAMIENTO').val();
            fn.gabinete = $('#textGABINETE').val();
            fn.observaciones = $('#textOBSERVACIONES').val();
            
            navigator.notification.alert("Datos 1: " + fn.id_ext + " - " + fn.presion + " - " + fn.manometro + " - " + fn.segurosello + " - " + fn.manguera + " - " + fn.soporte + " - " + fn.pintura + " - " + fn.valvula + " - " + fn.cilindro + " - " + fn.nemotecnia + " - " + fn.senalamiento + " - " + fn.gabinete + " - " + fn.observaciones,null,"Advertencia","Aceptar");    
            
            guardarRegistroEXT(fn.id_ext,fn.presion,fn.manometro,fn.segurosello,fn.manguera,fn.soporte,fn.pintura,fn.valvula,fn.cilindro,fn.nemotecnia,fn.senalamiento,fn.gabinete,fn.observaciones);

            navigator.notification.alert("Datos 2: " + fn.id_ext + " - " + fn.presion + " - " + fn.manometro + " - " + fn.segurosello + " - " + fn.manguera + " - " + fn.soporte + " - " + fn.pintura + " - " + fn.valvula + " - " + fn.cilindro + " - " + fn.nemotecnia + " - " + fn.senalamiento + " - " + fn.gabinete + " - " + fn.observaciones,null,"Advertencia","Aceptar");    
        }



};
$(fn.ready);
//$(fn.init);