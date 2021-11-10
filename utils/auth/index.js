const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {Strategy, ExtractJwt} = require('passport-jwt');
const { config } = require('../../config/config');
const AuthService = require('../../services/auth.service')
const service = new AuthService()

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = service.getUser(email, password)
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}))

// implementando jwt validation
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

passport.use(new Strategy(options, (payload, done) => {
  return done(null, payload)
}))


