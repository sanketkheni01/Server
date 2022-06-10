import axios from 'axios'

export default async function getItemPage(itemId: string) {
	const page = await axios.get(
		`https://steamcommunity.com/sharedfiles/filedetails/?id=${itemId}`
	)
	return page.data
}
