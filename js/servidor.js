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
				/*success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 = "correcto")
                            {                           
                           navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                            }
                        else
                            {
                            navigator.notification.alert("Error al enviar la información al servidor",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },*/
				error: function(jq, txt){
					//alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error","Aceptar");
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
		navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ", null, "Advertencia", "Aceptar");
	},
/*ENVIAR AL SERVER LOS REGISTROS YA CAPTURADOS AL SERVIDOR VARIOS REGISTROS*/
	sincronizarRegistrados: function(id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario,fechaderegistro){

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
				/*success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 = "correcto")
                            {                           
                           navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                            }
                        else
                            {
                            navigator.notification.alert("Error al enviar la información al servidor",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },*/
				error: function(jq, txt){
					//alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error","Aceptar");
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
		almacen.eliminarregistrosExt();
		//navigator.notification.alert("Los datos se guardaron remotamente satisfactoriamente ", null, "Advertencia", "Aceptar");
	}
};
