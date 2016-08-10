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
                    //navigator.notification.alert(jq + txt.responseText,null,"Error","Aceptar");
                    navigator.notification.alert("Error de comunicación, se guarda la información en el dispositivo",null,"Error 785","Aceptar");

                    almacen.guardarRegistroEXT(server.id_ext,server.presion,server.manometro,server.segurosello,server.manguera,server.soporte,server.pintura,server.valvula,server.cilindro,server.nemotecnia,server.senalamiento,server.gabinete,server.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),server.usuario);
                                 $("#txtitaextiV1").val("");
                                $("#textPRESION").val("0").change();
                                $("#textMANOMETRO").val("0").change();
                                $("#textSEGUROSELLO").val("0").change();
                                $("#textMANGUERA").val("0").change();
                                $("#textSOPORTE").val("0").change();
                                $("#textPINTURA").val("0").change();
                                $("#textVALVULA").val("0").change();
                                $("#textCILINDRO").val("0").change();
                                $("#textNEMOTECNIA").val("0").change();
                                $("#textSENALAMIENTO").val("0").change();
                                $("#textGABINETE").val("0").change();
                                $("#textOBSERVACIONES").val("");
                                window.location.href = '#TiposDeCaptura';
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
	sincronizarRegistrados: function(id_ext){

			server.id_ext =id_ext;
			//navigator.notification.alert("Datos: " + id_ext,null,"mensaje 2","Aceptar");   			
$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/insertarregextintoresV2',				
                data: { id_ext: id_ext},
                dataType: "json",
				success: function (msg){
					//$.mobile.loading("hide");
                    //$.each(msg,function(i,item){
                        //if(msg[i].valor1 == "encontro")
                            //{                           
                           navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                           almacen.eliminarregistrosExt();
                           // }
                        //else
                           /// {
                           // navigator.notification.alert("Error al enviar la información al servidor",null,"Error 458","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                           /// }                        
                   // });					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
					//navigator.notification.alert(id_ext+"-" +presion+"-" +manometro+"-" +segurosello+"-" +manguera+"-" +soporte+"-" +pintura+"-" +valvula+"-" +cilindro+"-" +nemotecnia+"-" +senalamiento+"-" +gabinete+"-" +observaciones+"-" +usuario+"-" +fechaderegistro ,null,"Error ajax","Aceptar");
                    navigator.notification.alert("Error de comunicación para poder migrar la información almacenada en el dispositivo.",null,"Error - 456","Aceptar");
				}
			}).done(server.sincronizadoRegistrados);


	},
		sincronizarRegistradosV3: function(id_ext){

			server.id_ext =id_ext;
			//navigator.notification.alert("Datos: " + id_ext,null,"mensaje 2","Aceptar");   			
$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/insertarregextintoresV2',				
                data: { id_ext: id_ext},
                dataType: "json",
				success: function (msg){
					//$.mobile.loading("hide");
                    //$.each(msg,function(i,item){
                        //if(msg[i].valor1 == "encontro")
                            //{                           
                           //navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                           almacen.eliminarregistrosExt();
                           // }
                        //else
                           /// {
                           // navigator.notification.alert("Error al enviar la información al servidor",null,"Error 458","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                           /// }                        
                   // });					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
					//navigator.notification.alert(id_ext+"-" +presion+"-" +manometro+"-" +segurosello+"-" +manguera+"-" +soporte+"-" +pintura+"-" +valvula+"-" +cilindro+"-" +nemotecnia+"-" +senalamiento+"-" +gabinete+"-" +observaciones+"-" +usuario+"-" +fechaderegistro ,null,"Error ajax","Aceptar");
                    //navigator.notification.alert("Error de comunicación para poder migrar la información almacenada en el dispositivo.",null,"Error - 456","Aceptar");
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
		//almacen.eliminarregistrosExt();
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
                     navigator.notification.alert("Error de comunicación, se guarda la información en el dispositivo",null,"Error 689","Aceptar");

                     almacen.guardarRegistroHIDRA(server.id_hidra,server.llave,server.etiqueta,server.manguera,server.tuberia,server.valvula,server.martillo,server.micavidrio,server.gabinete,server.senalamiento,server.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),server.usuario);

                                 $("#txtitahidraV1").val("");
                                $("#texthLLAVE").val("0").change();
                                $("#texthETIQUETA").val("0").change();
                                $("#texthMANGUERA").val("0").change();
                                $("#texthTUBERIA").val("0").change();
                                $("#texthVALVULA").val("0").change();
                                $("#texthMARTILLO").val("0").change();
                                $("#texthMICAVIDRIO").val("0").change();
                                $("#texthGABINETE").val("0").change();
                                $("#texthSENALAMIENTO").val("0").change();                                
                                $("#texthOBSERVACIONES").val("");
                                window.location.href = '#TiposDeCaptura';
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
	sincronizarRegistradosHIDRAV3: function(id_hidra){
				server.id_hidra = id_hidra;
				

		
$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/insertarreghidrantesV2',				
                data: { id_hidra: id_hidra},
                dataType: "json",
				success: function (msg){
					//$.mobile.loading("hide");
                    //$.each(msg,function(i,item){
                        //if(msg[i].valor1 = "correcto")
                            //{                           
                           //navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                           almacen.eliminarregistrosHidra();
                            //}
                        //else
                            //{
                            //navigator.notification.alert("Error al enviar la información al servidor",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            //}                        
                    //});					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
					//navigator.notification.alert(id_hidra+"-" +llave+"-" +etiqueta+"-" +manguera+"-" +tuberia+"-" +valvula+"-" +martillo+"-" +micavidrio+"-" +gabinete+"-" +senalamiento+"-" +observaciones+"-" +usuario+"-" +fechaderegistro,null,"Error Ajax","Aceptar");
                   //navigator.notification.alert("Error de comunicación para poder migrar la información almacenada en el dispositivo.",null,"Error - 259","Aceptar");
				}
			}).done(server.sincronizadoRegistradosHIDRA);


	},
	/*ENVIAR AL SERVER LOS REGISTROS YA CAPTURADOS AL SERVIDOR VARIOS REGISTROS*/
	sincronizarRegistradosHIDRA: function(id_hidra){
				server.id_hidra = id_hidra;
				

		
$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/insertarreghidrantesV2',				
                data: { id_hidra: id_hidra},
                dataType: "json",
				success: function (msg){
					//$.mobile.loading("hide");
                    //$.each(msg,function(i,item){
                        //if(msg[i].valor1 = "correcto")
                            //{                           
                           navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                           almacen.eliminarregistrosHidra();
                            //}
                        //else
                            //{
                            //navigator.notification.alert("Error al enviar la información al servidor",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            //}                        
                    //});					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
					//navigator.notification.alert(id_hidra+"-" +llave+"-" +etiqueta+"-" +manguera+"-" +tuberia+"-" +valvula+"-" +martillo+"-" +micavidrio+"-" +gabinete+"-" +senalamiento+"-" +observaciones+"-" +usuario+"-" +fechaderegistro,null,"Error Ajax","Aceptar");
                   navigator.notification.alert("Error de comunicación para poder migrar la información almacenada en el dispositivo.",null,"Error - 259","Aceptar");
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
		//almacen.eliminarregistrosHidra();
		//navigator.notification.alert("Los datos se guardaron remotamente satisfactoriamente ", null, "Advertencia", "Aceptar");
	}


};
