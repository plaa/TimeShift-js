export type TimeCallback = () => number | undefined;

/**
 * Set the current time in milliseconds after Jan 1 1970 in UTC time or a callback which
 * returns the time in this format. Setting this to undefined will reset to the real
 * current time.
 */
export function setTime(millis: number | TimeCallback | undefined): void;

/**
 * @return the currently overridden time value as milliseconds after Jan 1 1970 in UTC time.
 * The default value is undefined, which indicates using the real current time.
 */
export function getTime(): number | undefined;

/**
 * Set the time zone offset in minutes.  -60 corresponds to GMT+1, +60 to GTM-1.
 * Changing this will affect the results also for previously created Date instances.
 */
export function setTimezoneOffset(minutes: number): void;

/**
 * @return the current time zone offset in minutes.  A value of -60 corresponds to GMT+1,
 * +60 to GTM-1.  Default value is from new Date().getTimezoneOffset().
 */
export function getTimezoneOffset(): number;

/**
 * Access to the Mocked Date.
 */
export const Date: DateConstructor;

/**
 * Access to the original Date constructor.
 */
export const OriginalDate: DateConstructor;
