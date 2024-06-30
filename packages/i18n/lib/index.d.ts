/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

/** Represents the configuration for internationalization (i18n). */
export interface I18nConfig {
  /**
   * The directory where locale files are stored.
   * @type {string} directory
   */
  directory: string
  /**
   * A list of supported locales.
   * @type {string[]} locales
   */
  locales: Array<string>
  /**
   * The fallback locale to use when a translation is not found.
   * @type {string} [fallback]
   */
  fallback?: string
  /**
   * The default locale to use when no locale is specified.
   * @type {string} [default]
   */
  default?: string
  /**
   * Whether to preload all locale files or not.
   * @type {boolean} [preload]
   */
  preload?: boolean
}
/**
 * @param {I18nConfig} options
 * @returns {boolean}
*/
export function init(options: I18nConfig): boolean
/**
 * Sets the fallback locale for the current instance.
 * @param {string} locale
 * @returns {undefined}
 */
export function setFallback(locale: string): void
/**
 * Sets the current locale.
 * @param {string} locale
 * @returns {undefined}
 */
export function setLocale(locale: string): void
/**
 * Checks if translations are available for the given locale.
 * Returns true if the locale is present in the translations map, false otherwise.
 * @param {string} locale
 * @returns {boolean} has
 */
export function has(locale: string): boolean
/**
 * Reloads translations for the given locale and key.
 * If a locale is provided, removes the translations for that locale.
 * If a key is provided, removes the translation for that key in the given locale.
 * If no locale is provided, clears all translations.
 * @param {string} [locale]
 * @param {string} [key]
 * @returns {undefined}
 */
export function reload(locale?: string | undefined | null, key?: string | undefined | null): void
/**
 * translate function
 * @param {string} key
 * @param {Record<string, string | number | boolean>} [args]
 * @returns {string} translate
 */
export function t(key: string, args?: Record<string, string | number | boolean>): string
/**
 * translate function
 * @param {string} locale
 * @param {string} key
 * @param {Record<string, string | number | boolean>} [args]
 * @returns {string} translate
 */
export function translate(locale: string, key: string, args?: Record<string, string | number | boolean>): string
/** Manages languages and store in cache */
export class I18n {
  /**
   * @type {string} fallback use if current locale fail
   * @readonly
   */
  readonly fallback: string
  /**
   * @type {string} locale is the current language
   * @readonly
   */
  readonly locale: string
  /**
   * @type {string} directory relative or absolute where locales are located.
   * @readonly
   */
  readonly directory: string
  /**
   * @type {string[]} locales - A list of available locales, if specified.
   * @readonly
   */
  readonly locales: Array<string>
  /**
   * Create a new Languages class from the config provide
   * @param {I18nConfig} options - Options for class I18n
   *
   * Example:
   * ```js
   * const i18n = new I18n({
   *   directory: './locales',
   *   fallback: 'en-US',
   *   default: 'fr-FR',
   *   locales: ['fr-FR', 'en-US', 'es-ES'],
   *   preload: true,
   * });
   * ```
   */
  constructor(options: I18nConfig)
  /**
   * Sets the fallback locale for the current instance.
   * @param {string} locale
   * @returns {undefined}
   */
  setFallback(locale: string): void
  /**
   * Sets the current locale.
   * @param {string} locale
   * @returns {undefined}
   */
  setLocale(locale: string): void
  /**
   * Checks if translations are available for the given locale.
   * Returns true if the locale is present in the translations map, false otherwise.
   * @param {string} locale
   * @returns {boolean} has
   */
  has(locale: string): boolean
  /**
   * Reloads translations for the given locale and key.
   * If a locale is provided, removes the translations for that locale.
   * If a key is provided, removes the translation for that key in the given locale.
   * If no locale is provided, clears all translations.
   * @param {string} [locale]
   * @param {string} [key]
   * @returns {undefined}
   */
  reload(locale?: string | undefined | null, key?: string | undefined | null): void
  /**
   * translate function
   * @param {string} key
   * @param {Record<string, string | number | boolean>} [args]
   * @returns {string} translate
   */
  t(key: string, args?: Record<string, string | number | boolean>): string
  /**
   * translate function
   * @param {string} locale
   * @param {string} key
   * @param {Record<string, string | number | boolean>} [args]
   * @returns {string} translate
   */
  translate(locale: string, key: string, args?: Record<string, string | number | boolean>): string
}