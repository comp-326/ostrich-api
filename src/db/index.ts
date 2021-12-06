import { connect } from "mongoose";

const connection = connect(process.env.DB_URL!)
    .then(() => (console.log(`Database connection successful`)
    )).catch(err => console.log(err.message)
    )


export default connection