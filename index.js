import dotenv from 'dotenv'
import auth from './auth.js';
import poller from './poller.js';

dotenv.config()

const entry = (async ({ email, password }) => {
  if (!email || !password) {
    return Promise.reject(new Error('missing email/password env credentials...'))
  }
  const response = await auth(email, password)
  const { data } = JSON.parse(response)
  const { token } = data

  return token
})

const main = async () => {
  const token = await entry(process.env)

  poller(token).start()
}

main()
