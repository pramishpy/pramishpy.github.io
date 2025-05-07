import http.server
import socketserver
import webbrowser
import os
import sys
from urllib.parse import urlparse

# Configuration
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        """Override to provide more useful request logging"""
        path = urlparse(self.path).path
        sys.stdout.write(f"\033[92m[{self.log_date_time_string()}] Served: {path}\033[0m\n")

def run_server():
    """Start the HTTP server"""
    handler = CustomHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        server_address = f"http://localhost:{PORT}"
        print(f"\033[1;34m[Server] Starting local server at \033[1;33m{server_address}\033[0m")
        print(f"\033[1;34m[Server] Serving files from: \033[1;33m{DIRECTORY}\033[0m")
        print("\033[1;34m[Server] Press Ctrl+C to stop the server\033[0m")
        
        # Open the website in the default browser
        webbrowser.open(server_address)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\033[1;34m[Server] Server stopped by user\033[0m")
            httpd.server_close()

if __name__ == "__main__":
    run_server()
