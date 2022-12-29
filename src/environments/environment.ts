// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  // urlApi:"https://payservices.sengup.com/dgpsn/api/",
  //urlApi1:"https://payservices.sengup.com/dgpsn/api/",
  urlApi:"https://services.pdg-dev.com/dgpsnlegacy_services/api/",

  //urlNotreBackEnd:"http://localhost:8081",
  urlNotreBackEnd: "http://10.14.14.232:8084/bourseFamilialeBackend",
  //urlModulePrincipale : "http://digipost.sn.post:8085/module-principal/dg_Structure"

  urlModulePrincipale : "http://10.14.14.232:8084/module-principal/"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
