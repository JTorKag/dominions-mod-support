const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "Dominions Mod Support" is now active!');
/*
    let disposable = vscode.commands.registerCommand('extension.mamar', () => {
        vscode.window.showInformationMessage("The Star Rod... is powerful beyond belief. It can grant any wish. For as long as we can remember, Bowser has been making wishes like, for instance... 'I'd like to trounce Mario' or 'I want Princess Peach to like me.' Of course, Stars ignore such selfish wishes. As a result, his wishes were never granted.");
    });

    context.subscriptions.push(disposable);
*/
    vscode.languages.registerHoverProvider('dominionsmod', {
        provideHover(document, position, token) {

            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            if (word == "newevent") {

                return new vscode.Hover({
                    language: "Hello language",
                    value: "Hello Value"
                });
            }
        }
    });
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}