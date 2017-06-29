import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Nodes } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Nodes.create(body)
    .then((nodes) => nodes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Nodes.find(query, select, cursor)
    .then((nodes) => nodes.map((nodes) => nodes.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Nodes.findById(params.id)
    .then(notFound(res))
    .then((nodes) => nodes ? nodes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Nodes.findById(params.id)
    .then(notFound(res))
    .then((nodes) => nodes ? _.merge(nodes, body).save() : null)
    .then((nodes) => nodes ? nodes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Nodes.findById(params.id)
    .then(notFound(res))
    .then((nodes) => nodes ? nodes.remove() : null)
    .then(success(res, 204))
    .catch(next)
