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

	numerodefilas : 0,

	db: null,
	/*FUNCION PARA GUARDAR EN BASE DE DATOS*/
	guardarEXT: function(id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio){
		almacen.id_ext = id_ext;
		almacen.ubicacion = ubicacion;
		almacen.capacidad = capacidad;
		almacen.clase = clase;
		almacen.agente = agente;
		almacen.marca = marca;
		almacen.frecarga = frecarga;
		almacen.ffabricacion = ffabricacion;
		almacen.fproxservicio = fproxservicio;
			
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.GuardarExtintor, almacen.error, almacen.ExtintorGuardado);
		},
									GuardarExtintor: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio)");
										tx.executeSql("INSERT INTO ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio) VALUES ('"+almacen.id_ext+"','"+almacen.ubicacion+"','"+almacen.capacidad+"','"+almacen.clase+"','"+almacen.agente+"','"+almacen.marca+"','"+almacen.frecarga+"','"+almacen.ffabricacion+"','"+almacen.fproxservicio+"')");
									},
									CreaSINOExiste: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_extintores (id_ext, ubicacion,capacidad,clase,agente,marca,frecarga,ffabricacion,fproxservicio)");										
									},
									error: function(){
										//alert("Error al acceder a la Base de Datos");
										navigator.notification.alert("Error al acceder a la Base de Datos", null, "Error", "Aceptar");
									},
									ExtintorGuardado: function(){
										//alert("Reserva guardada en espera de sincronización");
										navigator.notification.alert("guardarEXT se ejecuto de forma correcta", null, "Correcto", "Aceptar");
									},
	/*FUNCION PARA LEER EN BASE DE DATOS*/
	leerExtintor: function(){
			almacen.numerodefilas = 0;
			almacen.db = window.openDatabase("ItaExtiV1DB","1.0","ItaExtiV1 Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.ConsultaExtintor, almacen.error, null);
			return almacen.numerodefilas;
		},
									ConsultaExtintor: function(tx){																	
										tx.executeSql("SELECT count(*) as filas FROM ita_sh_extintores", [], function(tx2, t){
											for(i = 0; i < t.rows.length; i++){
												almacen.numerodefilas = parseInt(t.rows.item(i).filas);

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
										
									}
}