# markdown-to-asciidoc package

A plugin for Atom that converts markdown to asciidoc. Leverages the java module for node.js by joeferner[1] to call the markdown-to-asciidoc Java library written by bodian[2].

The first conversion will take much longer than subsequent conversions due to the overhead incurred by initializing the Java runtime.

[1]https://github.com/joeferner/node-java

[2]https://github.com/bodiam/markdown-to-asciidoc
