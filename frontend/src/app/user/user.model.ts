export class User {
    _id:    string;
    accessData:{
        email:   string,
        signupDate:  Date,
        lastLogin:    Date,
        password:   string,
        loginAttempts: number,
        lockUntil: number,
        role: string
    };
    personalData:{
        address:    string,
        avatar:    string,
        displayName:    string
    };
    pilotData:{
        licence:string,
        dataExpirationLicence: Date,
        dataExpeditionLicence: Date,
        dataExpirationMedicalExamination: Date,
        aircraftsQualification:string[]
    };

    constructor(){

    }
}
