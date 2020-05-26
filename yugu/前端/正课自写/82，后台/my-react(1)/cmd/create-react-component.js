const process = require("process");
const fs = require("fs");
const path = require("path");

// console.log("hello");
// console.log(process.env.INIT_CWD);

const name = process.argv[2];
const rootPath = process.env.INIT_CWD;


fs.mkdirSync(path.join(rootPath,`/${name}`));

fs.writeFileSync(path.join(rootPath,`/${name}/${name}.css`),"");

const jsxContent = `
import React from "react";
import "./${name}.css";

class ${name} extends React.Component{
    render(){
        return (
            <div></div>
        )
    }

    constructor(props){
        super(props);
    }
}

export default ${name};
`

fs.writeFileSync(path.join(rootPath,`/${name}/${name}.jsx`),jsxContent);
