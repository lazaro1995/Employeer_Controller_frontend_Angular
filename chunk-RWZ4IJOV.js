import{G as a,a as s}from"./chunk-75Z3TKSA.js";import{$ as l,W as o,aa as p,g as r}from"./chunk-VADD6WTN.js";var u=(()=>{class t{constructor(e){this.globalService=e,this._http=p(s),this.employee$=new r("")}getAllEmployees(e){return this._http.get(`${this.globalService.apiUrl}v1/employees${e}`)}findEmployee(e){return this._http.get(`${this.globalService.apiUrl}v1/employees/${e}`)}updateEmployee(e,i){return console.log(e),this._http.patch(`${this.globalService.apiUrl}v1/employees/${i}`,e)}createEmployee(e){return this._http.post(`${this.globalService.apiUrl}v1/employees/`,e)}static{this.\u0275fac=function(i){return new(i||t)(l(a))}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();export{u as a};
