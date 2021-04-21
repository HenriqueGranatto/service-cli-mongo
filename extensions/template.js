module.exports = (toolbox) =>
{
    if(toolbox.parameters.command == 'add:mongo')
    {
        toolbox.readTemplate = readTemplate
        toolbox.createModule = createModule
        toolbox.createSchemas = createSchemas
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

    const schemas = module.template.data

    return schemas
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
    env += `MONGO_SERVER=`
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