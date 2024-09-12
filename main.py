from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
from PIL import Image
import os
import sys
from reader import *
import io

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
    
    # Process the file data directly
    image = Image.open(io.BytesIO(data))
    text = pytesseract.image_to_string(image)

    return scan(text, summarizer_value)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)