// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  serverAPIUrl: 'http://0.0.0.0:9000/',
  actions: {
  	REMOVE: 'remove',
  	ADD: 'add',
  	EDIT: 'edit'
  },
  NODEDEFAULTNAME: 'myNode',
  i18n:{
  	TITLE: 'Save',
  	MESSAGE: 'Changes have been saved successfully.',
  }

};
