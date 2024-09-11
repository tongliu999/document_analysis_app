from pathlib import Path
import pytesseract
from PIL import Image
import os
import sys
from summary import summarize

def scan(per): 
    path ="C:\\document_analysis_app\\uploads"

    tempPath ="C:\\document_analysis_app\\newFiles"

    for imageName in os.listdir(path): 
              
        inputPath = os.path.join(path, imageName) 
        img = Image.open(inputPath) 
  
        text = pytesseract.image_to_string(img, lang ="eng") 
  
        imageName = imageName.split('.')[0]
  
        fullTempPath = os.path.join(tempPath, 'time_'+imageName+".txt") 
        
        text = summarize(text, per/100) 
        text = text.replace('\n', ' ')

        os.remove(inputPath)  
    
    return {text, per}