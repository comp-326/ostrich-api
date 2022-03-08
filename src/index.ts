import app from "./app"
import server from "./server"
import settings from "./settings"

settings({ app })
server({ app })
