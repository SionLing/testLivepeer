import fetch from 'node-fetch'
import * as fs from 'fs'

function printStatus(name, txt) {
    if (txt.includes('failed')) {
        // console.log(`${name} idle!!`)
    }else if (txt.includes('index.m3u8')) {
        console.log(`${name} alive!!`)
    }else {
        console.log(`${name} state unknown`)
        console.log(`${name} `+ txt)
    }
}

function aliveDetection(name, url) {
    fetch(url)
    .then(data=>data.text())
    .then(txt=>printStatus(name, txt))
    .finally(()=>aliveDetection(name, url))
}

function getUrls(fileName) {
    let urls = []
    let data = fs.readFileSync(fileName, 'utf-8')
    urls = JSON.parse(data).playbacks
    return urls
}

let urlArr = getUrls('playbacks.json')
urlArr.forEach(element => {
    aliveDetection(element.name, element.url)
});
