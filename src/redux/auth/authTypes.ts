export type Role = "user"|"admin"|"provider";

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: Role;
    isActive?:boolean;
    password:string;
    otpVerified?: boolean;
    googleVerified?: boolean;
    mobile?:string;
    dateOfBirth?:string;
    gender?:"male"|"female";
    profilePicture?:string;
    address1?:string;
    address2?:string;
    isVerified:boolean;

}

export interface Admin {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: Role;
    isActive?:boolean;
    password:string;
    otpVerified?: boolean;
    googleVerified?: boolean;
    mobile?:string;
    dateOfBirth?:string;
    gender?:"male"|"female";
    profilePicture?:string;
    address1?:string;
    address2?:string;
    isVerified:boolean;

}

export interface   SignupUser{
    firstName: string;
    lastName: string;
    email: string;
    password:string;
    mobile:string;

} 

export interface Provider {
    _id: string;
  companyName: string;
  email: string;
  mobile: string;
  password: string;
  airlineCode: string;
  logoUrl?: string;  
    role?: Role;
  registrationCertificateUrl?: string;
  insuranceProofUrl?: string;
  establishmentYear?: number;
    licenseExpiryDate?: Date;
  headquartersAddress?: string;
  countryOfOperation?: string;
    typeOfOperation?: string;
    websiteUrl?: string;
    ceoName?: string;
    officeContactNumber?: string;
    isActive: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    isProfileComplete?: boolean;
}
export interface completeProviderProfile{
  companyName?: string;  
  email?: string;                
  mobile?: string;                
  airlineCode?: string; 
  logoUrl: string;  
    role: Role;
  registrationCertificateUrl: string;
  insuranceProofUrl: string;
  establishmentYear: number;
    licenseExpiryDate: Date;
  headquartersAddress: string;
  countryOfOperation: string;
    typeOfOperation: string;
    websiteUrl: string;
    ceoName: string;
    officeContactNumber: string;
}



export interface SignupProvider{
    companyName: string;
    email: string;
    mobile: string;
    password: string;
    airlineCode:string;
  }

  export interface Otp{
    email:string;
    countDown:number;
    expiryTime:string;
    isVerified:boolean;

  }
  export interface Auth {
  otp: Otp | null;
  user: User | null;
  provider: Provider | null;
  admin: Admin | null;
  isLoading: boolean;
  error: string | null;
}

export interface ResendOtpRequest {
  email: string;
}

export interface verifyOtpRequest {
  email: string;
  otp: string;
}
export interface RequestSignin {
  email: string;
  password: string;
}

export interface RequestPasswordChange {
  token: string;
  password: string;
}

export interface RequestUpdatePassword {
  password: string;
  newPassword: string;
}