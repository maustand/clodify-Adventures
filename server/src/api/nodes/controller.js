import _ from 'lodash';
import { success } from '../../services/response/';
import { actions } from '../../config';
import fs from 'fs';

const path = 'storage/treeview.json';


export const index = (bodymen, res, next) => {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			res.status(401).json(err);
		}
		res.json(JSON.parse(data));
	});
}

export const update = (params, res, next)  => {

	fs.readFile(path, 'utf8', (err, myStorage) => {
		if (err) {
			res.status(401).json(err);
		}

		myStorage = JSON.parse(myStorage);

		params.body.forEach((item) => {

			switch (item.action) {
			  case actions.ADD:

			  	myStorage.push({ 
			  		id: item.id, 
			  		name: item.name, 
			  		parentId: item.parentId 
			  	});

			    break;
			  case actions.EDIT:
			  	myStorage.map((o) => {
			        if (o.id === item.id ){
			          o.name = item.name;
			        }
			        return o;
			      });

			    break;
			  case actions.REMOVE:
			  	myStorage = _.reject(myStorage, function(o) {
			  		return o.id === item.id || o.parentId === item.parentId; 
			  	});
			    break;
			}
		});

		fs.writeFile(path, JSON.stringify(myStorage), (err) => {
			if (err) {
				res.status(401).json(err);
			}
			res.json(myStorage);
		});
	});

	
}

// export const update = ({ bodymen: { body }, params }, res, next) =>
//   Conditions.findById(params.id)
//     .then(notFound(res))
//     .then((conditions) => conditions ? _.merge(conditions, body).save() : null)
//     .then((conditions) => conditions ? conditions.view(true) : null)
//     .then(success(res))
//     .catch(next)



// {
//     "_id" : NumberLong(1498833958158),
//     "updatedAt" : ISODate("2017-06-28T21:07:00.158Z"),
//     "createdAt" : ISODate("2017-06-28T21:07:00.158Z"),
//     "name" : "Mi first 2",
//     "parentId" : null,
//     "__v" : 0
// }