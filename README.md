# Math Presentation Template

Dieses Projekt bietet ein einfaches Template, um aus einer Markdown-Datei eine interaktive Web-Präsentation zu erzeugen. Es basiert auf [reveal.js](https://revealjs.com/) und nutzt KaTeX für mathematische Formeln.

## Vorbereitung

Installiere zunächst die Abhängigkeiten:

```bash
npm install
```

## Eigene Folien erstellen

Die Datei `slides/slides.md` enthält die Beispielpräsentation. Ersetze deren Inhalt durch deine eigenen Folien. Die Slides werden im Markdown durch `---` getrennt.

## Build

Mit

```bash
npm run build
```

wird im Ordner `dist` eine statische Präsentation erzeugt (`index.html` und benötigte Assets). Diese kann direkt im Browser geöffnet oder auf einen Webserver geladen werden.

## Features

- Dunkles Standard-Theme
- Formeln werden automatisch einzeln eingeblendet
- Slide-Wechsel mit sanfter Animation
- Unterstützung für interaktive Desmos-Graphen über eingebettete iframes (Beispiele können in Markdown ergänzt werden)


