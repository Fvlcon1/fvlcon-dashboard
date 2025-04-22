import { IPersonTrackingWithImageType } from "@/app/tracking/components/types"
import { capitalizeString } from "@/utils/capitalizeString"
import { getRelativeTime } from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import NiaRecord from "@components/records/NIA record/niaRecord"
import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Tooltip } from "antd"
import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"
import { FaLocationDot } from "react-icons/fa6"

/**
 * Displays a match container for a detected person, including images, similarity, and NIA record modal.
 * @param props MatchContainer props
 */
const MatchContainer = ({
    originalImageUrl,
    capturedImageUrl,
    originalImageZoom,
    setOriginalImageZoom,
    capturedImageZoom,
    setCapturedImageZoom,
    detections,
}: {
    originalImageUrl?: string;
    capturedImageUrl?: string;
    originalImageZoom: boolean;
    setOriginalImageZoom: Dispatch<SetStateAction<boolean>>;
    capturedImageZoom: boolean;
    setCapturedImageZoom: Dispatch<SetStateAction<boolean>>;
    detections: IPersonTrackingWithImageType;
}) => {
    const [visible, setVisible] = useState(false);

    // Helper to render image or fallback
    const renderImage = (url?: string, onClick?: () => void, alt = "Image", bg = "bg-bg-tetiary") => (
        <div className={`w-[65px] h-[65px] overflow-hidden ${bg} relative rounded-md`}>
            {url ? (
                <Image
                    src={url}
                    alt={alt}
                    fill
                    style={{ objectFit: "cover" }}
                    onClick={onClick}
                    className="lg:hover:scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                />
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <Text>🚫</Text>
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* NIA Record Modal */}
            <NiaRecord 
                visible={visible}
                setVisible={setVisible}
                data={detections.niaDetails}
                faceId={detections.faceId}
                croppedImage={detections.imageUrl ?? ''}
                boundedImage={detections.imageUrl ?? ''}
            />
            <div className="flex flex-col gap-1">
                {/* Header: Type and Track link */}
                <div className="flex justify-between gap-2 items-center">
                    <Text
                        textColor={theme.colors.text.tetiary}
                    >
                        {capitalizeString(detections.type)}
                    </Text>
                    <Tooltip 
                        title="Track"
                        placement="left"
                    >
                        <Link href={`/tracking?personTrackingId=${detections.id}`}>
                            <ClickableTab>
                                <FaLocationDot 
                                    color={theme.colors.text.secondary}
                                    size={13}
                                />
                            </ClickableTab>
                        </Link>
                    </Tooltip>
                </div>
                {/* Images and similarity score */}
                <div className="flex gap-2 relative w-fit">
                    {detections.similarity ? (
                        <div className="absolute left-1 top-1 bg-bg-primary rounded-full px-2 py-0.5 text-xs z-10">
                            <Text
                                size={TypographySize.xs2}
                                textColor={theme.colors.text.primary}
                            >
                                {Number(detections.similarity)?.toFixed(1)}
                            </Text>
                        </div>
                    ) : null}
                    {renderImage(capturedImageUrl, () => setCapturedImageZoom(true), "Captured", "bg-bg-tetiary")}
                    {renderImage(originalImageUrl, () => setOriginalImageZoom(true), "Original", "bg-bg-secondary")}
                </div>
                {/* Name and relative time */}
                <div className="flex flex-col gap-[1px]">
                    {detections.name && detections.name.length > 1 ? (
                        <span
                            onClick={() => setVisible(true)}
                            className="cursor-pointer hover:opacity-70 duration-200"
                        >
                            <Text textColor={theme.colors.text.primary}>
                                {capitalizeString(detections.name)}
                            </Text>
                        </span>
                    ) : (
                        <Text textColor={theme.colors.text.tetiary}>Unknown</Text>
                    )}
                    <span className="flex flex-col gap-1">
                        <Text>{getRelativeTime(detections.timeSeen)}</Text>
                    </span>
                </div>
            </div>
        </>
    );
};
export default MatchContainer