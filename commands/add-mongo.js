  
const command = {
    name: 'add:mongo',
    description: 'Adiciona um ORM para conexão com um banco de dados MongoDB so serviço (Mongoose)',
    run: async toolbox => {
      const module = await toolbox.validate(toolbox)
      
      toolbox.print.info("\n")
        toolbox.print.info("###################################################")
        toolbox.print.info("##       Instalando dependências do Módulo       ##")
        toolbox.print.info("###################################################")
        toolbox.print.info(await toolbox.system.run('npm install mongoose'))

        toolbox.print.info("###################################################")
        toolbox.print.info("##         Adicionando módulo ao projeto         ##")
        toolbox.print.info("###################################################")
        await toolbox.createModule(toolbox)

        toolbox.print.info("\n")
        toolbox.print.info("###################################################")
        toolbox.print.info("##         Executando template do módulo         ##")
        toolbox.print.info("###################################################")
        const schemas = await toolbox.readTemplate(toolbox, module)
        await toolbox.createSchemas(toolbox, schemas)

        toolbox.print.info("\n")
        toolbox.print.success(`Módulo ${module.name} adicionado com sucesso!`)
        toolbox.print.info("\n")
    }
  }
  
  module.exports = command