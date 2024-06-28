import ProfileDto from "./ProfileDto";

export interface BasicUserDto{
    id: number,
    profile: ProfileDto,
    isAdmin: boolean,
    active: boolean,
    status: string
  }