# markdown-to-asciidoc package

An Atom plugin that wraps the IntelliJ markdown-to-asciidoc plugin[1]. Uses node-java as the bridge to the converter class[2].

The first conversion after starting Atom will take much longer than subsequent conversions due to the overhead of initializing the Java runtime.

[1]https://github.com/bodiam/markdown-to-asciidoc

[2]https://github.com/joeferner/node-java
