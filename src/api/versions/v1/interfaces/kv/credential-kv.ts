import {
  AuthenticatorTransportFuture,
  CredentialDeviceType,
} from "@simplewebauthn/types";

export interface CredentialKV {
  id: string;
  public_key: Uint8Array;
  user_id: string;
  counter: number;
  device_type: CredentialDeviceType;
  backup_status: boolean;
  transports: AuthenticatorTransportFuture[] | undefined;
}
