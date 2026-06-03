import ftp from 'basic-ftp';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env manually (no dotenv dependency needed)
try {
    const envPath = path.join(__dirname, '../.env');
    const envContent = readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = value;
    }
} catch (_) { /* .env not found, rely on system env vars */ }

async function upload() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    client.ftp.timeout = 120000;
    try {
        if (!process.env.FTP_USERNAME || !process.env.FTP_PASSWORD) {
            throw new Error("❌ Faltan las credenciales FTP (FTP_USERNAME o FTP_PASSWORD) en las variables de entorno.");
        }

        await client.access({
            host: process.env.FTP_SERVER || "45.130.228.19",
            user: process.env.FTP_USERNAME,
            password: process.env.FTP_PASSWORD,
            secure: false
        });
        
        console.log("🚀 Conectado al FTP.");
        
        // Listar archivos para saber dónde estamos
        const list = await client.list();
        console.log("📂 Archivos en el servidor:", list.map(f => f.name).join(", "));
        
        const hasPublicHtml = list.some(f => f.name === "public_html");
        
        if (hasPublicHtml) {
            console.log("📁 Entrando en public_html...");
            await client.cd("public_html");
        } else {
            console.log("ℹ️ Ya parecemos estar en la carpeta destino o public_html no existe aquí.");
        }
        
        console.log("📤 Subiendo archivos de dist...");
        
        // Subir archivos individuales de la raíz de dist
        const rootFiles = ["index.html", "sitemap.xml", "robots.txt", ".htaccess", "favicon.png", "apple-touch-icon.png"];
        for (const file of rootFiles) {
            try {
                await client.uploadFrom(path.join(__dirname, "../dist", file), file);
                console.log(`✅ Subido: ${file}`);
            } catch (err) {
                console.warn(`⚠️ No se pudo subir ${file}:`, err.message);
            }
        }
        
        // Subir la carpeta de assets
        console.log("📤 Subiendo carpeta de assets...");
        await client.ensureDir("assets");
        await client.uploadFromDir(path.join(__dirname, "../dist/assets"));
        await client.cd("..");
        
        console.log("✅ ¡Subida completada con éxito (omitido directorio de imágenes estáticas)!");
    } catch (err) {
        console.error("❌ Error en la subida:", err);
        process.exit(1);
    }
    client.close();
}

upload();
