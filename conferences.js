const Xray = require('x-ray')
const { conferences } = require('./config/baseconf')
const x = Xray({
    filters: {
        trim: function (value) {
            return typeof value === 'string' ? value.trim() : value
        },
        slice: function (value, start, end) {
            return typeof value === 'string' ? value.slice(start, end) : value
        }
    }
})
let result

x('https://www.emedevents.com/india-medical-conferences', '.sec_conf_main', [{
    title: '.truncate > a | trim',
    date: '.c_summery | slice:14,32 '
}]).write('result.json')
// (async (er, res) => {
//     result = await res
// })

