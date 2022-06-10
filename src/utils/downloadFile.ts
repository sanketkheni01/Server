import { spawn } from 'child_process'
import archiveItem from './postDownload/archiveItem'
import removeUnnecessary from './postDownload/removeUnnecessary'

export default async function downloadFile(appId: string, itemId: string) {
	const savePath = `./files/${appId}/${itemId}`

	return new Promise<string>((resolve, reject) => {
		const child = spawn('./depotDownloader/DepotDownloader.exe', [
			'-app',
			appId,
			'-pubfile',
			itemId,
			'-dir',
			savePath,
		])

		child.on('error', (err: any) => {
			reject(err)
		})

		child.on('close', async () => {
			console.log('Download complete')
			removeUnnecessary(savePath)
			const archivePath: string = await archiveItem(savePath, itemId, appId)
			console.log(`Archive path: ${archivePath}`)
			resolve(archivePath)
		})
	})
}
