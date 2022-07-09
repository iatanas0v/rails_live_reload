/*!
  Rails Live Reload 0.2.0
  Copyright © 2022 RailsJazz
  https://railsjazz.com
 */
var RailsLiveReload=function(){"use strict";const t="RELOAD";class i{static _instance;static get instance(){return i._instance||(i._instance=new this),i._instance}static start(){this.instance.start()}constructor(){this.initialize(),document.addEventListener("turbo:render",(()=>{document.documentElement.hasAttribute("data-turbo-preview")||this.restart()})),document.addEventListener("turbolinks:render",(()=>{document.documentElement.hasAttribute("data-turbolinks-preview")||this.restart()}))}initialize(){const{files:t,time:i,url:e,options:s}=JSON.parse(this.optionsNode.textContent);this.files=t,this.time=i,this.url=e,this.options=s}start(){throw"This should be implemented in subclass"}stop(){throw"This should be implemented in subclass"}restart(){this.stop(),this.initialize(),this.start()}fullReload(){window.Turbo?Turbo.visit(window.location):window.location.reload()}get optionsNode(){const t=document.getElementById("rails-live-reload-options");if(!t)throw"Unable to find RailsLiveReload options";return t}}class e extends i{start(){this.interval||(this.interval=setInterval((async()=>{const i=new FormData;i.append("dt",this.time),i.append("files",JSON.stringify(this.files));const e=await fetch(this.url,{method:"post",headers:{Accept:"application/json"},body:i});(await e.json()).command===t&&(this.stop(),this.fullReload())}),this.options.polling_interval))}restart(){this.initialize()}stop(){clearInterval(this.interval),this.interval=void 0}}return document.addEventListener("DOMContentLoaded",(()=>{e.start()})),e}();