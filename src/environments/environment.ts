// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  generateOTP:"https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
  confirmOTP: "https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",
  getStates: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
  getDistricts:"https://cdn-api.co-vin.in/api/v2/admin/location/districts/",
  findByDistrict:"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict",
  findByPin:"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin",
  certificate:"https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
