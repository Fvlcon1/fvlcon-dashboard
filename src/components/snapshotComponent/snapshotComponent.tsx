import html2canvas from 'html2canvas';

const snapshotComponent = async (elementId: string): Promise<void> => {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Element with id ${elementId} not found.`);
        return;
    }

    try {
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');

        // Create a link element for downloading the image
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'snapshot.png';
        link.click();
    } catch (error) {
        console.error('Error capturing snapshot:', error);
    }
};

export default snapshotComponent