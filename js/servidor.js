var server = {
			id_ext : null,
			presion: null,
            manometro: null,
            segurosello: null,
            manguera: null,
            soporte: null,
            pintura: null,
            valvula: null,
            cilindro: null,
            nemotecnia: null,
            senalamiento: null,
            gabinete: null,
            observaciones: null,
            usuario: null,
            fechaderegistro: null,
            //VARIABLES SOBRE CARACTERISTICAS DE HIDRANTES
	 		id_hidra: null,
	        llave:null,
	        etiqueta: null,
	        tuberia:null,
	        martillo:null,
	        micavidrio: null,

	        myArray: [], 
	        myArray2: [], 
	    
	        contador1: 0,
	        contador2: 0,
	        iniciarcontador1: function(){
				server.contador1= 0;
	        },
	        iniciarcontador2: function(){
				server.contador2= 0;
	        },
/*ENVIAR AL SERVER EL CAPTURADO EN LA PANTALLA DE CARACTERISTICAS AL SERVIDOR UN SOLO REGISTRO*/
sincronizar: function(id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario){

			server.id_ext =id_ext;
			server.presion = presion;
            server.manometro = manometro;
            server.segurosello = segurosello;
            server.manguera = manguera;
            server.soporte = soporte;
            server.pintura = pintura;
            server.valvula = valvula;
            server.cilindro = cilindro;
            server.nemotecnia = nemotecnia;
            server.senalamiento = senalamiento;
            server.gabinete = gabinete;
            server.observaciones = observaciones;
            server.usuario = usuario;
            var d = new Date(); 
            server.fechaderegistro = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();
            var fechaderegistro = server.fechaderegistro;
$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/insertarregextintores',				
                data: { id_ext: id_ext, 
				presion: presion, 
				manometro: manometro, 
				segurosello: segurosello, 
				manguera: manguera,
				soporte: soporte,
				pintura: pintura,
				valvula: valvula,
				cilindro: cilindro,
				nemotecnia: nemotecnia,
				senalamiento: senalamiento,
				gabinete: gabinete,
				observaciones: observaciones,
				usuario: usuario,
				fechaderegistro: fechaderegistro},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                           navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ",null,"Advertencia" ,"Aceptar");   
                            }
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
                    navigator.notification.alert("Error de comunicación con el servidor.",null,"Error Ext45","Aceptar");
				}
			}).done(server.sincronizado);


	},
	sincronizado: function(msg){
		/*if(msg == 1)
		{
			navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
			almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
		}
		else
		{
			navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
		}*/
		//navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ", null, "Advertencia", "Aceptar");
	},
/*ENVIAR AL SERVER LOS REGISTROS YA CAPTURADOS AL SERVIDOR VARIOS REGISTROS*/
	sincronizarRegistrados: function(id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario,fechaderegistro){
			server.id_ext =id_ext;
			navigator.notification.alert(id_ext,null,"Advertencia","Aceptar"); 
			server.presion = presion;
            server.manometro = manometro;
            server.segurosello = segurosello;
            server.manguera = manguera;
            server.soporte = soporte;
            server.pintura = pintura;
            server.valvula = valvula;
            server.cilindro = cilindro;
            server.nemotecnia = nemotecnia;
            server.senalamiento = senalamiento;
            server.gabinete = gabinete;
            server.observaciones = observaciones;
            server.usuario = usuario;            
            server.fechaderegistro = fechaderegistro;            
$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/insertarregextintores',				
                data: { id_ext: id_ext, 
				presion: presion, 
				manometro: manometro, 
				segurosello: segurosello, 
				manguera: manguera,
				soporte: soporte,
				pintura: pintura,
				valvula: valvula,
				cilindro: cilindro,
				nemotecnia: nemotecnia,
				senalamiento: senalamiento,
				gabinete: gabinete,
				observaciones: observaciones,
				usuario: usuario,
				fechaderegistro: fechaderegistro},
                dataType: "json",
				success: function (msg){
						   server.myArray[server.contador1] = id_ext+"' and fechaderegistro= '"+ fechaderegistro;   // msg[i].ID_EXT + "','" + msg[i].UBICACION + "','" + msg[i].CAPACIDAD+ "','" + msg[i].CLASE+ "','" + msg[i].AGENTE+ "','" + msg[i].MARCA+ "','" + msg[i].FRECARGA+ "','" + msg[i].FFABRICACION+ "','" + msg[i].FPROXSERVICIO+ "','" + msg[i].PLANTA;                           
                           //navigator.notification.alert("contador :" + server.contador1 + " array:" + server.myArray[server.contador1],null,"Advertencia","Aceptar");   
                           server.contador1 =  server.contador1 + 1;
					//$.mobile.loading("hide");
                    /*$.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                                                  
                           //navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                           //navigator.notification.alert(id_ext+"-" +presion+"-" +manometro+"-" +segurosello+"-" +manguera+"-" +soporte+"-" +pintura+"-" +valvula+"-" +cilindro+"-" +nemotecnia+"-" +senalamiento+"-" +gabinete+"-" +observaciones+"-" +usuario+"-" +fechaderegistro ,null,"Error 126","Aceptar");                           
                           server.myArray[server.contador1] = id_ext+"' and fechaderegistro= '"+ fechaderegistro;   // msg[i].ID_EXT + "','" + msg[i].UBICACION + "','" + msg[i].CAPACIDAD+ "','" + msg[i].CLASE+ "','" + msg[i].AGENTE+ "','" + msg[i].MARCA+ "','" + msg[i].FRECARGA+ "','" + msg[i].FFABRICACION+ "','" + msg[i].FPROXSERVICIO+ "','" + msg[i].PLANTA;                           
                           navigator.notification.alert("contador :" + server.contador1 + " array:" + server.myArray[server.contador1],null,"Advertencia","Aceptar");   
                           server.contador1 =  server.contador1 + 1;
                           //almacen.eliminarregistrosExt(id_ext,fechaderegistro);
                            }
                        else
                            {
                            navigator.notification.alert("Error al enviar la información al servidor verifique la comunicación",null,"Error","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });*/					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
					//navigator.notification.alert(id_ext+"-" +presion+"-" +manometro+"-" +segurosello+"-" +manguera+"-" +soporte+"-" +pintura+"-" +valvula+"-" +cilindro+"-" +nemotecnia+"-" +senalamiento+"-" +gabinete+"-" +observaciones+"-" +usuario+"-" +fechaderegistro ,null,"Error ajax","Aceptar");
                    //navigator.notification.alert(jq + txt.responseText,null,"Error ajax","Aceptar");
                    navigator.notification.alert("Error de comunicación con el servidor.",null,"Error Ext786","Aceptar");
				}
			}).done(server.sincronizadoRegistrados);


	},
	sincronizadoRegistrados: function(msg){
		/*if(msg == 1)
		{
			navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
			almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
		}
		else
		{
			navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
		}*/
		//navigator.notification.alert("contador 1:" + server.contador1 + " array:" + server.myArray[server.contador1 - 1],null,"Advertencia","Aceptar");   
		almacen.eliminarregistrosExt(server.myArray);
		//navigator.notification.alert("Los datos se guardaron remotamente satisfactoriamente ", null, "Advertencia", "Aceptar");
	},
/*PARA EL MODULO DE HIDRANTES */
/*ENVIAR AL SERVER EL CAPTURADO EN LA PANTALLA DE CARACTERISTICAS AL SERVIDOR UN SOLO REGISTRO*/
sincronizarhidra: function(id_hidra,llave,etiqueta,manguera,tuberia,valvula,martillo,micavidrio,gabinete,senalamiento,observaciones,usuario){

				server.id_hidra = id_hidra;
				server.llave = llave;
				server.etiqueta = etiqueta;
				server.manguera = manguera;
				server.tuberia = tuberia;
				server.valvula = valvula;
				server.martillo = martillo;
				server.micavidrio = micavidrio;
				server.gabinete = gabinete;
				server.senalamiento = senalamiento;
				server.observaciones = observaciones;
				server.usuario = usuario;				
				var d = new Date(); 		
				server.fechaderegistro = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();
				var fechaderegistro = server.fechaderegistro;



$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/insertarreghidrantes',				
                data: { id_hidra: id_hidra,
						llave: llave,
						etiqueta: etiqueta,
						manguera: manguera,
						tuberia: tuberia,
						valvula: valvula,
						martillo: martillo,
						micavidrio: micavidrio,
						gabinete: gabinete,
						senalamiento: senalamiento,
						observaciones: observaciones,
						usuario: usuario,
						fechaderegistro: fechaderegistro},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                           navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta",null,"Advertencia","Aceptar");   
                            }
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
                    //navigator.notification.alert(jq + txt.responseText,null,"Error","Aceptar");
                    navigator.notification.alert("Error de comunicación con el servidor.",null,"Error hidra456","Aceptar");
				}
			}).done(server.sincronizadoHidra);


	},
	sincronizadoHidra: function(msg){
		/*if(msg == 1)
		{
			navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
			almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
		}
		else
		{
			navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
		}*/
		//navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ", null, "Advertencia", "Aceptar");
	},
	/*ENVIAR AL SERVER LOS REGISTROS YA CAPTURADOS AL SERVIDOR VARIOS REGISTROS*/
	sincronizarRegistradosHIDRA: function(id_hidra,llave,etiqueta,manguera,tuberia,valvula,martillo,micavidrio,gabinete,senalamiento,observaciones,usuario,fechaderegistro){
				server.id_hidra = id_hidra;
				server.llave = llave;
				server.etiqueta = etiqueta;
				server.manguera = manguera;
				server.tuberia = tuberia;
				server.valvula = valvula;
				server.martillo = martillo;
				server.micavidrio = micavidrio;
				server.gabinete = gabinete;
				server.senalamiento = senalamiento;
				server.observaciones = observaciones;
				server.usuario = usuario;				
				server.fechaderegistro = fechaderegistro; 

		
$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/insertarreghidrantes',				
                data: { id_hidra: id_hidra,
						llave: llave,
						etiqueta: etiqueta,
						manguera: manguera,
						tuberia: tuberia,
						valvula: valvula,
						martillo: martillo,
						micavidrio: micavidrio,
						gabinete: gabinete,
						senalamiento: senalamiento,
						observaciones: observaciones,
						usuario: usuario,
						fechaderegistro: fechaderegistro},
                dataType: "json",
				success: function (msg){
					 	   server.myArray2[server.contador2] = id_hidra+"' and fechaderegistro= '"+ fechaderegistro;   // msg[i].ID_EXT + "','" + msg[i].UBICACION + "','" + msg[i].CAPACIDAD+ "','" + msg[i].CLASE+ "','" + msg[i].AGENTE+ "','" + msg[i].MARCA+ "','" + msg[i].FRECARGA+ "','" + msg[i].FFABRICACION+ "','" + msg[i].FPROXSERVICIO+ "','" + msg[i].PLANTA;                           
                           //navigator.notification.alert("contador :" + server.contador1 + " array:" + server.myArray[server.contador1],null,"Advertencia","Aceptar");   
                           server.contador2 =  server.contador2 + 1;
					//$.mobile.loading("hide");
                    /*$.each(msg,function(i,item){
                        if(msg[i].valor1 = "correcto")
                            {                           
                           navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                            }
                        else
                            {
                            navigator.notification.alert("Error al enviar la información al servidor",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    })*/;					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
					//navigator.notification.alert(id_hidra+"-" +llave+"-" +etiqueta+"-" +manguera+"-" +tuberia+"-" +valvula+"-" +martillo+"-" +micavidrio+"-" +gabinete+"-" +senalamiento+"-" +observaciones+"-" +usuario+"-" +fechaderegistro,null,"Error Ajax","Aceptar");
                    navigator.notification.alert("Error de comunicación con el servidor.",null,"Error hidra579","Aceptar");
				}
			}).done(server.sincronizadoRegistradosHIDRA);


	},
	sincronizadoRegistradosHIDRA: function(msg){
		/*if(msg == 1)
		{
			navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
			almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
		}
		else
		{
			navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
		}*/
		almacen.eliminarregistrosHidra(server.myArray2);
		//navigator.notification.alert("Los datos se guardaron remotamente satisfactoriamente ", null, "Advertencia", "Aceptar");
	}


};
