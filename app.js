const Xray = require('x-ray');
const x = Xray({
    filters: {
        trim: function (value) {
            return typeof value === 'string' ? value.trim() : value
        }
    }
});
const baseurl = 'https://www.emedevents.com/india-medical-conferences'
x(baseurl, '.sec_conf_main  ', [{
    title: '.c_name.truncate | trim',
    date: '.c_summery | trim'
}])
    ((er, res) => {
        console.log(res)
    })