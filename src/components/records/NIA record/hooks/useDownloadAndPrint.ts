import { useCallback, useEffect } from "react";
import { message } from "antd";
import { useReactToPrint } from "react-to-print";

interface UseDownloadAndPrintProps {
  refobj: React.RefObject<any>;
  statelessFilename: string;
  fvlconizedContentType?: string;
  FvlconizationlogId?: string;
  faceId?: string;
  showDownloadableComponent: boolean;
  setShowDownloadableComponent: (show: boolean) => void;
  showDownloadableComponentToPrint: boolean;
  setShowDownloadableComponentToPrint: (show: boolean) => void;
  setFilename: (filename: string) => void;
  componentToPdfDownload: (ref: React.RefObject<any>, scale: number) => Promise<void>;
}

export function useDownloadAndPrint({
  refobj,
  statelessFilename,
  fvlconizedContentType,
  FvlconizationlogId,
  faceId,
  showDownloadableComponent,
  setShowDownloadableComponent,
  showDownloadableComponentToPrint,
  setShowDownloadableComponentToPrint,
  setFilename,
  componentToPdfDownload,
}: UseDownloadAndPrintProps) {
  const reactToPrintFn = useReactToPrint({
    contentRef: refobj,
    documentTitle: "Fvlconization-log",
    onAfterPrint: () => {
      setShowDownloadableComponentToPrint(false);
    },
    onPrintError: (error: any) => {
      setShowDownloadableComponentToPrint(false);
      message.error(error.message);
    },
    onBeforePrint: async () => setShowDownloadableComponentToPrint(false),
  });

  const handlePdfDownload = useCallback(() => {
    setFilename(statelessFilename);
    if (fvlconizedContentType === "image")
      window.open(
        `/printable/fvlconizationResult/${FvlconizationlogId}?faceId=${faceId}&action=download&filename=${statelessFilename}`,
        "_blank"
      );
    if (fvlconizedContentType === "video")
      window.open(
        `/printable/video-fvlconization-result/${FvlconizationlogId}?faceId=${faceId}&action=download&filename=${statelessFilename}`,
        "_blank"
      );
  }, [statelessFilename, fvlconizedContentType, FvlconizationlogId, faceId, setFilename]);

  const getPrintableLink = useCallback((): string => {
    if (fvlconizedContentType === "image")
      return `/printable/fvlconizationResult/${FvlconizationlogId}?faceId=${faceId}`;
    if (fvlconizedContentType === "video")
      return `/printable/video-fvlconization-result/${FvlconizationlogId}?faceId=${faceId}`;
    return "/";
  }, [fvlconizedContentType, FvlconizationlogId, faceId]);

  const handlePrint = useCallback(() => {
    setShowDownloadableComponentToPrint(true);
  }, [setShowDownloadableComponentToPrint]);

  const downloadPdf = useCallback(async () => {
    try {
      setTimeout(async () => {
        await componentToPdfDownload(refobj, 1);
        setShowDownloadableComponent(false);
      }, 2000);
    } catch (error) {
      console.log({ error });
      setShowDownloadableComponent(false);
    }
  }, [componentToPdfDownload, refobj, setShowDownloadableComponent]);

  useEffect(() => {
    if (showDownloadableComponent) {
      downloadPdf();
    }
  }, [showDownloadableComponent, downloadPdf]);

  useEffect(() => {
    if (showDownloadableComponentToPrint) {
      setTimeout(() => {
        try {
          reactToPrintFn && reactToPrintFn();
        } catch (error: any) {
          console.log({ error });
          message.error(error.message);
        }
      }, 2000);
    }
  }, [showDownloadableComponentToPrint, reactToPrintFn]);

  return {
    handlePdfDownload,
    getPrintableLink,
    handlePrint,
    downloadPdf,
    reactToPrintFn,
  };
}
