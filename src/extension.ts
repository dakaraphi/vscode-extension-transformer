'use strict';
import * as vscode from 'vscode';
import * as transforms from './Transforms';
import * as edit from 'vscode-extension-common'
/**
 * TODO - planned features:
 * - unique selections as new document
 * - unique words as new document
 * - filter sections based on text found in levels to the right
 * - count unique lines to new document, duplicates
 * - trim lines
 * - trim identical parts of lines
 * - sort folding regions / sort sections as determined by each cursor location
 * - split/join lines using token or expression
 * - Live realtime filtering view. click on filtered lines to jump to location.  Line numbers with filtered content
 *  - combined live filter from all open documents.
 * - Power selections
 *  - all lines containing...
 *  - remove selections containing...
 *  - all lines with same level
 *  - expand selection that can work with multiple cursors
 * - scrapbook transformations
 * - escapes and unescapes
 * - hex/bin/dec
 * - wrap at designated length
 * - selection as single JSON string
 */

interface LinkedDocument {
    source: vscode.TextDocument;
    target: vscode.TextDocument;
} 

export function activate(context: vscode.ExtensionContext) {
    let disposable;

    disposable = vscode.commands.registerCommand('dakara-transformer.sortLines', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selections = textEditor.selections;
        transforms.sortLines(textEditor, selections);
    });

    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('dakara-transformer.reverseLines', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selections = textEditor.selections;
        edit.reverseLines(textEditor, selections);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.uniqueLines', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selections = textEditor.selections;
        transforms.uniqueLines(textEditor, selections);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.uniqueLinesNewDocument', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selections = textEditor.selections;
        transforms.uniqueLinesToNewDocument(textEditor, selections);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.sortByLineLength', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selections = textEditor.selections;
        transforms.sortLinesByLength(textEditor, selections);
    });
    context.subscriptions.push(disposable)
    
    disposable = vscode.commands.registerCommand('dakara-transformer.filter', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selection = textEditor.selection;
        transforms.filterLines(textEditor, selection)
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.filterAsNewDocument', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selection = textEditor.selection;
        transforms.filterLinesToNewDocument(textEditor, selection)
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.filterContextAsNewDocument', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selection = textEditor.selection;
        transforms.filterLinesWithContextToNewDocument(textEditor, selection)
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.liveTransform', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selection = textEditor.selection;
        transforms.liveTransform(textEditor, selection)
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.alignCursor', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selections = textEditor.selections;
        transforms.alignToCursor(textEditor, selections);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.alignCSV', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selections = textEditor.selections;
        transforms.alignCSV(textEditor, selections);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.compactCSV', () => {
        const textEditor = vscode.window.activeTextEditor;
        const selections = textEditor.selections;
        transforms.compactCSV(textEditor, selections);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.commands', () => {
        const textEditor = vscode.window.activeTextEditor;
        const commands = vscode.commands.getCommands().then(commandList => {
            const content = commandList.reduce((prev, curr) => prev + '\n' + curr);
            return edit.openShowDocument('untitled:commands.txt', content);
        })
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.copyToNewDocument', () => {
        const textEditor = vscode.window.activeTextEditor;
        transforms.copyToNewDocument(textEditor);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.selectLines', () => {
        const textEditor = vscode.window.activeTextEditor;
        transforms.selectLines(textEditor);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('dakara-transformer.linesAsJSON', () => {
        const textEditor = vscode.window.activeTextEditor;
        transforms.linesAsJSON(textEditor);
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {
}