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
        $('#btnMigrarExtintoresRM').tap(fn.MigrarExtintoresRM);
        $('#btnEliminarExtintores').tap(fn.EliminarExtintores);
        
        
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
        navigator.notification.alert("ss" +almacen.leerExtintor(),null,"Error al Ingresar","Aceptar");  
        //almacen.leerExtintor();
    },
    ActualizarBDDesdeServer :function(){
        almacen.leerExt();  
        window.location.href = '#RemotaALocal';
    },
    MigrarExtintoresRM : function(){ 
        var myArray = new Array(100); 
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
                        myArray[i] = msg[i].ID_EXT;
                        navigator.notification.alert("array0 " +myArray[i] ,null,"Listo","Aceptar");          
                    /*fn.id_ext =  msg[i].ID_EXT;
                    fn.ubicacion= msg[i].UBICACION;
                    fn.capacidad= msg[i].CAPACIDAD;
                    fn.clase= msg[i].CLASE;
                    fn.agente= msg[i].AGENTE;
                    fn.marca= msg[i].MARCA;
                    fn.frecarga= msg[i].FRECARGA;
                    fn.ffabricacion= msg[i].FFABRICACION;
                    fn.fproxservicio= msg[i].FPROXSERVICIO;
                    
                    almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
                    */
                    }); 
                    almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
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
                       navigator.notification.alert("Se tienen registros en la base de datos, antes eliminelos",null,"Error al Ingresar","Aceptar");    
                    }
        },
        EliminarExtintores : function(){
            almacen.eliminarExt();
            almacen.leerExt();  
        }

};
$(fn.ready);
//$(fn.init);