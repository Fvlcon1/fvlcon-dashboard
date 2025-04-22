import React from "react";
import Image from "next/image";
import Text from "@styles/components/text";
import { TypographySize } from "@styles/style.types";
import theme from "@styles/theme";
import ApplicationSection from "./ApplicationSection";
import PersonalSection from "./PersonalSection";
import HometownSection from "./HometownSection";
import OccupationSection from "./OccupationSection";
import ResidentialAddressSection from "./ResidentialAddressSection";
import CriminalRecordSection from "./CriminalRecordSection";
import Container from "../../components/container";
import List from "../../components/list";
import Divider from "@components/divider/divider";
import { getApplicationDetails, getBirthDetails, getContact, getCriminalRecord, getHometown, getInstitutionalIds, getNOK, getOccupation, getPersonDetails, getPlaceOfBirth, getResidentialAddress, getVerificationDocument } from "../niaDataSections";

interface NiaRecordSectionsProps {
	personDetes: any;
	RAdress: any;
	imageUrl: string;
	applicationDetails: any[];
	personDetails: any[];
	birthDetails: any[];
	placeOfBirth: any[];
	hometown: any[];
	occupation: any[];
	residentialAddress: any[];
	nextOfKin: any[];
	verificationDocument: any[];
	contact: any[];
	institutionalIds: any[];
	criminalRecord: any[][];
}

const NiaRecordSections = ({
	data
}: {
	data?: any
}) => {
	const {
		applicationDetails: appDetes,
		personDetails: personDetes,
		birthDetails: birthDetes,
		placeOfBirth: POB,
		hometown: htown,
		occupation: occup,
		residentialAddress: RAdress,
		nextOfKin: NOK,
		verificationDocument: verificationDoc,
		contact: cont,
		institutionalIds: IIds,
		imageUrl,
		criminalRecord: Crec
	} = data ?? {}
	const applicationDetails = getApplicationDetails(appDetes);
	const personDetails = getPersonDetails(personDetes);
	const birthDetails = getBirthDetails(birthDetes);
	const placeOfBirth = getPlaceOfBirth(POB);
	const hometown = getHometown(htown);
	const occupation = getOccupation(occup);
	const residentialAddress = getResidentialAddress(RAdress);
	const nextOfKin = getNOK(NOK);
	const verificationDocument = getVerificationDocument(verificationDoc);
	const contact = getContact(cont);
	const institutionalIds = getInstitutionalIds(IIds);
	const criminalRecord: any[] = Crec?.map((record: any) => {
		return getCriminalRecord(record);
	})
	return (
		<div className="w-full p-8 flex flex-col gap-6">
			<div className="w-full flex justify-between gap-2 items-center">
				<div className="flex gap-3 items-center">
					<div className="h-[100px] w-[100px] rounded-full bg-bg-quantinary relative overflow-hidden">
						<Image
							alt="img"
							fill
							className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
							src={imageUrl ?? ''}
						/>
					</div>
					<div className="flex flex-col gap-0">
						<Text size={TypographySize.HM} textColor={theme.colors.text.primary}>
							{`${personDetes.surname} ${personDetes.forenames}`}
						</Text>
						<Text>
							{`${RAdress?.zipPostalCode ?? ''}`}
						</Text>
						<Text>
							{`${RAdress?.communityAreaName ? `${RAdress?.communityAreaName},` : ''} ${RAdress?.villageTown ?? ''}`}
						</Text>
					</div>
				</div>
				<div className="flex gap-4 items-center">
					<div className="h-[70px] w-[80px] relative">
						<Image
							alt="img"
							fill
							className="duration-300 object-cover cursor-pointer"
							src={require('@/assets/dev/coagh.png')}
						/>
					</div>
					<div className="h-[65px] w-[230px] relative mt-[5px]">
						<Image
							alt="img"
							fill
							className="duration-300 object-cover cursor-pointer"
							src={require('@/assets/dev/nia-logo.png')}
						/>
					</div>
				</div>
			</div>
			<ApplicationSection applicationDetails={applicationDetails} />
			<PersonalSection personDetails={personDetails} />

			<Container title="Birth Details">
				<div className="w-full p-4 flex gap-2">
					<List data={birthDetails} evenBg={theme.colors.bg.secondary} first={3} />
				</div>
				<Divider />
				<div className="w-full p-4 flex flex-col gap-2">
					<Text textColor={theme.colors.text.primary}>Place of birth</Text>
					<div className="w-full flex gap-2">
						<List data={placeOfBirth} evenBg={theme.colors.bg.secondary} first={2} />
						<List data={placeOfBirth} evenBg={theme.colors.bg.secondary} last={2} />
					</div>
				</div>
				<Divider />
				<HometownSection hometown={hometown} />
			</Container>

			<OccupationSection occupation={occupation} />
			<ResidentialAddressSection residentialAddress={residentialAddress} />

			<Container title="Applicants Parentage">
				<div className="w-full p-4 flex flex-col gap-2">
					{/* TODO: Extract parentage sections into their own components */}
				</div>
			</Container>

			<Container title="Next of kin">
				<div className="w-full p-4 flex gap-2">
					<List data={nextOfKin} evenBg={theme.colors.bg.secondary} />
				</div>
			</Container>

			<Container title="Verification document">
				<div className="w-full p-4 flex gap-2">
					<List data={verificationDocument} evenBg={theme.colors.bg.secondary} first={2} />
					<List data={verificationDocument} evenBg={theme.colors.bg.secondary} last={2} />
				</div>
			</Container>

			<Container title="Contact">
				<div className="w-full p-4 flex gap-2">
					<List data={contact} evenBg={theme.colors.bg.secondary} />
				</div>
			</Container>

			<Container title="Instituitional Ids">
				<div className="w-full p-4 flex gap-2">
					<List data={institutionalIds} evenBg={theme.colors.bg.secondary} />
				</div>
			</Container>

			{criminalRecord?.length > 0 && <CriminalRecordSection criminalRecord={criminalRecord} />}
		</div>
	)
}

export default NiaRecordSections;
