#!/usr/bin/env python3
"""
Cantik Tours Development Server
Serves static files with proper MIME types for modern JavaScript
"""

import http.server
import socketserver
import sys

PORT = 8000

# Configure the handler BEFORE creating instances
http.server.SimpleHTTPRequestHandler.extensions_map['.jsx'] = 'text/javascript'
http.server.SimpleHTTPRequestHandler.extensions_map['.js'] = 'text/javascript'
http.server.SimpleHTTPRequestHandler.extensions_map['.mjs'] = 'text/javascript'

# Allow reuse
socketserver.TCPServer.allow_reuse_address = True

if __name__ == '__main__':
    Handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"🚀 Cantik Tours running at http://localhost:{PORT}/")
            print(f"✅ JSX support enabled")  
            print(f"\nPress Ctrl+C to stop\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:
            print(f"\n❌ Port {PORT} is already in use!")
            print("Run: lsof -ti:8000 | xargs kill -9")
            sys.exit(1)
        raise
