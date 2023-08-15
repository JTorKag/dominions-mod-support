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
                        diagnostic.code = 'missing-end-above';
                        diagnostics.push(diagnostic);
                    }
                    lastCommand = command;
                    break; // No need to continue checking after a match
                }
            }
        }
        
        // Check if there's a missing #end by the end of the document after a startValue
        if (lastCommand) {
            const lastLineIndex = lines.length - 1;
            const lastLine = lines[lastLineIndex].trim();
            if (!lastLine.endsWith('#end')) {
                const range = new vscode.Range(new vscode.Position(lastLineIndex, 0), new vscode.Position(lastLineIndex, lastLine.length));
                const diagnostic = new vscode.Diagnostic(range, `Missing #end command for ${lastCommand} at the end of the document.`, vscode.DiagnosticSeverity.Error);
                diagnostic.code = 'missing-end-below';
                diagnostics.push(diagnostic);
            }
        }
    }
    
    checkFloatValues(lines, diagnostics) {
        const exclusionCommands = ['#color', '#maptextcol', '#secondarycolor', '#version'];
    
        let insideQuotes = false;
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            // Check if the line starts with any of the exclusion commands
            if (exclusionCommands.some(command => line.startsWith(command))) {
                continue;
            }
    
            let lineWithoutComment = line;
            const commentIndex = line.indexOf('--');
            if (commentIndex !== -1) {
                lineWithoutComment = line.substring(0, commentIndex).trim();
            }
    
            let lineWithoutQuotes = '';
            for (let j = 0; j < lineWithoutComment.length; j++) {
                const char = lineWithoutComment[j];
                if (char === '"') {
                    insideQuotes = !insideQuotes;
                }
                if (!insideQuotes) {
                    lineWithoutQuotes += char;
                }
            }
    
            const words = lineWithoutQuotes.split(/\s+/);
            for (const word of words) {
                // Check if the word contains a period (.) indicating a potential floating-point number
                if (/\d+\./.test(word)) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(word)),
                        new vscode.Position(i, line.indexOf(word) + word.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        'Floating-point value found',
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            }
        }
    }
    

    checkColorValues(lines, diagnostics) {
        const colorCommands = ['#color', '#maptextcol', '#secondarycolor'];
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            for (const command of colorCommands) {
                if (line.startsWith(command)) {
                    const valueMatches = line.match(/(\d+\.\d+)/g);
    
                    if (valueMatches && valueMatches.length === 3) {
                        const values = valueMatches.map(match => parseFloat(match));
                        const isValid = values.every(value => value >= 0.0 && value <= 1.0);
    
                        if (!isValid) {
                            const range = new vscode.Range(
                                new vscode.Position(i, line.indexOf(valueMatches[0])),
                                new vscode.Position(i, line.indexOf(valueMatches[2]) + valueMatches[2].length)
                            );
                            const diagnostic = new vscode.Diagnostic(
                                range,
                                `Values for ${command} should be between 0.0 and 1.0`,
                                vscode.DiagnosticSeverity.Error
                            );
                            diagnostics.push(diagnostic);
                        }
                    } else {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(command)),
                            new vscode.Position(i, line.indexOf(command) + command.length)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `Invalid or missing values for ${command} command`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostic.code = 'show-hover';
                        diagnostics.push(diagnostic);
                    }
                    break; // No need to continue checking after a match
                }
            }
        }
    }
    
    checkCustomRangeValues(lines, diagnostics, command, minValue, maxValue, allowEmptyValue = false, showHover = false) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            if (line.startsWith(command)) {
                const valueMatch = line.match(/(-?\d+)/);
    
                if (valueMatch) {
                    const value = parseInt(valueMatch[0]);
                    if (value < minValue || value > maxValue) {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(valueMatch[0])),
                            new vscode.Position(i, line.indexOf(valueMatch[0]) + valueMatch[0].length)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `Value ${value} for ${command} should be between ${minValue} and ${maxValue}`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    }
                } else if (!allowEmptyValue && !line.endsWith(command)) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(command)),
                        new vscode.Position(i, line.indexOf(command) + command.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Missing or invalid value for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                } else if (!allowEmptyValue && line.endsWith(command)) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(command)),
                        new vscode.Position(i, line.indexOf(command) + command.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Value missing for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                } else if (allowEmptyValue && !line.endsWith(command)) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(command)),
                        new vscode.Position(i, line.indexOf(command) + command.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `String value not allowed for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            }
        }
    }

    checkTwoCustomRangeValues(lines, diagnostics, command, minValueSet1, maxValueSet1, minValueSet2, maxValueSet2) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            if (line.startsWith(command)) {
                const valueMatches = line.match(/(-?\d+)/g);
    
                if (valueMatches && valueMatches.length >= 2) {
                    const value1 = parseInt(valueMatches[0]);
                    const value2 = parseInt(valueMatches[1]);
    
                    if (
                        (value1 < minValueSet1 || value1 > maxValueSet1) ||
                        (value2 < minValueSet2 || value2 > maxValueSet2)
                    ) {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(valueMatches[0])),
                            new vscode.Position(i, line.indexOf(valueMatches[1]) + valueMatches[1].length)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `Values for ${command} should be within specified ranges`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    }
                } else {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(command)),
                        new vscode.Position(i, line.indexOf(command) + command.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Missing or invalid values for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostic.code = 'show-hover';
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
        this.checkColorValues(lines,diagnostics);
        this.checkCustomRangeValues(lines, diagnostics, '#newweapon', 800, 1999);
        this.checkCustomRangeValues(lines, diagnostics, '#newarmor', 300, 999);
        this.checkCustomRangeValues(lines, diagnostics, '#newmonster', 3500, 8999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#ressize', 1, 6);
        this.checkCustomRangeValues(lines, diagnostics, '#montag', 1000, 100000);
        this.checkCustomRangeValues(lines, diagnostics, '#researchlevel', 0, 9);
        //make a custom checker for #path, needs two values, just check mod manual this is complicated cuz there's two #paths. will need to check for command after previous #end
        this.checkCustomRangeValues(lines, diagnostics, '#selectnametype', 100, 299);
        this.checkCustomRangeValues(lines, diagnostics, '#newsite', 1500, 1998, true);
        this.checkTwoCustomRangeValues(lines, diagnostics, '#gems', 0, 7, 0, 99);
        this.checkCustomRangeValues(lines, diagnostics, '#level', 0, 4);
        this.checkCustomRangeValues(lines, diagnostics, '#selectnation', 5, 249);
        this.checkCustomRangeValues(lines, diagnostics, '#victorycondition', 0, 6);
        this.checkCustomRangeValues(lines, diagnostics, '#fort', 1, 29);
        this.checkTwoCustomRangeValues(lines, diagnostics, '#magicskill', 1, 10, 1, 10);
        // create a custom checker for #custommagic, needs two values 1st is path mask (from table 18) and 2nd is the chance (1 to 100)
        this.checkCustomRangeValues(lines, diagnostics, '#mainpath', 0, 7);
        this.checkCustomRangeValues(lines, diagnostics, '#secondarypath', -1, 7);
        this.checkCustomRangeValues(lines, diagnostics, '#cluster', 1, 32000);

        diagnosticCollection.set(document.uri, diagnostics);
    }

    async activate(context) {
        console.log('Error Diagnostic Provider active');
    
        this.needEndJson = await this.loadJson(context.asAbsolutePath('/json/needEnd.json'));
    
        const diagnosticCollection = vscode.languages.createDiagnosticCollection('dominionsmod');
    
        vscode.workspace.onDidOpenTextDocument(document => this.analyzeDocument(document, diagnosticCollection, this.needEndJson), this, context.subscriptions);
        vscode.workspace.onDidChangeTextDocument(event => this.analyzeDocument(event.document, diagnosticCollection, this.needEndJson), this, context.subscriptions);
        vscode.workspace.onDidCloseTextDocument(document => diagnosticCollection.delete(document.uri), null, context.subscriptions);
    
        const codeActionProvider = vscode.languages.registerCodeActionsProvider(
            'dominionsmod', // Language ID
            {
                provideCodeActions: (document, rangeOrSelection, context, token) => {
                    const fixes = [];

                    // Check if the diagnostic has the missing #end warning
                    for (const diagnostic of context.diagnostics) {
                        if (diagnostic.code === 'missing-end-above' && diagnostic.range.contains(rangeOrSelection.start)) {
                            const fix = new vscode.CodeAction('Add #end command above', vscode.CodeActionKind.QuickFix);
                            fix.edit = new vscode.WorkspaceEdit();

                            const lineToAdd = diagnostic.range.start.line;
                            const newText = '#end\n';

                            fix.edit.insert(document.uri, new vscode.Position(lineToAdd, 0), newText);

                            fix.isPreferred = true;
                            fix.diagnostics = [diagnostic];
                            fixes.push(fix);
                        } else if (diagnostic.code === 'missing-end-below' && diagnostic.range.isEqual(rangeOrSelection)) {
                            const fix = new vscode.CodeAction('Add #end command at the end of the document', vscode.CodeActionKind.QuickFix);
                            fix.edit = new vscode.WorkspaceEdit();

                            const lineToAdd = document.lineCount; // Insert at the end of the document
                            const newText = '\n#end\n';

                            fix.edit.insert(document.uri, new vscode.Position(lineToAdd, 0), newText);

                            fix.isPreferred = true;
                            fix.diagnostics = [diagnostic];
                            fixes.push(fix);
                        }
                    }

                    return fixes;
                }
            }
        );
    
        context.subscriptions.push(diagnosticCollection, codeActionProvider);
    }

    dispose() {
        
    }
}

module.exports = ErrorDiagnosticProvider;
