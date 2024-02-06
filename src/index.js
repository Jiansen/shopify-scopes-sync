const fs = require('fs');
const dotenv = require('dotenv');
const toml = require('@iarna/toml');

function syncShopifyScopes(envPath = '.env', tomlPath = 'shopify.app.toml') {
    // Load and parse .env file
    const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
    const envVars = dotenv.parse(envFileContent);

    // Load and parse shopify.app.toml file
    const tomlFileContent = fs.readFileSync(tomlFilePath, 'utf-8');
    const tomlVars = toml.parse(tomlFileContent);

    // Extract SCOPES from both files
    const envScopes = envVars.SCOPES;
    const tomlScopes = tomlVars.access_scopes.scopes.replace(/"/g, ''); // Ensure consistency in format

    // Check if SCOPES are different
    if (envScopes !== tomlScopes) {
    // Update SCOPES in .env to match app.toml
    const updatedEnvContent = envFileContent.split('\n').map(line => {
        if (line.startsWith('SCOPES=')) {
        return `SCOPES=${tomlScopes}`;
        }
        return line;
    }).join('\n');
    
    // Write the updated content back to .env
    fs.writeFileSync(envFilePath, updatedEnvContent, 'utf-8');
    console.log('Updated .env SCOPES to match app.toml');
    } else {
    console.log('SCOPES in .env and app.toml are already the same. No update needed.');
    }
}

module.exports = syncShopifyScopes;
