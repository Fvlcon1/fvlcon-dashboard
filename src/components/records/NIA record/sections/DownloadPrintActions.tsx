import React from "react";
const Tooltip = ({ children, ...props }: any) => <>{children}</>; // Temporary fallback
import ClickableTab from "@components/clickable/clickabletab";
import { FaDownload, FaPrint } from "react-icons/fa6";
import Link from "next/link";

interface DownloadPrintActionsProps {
	setShowFilenameContainer: (show: boolean) => void;
	getPrintableLink: () => string;
	theme: any;
}

const DownloadPrintActions: React.FC<DownloadPrintActionsProps> = ({ setShowFilenameContainer, getPrintableLink, theme }) => (
	<div className="flex gap-1 items-center">
		<Tooltip
			key="Download"
			title="Download"
		>
			<ClickableTab onClick={() => setShowFilenameContainer(true)}>
				<FaDownload
					color={theme.colors.text.primary}
					size={12}
					className="hover:scale-125 duration-200 opacity-50 hover:opacity-100"
				/>
			</ClickableTab>
		</Tooltip>
		<Tooltip
			key="Print"
			title="Print"
		>
			<Link
				href={getPrintableLink()}
				target="_blank"
			>
				<ClickableTab>
					<FaPrint
						color={theme.colors.text.primary}
						size={12}
						className="hover:scale-125 duration-200 opacity-50 hover:opacity-100"
					/>
				</ClickableTab>
			</Link>
		</Tooltip>
	</div>
);

export default DownloadPrintActions;
