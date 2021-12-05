
var fila="<tr><td class='id'></td><td class='foto'><td class='video'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='eliminar' ></td></tr>";
	 var ocupaciones=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "construccion":code="c1";break;
	    case "tecnologia":code="c2";break;
		case "comercio":code="c3";break;
		case "salud":code="c4";break;
	}
	return code;
}   
	  
	  
function obtenerPuestos() {
	var direccion="http://localhost:3000/ocupaciones";
	  fetch(direccion)
            .then(res=>res.json())
            .then(data=>{ocupaciones=data;listarPuestos(data)})
}
	  var orden=0;
	function listarPuestos(ocupaciones) {
	  var salary=document.getElementById("salario"); 
	  salary.setAttribute("onclick", "orden*=-1;listarPuestos(ocupaciones);");
	  var num=ocupaciones.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos,videos,eliminar;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");
      videos=document.getElementsByClassName("video");	  
	  prices=document.getElementsByClassName("price"); 
	  eliminar=document.getElementsByClassName("eliminar");  
	  
	  if(orden===0) {orden=-1;salario.innerHTML="Salario"}
	  else
	     if(orden==1) {ordenarAsc(ocupaciones,"price");salary.innerHTML="Salario A";salary.style.color="blue"}
	     else 
	       if(orden==-1) {ordenarDesc(ocupaciones,"price");salary.innerHTML="Salario D";salary.style.color="red"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=ocupaciones[nfila].id;
		titles[nfila].innerHTML=ocupaciones[nfila].nomb;
		descriptions[nfila].innerHTML=ocupaciones[nfila].descripcion;
		categories[nfila].innerHTML=ocupaciones[nfila].cat;
		eliminar[nfila].innerHTML="<button  onclick=\"eliminarPuesto("+ocupaciones[nfila].id+");\" style=\"color:black;cursor:pointer;\">Eliminar</button>";
		catcode=codigoCat(ocupaciones[nfila].cat);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+ocupaciones[nfila].salario;
		fotos[nfila].innerHTML="<img src="+ocupaciones[nfila].fotourl+">";
		//videos[nfila].innerHTML="<iframe width=280 height=157 scr="+ocupaciones[nfila].videourl+"></iframe>";
		videos[nfila].innerHTML="<a href='"+ocupaciones[nfila].videourl+"' target='_blank'>"+ ocupaciones[nfila].videourl+"</a>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+ocupaciones[nfila].fotourl+"');" );
		}
	
	}


function guardarPuesto() {
	var formulario = document.forms['formulario'];
	var titles,prices,descriptions,categoria,fotos,videos;
	 titles=String(formulario['tituloC'].value);
	  descriptions=String(formulario['descC'].value);
	  categoria = document.datosIn.catC[document.datosIn.catC.selectedIndex].value;  
	  fotos=String(formulario['imgC'].value);
      videos=String(formulario['vidC'].value); 	  
	  prices=String(formulario['precioC'].value);
	  var nombre={
		      nomb:titles,
			  fotourl:fotos, 
			  videourl:videos, 
			  salario:prices, 
			  descripcion:descriptions,
			  cat:categoria}
	  
	fetch('http://localhost:3000/ocupaciones',
{ method:'POST',
      body: JSON.stringify(nombre),
      headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json; charset=UTF-8',
      }
})
.then(response=>response.json())
.then(data=>{ocupaciones=data;listarPuestos(data)})
window.alert('Dato con guardado correctamente, vuelva a desplegar la lista de ocupaciones');
return
}

function eliminarPuesto(nfila){
	/*var id=nfila+1;
	var numero=String(id);*/
 var direccion="http://localhost:3000/ocupaciones/"+nfila;
	fetch(direccion,
	{ method:"DELETE"})
	.then(response=>response.json())
	.then(data=>{ocupaciones=data;listarPuestos(data)});
	window.alert('Dato eliminado correctamente, vuelva a desplegar la lista de ocupaciones');
	return
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}