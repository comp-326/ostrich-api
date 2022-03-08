import { connect } from "mongoose";

export default ({ DATABASE_URL }: { DATABASE_URL: string }) => {
  connect(DATABASE_URL)
    .then(() => {
      console.log("Db connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
