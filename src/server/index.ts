import express from 'express'
import getAppId from '../utils/getAppId'

const app = express()

app.use(express.json())
const port = 2550

export default function startServer() {
	console.log(`starting the server on port ${port}...`)

	// ? Handle initial user request
	app.get('/download/:itemId', async (req, res) => {
		const itemId = req.params.itemId
		const appId = await getAppId(itemId)

		console.log('App Id is 🆔 : ', appId)

		res.send(appId?.toString())
	})

	app.listen(port)
}
