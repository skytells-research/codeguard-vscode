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

### Getting an OpenAI API Key
1. Visit [OpenAI's platform](https://platform.openai.com/signup)
2. Create or log into your account
3. Go to [API Keys section](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy your API key (store it safely - you won't be able to see it again!)

### Steps
1. Install from [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=skytells.codeguard)


   ```bash
   code --install-extension skytells.codeguard
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
