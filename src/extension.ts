// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
const pdf2md = require('@opendocsg/pdf2md');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const VNC_PORT = 5900;

		//helper function that converts a pdf file in root directory to a markdown file
		// async function convertPdfToMd (pdfPath: string) {
		// 	//use pdf2md library to convert pdf in root folder to instructions.md markdown file, fully replacing it

		// 	const pdfBuffer = fs.readFileSync(pdfPath);
		// 	console.log("converting instructions to markdown...");
		// 	pdf2md(pdfBuffer).then((text: any) => {
		// 		// Write the markdown file to the root directory
		// 		fs.writeFileSync(path.join(vscode.workspace.workspaceFolders?.[0].uri.fsPath!, 'instructions.md'), text);
		// 	})		
		// }

	async function openLabInstructions() {
		vscode.window.showInformationMessage('Opening Lab Instructions...');
		// Get the path to the root of the workspace
		const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

		// check if there is a pdf file in the root directory
		// if there is, convert it to a markdown file using convertPdfToMd()
		// if (fs.existsSync(path.join(rootPath!, 'instructions.pdf'))) {
		// 	await convertPdfToMd(path.join(rootPath!, 'instructions.pdf'));
		// }	

        if (rootPath) {
            // Construct the path to the README.md file
            const readmePath = path.join(rootPath, 'README.md');
			// const instructionsPath = path.join(rootPath, 'instructions.md');

            // Check if the README.md file exists
            if (fs.existsSync(readmePath)) {
                // Read the contents of the README.md file
                const readmeContent = fs.readFileSync(readmePath, 'utf-8');

                // Show the README content in a preview
                vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(readmePath), {
                    content: readmeContent,
                    title: 'README.md Preview'
                });
		// Error Handling
            } else {
                vscode.window.showErrorMessage('README.md file not found in the root workspace directory.');
            }

			// // Check if the instructions.md file exists
			// if (fs.existsSync(instructionsPath)) {
			// 	// Read the contents of the instructions.md file
			// 	const instructionsContent = fs.readFileSync(instructionsPath, 'utf-8');

			// 	// Show the instructions content in a preview
			// 	vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(instructionsPath), {
			// 		content: instructionsContent,
			// 		title: 'instructions.md Preview'
			// 	});
			// } else {
			// 	vscode.window.showErrorMessage('instructions.md file not found in the root workspace directory.');
			// }
        } else {
            vscode.window.showErrorMessage('No workspace is open.');
        }
	}

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lab-buddy" is now active!');

	openLabInstructions();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let helloWorldCmd = vscode.commands.registerCommand('lab-buddy.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Lab Buddy!');
	});

	// Register the command to launch VNC Viewer
	// Opens the VNC Viewer in the default browser, directing to localhost:5900
	let launchVncCmd = vscode.commands.registerCommand('lab-buddy.launchVNC', () => {
		vscode.window.showInformationMessage('Launching VNC Viewer...');
		vscode.env.openExternal(vscode.Uri.parse(`https://localhost:${VNC_PORT}`));
	})

	let openLabInstructionsCmd = vscode.commands.registerCommand('lab-buddy.openLabInstructions', () => {
		vscode.window.showInformationMessage('Opening Lab Instructions...');
		// Get the path to the root of the workspace
		const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

        if (rootPath) {
            // Construct the path to the README.md file
            const readmePath = path.join(rootPath, 'README.md');

            // Check if the README.md file exists
            if (fs.existsSync(readmePath)) {
                // Read the contents of the README.md file
                const readmeContent = fs.readFileSync(readmePath, 'utf-8');

                // Show the README content in a preview
                vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(readmePath), {
                    content: readmeContent,
                    title: 'README.md Preview'
                });
		// Error Handling
            } else {
                vscode.window.showErrorMessage('README.md file not found in the root workspace directory.');
            }
        } else {
            vscode.window.showErrorMessage('No workspace is open.');
        }
	})


	// Adding commands to the context
	context.subscriptions.push(helloWorldCmd);
	context.subscriptions.push(launchVncCmd);
	context.subscriptions.push(openLabInstructionsCmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
