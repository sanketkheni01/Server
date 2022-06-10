import { parse } from 'node-html-parser'
import getItemPage from './getItemPage'

export default async function getAppId(itemId: string) {
	const pageRaw = await getItemPage(itemId)
	var parsedPage = parse(pageRaw)
	const appId = parsedPage.querySelector(
		'#ig_bottom > div.apphub_HomeHeaderContent > div.apphub_HeaderTop.workshop > div.apphub_OtherSiteInfo.responsive_hidden > a'
	)?.attrs['data-appid']
	return appId
}
