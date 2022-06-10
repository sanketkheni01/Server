import express from 'express'
import downloadFile from '../utils/downloadFile'
import getAppId from '../utils/preDownload/getAppId'

const app = express()

app.use(express.json())
const port = 2550

export default function startServer() {
	console.log(`starting the server on port ${port}...`)

	// ? Handle initial user request
	app.get('/download/:itemId', async (req, res) => {
		const itemId = req.params.itemId
		const appId = await getAppId(itemId)

		if (appId) {
			console.log('App Id is 🆔 : ', appId)
			try {
				const fileLocation = await downloadFile(appId, itemId)
				res.download(fileLocation)
			} catch (err) {
				res.status(400).send(err)
			}
		} else {
			res.status(404).send('No game found for this workshop item')
		}
	})

	app.listen(port)
}
