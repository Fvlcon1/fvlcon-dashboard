import { hexOpacity } from "@/utils/hexOpacity";
import ZoomImage from "@components/zoomImage/zoomImage";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { message, Progress } from "antd";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { FaCircle, FaPrint, FaRegCircleDot } from "react-icons/fa6";
import { MdCloudDownload } from "react-icons/md";
import { FvlconizationLogsTypes } from "../fvlconizationLogs.types";
import { getRelativeTime, getTime } from "@/utils/getDate";
import { TypographySize } from "@styles/style.types";
import NoData from "@components/NoData/noData";
import ClickableTab from "@components/clickable/clickabletab";
import { componentToPdfDownload } from "@/utils/componentToPdfDownload";
import DownloadableComponent from "./downloadableComponent";
import { useReactToPrint } from "react-to-print";
import { AnimatePresence } from "framer-motion";

const TableBody = ({
  data,
}: {
  data: FvlconizationLogsTypes[];
}) => {
  const [zoom, setZoom] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [personData, setPersonData] = useState<FvlconizationLogsTypes | null>(
    null
  );
  const [showDownloadableComponent, setShowDownloadableComponent] =
    useState(false);
  const [showDownloadableComponentToPrint, setShowDownloadableComponentToPrint] =
    useState(false);
  const refobj = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef : refobj,
    documentTitle: "Fvlconization-log",
    onAfterPrint: () => {
      setShowDownloadableComponentToPrint(false);
      setPersonData(null); // Clear the state after printing
    },
    onPrintError: (error : any) => {
      setShowDownloadableComponentToPrint(false);
      message.error(error.message);
    },
    onBeforePrint : async () => setShowDownloadableComponentToPrint(false)
  });

  const handlePdfDownload = (data: FvlconizationLogsTypes) => {
    setPersonData(data); // Set the person data
    setShowDownloadableComponent(true);
  };

  const handlePrint = (data: FvlconizationLogsTypes) => {
    setPersonData(data); // Set the person data
    setShowDownloadableComponentToPrint(true);
  };

  const downloadPdf = async () => {
    try {
      setTimeout(async () => {
        await componentToPdfDownload(refobj, 1);
        setShowDownloadableComponent(false);
        setPersonData(null); // Clear the state after download
      }, 2000);
    } catch (error) {
      console.log({ error });
      setShowDownloadableComponent(false);
    }
  };

  useEffect(() => {
    if (showDownloadableComponent) {
      downloadPdf();
    }
  }, [showDownloadableComponent]);

  useEffect(() => {
    if (showDownloadableComponentToPrint) {
      setTimeout(() => {
        try {
          reactToPrintFn();
        } catch (error: any) {
          console.log({ error });
          message.error(error.message);
        }
      }, 2000);
    }
  }, [showDownloadableComponentToPrint]);

  return (
    <>
      <AnimatePresence>
        {(showDownloadableComponent || showDownloadableComponentToPrint) &&
          personData && (
            <DownloadableComponent ref={refobj} data={personData} />
          )}
      </AnimatePresence>
      <ZoomImage setShow={setZoom} show={zoom} imageURL={zoomImage} />
      <tbody>
        {data.length < 1 ? (
          <tr>
            <td colSpan={100}>
              <NoData />
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <Fragment key={index}>
              <tr className="hover:bg-bg-secondary duration-200">
                <td className="pl-2">
                  <div className="flex w-fit px-3 py-1 border-[1px] border-solid border-bg-quantinary rounded-full bg-bg-secondary">
                    <Text>{item.type}</Text>
                  </div>
                </td>
                <td className="py-4">
                  <div className="rounded-full w-[60px] h-[60px] p-2 border-[5px] border-solid border-bg-tetiary overflow-hidden relative">
                    <Image
                      alt="img"
                      fill
                      className="hover:scale-[1.3] duration-300 object-cover cursor-pointer"
                      src={item.uploadedImageUrl}
                      onClick={() => {
                        setZoomImage(item.uploadedImageUrl);
                        setZoom((prev) => !prev);
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    {item.identifiedPeople?.map(
                      (person, index) =>
                        index < 3 && (
                          person.length > 1 ? (
                            <Text
                              textColor={theme.colors.text.primary}
                              key={index}
                            >
                              {person}
                            </Text>
                          ) : (
                            <Text key={index}>Unknown</Text>
                          )
                        )
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-0">
                    <Text textColor={theme.colors.text.primary}>
                      {new Date(item.date).toDateString()}
                    </Text>
                    <Text>
                      {getRelativeTime(new Date(item.date))} |{" "}
                      {getTime(new Date(item.date))}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Text>{item.timeElapsed}s</Text>
                    <Progress
                      type="circle"
                      className="!z-[0] !relative"
                      percent={item.accuracy}
                      size={60}
                      strokeColor={theme.colors.main.primary}
                      trailColor={`${theme.colors.main.primary}${hexOpacity(
                        20
                      )}`}
                      strokeWidth={8}
                      format={(percent) => (
                        <Text
                          textColor={theme.colors.text.primary}
                          size={TypographySize.xs}
                        >
                          {Number(item.accuracy).toFixed(1)}%
                        </Text>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <FaRegCircleDot color="#0e9c33" size={10} />
                    <Text textColor={theme.colors.text.primary}>
                      {item.status}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="flex gap-4 items-center">
                    <ClickableTab
                      className="p-0"
                      onClick={() => handlePdfDownload(item)}
                    >
                      <MdCloudDownload
                        color={theme.colors.text.primary}
                        className="hover:scale-125 duration-200 opacity-50 hover:opacity-100"
                      />
                    </ClickableTab>
                    <ClickableTab
                      className="p-0"
                      onClick={() => handlePrint(item)}
                    >
                      <FaPrint
                        color={theme.colors.text.primary}
                        size={12}
                        className="hover:scale-125 duration-200 opacity-50 hover:opacity-100"
                      />
                    </ClickableTab>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={100}>
                  <div className="w-full h-[1px] bg-bg-secondary"></div>
                </td>
              </tr>
            </Fragment>
          ))
        )}
      </tbody>
    </>
  );
};

export default TableBody;
