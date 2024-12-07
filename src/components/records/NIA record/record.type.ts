enum ApplicantType {
    citizen = "Citizen",
    permanentlyResident = "Permanently Resident",
    PersonWithResidenPermit = "Person With ResidenPermit",
    refugee = "Refugee"
}

enum RequestType {
    issuance = "Issuance",
    update = "Update",
    ReIssue = "Re-issue",
    MRWNumber = "MRW Number"
}

type MaritalStatus = "single" | "married" | "legally separated" | "divorced" | "widowed"

type LevelOfEducation = "none" | "basic" | "secondary" | "tetiary" | "Higher"

export interface NiaRecordType {
    typeOfApplicant : ApplicantType
    typeOfRequest : RequestType
    applicationDetails : {
        dateOfApplication : Date
        interviewerNIDno : string
        existingNIDno : string
        registrationCenterNumber : number,
    }
    personDetails : {
        surname : string,
        foreNames : string,
        sex : string,
        maritalStatus : MaritalStatus
        maidenNames : string,
        height : number
        colourOfEyes : string,
        colourOfHair : string,
        DisabilityCode : number
        levelOfEducation : LevelOfEducation
    }
    birthDetails : {
        birthCertNumber : string,
        dateIssued : Date,
        DateOfBirth : Date,
        isEstimatedDateOfBirth : boolean
        nationalityOfBirth : string,
        currentNationality : string,
        placeOfBirth : {
            region : string,
            state : string,
            hometown : string,
        }
        hometown : {
            region : string,
            state : string,
            hometown : string,
        }
        occupation : string,
        
    }
}