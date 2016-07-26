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
			almacen.db.transaction(almacen.GuardarRegistroExtintor, almacen.error, almacen.GuardadoCorrectoLocalEXT);
			
		},
									GuardarRegistroExtintor: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_reg_ext (id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario,fechaderegistro)");
										tx.executeSql("INSERT INTO ita_sh_reg_ext (id_ext,presion,manometro,segurosello,manguera,soporte,pintura,valvula,cilindro,nemotecnia,senalamiento,gabinete,observaciones,usuario,fechaderegistro) VALUES ('"+almacen.id_ext+"','"+almacen.presion+"','"+almacen.manometro+"','"+almacen.segurosello+"','"+almacen.manguera+"','"+almacen.soporte+"','"+almacen.pintura+"','"+almacen.valvula+"','"+almacen.cilindro+"','"+almacen.nemotecnia+"','"+almacen.senalamiento+"','"+almacen.gabinete+"','"+almacen.observaciones+"','"+almacen.usuario+"','"+almacen.fechaderegistro+"')");       
										alert("- "+ almacen.usuario + " - " + almacen.fechaderegistro);
									}


}