"use strict";var process=require("process"),fs=require("fs"),path=require("path"),name=process.argv[2],rootPath=process.env.INIT_CWD;fs.mkdirSync(path.join(rootPath,"/".concat(name))),fs.writeFileSync(path.join(rootPath,"/".concat(name,"/").concat(name,".css")),"");var jsxContent='\nimport React from "react";\nimport "./'.concat(name,'.css";\n\nclass ').concat(name," extends React.Component{\n    render(){\n        return (\n            <div></div>\n        )\n    }\n\n    constructor(props){\n        super(props);\n    }\n}\n\nexport default ").concat(name,";\n");fs.writeFileSync(path.join(rootPath,"/".concat(name,"/").concat(name,".jsx")),jsxContent);