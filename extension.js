const vscode = require('vscode');
const HoverProvider = require('./hover'); 
const ErrorDiagnosticProvider = require('./diagnostics');


function activate(context) {
    console.log('Congratulations, your extension "Dominions Mod Support" is now active!');

    const hoverProvider = new HoverProvider(); 
    hoverProvider.activate(context); 

    const errorProvider = new ErrorDiagnosticProvider();
    errorProvider.activate(context);
    
}


function deactivate() {
    
}

module.exports = {
    activate,
    deactivate
};
