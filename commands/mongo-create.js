  
const command = {
    name: 'mongo:create',
    description: 'Cria componentes para utilização no serviço',
    run: async toolbox => {
        await toolbox.validate(toolbox)

        toolbox.print.info("\n")
        toolbox.print.info("###########################################################")
        toolbox.print.info("##         Adicionando Model ao(s) subdomínio(s)         ##")
        toolbox.print.info("###########################################################")
        await toolbox.createModel(toolbox, toolbox.parameters.options)

        toolbox.print.success("Model adicionada com sucesso aos subdomínios")
    }
  }
  
  module.exports = command