import { spawn } from 'child_process'
import fs from 'fs-extra'
import archiveItem from './postDownload/archiveItem'
import removeUnnecessary from './postDownload/removeUnnecessary'
export default async function downloadFile(appId: string, itemId: string) {
	const savePath = `./files/${appId}/${itemId}`
	const zipPath = `./files/${appId}/${itemId}.zip`

	if (fs.existsSync(zipPath)) {
		console.log('Zip file already exists, skipping download')
		return zipPath
	}

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
			try {
				removeUnnecessary(savePath)
				const archivePath: string = await archiveItem(savePath, itemId, appId)
				console.log(`Archive path: ${archivePath}`)
				resolve(archivePath)
			} catch (err) {
				reject(err)
			}
		})
	})
}
