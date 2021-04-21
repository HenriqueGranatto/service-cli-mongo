  
module.exports = (toolbox) =>
{
    switch(toolbox.parameters.command)
    {
        case 'add:mongo':
            toolbox.validate = validateAddMongo
        break;

        case 'mongo:create':
            toolbox.validate = validateMongoCreate
        break;
    }
}

const validateAddMongo = (toolbox) =>
{
    toolbox.print.info("###################################################")
    toolbox.print.info("##                  Iniciando                    ##")
    toolbox.print.info("###################################################")
    toolbox.print.info("- Analisando solicitação")

    if(typeof toolbox.parameters.options.template != "string")
    {
        toolbox.print.error('- Comando incorreto: É obrigatório o envio de um template para instalação do módulo. Somente um template deve ser enviado')
        toolbox.print.info(`Exemplo: service-cli add:mongo --template template.json`)
        process.exit(0)
    }

    const module = 
    {
        name: toolbox.parameters.command.split(":")[1],
        template: 
        {
            file: toolbox.parameters.options.template,
        }
    }

    toolbox.print.success("- Solicitação aceita")
    toolbox.print.success("- Iniciando procedimento de instalação do módulo")

    return module
}

const validateMongoCreate = (toolbox) =>
{
    toolbox.print.info("###################################################")
    toolbox.print.info("##                  Iniciando                    ##")
    toolbox.print.info("###################################################")
    toolbox.print.info("- Analisando solicitação")

    if(typeof toolbox.parameters.options.subdomain != "string")
    {
        toolbox.print.error('- Comando incorreto: É obrigatório o envio de um componente válido (model) ')
        toolbox.print.info(`Exemplo: service-cli mongo:create --subdomain subdomain01, subdomain02`)
        process.exit(0)
    }

    return module
}