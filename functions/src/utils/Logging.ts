import { verboseLog } from "../env";
import morgan = require("morgan");
import morganBody from "morgan-body";


export default function enableLogging(app: any): void {
  if (!verboseLog) {
    console.log('Using simple log');
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  } else {
    console.log('Using verbose log');
    morganBody(app);
  }
}