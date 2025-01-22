import * as vscode from 'vscode';
import axios from 'axios';

interface OpenAIResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
    console.log('CodeGuard extension is now active.');

    diagnosticCollection = vscode.languages.createDiagnosticCollection('CodeGuard');
    let timeout: NodeJS.Timeout | undefined;

    // Command to set API Key
    const setApiKeyCommand = vscode.commands.registerCommand('codeguard.setApiKey', async () => {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your OpenAI API key',
            password: true
        });

        if (apiKey) {
            await vscode.workspace.getConfiguration().update(
                'codeguard.apiKey',
                apiKey,
                vscode.ConfigurationTarget.Global
            );
            vscode.window.showInformationMessage('API key saved successfully!');
        }
    });

    // Command to analyze the document
    const analyzeFileCommand = vscode.commands.registerCommand('codeguard.analyzeFile', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            analyzeDocument(editor.document);
        } else {
            vscode.window.showWarningMessage('Open a file to analyze.');
        }
    });

    // Command to toggle real-time analysis
    const toggleRealTimeAnalysisCommand = vscode.commands.registerCommand('codeguard.toggleRealTimeAnalysis', async () => {
        const config = vscode.workspace.getConfiguration('codeguard');
        const currentSetting = config.get<boolean>('realTimeAnalysis', false);
        await config.update('codeguard.realTimeAnalysis', !currentSetting, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`Real-time analysis ${!currentSetting ? 'enabled' : 'disabled'}.`);
        initializeAnalysis();
    });

    context.subscriptions.push(setApiKeyCommand, analyzeFileCommand, toggleRealTimeAnalysisCommand);

    const initializeAnalysis = () => {
        const config = vscode.workspace.getConfiguration('codeguard');
        if (config.get<boolean>('realTimeAnalysis', false)) {
            vscode.workspace.onDidChangeTextDocument(event => {
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(() => analyzeDocument(event.document), config.get('debounceTime', 1000));
            });
        }
    };

    const config = vscode.workspace.getConfiguration('codeguard');
    if (config.get('apiKey')) {
        initializeAnalysis();
    } else {
        vscode.window.showWarningMessage('CodeGuard: Please set your OpenAI API key first!');
    }
}

async function analyzeDocument(document: vscode.TextDocument) {
    const config = vscode.workspace.getConfiguration('codeguard');
    const apiKey = config.get<string>('apiKey');
    const model = config.get<string>('model', 'gpt-4');

    if (!apiKey) {
        vscode.window.showErrorMessage('No API key found. Please set it using "CodeGuard: Set OpenAI API Key".');
        return;
    }

    try {
        vscode.window.showInformationMessage('Analyzing document for security threats...');
        
        const prompt = `
            Analyze the following PHP code for potential security vulnerabilities such as SQL injection, 
            XSS, and insecure coding practices. Provide the line numbers where vulnerabilities are detected 
            and a brief explanation of the issue. Also make sure to analyze possible security threats in a logical way.
            \n\n${document.getText()}
        `;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: model,
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const result: OpenAIResponse = response.data;
        const analysisResult = result.choices[0]?.message?.content ?? '';

        if (!analysisResult.trim()) {
            vscode.window.showInformationMessage('No security threats detected.');
            diagnosticCollection.clear();
            return;
        }

        const diagnostics: vscode.Diagnostic[] = [];
        const lines = document.getText().split('\n');

        analysisResult.split('\n').forEach((threat) => {
            const match = threat.match(/line (\d+)/i);
            if (match) {
                const lineNumber = parseInt(match[1]) - 1;
                if (lineNumber >= 0 && lineNumber < document.lineCount) {
                    const line = lines[lineNumber];
                    const diagnostic = new vscode.Diagnostic(
                        new vscode.Range(lineNumber, 0, lineNumber, line.length),
                        `Security threat detected: ${threat}`,
                        vscode.DiagnosticSeverity.Warning
                    );
                    diagnostics.push(diagnostic);
                }
            }
        });

        if (diagnostics.length > 0) {
            diagnosticCollection.set(document.uri, diagnostics);
            vscode.window.showInformationMessage(`Analysis complete. ${diagnostics.length} security warning(s) added.`);
        } else {
            diagnosticCollection.clear();
            vscode.window.showInformationMessage('No security threats detected.');
        }
    } catch (error: any) {
        vscode.window.showErrorMessage(`Failed to analyze document: ${error.message}`);
    }
}


export function deactivate() {
    console.log('CodeGuard extension has been deactivated.');
}
