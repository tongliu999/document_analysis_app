from pathlib import Path
import pytesseract
from PIL import Image
import os
import sys
from summary import summarize

def scan(text, per): 
    #path ="C:\\document_analysis_app\\uploads"
    #tempPath ="C:\\document_analysis_app\\newFiles"           
    #inputPath = os.path.join(path, imageName) 
    #img = Image.open(inputPath) 

    text = summarize(text, per/100) 
    text = text.replace('\n', ' ')
    return text