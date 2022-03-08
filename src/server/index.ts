import { AppPropType } from "./../types/app.d"
import { createServer } from "http"
import { PORT } from "./../config"

export default (props: AppPropType) => {
	const server = createServer(props.app)
	server.listen(PORT, () => {
		const msg = `Server running on http://localhost:${PORT}`
		console.log(msg)
	})
}
