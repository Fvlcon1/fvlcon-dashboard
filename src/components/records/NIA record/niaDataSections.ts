// Utility functions to extract NIA record sections from raw data


export function getApplicationDetails(appDetes: any) {
  return [
    ["Type of application", appDetes?.typeOfApplication],
    ["Type of Request", appDetes?.typeOfRequest],
    ["Date of Application", appDetes?.dateOfApplication],
    ["Interviewer NID number", appDetes?.interviewerNidNumber],
    ["Registration centre number", appDetes?.registrationCentreNumber],
  ];
}

export function getPersonDetails(personDetes: any) {
  return [
    ["Surname", personDetes?.surname],
    ["Forenames", personDetes?.forenames],
    ["Height", personDetes?.height],
    ["Colour of eyes", personDetes?.colourOfEyes],
    ["Colour of hair", personDetes?.colourOfHair],
    ["Disability code", personDetes?.disabilityCode],
    ["Level of education", personDetes?.levelOfEducation],
  ];
}

export function getBirthDetails(birthDetes: any) {
  return [
    ["Birth Certificate number", birthDetes?.birthCertificateNumber],
    ["Date issued", birthDetes?.dateIssued],
    ["Date of birth", birthDetes?.dateOfBirth],
    ["Nationality at birth", birthDetes?.nationalityAtBirth],
    ["Current nationality", birthDetes?.currentNationality],
  ];
}

export function getPlaceOfBirth(POB: any) {
  return [
    ["Village/town", POB?.villageTown],
    ["Region code", POB?.regionCode],
    ["District/State", POB?.districtState],
  ];
}

export function getHometown(htown: any) {
  return [
    ["Village/town", htown?.villageTown],
    ["Region/code", htown?.regionCode],
    ["District/State", htown?.districtState],
  ];
}

export function getOccupation(occup: any) {
  return [["Occupation", occup?.occupation]];
}

export function getResidentialAddress(RAdress: any) {
  return [
    ["Village/town", RAdress?.villageTown],
    ["Region/Country", RAdress?.regionCode],
    ["District/State", RAdress?.districtState],
    ["Community area name", RAdress?.communityAreaName],
    ["ZIP/Postal code", RAdress?.zipPostalCode],
    ["Digital Address", RAdress?.digitalAddress],
  ];
}

export function getFatherDetails(fatherDetes: any) {
  return [
    ["Full name of father", fatherDetes?.fullNameOfFather],
    ["Nationality", fatherDetes?.nationality],
    ["Is father alive", fatherDetes?.isFatherAlive],
  ];
}

export function getFathersHometown(fatherHtown: any) {
  return [
    ["Village/town", fatherHtown?.villageTown],
    ["Region/code", fatherHtown?.regionCode],
    ["District/State", fatherHtown?.districtState],
  ];
}

export function getNOK(NOK: any) {
  return [
    ["Next of kin", NOK?.nextOfKin],
    ["Address", NOK?.address],
  ];
}

export function getVerificationDocument(verificationDoc: any) {
  return [
    ["type", verificationDoc?.type],
    ["Document number / NID", verificationDoc?.documentNumberNid],
    ["Date issued", verificationDoc?.dateIssued],
  ];
}

export function getContact(cont: any) {
  return [["Local phone number", cont?.localPhoneNumber]];
}

export function getInstitutionalIds(IIds: any) {
  return [
    ["Voter's Id number", IIds?.votersIdNumber],
    ["Date issued", IIds?.dateIssued],
  ];
}

export function getCriminalRecord(record: any) {
  return [
    ["Arrest Date", record?.arrestDate ? (new Date(record?.arrestDate)).toDateString() : undefined],
    ["Arresting Officer", record?.arrestingOfficer],
    ["Criminal Record Id", record?.criminalRecordId],
    ["Offence Type", record?.offenceTypee],
    ["Person Id", record?.personId],
    ["Sentence Length (months)", record?.sentenceLengthMonths],
  ];
}

// Extracts details about the mother, following the same pattern as getFatherDetails
export function getMotherDetails(motherDetes: any) {
  return [
    ["Full name of mother", motherDetes?.fullNameOfMother],
    ["Nationality", motherDetes?.nationality],
    ["Is mother alive", motherDetes?.isMotherAlive],
  ];
}

// Extracts hometown details about the mother, following the same pattern as getFathersHometown
export function getMothersHometown(motherHtown: any) {
  return [
    ["Village/town", motherHtown?.villageTown],
    ["Region/code", motherHtown?.regionCode],
    ["District/State", motherHtown?.districtState],
  ];
}

