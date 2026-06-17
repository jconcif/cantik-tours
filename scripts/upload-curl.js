import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env manually
try {
    const envPath = path.join(__dirname, '../.env');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = value;
    }
} catch (_) {}

const host = process.env.FTP_SERVER || "45.130.228.19";
const user = process.env.FTP_USERNAME;
const pass = process.env.FTP_PASSWORD;

if (!user || !pass) {
    console.error("❌ Faltan credenciales.");
    process.exit(1);
}

const ftpBaseUrl = `ftp://${host}/public_html`;

console.log("🚀 Starting upload with cURL (disable-epsv)...");

const uploadFile = (localFilePath, remoteFilePath) => {
    const command = `curl --disable-epsv --ftp-create-dirs -u "${user}:${pass}" -T "${localFilePath}" "${ftpBaseUrl}/${remoteFilePath}"`;
    try {
        console.log(`📤 Uploading: ${remoteFilePath}...`);
        execSync(command, { stdio: 'ignore' });
        console.log(`✅ Success: ${remoteFilePath}`);
    } catch (err) {
        console.error(`❌ Failed: ${remoteFilePath}`, err.message);
    }
};

const localDist = path.join(__dirname, '../dist');

// Upload root files
const rootFiles = ["index.html", "sitemap.xml", "robots.txt", ".htaccess", "favicon.png", "apple-touch-icon.png"];
for (const file of rootFiles) {
    const localFile = path.join(localDist, file);
    if (fs.existsSync(localFile)) {
        uploadFile(localFile, file);
    }
}

// Upload assets
const localAssets = path.join(localDist, 'assets');
if (fs.existsSync(localAssets)) {
    const files = fs.readdirSync(localAssets);
    for (const file of files) {
        const localFile = path.join(localAssets, file);
        uploadFile(localFile, `assets/${file}`);
    }
}

console.log("🎉 cURL Deploy completed!");
