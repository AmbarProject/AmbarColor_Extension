const vscode = require('vscode');

function activate(context) {
  // Lista de palavras-chave e tipos que queremos sugerir
  const keywords = [
    'func', 'return', 'if', 'else', 'for', 'while', 'print', 'break', 'continue'
  ];

  const types = [
    'int', 'float', 'bool', 'string', 'void'
  ];

  // Completion provider para a linguagem 'ambar'
  const provider = vscode.languages.registerCompletionItemProvider(
    { language: 'ambar' },
    {
      provideCompletionItems(document, position) {
        const completions = [];

        // Keywords
        for (const kw of keywords) {
          const item = new vscode.CompletionItem(kw, vscode.CompletionItemKind.Keyword);
          item.detail = 'keyword';
          completions.push(item);
        }

        // Types
        for (const t of types) {
          const item = new vscode.CompletionItem(t, vscode.CompletionItemKind.TypeParameter);
          item.detail = 'type';
          completions.push(item);
        }

        // Some useful function/snippet-style completions (inline)
        const funcSnippet = new vscode.CompletionItem('func', vscode.CompletionItemKind.Snippet);
        funcSnippet.insertText = new vscode.SnippetString('func ${1:name}(${2:args}) -> ${3:int} {\n\t$0\n}');
        funcSnippet.detail = 'Define a function';
        funcSnippet.documentation = 'Cria a estrutura de uma função: func name(args) -> returnType { ... }';
        completions.push(funcSnippet);

        const forSnippet = new vscode.CompletionItem('for', vscode.CompletionItemKind.Snippet);
        forSnippet.insertText = new vscode.SnippetString('for (${1:i: int} = ${2:0}; ${1} <= ${3:10}; ${1} = ${1} + ${4:1}) {\n\t$0\n}');
        forSnippet.detail = 'Estrutura for';
        completions.push(forSnippet);

        const ifSnippet = new vscode.CompletionItem('if', vscode.CompletionItemKind.Snippet);
        ifSnippet.insertText = new vscode.SnippetString('if (${1:cond}) {\n\t$0\n} else {\n\t\n}');
        ifSnippet.detail = 'Estrutura if/else';
        completions.push(ifSnippet);

        const printSnippet = new vscode.CompletionItem('print', vscode.CompletionItemKind.Function);
        printSnippet.insertText = new vscode.SnippetString('print(${1:expr});');
        printSnippet.detail = 'print(expression)';
        completions.push(printSnippet);

        return completions;
      }
    },
    // Gatilhos: quando usuário digitar letra, $, ou : por exemplo
    '.', ':', '$'
  );

  context.subscriptions.push(provider);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
