import { CroppedAreaPixels } from "../components/Seller/ImageCropper";

const getCroppedImg = (imageSrc: string, pixelCrop: CroppedAreaPixels): Promise<string> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            // Set canvas dimensions to the cropped area
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            // Draw the cropped image on the canvas
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            // Convert canvas to blob
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Failed to create a blob'));
                    return;
                }
                // Create a file URL
                const fileUrl = URL.createObjectURL(blob);
                resolve(fileUrl); 
            }, 'image/jpeg');
        };
        image.onerror = (error) => {
            reject(new Error('Image loading error: ' + error));
        };
    });
};

  export default getCroppedImg