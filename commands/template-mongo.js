  
const command = {
    name: 'template:mongo',
    description: 'Gera um template de configuração para instalação do módulo Mongo',
    run: async toolbox => {
      toolbox.print.success("- Adicionando: mongo.json")
      await toolbox.template.generate({
          template: 'template.json',
          target: `mongo.json`,
      })
    }
  }
  
  module.exports = command