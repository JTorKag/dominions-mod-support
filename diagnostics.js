const vscode = require('vscode');
const fs = require('fs');

class ErrorDiagnosticProvider {
    constructor() {
        this.needEndJson = {};
    }

    async loadJson(filename) {
        try {
            const data = await fs.promises.readFile(filename, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
        }
    }

    checkMissingEnd(lines, diagnostics, startValues) {
        let lastCommand = null;
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            if (line.includes('#end')) {
                lastCommand = null;
            }
    
            for (const command of startValues.command) {
                if (line.startsWith(command)) {
                    if (lastCommand && !line.endsWith('#end')) {
                        const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length));
                        const diagnostic = new vscode.Diagnostic(range, `Missing #end command for ${lastCommand} above this.`, vscode.DiagnosticSeverity.Error);
                        diagnostics.push(diagnostic);
                    }
                    lastCommand = command;
                    break; // No need to continue checking after a match
                }
            }
        }
    }
    

    

    checkFloatValues(lines, diagnostics) {
        for (let i = 0; i < lines.length; i++) {
            const words = lines[i].split(/\s+/);
            for (const word of words) {
                if (!isNaN(parseFloat(word))) {
                    const range = new vscode.Range(new vscode.Position(i, lines[i].indexOf(word)), new vscode.Position(i, lines[i].indexOf(word) + word.length));
                    const diagnostic = new vscode.Diagnostic(range, 'Float value found', vscode.DiagnosticSeverity.Error);
                    diagnostics.push(diagnostic);
                }
            }
        }
    }

    async analyzeDocument(document, diagnosticCollection, startValues) {
        const diagnostics = [];

        const lines = document.getText().split('\n');

        this.checkMissingEnd(lines, diagnostics, startValues);
        this.checkFloatValues(lines, diagnostics);

        diagnosticCollection.set(document.uri, diagnostics);
    }

    async activate(context) {
        console.log('Error Diagnostic Provider active');

        this.needEndJson = await this.loadJson(context.asAbsolutePath('/json/needEnd.json'));

        const diagnosticCollection = vscode.languages.createDiagnosticCollection('dominionsmod');

        vscode.workspace.onDidOpenTextDocument(document => this.analyzeDocument(document, diagnosticCollection, this.needEndJson), this, context.subscriptions);
        vscode.workspace.onDidChangeTextDocument(event => this.analyzeDocument(event.document, diagnosticCollection, this.needEndJson), this, context.subscriptions);
        vscode.workspace.onDidCloseTextDocument(document => diagnosticCollection.delete(document.uri), null, context.subscriptions);

        context.subscriptions.push(diagnosticCollection);
    }

    dispose() {
        // Dispose of resources if needed
    }
}

module.exports = ErrorDiagnosticProvider;
