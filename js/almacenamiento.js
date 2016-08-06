var almacen = {
	/*VARIABLES SOBRE EL EXTINTOR*/
	id_ext: null,
	ubicacion: null,
	capacidad: null,
	clase: null,
	agente: null,
	marca : null,
	frecarga: null,
	ffabricacion: null,
	fproxservicio: null,
	planta: null,
/*VARIABLES SOBRE CARACTERISTICAS DEL EXTINTOR*/
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



	myArray: null,

	numerodefilas : 0,

	db: null,
	/*FUNCION PARA GUARDAR EN BASE DE DATOS*/
	guardarEXT: function(id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio,myArray,planta){
		almacen.id_ext = id_ext;
		almacen.ubicacion = ubicacion;
		almacen.capacidad = capacidad;
		almacen.clase = clase;
		almacen.agente = agente;
		almacen.marca = marca;
		almacen.frecarga = frecarga;
		almacen.ffabricacion = ffabricacion;
		almacen.fproxservicio = fproxservicio;
		almacen.planta = planta;
		almacen.myArray	= myArray;        
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.GuardarExtintor, almacen.error, null);
			
		},
									GuardarExtintor: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio,planta)");
										    //navigator.notification.alert("longitud " +almacen.myArray.length ,null,"Listo","Aceptar");      
										    for(i = 0; i<almacen.myArray.length; i++) 
										    {
										    	if((almacen.myArray[i] != "") && (almacen.myArray[i] != undefined))
										    	{
										    		tx.executeSql("INSERT INTO ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio,planta) VALUES ('"+almacen.myArray[i]+"')");
    											}
        									}        
									},
									CreaSINOExiste: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio,planta)");										
									},
									CreaSINOExisteRegEXT: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_reg_ext (id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario,fechaderegistro)");										
									},
									CreaSINOExisteHidra: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_hidrantes (id_hidra, ubicacion,planta)");										
									},
									CreaSINOExisteRegHIDRA: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_reg_hidra (id_hidra,llave,etiqueta,manguera,tuberia,valvula,martillo,micavidrio,gabinete,senalamiento,observaciones,usuario,fechaderegistro)");										
									},
									error: function(){
										//alert("Error al acceder a la Base de Datos");
										navigator.notification.alert("Error al acceder a la Base de Datos", null, "Error", "Aceptar");
									},
									Correcto: function(){
										//alert("Reserva guardada en espera de sincronización");
										navigator.notification.alert("Ejecución satisfactoria", null, "Correcto", "Aceptar");
									},
									GuardadoCorrectoLocalEXT: function(){										
										navigator.notification.alert("Se guardo la información en el dispositivo", null, "Correcto", "Aceptar");										
										
									},
									GuardadoCorrectoLocalHIDRA: function(){										
										navigator.notification.alert("Se guardo la información en el dispositivo", null, "Correcto", "Aceptar");										
										
									},
	/*FUNCION PARA LEER EN BASE DE DATOS*/
	leerExt: function(){
			
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.ConsultaExtintor, almacen.error, null);
		},
									ConsultaExtintor: function(tx){
										tx.executeSql("SELECT count(*) as filas FROM ita_sh_extintores", [], function(tx2, t){
											for(i = 0; i < t.rows.length; i++){
												$("#NumDeExtintores").val("" + t.rows.item(i).filas); 
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("id_ext: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
										
		},
/*FUNCION PARA ELIMINAR EN BASE DE DATOS*/
		eliminarExt: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.eliminarExtintores, almacen.error, almacen.Correcto);
		},
									eliminarExtintores: function(tx){
									tx.executeSql("DELETE FROM ita_sh_extintores");
	},
/*FUNCION PARA LEER EN BASE DE DATOS*/
		leerinformacionEXT: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.leerinfoEXT, almacen.error, null);

	},
									leerinfoEXT: function(tx){
										
									tx.executeSql("SELECT id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio,planta FROM ita_sh_extintores where upper(id_ext) = upper('" +$('#txtitaextiV1').val()+ "')", [], function(tx2, t){
									var encontroEXT = 0;
											for(i = 0; i < t.rows.length; i++){
							encontroEXT= 1;
							$("#pPLANTA").text(t.rows.item(i).planta);
							$("#pUBICACION").text(t.rows.item(i).ubicacion);
                            $("#pCAPACIDAD").text(t.rows.item(i).capacidad);
                            $("#pCLASE").text(t.rows.item(i).clase);
                            $("#pAGENTE").text(t.rows.item(i).agente);
                            $("#pMARCA").text(t.rows.item(i).marca);
                            $("#pFRECARGA").text(t.rows.item(i).frecarga);
                            $("#pFFABRICACION").text(t.rows.item(i).ffabricacion);
                            $("#pFPROXSERVICIO").text(t.rows.item(i).fproxservicio);                   
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("ubicacion: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

	if(encontroEXT == 0)
	{
		navigator.notification.alert("Sin resultados verifique el ID del Extintor", null, "Advertencia", "Aceptar");
	}
//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
	
	},
/*FUNCION PARA GUARDAR LA INFORMACION DE LO QUE SE CAPTURA SOBRE EXTINTORES EN BASE DE DATOS*/
		guardarRegistroEXT: function(id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario){
		almacen.id_ext = id_ext;
		almacen.presion=presion;
		almacen.manometro=manometro;
		almacen.segurosello=segurosello;
		almacen.manguera=manguera;
		almacen.soporte=soporte;
		almacen.pintura=pintura;
		almacen.valvula=valvula;
		almacen.cilindro=cilindro;
		almacen.nemotecnia=nemotecnia;
		almacen.senalamiento=senalamiento;
		almacen.gabinete=gabinete;
		almacen.observaciones=observaciones;
		almacen.usuario = usuario;
		var d = new Date(); 
		
		almacen.fechaderegistro = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteRegEXT, almacen.error, null);
			almacen.db.transaction(almacen.GuardarRegistroExtintor, almacen.error, almacen.GuardadoCorrectoLocalEXT);
			
		},
									GuardarRegistroExtintor: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_reg_ext (id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario,fechaderegistro)");
										tx.executeSql("INSERT INTO ita_sh_reg_ext (id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario,fechaderegistro) VALUES ('"+almacen.id_ext+"','"+almacen.presion+"','"+almacen.manometro+"','"+almacen.segurosello+"','"+almacen.manguera+"','"+almacen.soporte+"','"+almacen.pintura+"','"+almacen.valvula+"','"+almacen.cilindro+"','"+almacen.nemotecnia+"','"+almacen.senalamiento+"','"+almacen.gabinete+"','"+almacen.observaciones+"','"+almacen.usuario+"','"+almacen.fechaderegistro+"')");       
										//alert("- "+ almacen.usuario + " - " + almacen.fechaderegistro);
									},
/*FUNCION PARA LEER EN BASE DE DATOS LOS REGISTROS CAPTURADOS SOBRE EXTINTORES*/
		leerinformacionregistradaEXT: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteRegEXT, almacen.error, null);			
			almacen.db.transaction(almacen.leerinforegistradaEXT, almacen.error, null);

	},
									leerinforegistradaEXT: function(tx){
										
									tx.executeSql("SELECT id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario,fechaderegistro FROM ita_sh_reg_ext", [], function(tx2, t){
									var campos = "";
									var encontroEXT = 0;
											for(i = 0; i < t.rows.length; i++){
							encontroEXT= 1;
							/*$("#pPLANTA").text(t.rows.item(i).planta);
							$("#pUBICACION").text(t.rows.item(i).ubicacion);
                            $("#pCAPACIDAD").text(t.rows.item(i).capacidad);
                            $("#pCLASE").text(t.rows.item(i).clase);
                            $("#pAGENTE").text(t.rows.item(i).agente);
                            $("#pMARCA").text(t.rows.item(i).marca);
                            $("#pFRECARGA").text(t.rows.item(i).frecarga);
                            $("#pFFABRICACION").text(t.rows.item(i).ffabricacion);
                            $("#pFPROXSERVICIO").text(t.rows.item(i).fproxservicio);  */                 
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												campos = campos + "['"+ t.rows.item(i).id_ext +"','"+ t.rows.item(i).presion+"','"+t.rows.item(i).manometro+"','"+t.rows.item(i).segurosello+"','"+t.rows.item(i).manguera+"','"+t.rows.item(i).soporte+"','"+t.rows.item(i).pintura+"','"+t.rows.item(i).valvula+"','"+t.rows.item(i).cilindro+"','"+t.rows.item(i).nemotecnia+"','"+t.rows.item(i).senalamiento+"','"+t.rows.item(i).gabinete+"','"+t.rows.item(i).observaciones.replace(/[^a-zA-Z 0-9.]+/g,' ')+"','"+t.rows.item(i).usuario+"','"+t.rows.item(i).fechaderegistro + "']";
												
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("campos: " + campos, null, "mensaje 1", "Aceptar");
											}
											server.sincronizarRegistrados(campos);//Enviar a servidor

	if(encontroEXT == 0)
	{
		//navigator.notification.alert("Sin resultados por migrar", null, "Advertencia", "Aceptar");
	}
	else if(encontroEXT == 1)
	{
		//navigator.notification.alert("Se migro informacion local al servidor", null, "Advertencia", "Aceptar");
	}
//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
	
	},
	eliminarregistrosExt: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteRegEXT, almacen.error, null);
			almacen.db.transaction(almacen.eliminarregExtintores, almacen.error, null);
		},
									eliminarregExtintores: function(tx){
									tx.executeSql("DELETE FROM ita_sh_reg_ext");
	},
	/*ALMACENAMIENTO PARA HIDRANTES*/
		guardarHIDRA: function(myArray){
		almacen.myArray	= myArray;        
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.GuardarHidrante, almacen.error, null);
			
		},
									GuardarHidrante: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_hidrantes (id_hidra, ubicacion,planta)");
										    //navigator.notification.alert("longitud " +almacen.myArray.length ,null,"Listo","Aceptar");      
										    for(i = 0; i<almacen.myArray.length; i++) 
										    {
										    	if((almacen.myArray[i] != "") && (almacen.myArray[i] != undefined))
										    	{
										    		tx.executeSql("INSERT INTO ita_sh_hidrantes (id_hidra, ubicacion,planta) VALUES ('"+almacen.myArray[i]+"')");
    											}
        									}        
									},
		/*FUNCION PARA LEER EN BASE DE DATOS*/
	leerHidra: function(){
			
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteHidra, almacen.error, null);
			almacen.db.transaction(almacen.ConsultaHidrante, almacen.error, null);
		},
									ConsultaHidrante: function(tx){
										tx.executeSql("SELECT count(*) as filas FROM ita_sh_hidrantes", [], function(tx2, t){
											for(i = 0; i < t.rows.length; i++){
												$("#NumDeHidrantes").val("" + t.rows.item(i).filas); 
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("id_ext: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
										
		},
		/*FUNCION PARA ELIMINAR EN BASE DE DATOS*/
		eliminarHidra: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteHidra, almacen.error, null);
			almacen.db.transaction(almacen.eliminarHidrantes, almacen.error, almacen.Correcto);
		},
									eliminarHidrantes: function(tx){
									tx.executeSql("DELETE FROM ita_sh_hidrantes");
	},
	/*FUNCION PARA LEER EN BASE DE DATOS SOBRE HIDRANTES*/
		leerinformacionHIDRA: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteHidra, almacen.error, null);
			almacen.db.transaction(almacen.leerinfoHIDRA, almacen.error, null);

	},
									leerinfoHIDRA: function(tx){
										
									tx.executeSql("SELECT id_hidra, ubicacion,planta FROM ita_sh_hidrantes where upper(id_hidra) = upper('" +$('#txtitahidraV1').val()+ "')", [], function(tx2, t){
									var encontroEXT = 0;
											for(i = 0; i < t.rows.length; i++){
							encontroEXT= 1;
							$("#pPLANTAHIDRA").text(t.rows.item(i).planta);
							$("#pUBICACIONHIDRA").text(t.rows.item(i).ubicacion);
                                        
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("ubicacion: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

	if(encontroEXT == 0)
	{
		navigator.notification.alert("Sin resultados verifique el ID del Hidrante", null, "Advertencia", "Aceptar");
	}
//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
	
	},
			guardarRegistroHIDRA: function(id_hidra,llave,etiqueta,manguera,tuberia,valvula,martillo,micavidrio,gabinete,senalamiento,observaciones,usuario){

				almacen.id_hidra = id_hidra;
				almacen.llave = llave;
				almacen.etiqueta = etiqueta;
				almacen.manguera = manguera;
				almacen.tuberia = tuberia;
				almacen.valvula = valvula;
				almacen.martillo = martillo;
				almacen.micavidrio = micavidrio;
				almacen.gabinete = gabinete;
				almacen.senalamiento = senalamiento;
				almacen.observaciones = observaciones;
				almacen.usuario = usuario;
				
				var d = new Date(); 
		
				almacen.fechaderegistro = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.GuardarRegistroHidrante, almacen.error, almacen.GuardadoCorrectoLocalHIDRA);
			
		},
									GuardarRegistroHidrante: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_reg_hidra (id_hidra,llave,etiqueta,manguera,tuberia,valvula,martillo,micavidrio,gabinete,senalamiento,observaciones,usuario,fechaderegistro)");
										tx.executeSql("INSERT INTO ita_sh_reg_hidra (id_hidra,llave,etiqueta,manguera,tuberia,valvula,martillo,micavidrio,gabinete,senalamiento,observaciones,usuario,fechaderegistro) VALUES ('" + almacen.id_hidra +"','"+almacen.llave +"','"+almacen.etiqueta +"','"+almacen.manguera +"','"+almacen.tuberia +"','"+almacen.valvula +"','"+almacen.martillo +"','"+almacen.micavidrio +"','"+almacen.gabinete +"','"+almacen.senalamiento +"','"+almacen.observaciones +"','"+almacen.usuario +"','"+almacen.fechaderegistro + "')");
										//alert("- "+ almacen.usuario + " - " + almacen.fechaderegistro);
									},
		/*FUNCION PARA LEER EN BASE DE DATOS LOS REGISTROS CAPTURADOS SOBRE EXTINTORES*/
		leerinformacionregistradaHIDRA: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteRegHIDRA, almacen.error, null);			
			almacen.db.transaction(almacen.leerinforegistradaHIDRA, almacen.error, null);

	},
									leerinforegistradaHIDRA: function(tx){
										
									tx.executeSql("SELECT id_hidra,llave,etiqueta,manguera,tuberia,valvula,martillo,micavidrio,gabinete,senalamiento,observaciones,usuario,fechaderegistro FROM ita_sh_reg_hidra", [], function(tx2, t){
									var encontroEXT = 0;
											for(i = 0; i < t.rows.length; i++){
							encontroEXT= 1;
							/*$("#pPLANTA").text(t.rows.item(i).planta);
							$("#pUBICACION").text(t.rows.item(i).ubicacion);
                            $("#pCAPACIDAD").text(t.rows.item(i).capacidad);
                            $("#pCLASE").text(t.rows.item(i).clase);
                            $("#pAGENTE").text(t.rows.item(i).agente);
                            $("#pMARCA").text(t.rows.item(i).marca);
                            $("#pFRECARGA").text(t.rows.item(i).frecarga);
                            $("#pFFABRICACION").text(t.rows.item(i).ffabricacion);
                            $("#pFPROXSERVICIO").text(t.rows.item(i).fproxservicio);  */                 
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												server.sincronizarRegistradosHIDRA(t.rows.item(i).id_hidra,t.rows.item(i).llave,t.rows.item(i).etiqueta,t.rows.item(i).manguera,t.rows.item(i).tuberia,t.rows.item(i).valvula,t.rows.item(i).martillo,t.rows.item(i).micavidrio,t.rows.item(i).gabinete,t.rows.item(i).senalamiento,t.rows.item(i).observaciones,t.rows.item(i).usuario,t.rows.item(i).fechaderegistro);//Enviar a servidor
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("ubicacion: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

	if(encontroEXT == 0)
	{
		//navigator.notification.alert("Sin resultados por migrar", null, "Advertencia", "Aceptar");
	}
	else if(encontroEXT == 1)
	{
		//navigator.notification.alert("Se migro informacion local al servidor", null, "Advertencia", "Aceptar");
	}
//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
	
	},
	eliminarregistrosHidra: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteRegHIDRA, almacen.error, null);
			almacen.db.transaction(almacen.eliminarregHidrantes, almacen.error, null);
		},
									eliminarregHidrantes: function(tx){
									tx.executeSql("DELETE FROM ita_sh_reg_hidra");
	}



}