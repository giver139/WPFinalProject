export interface UserToken {
  username: string;
};

export const EMPTY_TOKEN: UserToken = {username: ''};

export function isUserToken(payload: unknown): payload is UserToken {
  return (payload as UserToken).username !== undefined;
}

export function hasUserToken(data: unknown): data is {user: UserToken} {
  const user = (data as {user: UserToken}).user;
  return user !== undefined && isUserToken(user);
}

