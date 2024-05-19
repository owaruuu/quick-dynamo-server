export const documentCreateDoctor = async (client) => {
    let getParams = {
        TableName: "c18-medicos",
        Key: {
            id: "doctorCounter", //el HASH KEY
            especializacion: "null", //el Sort Key, necesario
        },
        UpdateExpression: "ADD #cnt :val",
        ExpressionAttributeNames: { "#cnt": "count" },
        ExpressionAttributeValues: { ":val": 1 },
        ReturnValues: "UPDATED_NEW",
    };

    try {
        //Intenta obtener el nuevo id
        const response = await client.update(getParams);

        let putParams = {
            TableName: "c18-medicos",
            //TODO obtener valores desde un form
            Item: {
                id: response.Attributes.count.toString(), //IMPORTANTE el id es un String para poder soportar un contador
                especializacion: "medico general",
                nombre: "nombre",
                apellido: "apellido",
                telefono: "telefono",
                email: "email",
                direccion: "direccion",
            },
        };

        try {
            //Intento crear un medico
            const response = await client.put(putParams);
            return response;
        } catch (error) {
            console.log("ERROR: ", error);
            throw error;
        }
    } catch (error) {
        console.log("get counter ERROR: ", error);
        throw error;
    }
};
