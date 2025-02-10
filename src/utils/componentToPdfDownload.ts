import { RefObject } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { message } from "antd";

export const componentToPdfDownload = async (componentRef: RefObject<HTMLDivElement>, scaleFactor: number = 2, filename? : string) => {
    const key = "downloading";

    try {
        message.loading({ content: "Downloading...", key, duration: 0 });

        if (componentRef.current) {
            const element = componentRef.current;

            // Ensure all Next.js images are fully loaded before capturing
            const images = element.querySelectorAll("img");
            await Promise.all(
                Array.from(images).map((img) => {
                    return new Promise((resolve, reject) => {
                        if (img.complete) resolve(true);
                        img.onload = () => resolve(true);
                        img.onerror = () => reject(new Error(`Image failed to load: ${img.src}`));
                    });
                })
            );

            // Capture component as a canvas
            const canvas = await html2canvas(element, { useCORS: true, allowTaint: true });

            // Manually scale the canvas for higher resolution
            const scaledCanvas = document.createElement("canvas");
            scaledCanvas.width = canvas.width * scaleFactor;
            scaledCanvas.height = canvas.height * scaleFactor;

            const ctx = scaledCanvas.getContext("2d");
            if (ctx) {
                ctx.scale(scaleFactor, scaleFactor);
                ctx.drawImage(canvas, 0, 0);
            }

            // Create a PDF document
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4",
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const contentWidth = scaledCanvas.width;
            const contentHeight = scaledCanvas.height;
            const scaledHeight = (contentHeight * pageWidth) / contentWidth;

            let yOffset = 0;

            while (yOffset < scaledCanvas.height) {
                const pageCanvas = document.createElement("canvas");
                pageCanvas.width = scaledCanvas.width;
                pageCanvas.height = Math.min(scaledCanvas.height - yOffset, scaledCanvas.width * (pageHeight / pageWidth));

                const pageCtx = pageCanvas.getContext("2d");
                if (pageCtx) {
                    pageCtx.drawImage(
                        scaledCanvas,
                        0,
                        yOffset,
                        scaledCanvas.width,
                        pageCanvas.height,
                        0,
                        0,
                        pageCanvas.width,
                        pageCanvas.height
                    );
                }

                const pageImage = pageCanvas.toDataURL("image/png");

                if (yOffset === 0) {
                    pdf.addImage(pageImage, "PNG", 0, 0, pageWidth, (pageWidth * pageCanvas.height) / pageCanvas.width);
                } else {
                    pdf.addPage();
                    pdf.addImage(pageImage, "PNG", 0, 0, pageWidth, (pageWidth * pageCanvas.height) / pageCanvas.width);
                }

                yOffset += pageCanvas.height;
            }

            pdf.save(filename ? `${filename}.pdf` : "document.pdf");
            message.success({ content: "Download completed", key });
        } else {
            message.warning({ content: "Component not found", key });
        }
    } catch (error) {
        message.error({ content: "Failed to generate PDF", key });
        console.error("Failed to generate PDF:", error);
    }
};
