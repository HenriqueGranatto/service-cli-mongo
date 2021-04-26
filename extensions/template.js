module.exports = (toolbox) =>
{
    switch(toolbox.parameters.command)
    {
        case 'add:mongo':
            toolbox.readTemplate = readTemplate
            toolbox.createModule = createModule
            toolbox.createSchemas = createSchemas
        break;

        case 'mongo:create':
            toolbox.createModel = createModel
        break;
    }

}

const readTemplate = async (toolbox, module) =>
{
    toolbox.print.info("- Procurando template")
    module.template.data = toolbox.filesystem.read(module.template.file)

    if(!module.template.data)
    {
        toolbox.print.error(`- Template não encontrado: ${module.template.file}`)
        process.exit(0)
    }

    toolbox.print.success("- Template encontrado")
    module.template.data = JSON.parse(module.template.data)

    const data = module.template.data

    return data
}

const createModule = async (toolbox) =>
{
    toolbox.print.success("- Adicionando: mongo/app.js")
    await toolbox.template.generate({
        template: 'app.js',
        target: `mongo/app.js`,
    })

    toolbox.print.success("- Adicionando: mongo/models.js")
    await toolbox.template.generate({
        template: 'models.js',
        target: `mongo/models.js`,
    })

    toolbox.print.success("- Adicionando: configurações do módulo no arquivo .env")
    let env = `# Configurações do MONGO\n`
    env += `MONGO_USER=\n`
    env += `MONGO_PASSWORD=\n`
    env += `MONGO_SERVER=\n\n`
    toolbox.filesystem.append('.env', env)

    toolbox.print.success("- Adicionando: módulo no arquivo service.js")
    toolbox.filesystem.append('service.js', `require("./mongo/app")\n`)
}

const createSchemas = (toolbox, schemas) =>
{
    toolbox.print.info("- Adicionando Schemas")

    schemas.map(async (schema) => {
        const schemaProps = 
        {
            schema: JSON.stringify(schema.schema),
            name: `${schema.name.charAt(0).toUpperCase()}${schema.name.slice(1)}`
        }

        toolbox.print.success(`Schema: ${schemaProps.name}`)

        await toolbox.template.generate({
            props: schemaProps,
            template: `schemas/Schema.ejs`,
            target: `mongo/schemas/${schemaProps.name}.js`
        })
    })
}

const createModel = (toolbox, options) =>
{
    const subdomains = options.subdomain.split(' ')
    let models = options.model ? options.model.split(' ') : []

    subdomains.map(async (subdomain) => {
        const modelProps = 
        {
            mongoModels: ""
        }

        if(models.length > 0)
        {
            models = models.map(model => `${model.charAt(0).toUpperCase()}${model.slice(1)}`)
            modelProps.mongoModels = `const {${models.toString()}} = require('../../mongo/models')\n`
        }

        toolbox.print.success(`Subdomínio: ${subdomain}`)

        await toolbox.template.generate({
            props: modelProps,
            template: `domain/Model.ejs`,
            target: `domain/${subdomain}/Model.js`
        })
    })
}
