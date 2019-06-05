const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const rp = require('request-promise')
let html
(async () => {
    html = await rp('https://www.conferenceseries.com/medical-meetings')
    // console.log({ insede: html })

    const { document } = new JSDOM(`${html}`, {
        url: "https://www.conferenceseries.com/medical-meetings",
        referrer: "https://example.com/",
        contentType: "text/html",
        includeNodeLocations: true,
        storageQuota: 10000000
    }).window
    let title = document.querySelector('.conf-list-in > div:nth-child(2) > div > div:nth-child(2) > div > div > a > h3')
    // console.log({ html });

    // title = document.querySelector('.conf-list-in > div:nth-child(2) > div > div:nth-child(2) > div > div > a > h3').innerHTML

    console.log({ title });

})()

