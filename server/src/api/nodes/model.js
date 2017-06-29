import mongoose, { Schema } from 'mongoose'
import shortid from 'shortid';


const nodesSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: {
    type: String
  },
  parentId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

nodesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      parentId: this.parentId
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Nodes', nodesSchema)

export const schema = model.schema
export default model
