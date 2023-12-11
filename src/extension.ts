// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const VNC_PORT = 5900;

	async function openLabInstructions() {
		vscode.window.showInformationMessage('Opening Lab Instructions...');
		// Get the path to the root of the workspace
		const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

        if (rootPath) {
            // Construct the path to the README.md file
            const readmePath = path.join(rootPath, 'instructions.md');
			// const instructionsPath = path.join(rootPath, 'instructions.md');

            // Check if the README.md file exists
            if (fs.existsSync(readmePath)) {
                // Read the contents of the README.md file
                const readmeContent = fs.readFileSync(readmePath, 'utf-8');

                // Show the README content in a preview
                vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(readmePath), {
                    content: readmeContent,
                    title: 'Instructions Preview'
                });
		// Error Handling
            } else {
                vscode.window.showErrorMessage('instructions.md file not found in the root workspace directory.');
            }

        } else {
            vscode.window.showErrorMessage('No workspace is open.');
        }
	}


	openLabInstructions();


	// Register the command to launch VNC Viewer
	// Opens the VNC Viewer in the default browser, directing to localhost:5900
	let launchVncCmd = vscode.commands.registerCommand('lab-buddy.launchVNC', () => {
		vscode.window.showInformationMessage('Launching VNC Viewer...');
		vscode.env.openExternal(vscode.Uri.parse(`https://localhost:${VNC_PORT}`));
	})

	// Register the command to open the lab instructions
	// Opens the README.md file in a preview window
	let openLabInstructionsCmd = vscode.commands.registerCommand('lab-buddy.openLabInstructions', () => {
        openLabInstructions();
	})


	// Adding commands to the context
	context.subscriptions.push(launchVncCmd);
	context.subscriptions.push(openLabInstructionsCmd);


	// Create a status bar item
	const myButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

    // Set properties for the button
    myButton.text = "$(vm-running) Launch VNC";
    myButton.tooltip = "Launch VNC Viewer in default browser";
    myButton.command = "lab-buddy.launchVNC"; 

	// Show the button
	myButton.show();
}

// This method is called when your extension is deactivated
export function deactivate() {}
