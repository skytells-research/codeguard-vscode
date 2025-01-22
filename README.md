Here's the raw text for the README.md. To use it:

1. Select all text below between the triple quotes
2. Copy it (right-click → Copy or Ctrl+C)
3. Create a new file named `README.md`
4. Paste the content
5. Save the file

```
# CodeGuard 🔒

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![VSCode Version](https://img.shields.io/badge/VSCode-%3E%3D1.96.0-blue)

**Real-Time AI-Powered Code Security Analysis for VS Code**

## Features ✨

- 🚨 Real-time security threat detection (SQLi, XSS, RCE, etc.)
- 🧠 GPT-4 powered vulnerability analysis
- 🔄 Configurable debounce time (500-5000ms)
- 📊 Multi-threat probability modeling
- 🌐 Multi-language support (PHP, JS, Python, Java, etc.)

## Installation 📦

### Prerequisites
- Node.js ≥18.x
- VS Code ≥1.96.0
- OpenAI API key

### Steps
1. Install from [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=skytells.codeguard)
   ```bash
   code --install-extension codeguard-0.0.1.vsix
   ```
2. Set API key:
   ```bash
   Ctrl+Shift+P → "CodeGuard: Set OpenAI API Key"
   ```
3. Configure in `.vscode/settings.json`:
   ```json
   {
     "codeguard.model": "gpt-4",
     "codeguard.debounceTime": 1500,
     "codeguard.realTimeAnalysis": true
   }
   ```

## Usage 🛠️

### Commands
| Command | Description | Shortcut |
|---------|-------------|----------|
| `CodeGuard: Set API Key` | Configure OpenAI credentials | `Ctrl+Alt+K` |
| `CodeGuard: Toggle Real-Time` | Enable/disable live analysis | `Ctrl+Alt+R` |
| `CodeGuard: Analyze File` | Full document security audit | `Ctrl+Alt+S` |

## Technical Overview 🔬

### Supported Languages
| Language | Analysis Depth | Example Checks |
|----------|----------------|----------------|
| PHP      | Full AST       | SQLi, XSS, File Inclusion |
| Python   | Semantic       | RCE, Insecure Deserialization |
| JavaScript | Type-aware    | Prototype Pollution, XSS |

## Configuration ⚙️

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `codeguard.apiKey` | string | - | OpenAI API credentials |
| `codeguard.model` | enum | gpt-3.5-turbo | AI model version |
| `codeguard.debounceTime` | int [500-5000] | 1000 | Analysis delay (ms) |

## License 📜

MIT License - See [LICENSE](https://github.com/skytells-research/codeguard-vscode/blob/main/LICENSE)

**Research Team**: Skytells AI Research  
