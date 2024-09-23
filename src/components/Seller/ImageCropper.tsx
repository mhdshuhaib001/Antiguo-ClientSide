import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

export type CroppedAreaPixels = {
    width: number;
    height: number;
    x: number;
    y: number;
};

type ImageCropperProps = {
    image: string;
    onCropComplete: (croppedAreaPixels: CroppedAreaPixels) => void;
    onClose: () => void;
    onChange: () => void; 
};

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCropComplete, onClose, onChange }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
    const [aspectRatio, setAspectRatio] = useState(4 / 3);

    const handleCropComplete = useCallback((croppedAreaPercentage: any, croppedAreaPixels: CroppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
        onCropComplete(croppedAreaPixels);
    }, [onCropComplete]);

    const handleZoomChange = (newZoom: number) => {
        if (newZoom > 1 && newZoom < 3) {
            setZoom(newZoom);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: 'black', padding: '20px' }}>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={handleZoomChange}
                style={{
                    containerStyle: {
                        width: '100%',
                        height: '80%',
                        backgroundColor: '#fff',
                    },
                }}
            />
            <div>
                <label>
                    Aspect Ratio:
                    <select value={aspectRatio} onChange={(e) => setAspectRatio(Number(e.target.value))}>
                        <option value={4 / 3}>4:3</option>
                        <option value={1}>1:1</option>
                        <option value={16 / 9}>16:9</option>
                    </select>
                </label>
            </div>
            {/* Close and Change Buttons */}
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={onClose} style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Close</button>
                <button onClick={onChange} style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Change</button>
            </div>
        </div>
    );
    
};

export default ImageCropper;
