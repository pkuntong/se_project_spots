!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}let s,i;const l=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"262feeb9-174b-469a-9b18-64a175faadc9","Content-Type":"application/json"}});l.getAppInfo().then((e=>{let[t,r]=e;const n=t.length>0?t:[{name:"Sample Card 1",link:"https://via.placeholder.com/150",alt:"Sample 1"},{name:"Sample Card 2",link:"https://via.placeholder.com/150",alt:"Sample 2"}];n.reverse(),n.forEach((e=>{H(e)})),u.src=r.avatar,m.textContent=r.name,_.textContent=r.about})).catch(console.error);const c=document.querySelectorAll("#modal-close-btn"),d=document.querySelector(".profile__edit-btn"),u=document.querySelector(".profile__avatar"),m=document.querySelector(".profile__name"),_=document.querySelector(".profile__description"),h=document.querySelector(".profile__add-btn"),v=document.querySelector(".profile__avatar-btn"),f=document.querySelector("#edit-modal"),p=f?.querySelector("#edit-profile-form"),S=f?.querySelector("#profile-name-input"),y=f?.querySelector("#profile-description-input"),b=document.querySelector("#card-modal"),q=b?.querySelector("#card-form"),k=b?.querySelector(".modal__submit-btn"),E=b?.querySelector("#card-link-input"),g=b?.querySelector("#card-caption-input"),L=document.querySelector("#avatar-modal"),C=L?.querySelector("#edit-avatar-form"),U=L?.querySelector("#profile-avatar-input"),x=L?.querySelector(".modal__submit-btn"),$=document.querySelector("#delete-modal"),A=$?.querySelector(".modal__form"),I=$?.querySelector(".modal__submit-btn_type_cancel"),T=document.querySelector("#card-template")?.content,w=document.querySelector(".cards__list"),P=document.querySelector("#preview-modal"),B=document.querySelector(".modal__image"),D=document.querySelector(".modal__caption");function N(e){e.target===e.currentTarget&&J(e.currentTarget)}function O(e){"Escape"===e.key&&J(document.querySelector(".modal_opened"))}function j(e){e.classList.add("modal_opened"),document.addEventListener("keydown",O),e.addEventListener("mousedown",N)}function J(e){e.classList.remove("modal_opened"),document.removeEventListener("keydown",O),e.removeEventListener("mousedown",N)}function H(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){const t=T.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return e.isLiked&&o.classList.add("card__like-btn_liked"),n.src=e.link,n.alt=e.alt,r.textContent=e.name,o.addEventListener("click",(t=>function(e,t){const r=e.target,n=r.classList.contains("card__like-btn_liked");l.changeLikeStatus(t,n).then((()=>{r.classList.toggle("card__like-btn_liked",!n)})).catch(console.error)}(t,e._id))),a.addEventListener("click",(()=>function(e,t){s=e,i=t,j($)}(t,e._id))),n.addEventListener("click",(()=>function(e){B.src=e.link,B.alt=e.name,D.textContent=e.name,j(P)}(e))),t}(e);w[t](r)}var R;c&&c.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>J(t)))})),v&&v.addEventListener("click",(()=>j(L))),C&&C.addEventListener("submit",(function(t){a((function(){return l.editAvatarInfo(U.value).then((t=>{u.src=t.avatar,r(x,e),J(L)}))}),t)})),d&&d.addEventListener("click",(()=>{var r,n;S.value=m.textContent,y.value=_.textContent,r=p,n=e,[S,y].forEach((e=>{t(r,e,n)})),j(f)})),p&&p.addEventListener("submit",(function(e){a((function(){return l.editUserInfo({name:S.value,about:y.value}).then((e=>{m.textContent=e.name,_.textContent=e.about,J(f)}))}),e)})),h&&h.addEventListener("click",(()=>j(b))),q&&q.addEventListener("submit",(function(t){a((function(){return l.addCard({name:g.value,link:E.value}).then((t=>{H(t),r(k,e),J(b)}))}),t)})),A&&A.addEventListener("submit",(function(e){a((function(){return l.deleteCard(i).then((()=>{s.remove(),J($)}))}),e,"Deleting...")})),I&&I.addEventListener("click",(()=>J($))),R=e,document.querySelectorAll(R.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((s=>{s.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,s,r),n(o,a,r)}))}))})(e,R)}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxFQUFjQyxLQUNoREQsRUFBYWMsU0FBU0MsTUFRekJqQixFQUFlQyxFQUFhQyxFQUFjQyxHQXJCdkI2SixFQUFDL0osRUFBYUMsRUFBYytKLEVBQWM5SixLQUMvRCxNQUFNK0osRUFBZWpLLEVBQVlHLGNBQWMsSUFBSUYsRUFBYUcsWUFDaEVILEVBQWFLLFVBQVVLLElBQUlULEVBQU9MLGlCQUNsQ29LLEVBQWE1SixZQUFjMkosQ0FBWSxFQVdyQ0QsQ0FDRS9KLEVBQ0FDLEVBQ0FBLEVBQWFpSyxrQkFDYmhLLEVBSUosRUEwQ0k0SixDQUFtQjlKLEVBQWFDLEVBQWNDLEdBQzlDVSxFQUFrQkMsRUFBV0osRUFBZVAsRUFDOUMsR0FBRSxHQUNGLEVBTUF3SixDQUFrQjFKLEVBQWFFLEVBQU8sRyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvc2NyaXB0cy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvQXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXG4gICAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXG4gICAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zdWJtaXQtYnRuXCIsXG4gICAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc3VibWl0LWJ0bl9pbmFjdGl2ZVwiLFxuICAgIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxuICAgIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yXCIsXG4gIH07XG4gIFxuICBjb25zdCBzaG93SW5wdXRFcnJvciA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gIH07XG4gIFxuICBjb25zdCBoaWRlSW5wdXRFcnJvciA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IGNoZWNrSW5wdXRWYWxpZGl0eSA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgc2hvd0lucHV0RXJyb3IoXG4gICAgICAgIGZvcm1FbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQsXG4gICAgICAgIGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZSxcbiAgICAgICAgY29uZmlnXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGNvbnN0IGhhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+IHtcbiAgICByZXR1cm4gaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQ7XG4gICAgfSk7XG4gIH07XG4gIFxuICBleHBvcnQgY29uc3QgZGlzYWJsZUJ1dHRvbiA9IChidXR0b25FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9O1xuICBcbiAgY29uc3QgdG9nZ2xlQnV0dG9uU3RhdGUgPSAoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBpZiAoaGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGRpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICB9XG4gIH07XG4gIFxuICBleHBvcnQgY29uc3QgcmVzZXRWYWxpZGF0aW9uID0gKGZvcm1FbGVtZW50LCBpbnB1dExpc3QsIGNvbmZpZykgPT4ge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0LCBjb25maWcpO1xuICAgIH0pO1xuICB9O1xuICBcbiAgY29uc3Qgc2V0RXZlbnRMaXN0ZW5lcnMgPSAoZm9ybUVsZW1lbnQsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKVxuICAgICk7XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcbiAgXG4gICAgY29uc29sZS5sb2coaW5wdXRMaXN0KTtcbiAgICBjb25zb2xlLmxvZyhidXR0b25FbGVtZW50KTtcbiAgXG4gICAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpO1xuICBcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hlY2tJbnB1dFZhbGlkaXR5KGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGVuYWJsZVZhbGlkYXRpb24gPSAoY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZm9ybUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5mb3JtU2VsZWN0b3IpO1xuICAgIGZvcm1MaXN0LmZvckVhY2goKGZvcm1FbGVtZW50KSA9PiB7XG4gICAgICBzZXRFdmVudExpc3RlbmVycyhmb3JtRWxlbWVudCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmcoXG4gICAgaXNMb2FkaW5nLFxuICAgIGJ0bixcbiAgICBkZWZhdWx0VGV4dCA9IFwiU2F2ZVwiLFxuICAgIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIlxuICApIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBidG4udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gZGVmYXVsdFRleHQ7XG4gICAgfVxuICB9XG4gIFxuICBleHBvcnQgZnVuY3Rpb24gaGFuZGxlU3VibWl0KHJlcXVlc3QsIGV2dCwgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIFxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGV2dC5zdWJtaXR0ZXI7XG4gICAgY29uc3QgaW5pdGlhbFRleHQgPSBzdWJtaXRCdG4udGV4dENvbnRlbnQ7XG4gIFxuICAgIHJlbmRlckxvYWRpbmcodHJ1ZSwgc3VibWl0QnRuLCBpbml0aWFsVGV4dCwgbG9hZGluZ1RleHQpO1xuICBcbiAgICByZXF1ZXN0KClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgZXZ0LnRhcmdldC5yZXNldCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICByZW5kZXJMb2FkaW5nKGZhbHNlLCBzdWJtaXRCdG4sIGluaXRpYWxUZXh0KTtcbiAgICAgIH0pO1xuICB9XG4gICIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5pbXBvcnQgeyBlbmFibGVWYWxpZGF0aW9uLCBzZXR0aW5ncywgcmVzZXRWYWxpZGF0aW9uLCBkaXNhYmxlQnV0dG9uIH0gZnJvbSBcIi4uL3NjcmlwdHMvdmFsaWRhdGlvbi5qc1wiO1xuaW1wb3J0IHsgaGFuZGxlU3VibWl0IH0gZnJvbSBcIi4uL3V0aWxzL2hlbHBlcnNcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL3V0aWxzL0FwaS5qc1wiO1xuXG5sZXQgc2VsZWN0ZWRDYXJkLCBzZWxlY3RlZENhcmRJZDtcblxuLy8gQVBJIHNldHVwXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCIyNjJmZWViOS0xNzRiLTQ2OWEtOWIxOC02NGExNzVmYWFkYzlcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5hcGlcbiAgLmdldEFwcEluZm8oKVxuICAudGhlbigoW2NhcmRzLCB1c2Vyc10pID0+IHtcbiAgICAvLyBNb2NrIGRhdGEgZm9yIHRlc3RpbmcgaWYgbm8gY2FyZHMgYXJlIHJldHVybmVkXG4gICAgY29uc3QgbW9ja0NhcmRzID0gW1xuICAgICAgeyBuYW1lOiBcIlNhbXBsZSBDYXJkIDFcIiwgbGluazogXCJodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMTUwXCIsIGFsdDogXCJTYW1wbGUgMVwiIH0sXG4gICAgICB7IG5hbWU6IFwiU2FtcGxlIENhcmQgMlwiLCBsaW5rOiBcImh0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8xNTBcIiwgYWx0OiBcIlNhbXBsZSAyXCIgfVxuICAgIF07XG5cbiAgICAvLyBVc2UgbW9jayBkYXRhIGlmIHRoZSBBUEkgcmV0dXJucyBubyBjYXJkc1xuICAgIGNvbnN0IGNhcmRzVG9EaXNwbGF5ID0gY2FyZHMubGVuZ3RoID4gMCA/IGNhcmRzIDogbW9ja0NhcmRzO1xuXG4gICAgY2FyZHNUb0Rpc3BsYXkucmV2ZXJzZSgpO1xuICAgIGNhcmRzVG9EaXNwbGF5LmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoY2FyZCk7XG4gICAgfSk7XG5cbiAgICBwcm9maWxlSW1hZ2Uuc3JjID0gdXNlcnMuYXZhdGFyO1xuICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlcnMubmFtZTtcbiAgICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB1c2Vycy5hYm91dDtcbiAgfSlcbiAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuXG5cbi8vIERPTSBlbGVtZW50c1xuY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNtb2RhbC1jbG9zZS1idG5cIik7XG5jb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZWRpdC1idG5cIik7XG5jb25zdCBwcm9maWxlSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcbmNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcbmNvbnN0IGNhcmRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbmNvbnN0IGF2YXRhck1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXItYnRuXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1tb2RhbFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLWZvcm1cIik7XG5jb25zdCBuYW1lSW5wdXQgPSBlZGl0UHJvZmlsZU1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZS1pbnB1dFwiKTtcbmNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBlZGl0UHJvZmlsZU1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24taW5wdXRcIik7XG5jb25zdCBjYXJkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbW9kYWxcIik7XG5jb25zdCBjYXJkTW9kYWxGb3JtID0gY2FyZE1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtZm9ybVwiKTtcbmNvbnN0IGNhcmRTdWJtaXRCdXR0b24gPSBjYXJkTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5cIik7XG5jb25zdCBpbWFnZUlucHV0ID0gY2FyZE1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGluay1pbnB1dFwiKTtcbmNvbnN0IHRpdGxlSW5wdXQgPSBjYXJkTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1jYXB0aW9uLWlucHV0XCIpO1xuY29uc3QgYXZhdGFyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci1tb2RhbFwiKTtcbmNvbnN0IGF2YXRhck1vZGFsRm9ybSA9IGF2YXRhck1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLWZvcm1cIik7XG5jb25zdCBhdmF0YXJJbnB1dCA9IGF2YXRhck1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtYXZhdGFyLWlucHV0XCIpO1xuY29uc3QgYXZhdGFyU3VibWl0QnV0dG9uID0gYXZhdGFyTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5cIik7XG5jb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuY29uc3QgZGVsZXRlRm9ybSA9IGRlbGV0ZU1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xuY29uc3QgZGVsZXRlQ2FuY2VsQnV0dG9uID0gZGVsZXRlTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5fdHlwZV9jYW5jZWxcIik7XG5jb25zdCBjYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGVtcGxhdGVcIik/LmNvbnRlbnQ7XG5jb25zdCBjYXJkc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saXN0XCIpO1xuY29uc3QgcHJldmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmV2aWV3LW1vZGFsXCIpO1xuY29uc3QgcHJldmlld01vZGFsSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG5jb25zdCBwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XG5cbi8vIEZ1bmN0aW9uc1xuZnVuY3Rpb24gY2xvc2VNb2RhbE92ZXJsYXkoZXZ0KSB7XG4gIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xuICAgIGNsb3NlTW9kYWwoZXZ0LmN1cnJlbnRUYXJnZXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWxFc2MoZXZ0KSB7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY29uc3QgbW9kYWxPcGVuZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX29wZW5lZFwiKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsT3BlbmVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgY2xvc2VNb2RhbE92ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlTW9kYWxFc2MpO1xuICBtb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGNsb3NlTW9kYWxPdmVybGF5KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpdGVtLCBtZXRob2QgPSBcInByZXBlbmRcIikge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGdldENhcmRFbGVtZW50KGl0ZW0pO1xuICBjYXJkc0xpc3RbbWV0aG9kXShjYXJkRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldENhcmRFbGVtZW50KGRhdGEpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjYXJkVGVtcGxhdGUucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgY2FyZE5hbWVFbGVtZW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgY29uc3QgY2FyZEltYWdlRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ0blwiKTtcbiAgY29uc3QgY2FyZGRlbGV0ZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ0blwiKTtcblxuICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuICB9XG5cbiAgY2FyZEltYWdlRWxlbWVudC5zcmMgPSBkYXRhLmxpbms7XG4gIGNhcmRJbWFnZUVsZW1lbnQuYWx0ID0gZGF0YS5hbHQ7XG4gIGNhcmROYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcblxuICBjYXJkTGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gaGFuZGxlTGlrZShldnQsIGRhdGEuX2lkKSk7XG4gIGNhcmRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZURlbGV0ZUNhcmQoY2FyZEVsZW1lbnQsIGRhdGEuX2lkKSk7XG4gIGNhcmRJbWFnZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUltYWdlQ2xpY2soZGF0YSkpO1xuXG4gIHJldHVybiBjYXJkRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQXZhdGFyU3VibWl0KGV2dCkge1xuICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICByZXR1cm4gYXBpLmVkaXRBdmF0YXJJbmZvKGF2YXRhcklucHV0LnZhbHVlKS50aGVuKChhdmF0YXJEYXRhKSA9PiB7XG4gICAgICBwcm9maWxlSW1hZ2Uuc3JjID0gYXZhdGFyRGF0YS5hdmF0YXI7XG4gICAgICBkaXNhYmxlQnV0dG9uKGF2YXRhclN1Ym1pdEJ1dHRvbiwgc2V0dGluZ3MpO1xuICAgICAgY2xvc2VNb2RhbChhdmF0YXJNb2RhbCk7XG4gICAgfSk7XG4gIH1cbiAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMaWtlKGV2dCwgaWQpIHtcbiAgY29uc3QgY2FyZExpa2VCdXR0b24gPSBldnQudGFyZ2V0O1xuICBjb25zdCBpc0xpa2VkID0gY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZS1idG5fbGlrZWRcIik7XG5cbiAgYXBpLmNoYW5nZUxpa2VTdGF0dXMoaWQsIGlzTGlrZWQpLnRoZW4oKCkgPT4ge1xuICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiLCAhaXNMaWtlZCk7XG4gIH0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBjYXJkSWQpIHtcbiAgc2VsZWN0ZWRDYXJkID0gY2FyZEVsZW1lbnQ7XG4gIHNlbGVjdGVkQ2FyZElkID0gY2FyZElkO1xuICBvcGVuTW9kYWwoZGVsZXRlTW9kYWwpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVJbWFnZUNsaWNrKGRhdGEpIHtcbiAgcHJldmlld01vZGFsSW1hZ2VFbGVtZW50LnNyYyA9IGRhdGEubGluaztcbiAgcHJldmlld01vZGFsSW1hZ2VFbGVtZW50LmFsdCA9IGRhdGEubmFtZTtcbiAgcHJldmlld01vZGFsQ2FwdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIG9wZW5Nb2RhbChwcmV2aWV3TW9kYWwpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFZGl0UHJvZmlsZVN1Ym1pdChldnQpIHtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5lZGl0VXNlckluZm8oe1xuICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgYWJvdXQ6IGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG4gICAgfSkudGhlbigodXNlckRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlckRhdGEubmFtZTtcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHVzZXJEYXRhLmFib3V0O1xuICAgICAgY2xvc2VNb2RhbChlZGl0UHJvZmlsZU1vZGFsKTtcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUFkZENhcmRTdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuYWRkQ2FyZCh7XG4gICAgICBuYW1lOiB0aXRsZUlucHV0LnZhbHVlLFxuICAgICAgbGluazogaW1hZ2VJbnB1dC52YWx1ZSxcbiAgICB9KS50aGVuKChjYXJkRGF0YSkgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChjYXJkRGF0YSk7XG4gICAgICBkaXNhYmxlQnV0dG9uKGNhcmRTdWJtaXRCdXR0b24sIHNldHRpbmdzKTtcbiAgICAgIGNsb3NlTW9kYWwoY2FyZE1vZGFsKTtcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZGVsZXRlQ2FyZChzZWxlY3RlZENhcmRJZCkudGhlbigoKSA9PiB7XG4gICAgICBzZWxlY3RlZENhcmQucmVtb3ZlKCk7XG4gICAgICBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKTtcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCwgXCJEZWxldGluZy4uLlwiKTtcbn1cblxuLy8gRXZlbnQgbGlzdGVuZXJzXG5pZiAoY2xvc2VCdXR0b25zKSB7XG4gIGNsb3NlQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGJ1dHRvbi5jbG9zZXN0KFwiLm1vZGFsXCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VNb2RhbChtb2RhbCkpO1xuICB9KTtcbn1cblxuaWYgKGF2YXRhck1vZGFsQnV0dG9uKSB7XG4gIGF2YXRhck1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBvcGVuTW9kYWwoYXZhdGFyTW9kYWwpKTtcbn1cblxuaWYgKGF2YXRhck1vZGFsRm9ybSkge1xuICBhdmF0YXJNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBdmF0YXJTdWJtaXQpO1xufVxuXG5pZiAoZWRpdFByb2ZpbGVCdXR0b24pIHtcbiAgZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBuYW1lSW5wdXQudmFsdWUgPSBwcm9maWxlTmFtZS50ZXh0Q29udGVudDtcbiAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50O1xuICAgIHJlc2V0VmFsaWRhdGlvbihlZGl0UHJvZmlsZUZvcm0sIFtuYW1lSW5wdXQsIGRlc2NyaXB0aW9uSW5wdXRdLCBzZXR0aW5ncyk7XG4gICAgb3Blbk1vZGFsKGVkaXRQcm9maWxlTW9kYWwpO1xuICB9KTtcbn1cblxuaWYgKGVkaXRQcm9maWxlRm9ybSkge1xuICBlZGl0UHJvZmlsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVFZGl0UHJvZmlsZVN1Ym1pdCk7XG59XG5cbmlmIChjYXJkTW9kYWxCdXR0b24pIHtcbiAgY2FyZE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBvcGVuTW9kYWwoY2FyZE1vZGFsKSk7XG59XG5cbmlmIChjYXJkTW9kYWxGb3JtKSB7XG4gIGNhcmRNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBZGRDYXJkU3VibWl0KTtcbn1cblxuaWYgKGRlbGV0ZUZvcm0pIHtcbiAgZGVsZXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQpO1xufVxuXG5pZiAoZGVsZXRlQ2FuY2VsQnV0dG9uKSB7XG4gIGRlbGV0ZUNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VNb2RhbChkZWxldGVNb2RhbCkpO1xufVxuXG4vLyBFbmFibGUgZm9ybSB2YWxpZGF0aW9uXG5lbmFibGVWYWxpZGF0aW9uKHNldHRpbmdzKTtcbiIsImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBjaGVja1Jlc3BvbnNlKHJlcykge1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuXG4gIHJlcXVlc3QodXJsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucykudGhlbih0aGlzLmNoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBlZGl0VXNlckluZm8oeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWJvdXQsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRBdmF0YXJJbmZvKGF2YXRhcikge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENhcmQoeyBuYW1lLCBsaW5rIH0pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxpbmssXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUxpa2VTdGF0dXMoaWQsIGlzTGlrZWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBpc0xpa2VkID8gXCJERUxFVEVcIiA6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcbiJdLCJuYW1lcyI6WyJzZXR0aW5ncyIsImZvcm1TZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiaGlkZUlucHV0RXJyb3IiLCJmb3JtRWxlbWVudCIsImlucHV0RWxlbWVudCIsImNvbmZpZyIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZGlzYWJsZUJ1dHRvbiIsImJ1dHRvbkVsZW1lbnQiLCJkaXNhYmxlZCIsImFkZCIsInRvZ2dsZUJ1dHRvblN0YXRlIiwiaW5wdXRMaXN0Iiwic29tZSIsInZhbGlkaXR5IiwidmFsaWQiLCJoYXNJbnZhbGlkSW5wdXQiLCJyZW5kZXJMb2FkaW5nIiwiaXNMb2FkaW5nIiwiYnRuIiwiZGVmYXVsdFRleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJsb2FkaW5nVGV4dCIsImhhbmRsZVN1Ym1pdCIsInJlcXVlc3QiLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEJ0biIsInN1Ym1pdHRlciIsImluaXRpYWxUZXh0IiwidGhlbiIsInRhcmdldCIsInJlc2V0IiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJmaW5hbGx5Iiwic2VsZWN0ZWRDYXJkIiwic2VsZWN0ZWRDYXJkSWQiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIl9yZWYiLCJiYXNlVXJsIiwiaGVhZGVycyIsInRoaXMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImNoZWNrUmVzcG9uc2UiLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJzdGF0dXMiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJlZGl0VXNlckluZm8iLCJfcmVmMiIsIm5hbWUiLCJhYm91dCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZWRpdEF2YXRhckluZm8iLCJhdmF0YXIiLCJhZGRDYXJkIiwiX3JlZjMiLCJsaW5rIiwiZGVsZXRlQ2FyZCIsImNoYW5nZUxpa2VTdGF0dXMiLCJpc0xpa2VkIiwiYXV0aG9yaXphdGlvbiIsImNhcmRzIiwidXNlcnMiLCJjYXJkc1RvRGlzcGxheSIsImFsdCIsInJldmVyc2UiLCJmb3JFYWNoIiwiY2FyZCIsInJlbmRlckNhcmQiLCJwcm9maWxlSW1hZ2UiLCJzcmMiLCJwcm9maWxlTmFtZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsImNsb3NlQnV0dG9ucyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImVkaXRQcm9maWxlQnV0dG9uIiwiY2FyZE1vZGFsQnV0dG9uIiwiYXZhdGFyTW9kYWxCdXR0b24iLCJlZGl0UHJvZmlsZU1vZGFsIiwiZWRpdFByb2ZpbGVGb3JtIiwibmFtZUlucHV0IiwiZGVzY3JpcHRpb25JbnB1dCIsImNhcmRNb2RhbCIsImNhcmRNb2RhbEZvcm0iLCJjYXJkU3VibWl0QnV0dG9uIiwiaW1hZ2VJbnB1dCIsInRpdGxlSW5wdXQiLCJhdmF0YXJNb2RhbCIsImF2YXRhck1vZGFsRm9ybSIsImF2YXRhcklucHV0IiwiYXZhdGFyU3VibWl0QnV0dG9uIiwiZGVsZXRlTW9kYWwiLCJkZWxldGVGb3JtIiwiZGVsZXRlQ2FuY2VsQnV0dG9uIiwiY2FyZFRlbXBsYXRlIiwiY29udGVudCIsImNhcmRzTGlzdCIsInByZXZpZXdNb2RhbCIsInByZXZpZXdNb2RhbEltYWdlRWxlbWVudCIsInByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50IiwiY2xvc2VNb2RhbE92ZXJsYXkiLCJjdXJyZW50VGFyZ2V0IiwiY2xvc2VNb2RhbCIsImNsb3NlTW9kYWxFc2MiLCJrZXkiLCJvcGVuTW9kYWwiLCJtb2RhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaXRlbSIsImNhcmRFbGVtZW50IiwiZGF0YSIsImNsb25lTm9kZSIsImNhcmROYW1lRWxlbWVudCIsImNhcmRJbWFnZUVsZW1lbnQiLCJjYXJkTGlrZUJ1dHRvbiIsImNhcmRkZWxldGVCdXR0b24iLCJjb250YWlucyIsInRvZ2dsZSIsImhhbmRsZUxpa2UiLCJfaWQiLCJjYXJkSWQiLCJoYW5kbGVEZWxldGVDYXJkIiwiaGFuZGxlSW1hZ2VDbGljayIsImdldENhcmRFbGVtZW50IiwiYnV0dG9uIiwiY2xvc2VzdCIsInZhbHVlIiwiYXZhdGFyRGF0YSIsInJlc2V0VmFsaWRhdGlvbiIsImlucHV0IiwidXNlckRhdGEiLCJjYXJkRGF0YSIsInNldEV2ZW50TGlzdGVuZXJzIiwiQXJyYXkiLCJmcm9tIiwibG9nIiwiY2hlY2tJbnB1dFZhbGlkaXR5Iiwic2hvd0lucHV0RXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckVsZW1lbnQiLCJ2YWxpZGF0aW9uTWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=