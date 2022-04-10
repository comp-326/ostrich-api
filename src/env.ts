require("module-alias/register")
import { setEnvironmentVariables, dirExistSync } from "@utils/fileSystem"
import path from "path"

const env_path = path.join(path.join(__dirname), "..", ".env.example")

const buildVariables = () => {
	const exist = dirExistSync(path.join(path.join(__dirname, ".env")))
	if (!exist) {
		setEnvironmentVariables(env_path)
	}
}

buildVariables()
