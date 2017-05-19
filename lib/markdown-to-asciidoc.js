'use babel';

import MarkdownToAsciidocView from './markdown-to-asciidoc-view';
import { CompositeDisposable, File } from 'atom';

var path = require('path');
var java = require("java");
console.log('Setting jvm options.');
java.options.push('-Djava.awt.headless=true');
java.options.push('-Xmx100m');
java.options.push('-Xmx100m');

export default {

  markdownToAsciidocView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.markdownToAsciidocView = new MarkdownToAsciidocView(state.markdownToAsciidocViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.markdownToAsciidocView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that converts this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'markdown-to-asciidoc:convert': () => this.convert()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.markdownToAsciidocView.destroy();
  },

  serialize() {
    return {
      markdownToAsciidocViewState: this.markdownToAsciidocView.serialize()
    };
  },

  convert() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      console.log('Converting ' + editor.getPath() + ' to asciidoc.');
      java.classpath.push(path.resolve(__dirname, "markdown_to_asciidoc-1.0.jar"));
      java.classpath.push(path.resolve(__dirname, "asm-all-4.1.jar"));
      java.classpath.push(path.resolve(__dirname, "jsoup-1.8.1.jar"));
      java.classpath.push(path.resolve(__dirname, "parboiled-core-1.1.6.jar"));
      java.classpath.push(path.resolve(__dirname, "parboiled-java-1.1.6.jar"));
      java.classpath.push(path.resolve(__dirname, "pegdown-1.4.2.jar"));
      console.log('Added classpath.');

      //var result = java.callStaticMethodSync("nl.jworks.markdown_to_asciidoc.Converter", "convertMarkdownToAsciiDoc", editor.getText());

      java.callStaticMethod("nl.jworks.markdown_to_asciidoc.Converter", "convertMarkdownToAsciiDoc", editor.getText(), function(err, results) {
        if(err) { console.error(err); return; }
        console.log('Have result.');
        editor.setText(results);
      });

      //console.log('Have result.');
      //editor.setText(result);
    }
  }

};
