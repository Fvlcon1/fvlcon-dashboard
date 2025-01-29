import { RefObject } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { message } from "antd";

export const componentToPdfDownload = async (componentRef: RefObject<HTMLDivElement>, scaleFactor : number = 2) => {
    const key = "downloading";

    try {
        message.loading({ content: "downloading...", key, duration: 0 });

        if (componentRef.current) {
            const element = componentRef.current;

            // Capture the component as a canvas using html2canvas
            const canvas = await html2canvas(element, { useCORS: true });

            // Manually scale the canvas for higher resolution
            const scaledCanvas = document.createElement("canvas");
            scaledCanvas.width = canvas.width * scaleFactor; // Apply scale factor
            scaledCanvas.height = canvas.height * scaleFactor; // Apply scale factor

            const ctx = scaledCanvas.getContext("2d");
            if (ctx) {
                ctx.scale(scaleFactor, scaleFactor); // Scale the context by the factor
                ctx.drawImage(canvas, 0, 0); // Draw the original canvas onto the scaled canvas
            }

            // Create a PDF document
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4", // A4 format for the pages
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Calculate the height of the scaled content to maintain aspect ratio
            const contentWidth = scaledCanvas.width;
            const contentHeight = scaledCanvas.height;

            const scaledHeight = (contentHeight * pageWidth) / contentWidth;

            let yOffset = 0; // Tracks the current vertical position in the content

            while (yOffset < scaledCanvas.height) {
                const pageCanvas = document.createElement("canvas");
                pageCanvas.width = scaledCanvas.width;
                pageCanvas.height = Math.min(scaledCanvas.height - yOffset, scaledCanvas.width * (pageHeight / pageWidth));

                const pageCtx = pageCanvas.getContext("2d");
                if (pageCtx) {
                    pageCtx.drawImage(
                        scaledCanvas,
                        0,
                        yOffset, // Start at the current offset
                        scaledCanvas.width,
                        pageCanvas.height,
                        0,
                        0,
                        pageCanvas.width,
                        pageCanvas.height
                    );
                }

                // Convert the cropped canvas into an image
                const pageImage = pageCanvas.toDataURL("image/png");

                // Add the image to the PDF
                if (yOffset === 0) {
                    pdf.addImage(pageImage, "PNG", 0, 0, pageWidth, (pageWidth * pageCanvas.height) / pageCanvas.width);
                } else {
                    pdf.addPage();
                    pdf.addImage(pageImage, "PNG", 0, 0, pageWidth, (pageWidth * pageCanvas.height) / pageCanvas.width);
                }

                yOffset += pageCanvas.height; // Move to the next section of the content
            }

            // Trigger download
            pdf.save("document.pdf");
            message.success({ content: "download completed", key });
        } else {
            message.warning({ content: "Current value of ref is empty", key });
        }
    } catch (error) {
        message.error({ content: "Failed to generate PDF", key });
        console.error("Failed to generate PDF:", error);
    }
};
