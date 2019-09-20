const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

let user = { email: 'abc@gmail.com', passward: '1234' }
passport.use(
	new JwtStrategy(opts, (payload, done) => {
		User.findOne({ id: payload }, (err, user) => {
			if (err) {
				return done(err, false)
			}
			if (payload) {
				return done(null, payload)
			} else {
				return done(null, false)
				// or you could create a new account
			}
		})
	})
)

module.exports = passport
