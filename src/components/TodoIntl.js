var React = require('react/addons');
var TodoApp = require('./TodoApp');

// i18n sample
var messages = {
  "pt-BR": {
    "title": "Tarefas",
    "inputPlaceholder": "O que precisa ser feito?",
    "addTodo": "Adicionar",
    "markAsComplete": "Marcar todas como feitas",
    "remove": "Remover",
    "itemsLeft": "{items, plural,\n  =0 {Hooray! Nada por aqui}\n  =1 {Um item restante}\n  other {# items restantes}\n}\n"
  },
  "en-US": {
    "title": "Todos",
    "inputPlaceholder": "What needs to be done?",
    "addTodo": "Add Todo",
    "markAsComplete": "Mark all as complete",
    "remove": "Remove",
    "itemsLeft": "{items, plural,\n  =0 {Hooray! Nothing here}\n  =1 {One item left}\n  other {# items left}\n}\n"
  },
  "sv-SE": {
    "title": "Uppgiftslista",
    "inputPlaceholder": "Vad behöver göras?",
    "addTodo": "Lägg till",
    "markAsComplete": "Markera allt som komplett",
    "remove": "Ta bort",
    "itemsLeft": "{items, plural,\n  =0 {Hurra! Ingenting här}\n  =1 {En uppgift kvar}\n  other {# uppgifter kvar}\n}\n"
  }
};

var TodoIntl = React.createClass({
  getInitialState: function() {
    return {
      "locales": ["en-US"],
      "messages": messages["en-US"]
    };
  },

  handleSelect: function(e) {
    this.setState({
      "locales": [e.target.value],
      "messages": messages[e.target.value]
    });
  },

  render: function() {
    return (
      <div>
        <TodoApp
          locales={this.state.locales}
          messages={this.state.messages} />
        <div className='container i18n-select'>
          <div className='i18n-container pull-right'>
            <select onChange={this.handleSelect}>
              <option value="en-US">English</option>
              <option value="sv-SE">Svenska</option>
              <option value="pt-BR">Português</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoIntl;
