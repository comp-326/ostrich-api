import { connect } from "mongoose";
import config from "./../config";

const connection = connect(config.DB_URL!)
    .then(() => (console.log(`Database connection successful`)
    )).catch(err => console.log(err.message)
    )


export default connection