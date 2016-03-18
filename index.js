var got = require('got')
var qs = require('querystring')
var objectAssign = require('object-assign')

var Buildkite = exports = module.exports = function Buildkite (opts) {
  if (typeof opts === 'string') {
    this.accessToken = opts
    this.apiUrl = 'https://api.buildkite.com/v2/'
    return
  }

  opts = opts || {}
  this.accessToken = opts.accessToken
  this.apiUrl = opts.apiUrl || 'https://api.buildkite.com/v2/'
}

Buildkite.prototype = {
  _request: function (method, endpoint, opts) {
    opts = opts || {}
    var url = endpoint.indexOf('//') >= 0 ? endpoint : this.apiUrl + endpoint
    var params = objectAssign({
      accessToken: this.accessToken
    }, opts)

    return got(url + '?' + qs.stringify(params), {
      method: method || 'GET',
      json: true
    })
  },

  // Overview
  // ====

  ping: function () {
    // buildkite v2 does not have ping method.
    return this._request('GET', 'https://api.buildkite.com')
  },

  user: function () {
    return this._request('GET', 'user')
  },

  // Organizations
  // ====

  listOrgs: function () {
    return this._request('GET', 'organizations')
  },

  getOrg: function (org) {
    return this._request('GET', org)
  },

  // Pipelines
  // ====

  listPipelines: function (org) {
    return this._request('GET', 'organizations/' + org + '/pipelines')
  },

  getPipeline: function (org, pipeline) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline)
  },

  createPipeline: function () {

  },

  deletePipelline: function () {

  },

  // Builds
  // ====

  listBuilds: function () {
    return this._request('GET', 'builds')
  },

  listOrgBuilds: function (org) {
    return this._request('GET', 'organizations/' + org + '/builds')
  },

  listPipelineBuilds: function (org, pipeline) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline + '/builds')
  },

  getBuild: function (org, pipeline, build) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline + '/builds/' + build)
  },

  createBuild: function () {

  },

  cancelBuild: function () {

  },

  rebuildBuild: function () {

  },

  // Jobs
  // ====

  unblockJob: function (org, pipeline, build, job) {
    return this._request('PUT', 'organizations/' + org + '/pipelines/' + pipeline + '/builds/' + build + '/jobs/' + job + '/unblock')
  },

  getJobLog: function (org, pipeline, build, job) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline + '/builds/' + build + '/jobs/' + job + '/log')
  },

  getJobENv: function (org, pipeline, build, job) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline + '/builds/' + build + '/jobs/' + job + '/env')
  },

  // Agents
  // ====

  listAgents: function (org) {
    return this._request('GET', 'organizations/' + org + '/agents')
  },

  getAgent: function (org, agent) {
    return this._request('GET', 'organizations/' + org + '/agents/' + agent)
  },

  stopAgent: function (org, agent) {
    return this._request('PUT', 'organizations/' + org + '/agents/' + agent + '/stop')
  },

  // Artifacts
  // ====

  listBuildArtifacts: function (org, pipeline, build) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline + '/builds/' + build + '/artifacts')
  },

  getJobArtifacts: function (org, pipeline, build, job) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline + '/builds/' + build + '/jobs/' + job + '/artifacts')
  },

  getArtifact: function (org, pipeline, build, artifact) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline + '/builds/' + build + '/artifacts/' + artifact)
  },

  downloadArtifact: function (org, pipeline, build, artifact) {
    return this._request('GET', 'organizations/' + org + '/pipelines/' + pipeline + '/builds/' + build + '/artifacts/' + artifact + '/download')
  },

  // Emojis
  // ====

  listEmojis: function (org) {
    return this._request('GET', 'organizations/' + org + '/emojis')
  }
}
