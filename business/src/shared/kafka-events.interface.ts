export enum KafkaEvents {
  // Auth Events
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',
  
  // Business Events
  BUSINESS_CREATED = 'business.created',
  BUSINESS_UPDATED = 'business.updated',
  BUSINESS_DELETED = 'business.deleted',
  
  // Employee Events
  EMPLOYEE_ADDED = 'employee.added',
  EMPLOYEE_UPDATED = 'employee.updated',
  EMPLOYEE_REMOVED = 'employee.removed'
} 