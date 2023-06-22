
//console.log('herlooooo')
import app from './server.js'
import './database.js';

/*
app.listen(app.get('port'), () => {
  console.log('Server is listening on port 4000', app.get('port'))
  console.log('Sistema Biométrico S & R')  
})*/
import { createAdminUser } from "./libs/createUser.js";

async function main() {
  await createAdminUser();
  app.listen(app.get("port"));

  console.log("Server on port", app.get("port"));
  console.log("Environment:", process.env.NODE_ENV);
}

main();
