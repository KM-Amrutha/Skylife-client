export type SignState = "sign in" | "sign up";

export interface UserAuthFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
}

export interface ProviderAuthFormData {
    companyName: string;
    email: string;
    password: string;
    mobile: string;
   airlineCode: string;
  logoUrl?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  isVerified?: boolean;
  adminApproval?: boolean; 
  isProfileComplete?: boolean; 
 
   

}


