var almacen = {
	id_ext: null,
	ubicacion: null,
	capacidad: null,
	clase: null,
	agente: null,
	marca : null,
	frecarga: null,
	ffabricacion: null,
	fproxservicio: null,
myArray: null,
	numerodefilas : 0,

	db: null,
	/*FUNCION PARA GUARDAR EN BASE DE DATOS*/
	guardarEXT: function(id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio,myArray){
		almacen.id_ext = id_ext;
		almacen.ubicacion = ubicacion;
		almacen.capacidad = capacidad;
		almacen.clase = clase;
		almacen.agente = agente;
		almacen.marca = marca;
		almacen.frecarga = frecarga;
		almacen.ffabricacion = ffabricacion;
		almacen.fproxservicio = fproxservicio;
		almacen.myArray	= myArray;        
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.GuardarExtintor, almacen.error, null);
			
		},
									GuardarExtintor: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio)");
										    //navigator.notification.alert("longitud " +almacen.myArray.length ,null,"Listo","Aceptar");      
										    for(i = 0; i<almacen.myArray.length; i++) 
										    {
										    	if((almacen.myArray[i] != "") && (almacen.myArray[i] != undefined))
										    	{
										    		tx.executeSql("INSERT INTO ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio) VALUES ('"+almacen.myArray[i]+"')");
    											}
        									}        
									},
									CreaSINOExiste: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio)");										
									},
									error: function(){
										//alert("Error al acceder a la Base de Datos");
										navigator.notification.alert("Error al acceder a la Base de Datos", null, "Error", "Aceptar");
									},
									Correcto: function(){
										//alert("Reserva guardada en espera de sincronización");
										navigator.notification.alert("Ejecución satisfactoria", null, "Correcto", "Aceptar");
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
		eliminarExt: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.eliminarExtintores, almacen.error, almacen.Correcto);
		},
									eliminarExtintores: function(tx){
									tx.executeSql("DELETE FROM ita_sh_extintores");
	},
		leerinformacionEXT: function(tx){
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.leerinfoEXT, almacen.error, null);

	},
									leerinfoEXT: function(tx){
									tx.executeSql("SELECT id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio FROM ita_sh_extintores where upper(id_ext) = upper('" +$('#txtitaextiV1').val()+ "')", [], function(tx2, t){
											for(i = 0; i < t.rows.length; i++){

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
												navigator.notification.alert("ubicacion: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
	}

}