import { Nodes } from '.'

let nodes

beforeEach(async () => {
  nodes = await Nodes.create({ name: 'test', parentId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = nodes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(nodes.id)
    expect(view.name).toBe(nodes.name)
    expect(view.parentId).toBe(nodes.parentId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = nodes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(nodes.id)
    expect(view.name).toBe(nodes.name)
    expect(view.parentId).toBe(nodes.parentId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
