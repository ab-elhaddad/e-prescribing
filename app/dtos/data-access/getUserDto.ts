import UserPersistenceDto from "../persistence/UserPersistenceDto";

export interface GetUserDto {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string;
  hasImage: boolean;
  imageUrl: string;
  address: string;
  gender: string;
  dob: string;
  role: string;
}

const getUserDto = (user: UserPersistenceDto): GetUserDto => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
    phoneNumber: user.phoneNumbers[0]?.phoneNumber,
    hasImage: user.hasImage,
    imageUrl: user.imageUrl,
    address: user.publicMetadata.address,
    gender: user.publicMetadata.gender,
    dob: user.publicMetadata.dob,
    role: user.publicMetadata.role,
  };
};

export default getUserDto;