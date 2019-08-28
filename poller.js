import dotenv from 'dotenv'
import request from 'request'
import moment from 'moment'
dotenv.config()

export default (token = '') => {
  const { orgId } = process.env // perhaps this should live in the entry point, keep all env stuff in 1 location...
  const protocol = 'https'
  const host = 'api.openpath.com'
  const path = `orgs/${orgId}/reports/activity`
  const args = '?limit=1&offset=0&sort=time&order=desc'
  const method = 'GET'
  const url = `${protocol}://${host}/${path}${args}`
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'authorization': token
  }

  return {
    recentCheckin: {},

    start() {
      setInterval(async () => {
        const options = { method, url, headers };

        request(options, (error, response, body) => {
          if (error) {
            console.error(new Error(error))
          }

          const { data } = JSON.parse(body)

          data.forEach(({ result, userName, timeIsoString }) => {
            if (this.recentCheckin.timeIsoString === timeIsoString && this.recentCheckin.userName === userName) {
              // do nothing
            } else if (result === 'Granted') {
              // eslint-disable-next-line no-console
              console.log(`${userName} checked in at ${moment(timeIsoString).format('hh:mm A')}`)

              this.recentCheckin = { userName, timeIsoString }
            }
          })
        })
      }, 2500)
    }
  }
}
