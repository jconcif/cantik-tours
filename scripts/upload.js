import ftp from 'basic-ftp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function upload() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: process.env.FTP_SERVER || "45.130.228.19",
            user: process.env.FTP_USERNAME,
            password: process.env.FTP_PASSWORD,
            secure: false
        });
        
        console.log("🚀 Conectado al FTP. Empezando subida limpia...");
        
        // Entrar en public_html
        await client.cd("public_html");
        
        // Subir el contenido de dist
        await client.uploadFromDir(path.join(__dirname, "../dist"));
        
        console.log("✅ ¡Subida completada con éxito!");
    } catch (err) {
        console.error("❌ Error en la subida:", err);
        process.exit(1);
    }
    client.close();
}

upload();
