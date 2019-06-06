import { WORKFLOWMAX_API_URL } from '../constants/api'

// Format entry point (entity name + method)
const formatEntryPoint = (entity, method, params) => {
  const url_param = params.find(param => {return param.name === 'url'})
  let url = WORKFLOWMAX_API_URL
  if (url_param) {
    url = url_param.value
  }

  return `${url}/${entity}.api/${method}`
}

// Format mondatory query parameters
const formatApiParams = (apiKey, accountKey) =>
  `?apiKey=${apiKey}&accountKey=${accountKey}`

// Format user query parameters
const formatAdditionalParams = (params = []) =>
  params.filter(param => {return param.name !== 'url'}).map(param => `&${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`).join('')

// Format all query parameters
const formatParams = (apiKey, accountKey, params) =>
  `${formatApiParams(apiKey, accountKey)}${formatAdditionalParams(params)}`

// Format api request url
export default function (entity, method, apiKey, accountKey, params) {
  return `${formatEntryPoint(entity, method, params)}${formatParams(apiKey, accountKey, params)}`
}
