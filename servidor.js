// Incluimos los módulos necesarios

const http = require("http");
const fs = require("fs");
const path = require("path");

// Hacemos nuestra peticion HTTP
http.createServer((request, response)=> {

// Creamos la variable que guardara la url de la petición HTTP
    let filePath = request.url;

// Por defecto sera / , debemos agregarle nuestro index.html, solo en la
// primera petición

    if (filePath == '/') {
        filePath = '/index.html';
    }

// Seguido añadiremos la ruta de donde esta nuestro archivo y por ende
// nuestra carpeta de la pagina web.
// Para cada petición arrojara:
//  =>  C:/usuario/carpeta/paginaWeb\index.html
//  =>  C:/usuario/carpeta/paginaWeb\css.css
//  =>  C:/usuario/carpeta/paginaWeb\javascript.js

    filePath = __dirname+filePath;

// Obtenemos la extensión del los archivos
    let fileExtension = path.extname(filePath);

// Declaramos la extensión por defecto
    let contentType = 'text/html';

// Filtramose el tipo de contenido
    switch (fileExtension) {

		case ".css":
            contentType = "text/css";
        break;
                case ".jpg":
            contentType = "text/jpg";
        break;

        case ".js":
            contentType = "text/javascript";
        break;
		
        case ".html":
            contentType = "text/html";
        default:
            contentType = "text/html";
    }

// Hacemos la lectura del archivo

   fs.readFile(filePath,{encoding:"UTF-8"}, (error,content)=>{
       if(!error) {

// Escribimos la cabecera y pasamos el tipo de contenido

           response.writeHead(200, {"Content-Type": contentType});
           response.write(content);
           response.end();
       } else {

 // Si hay error lo mostramos

           response.writeHead(404, {"Content-Type": "text/html"});
           response.write("error file");
           response.end();
       }
       })

// Configuramos la escucha de las peticiones a un puerto determinado

}).listen(9085);
console.log("servidor iniado en 9085")
