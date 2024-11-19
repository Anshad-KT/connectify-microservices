export interface IKafkaEvents {
  USER_SIGNED_UP: string;
  USER_SIGNED_IN: string;
  USER_SIGNED_OUT: string;
  PASSWORD_CHANGED: string;
  PROFILE_UPDATED: string;
}

export const KafkaEvents: IKafkaEvents = {
  USER_SIGNED_UP: 'user.signed_up',
  USER_SIGNED_IN: 'user.signed_in',
  USER_SIGNED_OUT: 'user.signed_out',
  PASSWORD_CHANGED: 'user.password_changed',
  PROFILE_UPDATED: 'user.profile_updated'
}; 