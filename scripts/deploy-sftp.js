import Client from 'ssh2-sftp-client';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env manually for local testing
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
} catch (_) { /* env file not found, rely on system environment variables */ }

async function deploy() {
    const sftp = new Client();
    
    const host = process.env.FTP_SERVER || "45.130.228.19";
    const username = process.env.FTP_USERNAME;
    const password = process.env.FTP_PASSWORD;

    if (!username || !password) {
        console.error("❌ Faltan las credenciales (FTP_USERNAME o FTP_PASSWORD) en las variables de entorno.");
        process.exit(1);
    }

    try {
        console.log(`Connecting to ${host}:65002 as ${username}...`);
        await sftp.connect({
            host: host,
            port: 65002,
            username: username,
            password: password,
            readyTimeout: 30000
        });

        console.log("🚀 Conectado por SFTP.");

        // List root to find where we are
        const list = await sftp.list('.');
        console.log("📂 Contenido en raíz remota:", list.map(f => f.name).join(", "));

        // Autodetect path
        let remotePath = '';
        if (list.some(f => f.name === 'domains')) {
            remotePath = 'domains/cantiktours.com/public_html';
        } else if (list.some(f => f.name === 'public_html')) {
            remotePath = 'public_html';
        } else {
            remotePath = '.';
        }

        console.log(`📁 Ruta de destino resuelta: ${remotePath}`);

        const localDist = path.join(__dirname, '../dist');

        // 1. Upload root files in /dist
        const rootFiles = ["index.html", "sitemap.xml", "robots.txt", ".htaccess", "favicon.png", "apple-touch-icon.png", "manifest.json", "sw.js"];
        for (const file of rootFiles) {
            const localFile = path.join(localDist, file);
            if (fs.existsSync(localFile)) {
                await sftp.put(localFile, `${remotePath}/${file}`);
                console.log(`✅ Subido: ${file}`);
            }
        }

        // 2. Upload assets folder recursively
        const localAssets = path.join(localDist, 'assets');
        if (fs.existsSync(localAssets)) {
            console.log("📤 Subiendo la carpeta de assets...");
            const remoteAssetsPath = `${remotePath}/assets`;

            const assetsFolderExists = await sftp.exists(remoteAssetsPath);
            if (!assetsFolderExists) {
                await sftp.mkdir(remoteAssetsPath, true);
            }

            const files = fs.readdirSync(localAssets);
            for (const file of files) {
                await sftp.put(path.join(localAssets, file), `${remoteAssetsPath}/${file}`);
            }
            console.log("✅ Assets subidos correctamente.");
        }

        console.log("🎉 ¡Despliegue por SFTP completado con éxito!");

    } catch (err) {
        console.error("❌ Error durante la subida por SFTP:", err);
        process.exit(1);
    } finally {
        await sftp.end();
    }
}

deploy();
