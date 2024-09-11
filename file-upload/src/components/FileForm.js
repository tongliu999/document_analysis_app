import React, { useState } from 'react';

function FileForm() {
    const [file, setFile] = useState(null);
    const [sliderValue, setSliderValue] = useState(50); // Initial value for the slider

    const handleFileInputChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('file_upload', file);
        formData.append('summarizer_value', sliderValue); // Append the slider value

        try {
            const endpoint = 'http://localhost:8000/uploadfile/';
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file');
            }
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Upload file</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <input type="file" onChange={handleFileInputChange} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="summarizer_value">Summarizer Value: {sliderValue}</label>
                    <input 
                        type="range" 
                        id="summarizer_value" 
                        name="summarizer_value" 
                        min="0" 
                        max="100" 
                        step="1" 
                        value={sliderValue} 
                        onChange={handleSliderChange}
                    />
                </div>
                <button type="submit">Upload</button>
            </form>

            {file && <p>{file.name}</p>}
        </div>
    );
}

export default FileForm;
