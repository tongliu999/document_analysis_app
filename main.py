from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
from PIL import Image
import os
import sys
from reader import *
import io

app = FastAPI()

# Define allowed origins
origins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://document-analysis-app.vercel.app",
    "https://document-analysis-app-git-main-tongxu95.vercel.app",
    "https://document-analysis-app-tongxu95.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,  # Set to False since we don't need credentials
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/uploadfile/')
async def create_upload_file(file_upload: UploadFile, summarizer_value: int = Form(...)):
    data = await file_upload.read()
    
    # Process the file data directly
    image = Image.open(io.BytesIO(data))
    text = pytesseract.image_to_string(image)

    return scan(text, summarizer_value)
