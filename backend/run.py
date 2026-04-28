#!/usr/bin/env python
import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

import uvicorn
from server import app

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)


