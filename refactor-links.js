import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('./src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = walk(srcDir);

files.forEach(file => {
    // Skip LocalLink itself
    if (file.endsWith('LocalLink.jsx')) return;
    if (file.endsWith('LanguageRouter.jsx')) return;

    let content = fs.readFileSync(file, 'utf8');
    
    // Process if <Link is used
    if (content.match(/<Link(\s|>)/)) {
        // Calculate relative path to LocalLink
        const localLinkPath = path.resolve('./src/components/LocalLink.jsx');
        let relativePath = path.relative(path.dirname(file), localLinkPath);
        relativePath = relativePath.replace('.jsx', '');
        if (!relativePath.startsWith('.')) {
            relativePath = './' + relativePath;
        }

        content = content.replace(/<Link(\s|>)/g, '<LocalLink$1');
        content = content.replace(/<\/Link>/g, '</LocalLink>');

        if (!content.includes('import LocalLink')) {
            content = `import LocalLink from '${relativePath}';\n` + content;
        }

        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
