import { exec } from 'child_process'
import * as fs from 'fs'

function getUrls(fileName) {
    let urls = []
    let data = fs.readFileSync(fileName, 'utf-8')
    urls = JSON.parse(data).playbacks
    return urls
}

function main(){
    let urls = getUrls('playbacks_demo.json')
    urls.forEach(element => {
        let cmdLine = 'ffmpeg -re -i demo1.flv -c:v libx264 -c:a aac -f flv ' + element.rtmp;
        exec(cmdLine, (err, stdout, stderr) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        })
        // console.log(element.name)
    });
}

main()
