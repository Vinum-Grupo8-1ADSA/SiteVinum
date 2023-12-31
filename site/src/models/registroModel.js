var database = require("../database/config");

function buscarUltimosRegistros(fkSensor, fkDistribuidora, limite_linhas) {

    instrucaoSql = `
        select
            temperatura, 
            umidade,
            dtHora,
            DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico
        from registro
        join sensor on fkSensor = idSensor
        where fkSensor = ${fkSensor} and fkDistribuidora = ${fkDistribuidora}
        order by idRegistro desc limit ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarTodosUltimosRegistros(fkDistribuidora, limite_linhas2) {

    instrucaoSql = `
        select
            temperatura as temp, 
            umidade,
            nomeSensor,
            dtHora,
            DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico
        from registro
        join sensor on fkSensor = idSensor
        where fkDistribuidora = ${fkDistribuidora}
        order by idRegistro desc limit ${limite_linhas2};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkSensor, fkDistribuidora) {

    instrucaoSql = `
        select
            temperatura, 
            umidade,
            DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico
        from registro
        join sensor on fkSensor = idSensor
        where fkSensor = ${fkSensor} and fkDistribuidora = ${fkDistribuidora}
        order by idRegistro desc limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(fkDistribuidora) {
    var query = `
    select *
    from sensor
    where fkDistribuidora = ${fkDistribuidora}
    `;
  
    return database.executar(query);
}

module.exports = {
    buscarUltimosRegistros,
    buscarMedidasEmTempoReal,
    listar,
    buscarTodosUltimosRegistros
}
