export interface UserToken {
  username: string;
};

export const EMPTY_TOKEN: UserToken = {username: ''};

export function isUserToken(payload: unknown): payload is UserToken {
  return (payload as UserToken).username !== undefined;
}
