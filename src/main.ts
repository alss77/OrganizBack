import "reflect-metadata";
import { createConnection } from "typeorm";
import {server} from "./server";


const port: number = 4000;

createConnection()
    .then(() => {
        server.listen(port, () => {
            console.log(
                `🚀 Server ready at http://localhost:${port}`
            );
        });
    })
    .catch(error => console.log(error));
