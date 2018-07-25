'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Selection, QuickPickOptions, QuickPickItem, Range, TextEditor } from 'vscode';
const { showInputBox } = vscode.window;
const { registerTextEditorCommand } = vscode.commands;


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        registerTextEditorCommand('extension.wrapLines', wrapLines),
        registerTextEditorCommand('extension.stripLines', stripLines),
        registerTextEditorCommand('extension.removeEmptyLines', removeEmptyLines),
        registerTextEditorCommand('extension.insertAfterEachLine', insertAfterEachLine)
    );
}

function wrapLines(editor: TextEditor) {

    const { selection, document } = editor;
    const text = document.getText(new Range(selection.start, selection.end));
    const lines = text.split("\n");

    showInputBox({ placeHolder: "wrap each line with" })
        .then(wrapper => {
            const wrapped = lines.map(line => `${wrapper}${line}${wrapper}`).join('\n');
            editor.edit(editBuilder => editBuilder.replace(selection, wrapped));
        });
}

function stripLines(editor: TextEditor) {

    const { selection, document } = editor;
    const text = document.getText(new Range(selection.start, selection.end));
    const lines = text.split("\n");

    showInputBox({ placeHolder: "strip from beginning and end from each line" })
        .then(wrapper => {
            const wrapped = lines.map(line => {
                let stripped = line.trim();
                if (stripped.endsWith(wrapper)) {
                    stripped = stripped.substring(0, stripped.length - 1);
                }
                if (stripped.startsWith(wrapper)) {
                    stripped = stripped.substring(1);
                }
                return stripped;
            }).join('\n');

            editor.edit(editBuilder => editBuilder.replace(selection, wrapped));
        });
}

function insertBeforeEachLine(editor) {

    const { selection, document } = editor;
    showInputBox({ placeHolder: "before each line" })
        .then(userInput => {
            const text = document.getText(new Range(selection.start, selection.end));
            const lines = text.split("\n");
            const wrapped = lines.map(line => `${userInput}${line}`).join('\n');
            editor.edit(editBuilder => editBuilder.replace(selection, wrapped));
        })
        .then(_ => {
            showInputBox({ placeHolder: "after each line" })
                .then(userInput => {
                    const text = document.getText(new Range(selection.start, selection.end));
                    const lines = text.split("\n");
                    const wrapped = lines.map(line => `${line}${userInput}`).join('\n');
                    editor.edit(editBuilder => editBuilder.replace(selection, wrapped));
                });
        });
}

function insertAfterEachLine(editor) {

    const { selection, document } = editor;

    showInputBox({ placeHolder: "after each line" })
        .then(userInput => {
            const text = document.getText(new Range(selection.start, selection.end));
            const lines = text.split("\n");
            const concatenated = lines.map(line => `${line}${userInput}`).join('\n');
            editor.edit(editBuilder => editBuilder.replace(selection, concatenated));
        });
}

function removeEmptyLines(editor) {
    const { selection, document } = editor;
    const text = document.getText(new Range(selection.start, selection.end));
    const lines = text.split("\n");

    function notOnlyWhitespace(text: string) {
        const whiteSpace = /\s/;
        return ![...text].every(c => whiteSpace.test(c));
    }

    const noEmptyLines = lines.filter(notOnlyWhitespace).join('\n');

    editor.edit(editBuilder => editBuilder.replace(selection, noEmptyLines));
}
