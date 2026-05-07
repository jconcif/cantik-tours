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
        await client.uploadFromDir(path.join(__dirname, "../dist"));
        
        console.log("✅ ¡Subida completada con éxito!");
    } catch (err) {
        console.error("❌ Error en la subida:", err);
        process.exit(1);
    }
    client.close();
}

upload();
