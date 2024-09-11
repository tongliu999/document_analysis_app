from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import pytesseract
from PIL import Image
import os
import sys
from reader import *

UPLOAD_DIR = Path() / 'uploads'

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/uploadfile/')
async def create_upload_file(file_upload: UploadFile, summarizer_value: int = Form(...)):
    data = await file_upload.read()
    save_to = UPLOAD_DIR / file_upload.filename
    with open(save_to, 'wb') as f:
        f.write(data)    

    print(f"Summarizer Value: {summarizer_value}")

    return scan(summarizer_value)