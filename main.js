!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}let s,i;const l=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"7a1857b8-0326-43ef-b325-d3424afa2503","Content-Type":"application/json"}});document.addEventListener("DOMContentLoaded",(()=>{const o=document.querySelectorAll(".modal__close-btn"),c=document.querySelector(".profile__edit-btn"),d=document.querySelector(".profile__avatar"),u=document.querySelector(".profile__name"),m=document.querySelector(".profile__description"),_=document.querySelector(".profile__add-btn"),h=document.querySelector(".profile__avatar-btn"),v=document.querySelector("#edit-modal"),f=v?.querySelector("#edit-profile-form"),y=v?.querySelector("#profile-name-input"),S=v?.querySelector("#profile-description-input"),p=document.querySelector("#card-modal"),b=p?.querySelector("#card-form"),q=p?.querySelector(".modal__submit-btn"),E=p?.querySelector("#card-link-input"),L=p?.querySelector("#card-caption-input"),k=document.querySelector("#avatar-modal"),g=k?.querySelector("#edit-avatar-form"),C=k?.querySelector("#profile-avatar-input"),U=k?.querySelector(".modal__submit-btn"),x=document.querySelector("#delete-modal"),$=x?.querySelector(".modal__form"),A=x?.querySelector(".modal__submit-btn_type_cancel"),I=document.querySelector("#card-template").content,T=document.querySelector(".cards__list"),w=document.querySelector("#preview-modal"),D=w?.querySelector(".modal__image"),O=w?.querySelector(".modal__caption");var P;function B(e){e.target===e.currentTarget&&J(e.currentTarget)}function N(e){"Escape"===e.key&&J(document.querySelector(".modal_opened"))}function j(e){e&&(e.classList.add("modal_opened"),document.addEventListener("keydown",N),e.addEventListener("mousedown",B))}function J(e){e&&(e.classList.remove("modal_opened"),document.removeEventListener("keydown",N),e.removeEventListener("mousedown",B))}function M(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){const t=I.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return e.isLiked&&o.classList.add("card__like-btn_liked"),n.src=e.link,n.alt=e.alt,r.textContent=e.name,o.addEventListener("click",(t=>function(e,t){const r=e.target,n=r.classList.contains("card__like-btn_liked");l.changeLikeStatus(t,n).then((e=>{r.classList.toggle("card__like-btn_liked",!e)})).catch(console.error)}(t,e._id))),a.addEventListener("click",(()=>function(e,t){s=e,i=t,j(x)}(t,e._id))),n.addEventListener("click",(()=>function(e){D.src=e.link,D.alt=e.name,O.textContent=e.name,j(w)}(e))),t}(e);T[t](r)}c&&d&&u&&m?(l.getAppInfo().then((e=>{let[t,r]=e;t.reverse(),t.forEach((e=>{M(e)})),d.src=r.avatar,u.textContent=r.name,m.textContent=r.about})).catch(console.error),o.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>J(t)))})),h.addEventListener("click",(()=>{j(k)})),g?.addEventListener("submit",(function(t){a((function(){return l.editAvatarInfo(C.value).then((t=>{d.src=t.avatar,r(U,e),J(k)}))}),t)})),c.addEventListener("click",(()=>{var r,n;y.value=u.textContent,S.value=m.textContent,r=f,n=e,[y,S].forEach((e=>{t(r,e,n)})),j(v)})),f?.addEventListener("submit",(function(e){a((function(){return l.editUserInfo({name:y.value,about:S.value}).then((e=>{u.textContent=e.name,m.textContent=e.about,J(v)}))}),e)})),_.addEventListener("click",(()=>{j(p)})),b?.addEventListener("submit",(function(t){a((function(){return l.addCard({name:L.value,link:E.value}).then((t=>{M(t),r(q,e),J(p)}))}),t)})),$?.addEventListener("submit",(function(e){a((function(){return l.deleteCard(i).then((()=>{s.remove(),J(x)}))}),e,"Deleting...")})),A?.addEventListener("click",(()=>{J(x)})),P=e,document.querySelectorAll(P.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((s=>{s.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,s,r),n(o,a,r)}))}))})(e,P)}))):console.error("Some profile elements could not be found in the DOM.")}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBZWhLLEVBQVlHLGNBQWMsSUFBSUYsRUFBYUcsWUFDaEVILEVBQWFLLFVBQVVLLElBQUlULEVBQU9MLGlCQUNsQ21LLEVBQWEzSixZQUFjMEosQ0FBWSxFQVdyQ0QsQ0FDRTlKLEVBQ0FDLEVBQ0FBLEVBQWFnSyxrQkFDYi9KLEVBSUosRUEwQ0kySixDQUFtQjdKLEVBQWFDLEVBQWNDLEdBQzlDVSxFQUFrQkMsRUFBV0osRUFBZVAsRUFDOUMsR0FBRSxHQUNGLEVBTUF1SixDQUFrQnpKLEVBQWFFLEVBQU8sS0VoQnhDbUMsUUFBUUMsTUFBTSx1REE2TFUsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvc2NyaXB0cy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvQXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXG4gICAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXG4gICAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zdWJtaXQtYnRuXCIsXG4gICAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc3VibWl0LWJ0bl9pbmFjdGl2ZVwiLFxuICAgIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxuICAgIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yXCIsXG4gIH07XG4gIFxuICBjb25zdCBzaG93SW5wdXRFcnJvciA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gIH07XG4gIFxuICBjb25zdCBoaWRlSW5wdXRFcnJvciA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IGNoZWNrSW5wdXRWYWxpZGl0eSA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgc2hvd0lucHV0RXJyb3IoXG4gICAgICAgIGZvcm1FbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQsXG4gICAgICAgIGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZSxcbiAgICAgICAgY29uZmlnXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGNvbnN0IGhhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+IHtcbiAgICByZXR1cm4gaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQ7XG4gICAgfSk7XG4gIH07XG4gIFxuICBleHBvcnQgY29uc3QgZGlzYWJsZUJ1dHRvbiA9IChidXR0b25FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9O1xuICBcbiAgY29uc3QgdG9nZ2xlQnV0dG9uU3RhdGUgPSAoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBpZiAoaGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGRpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICB9XG4gIH07XG4gIFxuICBleHBvcnQgY29uc3QgcmVzZXRWYWxpZGF0aW9uID0gKGZvcm1FbGVtZW50LCBpbnB1dExpc3QsIGNvbmZpZykgPT4ge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0LCBjb25maWcpO1xuICAgIH0pO1xuICB9O1xuICBcbiAgY29uc3Qgc2V0RXZlbnRMaXN0ZW5lcnMgPSAoZm9ybUVsZW1lbnQsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKVxuICAgICk7XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcbiAgXG4gICAgY29uc29sZS5sb2coaW5wdXRMaXN0KTtcbiAgICBjb25zb2xlLmxvZyhidXR0b25FbGVtZW50KTtcbiAgXG4gICAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpO1xuICBcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hlY2tJbnB1dFZhbGlkaXR5KGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGVuYWJsZVZhbGlkYXRpb24gPSAoY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZm9ybUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5mb3JtU2VsZWN0b3IpO1xuICAgIGZvcm1MaXN0LmZvckVhY2goKGZvcm1FbGVtZW50KSA9PiB7XG4gICAgICBzZXRFdmVudExpc3RlbmVycyhmb3JtRWxlbWVudCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmcoXG4gICAgaXNMb2FkaW5nLFxuICAgIGJ0bixcbiAgICBkZWZhdWx0VGV4dCA9IFwiU2F2ZVwiLFxuICAgIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIlxuICApIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBidG4udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gZGVmYXVsdFRleHQ7XG4gICAgfVxuICB9XG4gIFxuICBleHBvcnQgZnVuY3Rpb24gaGFuZGxlU3VibWl0KHJlcXVlc3QsIGV2dCwgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIFxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGV2dC5zdWJtaXR0ZXI7XG4gICAgY29uc3QgaW5pdGlhbFRleHQgPSBzdWJtaXRCdG4udGV4dENvbnRlbnQ7XG4gIFxuICAgIHJlbmRlckxvYWRpbmcodHJ1ZSwgc3VibWl0QnRuLCBpbml0aWFsVGV4dCwgbG9hZGluZ1RleHQpO1xuICBcbiAgICByZXF1ZXN0KClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgZXZ0LnRhcmdldC5yZXNldCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICByZW5kZXJMb2FkaW5nKGZhbHNlLCBzdWJtaXRCdG4sIGluaXRpYWxUZXh0KTtcbiAgICAgIH0pO1xuICB9XG4gICIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5pbXBvcnQge1xuICBlbmFibGVWYWxpZGF0aW9uLFxuICBzZXR0aW5ncyxcbiAgcmVzZXRWYWxpZGF0aW9uLFxuICBkaXNhYmxlQnV0dG9uLFxufSBmcm9tIFwiLi4vc2NyaXB0cy92YWxpZGF0aW9uLmpzXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi91dGlscy9BcGkuanNcIjtcbmltcG9ydCB7IGhhbmRsZVN1Ym1pdCB9IGZyb20gXCIuLi91dGlscy9oZWxwZXJzXCI7XG5cbmxldCBzZWxlY3RlZENhcmQsIHNlbGVjdGVkQ2FyZElkO1xuXG4vLyBBUElcbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcIjdhMTg1N2I4LTAzMjYtNDNlZi1iMzI1LWQzNDI0YWZhMjUwM1wiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gIH0sXG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAvLyBVbml2ZXJzYWwgZWxlbWVudHNcbiAgY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xuXG4gIC8vIFByb2ZpbGUgZWxlbWVudHNcbiAgY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnRuXCIpO1xuICBjb25zdCBwcm9maWxlSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcbiAgY29uc3QgcHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG4gIGNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IGNhcmRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbiAgY29uc3QgYXZhdGFyTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhci1idG5cIik7XG5cbiAgLy8gQ2FyZCBmb3JtIGVsZW1lbnRzXG4gIGNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtbW9kYWxcIik7XG4gIGNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLWZvcm1cIik7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGVkaXRQcm9maWxlTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lLWlucHV0XCIpO1xuICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZWRpdFByb2ZpbGVNb2RhbD8ucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCIpO1xuICBjb25zdCBjYXJkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbW9kYWxcIik7XG4gIGNvbnN0IGNhcmRNb2RhbEZvcm0gPSBjYXJkTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1mb3JtXCIpO1xuICBjb25zdCBjYXJkU3VibWl0QnV0dG9uID0gY2FyZE1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnRuXCIpO1xuICBjb25zdCBpbWFnZUlucHV0ID0gY2FyZE1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGluay1pbnB1dFwiKTtcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGNhcmRNb2RhbD8ucXVlcnlTZWxlY3RvcihcIiNjYXJkLWNhcHRpb24taW5wdXRcIik7XG5cbiAgLy8gQXZhdGFyIGZvcm0gZWxlbWVudHNcbiAgY29uc3QgYXZhdGFyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci1tb2RhbFwiKTtcbiAgY29uc3QgYXZhdGFyTW9kYWxGb3JtID0gYXZhdGFyTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hdmF0YXItZm9ybVwiKTtcbiAgY29uc3QgYXZhdGFySW5wdXQgPSBhdmF0YXJNb2RhbD8ucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWF2YXRhci1pbnB1dFwiKTtcbiAgY29uc3QgYXZhdGFyU3VibWl0QnV0dG9uID0gYXZhdGFyTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5cIik7XG5cbiAgLy8gRGVsZXRlIGZvcm0gZWxlbWVudHNcbiAgY29uc3QgZGVsZXRlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlbGV0ZS1tb2RhbFwiKTtcbiAgY29uc3QgZGVsZXRlRm9ybSA9IGRlbGV0ZU1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xuICBjb25zdCBkZWxldGVDYW5jZWxCdXR0b24gPSBkZWxldGVNb2RhbD8ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0bl90eXBlX2NhbmNlbFwiKTtcblxuICAvLyBDYXJkLXJlbGF0ZWQgZWxlbWVudHNcbiAgY29uc3QgY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XG4gIGNvbnN0IGNhcmRzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2xpc3RcIik7XG5cbiAgLy8gUHJldmlldyBpbWFnZSBwb3B1cCBlbGVtZW50c1xuICBjb25zdCBwcmV2aWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByZXZpZXctbW9kYWxcIik7XG4gIGNvbnN0IHByZXZpZXdNb2RhbEltYWdlRWxlbWVudCA9IHByZXZpZXdNb2RhbD8ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG4gIGNvbnN0IHByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50ID0gcHJldmlld01vZGFsPy5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYXB0aW9uXCIpO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHlvdXIgc2VsZWN0b3JzIHdvcmsgYnkgY2hlY2tpbmcgaWYgdGhlIGVsZW1lbnRzIGV4aXN0XG4gIGlmICghZWRpdFByb2ZpbGVCdXR0b24gfHwgIXByb2ZpbGVJbWFnZSB8fCAhcHJvZmlsZU5hbWUgfHwgIXByb2ZpbGVEZXNjcmlwdGlvbikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTb21lIHByb2ZpbGUgZWxlbWVudHMgY291bGQgbm90IGJlIGZvdW5kIGluIHRoZSBET00uXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEFQSSBjYWxsIHRvIGdldCBhcHAgaW5mb1xuICBhcGlcbiAgICAuZ2V0QXBwSW5mbygpXG4gICAgLnRoZW4oKFtjYXJkcywgdXNlcnNdKSA9PiB7XG4gICAgICBjYXJkcy5yZXZlcnNlKCk7XG4gICAgICBjYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICAgIHJlbmRlckNhcmQoY2FyZCk7XG4gICAgICB9KTtcblxuICAgICAgcHJvZmlsZUltYWdlLnNyYyA9IHVzZXJzLmF2YXRhcjtcbiAgICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlcnMubmFtZTtcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHVzZXJzLmFib3V0O1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuXG4gIC8vIEZ1bmN0aW9uc1xuICBmdW5jdGlvbiBjbG9zZU1vZGFsT3ZlcmxheShldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldCA9PT0gZXZ0LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgIGNsb3NlTW9kYWwoZXZ0LmN1cnJlbnRUYXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlTW9kYWxFc2MoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGNvbnN0IG1vZGFsT3BlbmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9vcGVuZWRcIik7XG4gICAgICBjbG9zZU1vZGFsKG1vZGFsT3BlbmVkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgICBpZiAoIW1vZGFsKSByZXR1cm47XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU1vZGFsRXNjKTtcbiAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGNsb3NlTW9kYWxPdmVybGF5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcbiAgICBpZiAoIW1vZGFsKSByZXR1cm47XG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU1vZGFsRXNjKTtcbiAgICBtb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGNsb3NlTW9kYWxPdmVybGF5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckNhcmQoaXRlbSwgbWV0aG9kID0gXCJwcmVwZW5kXCIpIHtcbiAgICBjb25zdCBjYXJkRWxlbWVudCA9IGdldENhcmRFbGVtZW50KGl0ZW0pO1xuICAgIGNhcmRzTGlzdFttZXRob2RdKGNhcmRFbGVtZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENhcmRFbGVtZW50KGRhdGEpIHtcbiAgICBjb25zdCBjYXJkRWxlbWVudCA9IGNhcmRUZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIikuY2xvbmVOb2RlKHRydWUpO1xuICAgIGNvbnN0IGNhcmROYW1lRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gICAgY29uc3QgY2FyZEltYWdlRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgY29uc3QgY2FyZExpa2VCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnRuXCIpO1xuICAgIGNvbnN0IGNhcmRkZWxldGVCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idG5cIik7XG5cbiAgICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgICBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fbGlrZS1idG5fbGlrZWRcIik7XG4gICAgfVxuXG4gICAgY2FyZEltYWdlRWxlbWVudC5zcmMgPSBkYXRhLmxpbms7XG4gICAgY2FyZEltYWdlRWxlbWVudC5hbHQgPSBkYXRhLmFsdDtcbiAgICBjYXJkTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG5cbiAgICBjYXJkTGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gaGFuZGxlTGlrZShldnQsIGRhdGEuX2lkKSk7XG4gICAgY2FyZGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIGhhbmRsZURlbGV0ZUNhcmQoY2FyZEVsZW1lbnQsIGRhdGEuX2lkKVxuICAgICk7XG4gICAgY2FyZEltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlSW1hZ2VDbGljayhkYXRhKSk7XG5cbiAgICByZXR1cm4gY2FyZEVsZW1lbnQ7XG4gIH1cblxuICAvLyBFdmVudCBoYW5kbGVyc1xuICBmdW5jdGlvbiBoYW5kbGVBdmF0YXJTdWJtaXQoZXZ0KSB7XG4gICAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgICByZXR1cm4gYXBpLmVkaXRBdmF0YXJJbmZvKGF2YXRhcklucHV0LnZhbHVlKS50aGVuKChhdmF0YXJEYXRhKSA9PiB7XG4gICAgICAgIHByb2ZpbGVJbWFnZS5zcmMgPSBhdmF0YXJEYXRhLmF2YXRhcjtcbiAgICAgICAgZGlzYWJsZUJ1dHRvbihhdmF0YXJTdWJtaXRCdXR0b24sIHNldHRpbmdzKTtcbiAgICAgICAgY2xvc2VNb2RhbChhdmF0YXJNb2RhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVMaWtlKGV2dCwgaWQpIHtcbiAgICBjb25zdCBjYXJkTGlrZUJ1dHRvbiA9IGV2dC50YXJnZXQ7XG4gICAgY29uc3QgaXNMaWtlZCA9IGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuXG4gICAgYXBpXG4gICAgICAuY2hhbmdlTGlrZVN0YXR1cyhpZCwgaXNMaWtlZClcbiAgICAgIC50aGVuKChpc0xpa2VkKSA9PiB7XG4gICAgICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiLCAhaXNMaWtlZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgY2FyZElkKSB7XG4gICAgc2VsZWN0ZWRDYXJkID0gY2FyZEVsZW1lbnQ7XG4gICAgc2VsZWN0ZWRDYXJkSWQgPSBjYXJkSWQ7XG4gICAgb3Blbk1vZGFsKGRlbGV0ZU1vZGFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUltYWdlQ2xpY2soZGF0YSkge1xuICAgIHByZXZpZXdNb2RhbEltYWdlRWxlbWVudC5zcmMgPSBkYXRhLmxpbms7XG4gICAgcHJldmlld01vZGFsSW1hZ2VFbGVtZW50LmFsdCA9IGRhdGEubmFtZTtcbiAgICBwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICBvcGVuTW9kYWwocHJldmlld01vZGFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KGV2dCkge1xuICAgIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgICAgcmV0dXJuIGFwaVxuICAgICAgICAuZWRpdFVzZXJJbmZvKHtcbiAgICAgICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICAgICAgYWJvdXQ6IGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh1c2VyRGF0YSkgPT4ge1xuICAgICAgICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlckRhdGEubmFtZTtcbiAgICAgICAgICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB1c2VyRGF0YS5hYm91dDtcbiAgICAgICAgICBjbG9zZU1vZGFsKGVkaXRQcm9maWxlTW9kYWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVBZGRDYXJkU3VibWl0KGV2dCkge1xuICAgIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgICAgcmV0dXJuIGFwaVxuICAgICAgICAuYWRkQ2FyZCh7IG5hbWU6IHRpdGxlSW5wdXQudmFsdWUsIGxpbms6IGltYWdlSW5wdXQudmFsdWUgfSlcbiAgICAgICAgLnRoZW4oKGNhcmREYXRhKSA9PiB7XG4gICAgICAgICAgcmVuZGVyQ2FyZChjYXJkRGF0YSk7XG4gICAgICAgICAgZGlzYWJsZUJ1dHRvbihjYXJkU3VibWl0QnV0dG9uLCBzZXR0aW5ncyk7XG4gICAgICAgICAgY2xvc2VNb2RhbChjYXJkTW9kYWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkU3VibWl0KGV2dCkge1xuICAgIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgICAgcmV0dXJuIGFwaS5kZWxldGVDYXJkKHNlbGVjdGVkQ2FyZElkKS50aGVuKCgpID0+IHtcbiAgICAgICAgc2VsZWN0ZWRDYXJkLnJlbW92ZSgpO1xuICAgICAgICBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0LCBcIkRlbGV0aW5nLi4uXCIpO1xuICB9XG5cbiAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gIGNsb3NlQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGJ1dHRvbi5jbG9zZXN0KFwiLm1vZGFsXCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VNb2RhbChtb2RhbCkpO1xuICB9KTtcblxuICBhdmF0YXJNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG9wZW5Nb2RhbChhdmF0YXJNb2RhbCk7XG4gIH0pO1xuXG4gIGF2YXRhck1vZGFsRm9ybT8uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBdmF0YXJTdWJtaXQpO1xuXG4gIGVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmFtZUlucHV0LnZhbHVlID0gcHJvZmlsZU5hbWUudGV4dENvbnRlbnQ7XG4gICAgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudDtcbiAgICByZXNldFZhbGlkYXRpb24oZWRpdFByb2ZpbGVGb3JtLCBbbmFtZUlucHV0LCBkZXNjcmlwdGlvbklucHV0XSwgc2V0dGluZ3MpO1xuICAgIG9wZW5Nb2RhbChlZGl0UHJvZmlsZU1vZGFsKTtcbiAgfSk7XG5cbiAgZWRpdFByb2ZpbGVGb3JtPy5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KTtcblxuICBjYXJkTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvcGVuTW9kYWwoY2FyZE1vZGFsKTtcbiAgfSk7XG5cbiAgY2FyZE1vZGFsRm9ybT8uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBZGRDYXJkU3VibWl0KTtcblxuICBkZWxldGVGb3JtPy5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQpO1xuXG4gIGRlbGV0ZUNhbmNlbEJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKTtcbiAgfSk7XG5cbiAgZW5hYmxlVmFsaWRhdGlvbihzZXR0aW5ncyk7XG59KTtcbiIsImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBjaGVja1Jlc3BvbnNlKHJlcykge1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuXG4gIHJlcXVlc3QodXJsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucykudGhlbih0aGlzLmNoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBlZGl0VXNlckluZm8oeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWJvdXQsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRBdmF0YXJJbmZvKGF2YXRhcikge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENhcmQoeyBuYW1lLCBsaW5rIH0pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxpbmssXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUxpa2VTdGF0dXMoaWQsIGlzTGlrZWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBpc0xpa2VkID8gXCJERUxFVEVcIiA6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcbiJdLCJuYW1lcyI6WyJzZXR0aW5ncyIsImZvcm1TZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiaGlkZUlucHV0RXJyb3IiLCJmb3JtRWxlbWVudCIsImlucHV0RWxlbWVudCIsImNvbmZpZyIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZGlzYWJsZUJ1dHRvbiIsImJ1dHRvbkVsZW1lbnQiLCJkaXNhYmxlZCIsImFkZCIsInRvZ2dsZUJ1dHRvblN0YXRlIiwiaW5wdXRMaXN0Iiwic29tZSIsInZhbGlkaXR5IiwidmFsaWQiLCJoYXNJbnZhbGlkSW5wdXQiLCJyZW5kZXJMb2FkaW5nIiwiaXNMb2FkaW5nIiwiYnRuIiwiZGVmYXVsdFRleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJsb2FkaW5nVGV4dCIsImhhbmRsZVN1Ym1pdCIsInJlcXVlc3QiLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEJ0biIsInN1Ym1pdHRlciIsImluaXRpYWxUZXh0IiwidGhlbiIsInRhcmdldCIsInJlc2V0IiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJmaW5hbGx5Iiwic2VsZWN0ZWRDYXJkIiwic2VsZWN0ZWRDYXJkSWQiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIl9yZWYiLCJiYXNlVXJsIiwiaGVhZGVycyIsInRoaXMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImNoZWNrUmVzcG9uc2UiLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJzdGF0dXMiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJlZGl0VXNlckluZm8iLCJfcmVmMiIsIm5hbWUiLCJhYm91dCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZWRpdEF2YXRhckluZm8iLCJhdmF0YXIiLCJhZGRDYXJkIiwiX3JlZjMiLCJsaW5rIiwiZGVsZXRlQ2FyZCIsImNoYW5nZUxpa2VTdGF0dXMiLCJpc0xpa2VkIiwiYXV0aG9yaXphdGlvbiIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsb3NlQnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlZGl0UHJvZmlsZUJ1dHRvbiIsInByb2ZpbGVJbWFnZSIsInByb2ZpbGVOYW1lIiwicHJvZmlsZURlc2NyaXB0aW9uIiwiY2FyZE1vZGFsQnV0dG9uIiwiYXZhdGFyTW9kYWxCdXR0b24iLCJlZGl0UHJvZmlsZU1vZGFsIiwiZWRpdFByb2ZpbGVGb3JtIiwibmFtZUlucHV0IiwiZGVzY3JpcHRpb25JbnB1dCIsImNhcmRNb2RhbCIsImNhcmRNb2RhbEZvcm0iLCJjYXJkU3VibWl0QnV0dG9uIiwiaW1hZ2VJbnB1dCIsInRpdGxlSW5wdXQiLCJhdmF0YXJNb2RhbCIsImF2YXRhck1vZGFsRm9ybSIsImF2YXRhcklucHV0IiwiYXZhdGFyU3VibWl0QnV0dG9uIiwiZGVsZXRlTW9kYWwiLCJkZWxldGVGb3JtIiwiZGVsZXRlQ2FuY2VsQnV0dG9uIiwiY2FyZFRlbXBsYXRlIiwiY29udGVudCIsImNhcmRzTGlzdCIsInByZXZpZXdNb2RhbCIsInByZXZpZXdNb2RhbEltYWdlRWxlbWVudCIsInByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50IiwiY2xvc2VNb2RhbE92ZXJsYXkiLCJjdXJyZW50VGFyZ2V0IiwiY2xvc2VNb2RhbCIsImNsb3NlTW9kYWxFc2MiLCJrZXkiLCJvcGVuTW9kYWwiLCJtb2RhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJDYXJkIiwiaXRlbSIsImNhcmRFbGVtZW50IiwiZGF0YSIsImNsb25lTm9kZSIsImNhcmROYW1lRWxlbWVudCIsImNhcmRJbWFnZUVsZW1lbnQiLCJjYXJkTGlrZUJ1dHRvbiIsImNhcmRkZWxldGVCdXR0b24iLCJzcmMiLCJhbHQiLCJjb250YWlucyIsInRvZ2dsZSIsImhhbmRsZUxpa2UiLCJfaWQiLCJjYXJkSWQiLCJoYW5kbGVEZWxldGVDYXJkIiwiaGFuZGxlSW1hZ2VDbGljayIsImdldENhcmRFbGVtZW50IiwiY2FyZHMiLCJ1c2VycyIsInJldmVyc2UiLCJmb3JFYWNoIiwiY2FyZCIsImJ1dHRvbiIsImNsb3Nlc3QiLCJ2YWx1ZSIsImF2YXRhckRhdGEiLCJyZXNldFZhbGlkYXRpb24iLCJpbnB1dCIsInVzZXJEYXRhIiwiY2FyZERhdGEiLCJzZXRFdmVudExpc3RlbmVycyIsIkFycmF5IiwiZnJvbSIsImxvZyIsImNoZWNrSW5wdXRWYWxpZGl0eSIsInNob3dJbnB1dEVycm9yIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9