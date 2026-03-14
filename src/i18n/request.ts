import { getRequestConfig } from 'next-intl/server'
import { routing, type Locale } from './routing'
import deepMerge from 'deepmerge'

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale

	// 使用 routing.locales 动态验证（无需硬编码类型）
	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale
	}

	// 始终加载英文作为基准
	const baseMessages = (await import(`../locales/en.json`)).default

	if (locale === 'en') {
		return { locale, messages: baseMessages }
	}

	// 临时：所有非英文语言直接使用英文内容
	return { locale, messages: baseMessages }
})
