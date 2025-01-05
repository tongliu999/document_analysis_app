import React, { useState } from 'react';

function FileForm() {
    const [file, setFile] = useState(null);
    const [sliderValue, setSliderValue] = useState(50);

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
        formData.append('summarizer_value', sliderValue);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <section className="upload-section">
                <header>
                    <h1>Upload File</h1>
                </header>

                <form 
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    aria-label="File upload form"
                >
                    <fieldset>
                        <legend>File Selection</legend>
                        <div>
                            <label htmlFor="file-input">
                                Select a file to upload:
                            </label>
                            <input 
                                type="file"
                                id="file-input"
                                name="file-input"
                                onChange={handleFileInputChange}
                                aria-required="true"
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Summarization Options</legend>
                        <div>
                            <label htmlFor="summarizer_value">
                                Summarization Level: {sliderValue}%
                            </label>
                            <input 
                                type="range"
                                id="summarizer_value"
                                name="summarizer_value"
                                min="0"
                                max="100"
                                step="1"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-valuenow={sliderValue}
                            />
                        </div>
                    </fieldset>

                    <div>
                        <button 
                            type="submit"
                            aria-label="Upload file"
                        >
                            Upload
                        </button>
                    </div>
                </form>

                {file && (
                    <footer>
                        <p>
                            Selected file: <strong>{file.name}</strong>
                        </p>
                    </footer>
                )}
            </section>
        </main>
    );
}

export default FileForm;
