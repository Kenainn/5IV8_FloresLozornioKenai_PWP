const mirrow = (req,res) => {
    const methods = [{
        method: 'POST',
        hasbody: true,
        purpouse: "El metodo post se utiliza para enviar una entidad a un recurso, especifico, causando a menudo un cambio en el estado o efector secundarios en el servidor"
    },{
        method:'PUT',
        hasbody: true,
        purpouse: "El metodo put remplaza todas las rempresentaciones actuales del recurso de destino con la carga útil de la petición"
    },{
        method:'PATCH',
        hasbody: true,
        purpouse: "El metodo patch es utilizado para aplicar modificaciones parciales a un recurso"
    },{
        method:'HEAD',
        hasbody: false,
        purpouse: "El metodo head pide una respuesta identica a la de una peticion GET, pero sin el cuerpo de la respuesta"
    },{
        method:'GET',
        hasbody: false,
        purpouse: "El metodo get solicita una representacion de un registro especifico. Las peticiones que usan el metodo get solo deben recuperar datos"
    },{
        method:'DELETE',
        hasbody: false,
        purpouse: "El metodo delete elimina un recurso especifico"
    }];

    const requestMethod = methods.find(m => m.method === req.method)||{
        method: req.method,
        hasbody: false,
        purpouse: "No tiene un body, no hay una respuesta, metodo no soportado"
    };
    requestMethod.purpouse += requestMethod.hasbody ? "Tiene cuerpo" : "No tiene cuerpo";
    if(requestMethod.hasbody){
        req.body; //JS debe de parsear mediante un JSON el objeto necesario
        res.json({...req.body, ruta_consumida:req.route.path, ...requestMethod});
    }else{
        res.json({ruta_consumida:
            req.originalUrl, ...requestMethod});
    }
};

module.exports = mirrow;