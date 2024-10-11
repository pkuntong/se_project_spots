!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}let s,i;const c=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"3f12c5b5-3e74-48ea-937f-23ac37f0f2e1","Content-Type":"application/json"}});document.addEventListener("DOMContentLoaded",(()=>{const o=document.querySelector("#card-template")?.content,l=document.querySelector(".cards__list"),d=document.querySelectorAll(".modal__close-btn"),u=document.querySelector(".profile__edit-btn"),m=document.querySelector(".profile__avatar"),_=document.querySelector(".profile__name"),h=document.querySelector(".profile__description"),v=document.querySelector(".profile__add-btn"),f=document.querySelector(".profile__avatar-btn"),y=document.querySelector("#edit-modal"),p=y?.querySelector("#edit-profile-form"),S=y?.querySelector("#profile-name-input"),b=y?.querySelector("#profile-description-input"),q=document.querySelector("#card-modal"),E=q?.querySelector("#card-form"),L=q?.querySelector(".modal__submit-btn"),k=q?.querySelector("#card-link-input"),g=q?.querySelector("#card-caption-input"),C=document.querySelector("#avatar-modal"),U=C?.querySelector("#edit-avatar-form"),x=C?.querySelector("#profile-avatar-input"),$=C?.querySelector(".modal__submit-btn"),A=document.querySelector("#delete-modal"),I=A?.querySelector(".modal__form"),D=A?.querySelector(".modal__submit-btn_type_cancel"),T=document.querySelector("#preview-modal"),w=T?.querySelector(".modal__image"),P=T?.querySelector(".modal__caption");var B;function O(e){e&&(e.classList.add("modal_opened"),document.addEventListener("keydown",J),e.addEventListener("mousedown",j))}function N(e){e&&(e.classList.remove("modal_opened"),document.removeEventListener("keydown",J),e.removeEventListener("mousedown",j))}function j(e){e.target===e.currentTarget&&N(e.currentTarget)}function J(e){"Escape"===e.key&&N(document.querySelector(".modal_opened"))}function H(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){const t=o.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),a=t.querySelector(".card__like-btn"),l=t.querySelector(".card__bin-btn");return e.isLiked&&a.classList.add("card__like-btn_liked"),n.src=e.link,n.alt=e.alt||e.name,r.textContent=e.name,a.addEventListener("click",(t=>function(e,t){const r=e.target,n=r.classList.contains("card__like-btn_liked");c.changeLikeStatus(t,n).then((e=>{r.classList.toggle("card__like-btn_liked",!e)})).catch(console.error)}(t,e._id))),l.addEventListener("click",(()=>function(e,t){s=e,i=t,O(A)}(t,e._id))),n.addEventListener("click",(()=>function(e){w.src=e.link,w.alt=e.name,P.textContent=e.name,O(T)}(e))),t}(e);l[t](r)}c.getAppInfo().then((e=>{let[t,r]=e;t.reverse(),t.forEach((e=>{H(e)})),m.src=r.avatar,_.textContent=r.name,h.textContent=r.about})).catch(console.error),d.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>N(t)))})),f?.addEventListener("click",(()=>{O(C)})),U?.addEventListener("submit",(function(t){t.preventDefault(),a((function(){return c.editAvatarInfo(x.value).then((t=>{m.src=t.avatar,r($,e),N(C)}))}),t)})),u?.addEventListener("click",(()=>{var r,n;S&&_&&b&&h&&(S.value=_.textContent,b.value=h.textContent,r=p,n=e,[S,b].forEach((e=>{t(r,e,n)})),O(y))})),p?.addEventListener("submit",(function(e){e.preventDefault(),a((function(){return c.editUserInfo({name:S.value,about:b.value}).then((e=>{_.textContent=e.name,h.textContent=e.about,N(y)}))}),e)})),v?.addEventListener("click",(()=>{O(q)})),E?.addEventListener("submit",(function(t){t.preventDefault(),a((function(){return c.addCard({name:g.value,link:k.value}).then((t=>{H(t),r(L,e),N(q)}))}),t)})),I?.addEventListener("submit",(function(e){e.preventDefault(),a((function(){return c.deleteCard(i).then((()=>{s.remove(),N(A)}))}),e,"Deleting...")})),D?.addEventListener("click",(()=>{N(A)})),B=e,document.querySelectorAll(B.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((s=>{s.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,s,r),n(o,a,r)}))}))})(e,B)}))}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhQyxFQUFjQyxHQXJCdkI0SixFQUFDOUosRUFBYUMsRUFBYzhKLEVBQWM3SixLQUMvRCxNQUFNOEosRUFBZWhLLEVBQVlHLGNBQWMsSUFBSUYsRUFBYUcsWUFDaEVILEVBQWFLLFVBQVVLLElBQUlULEVBQU9MLGlCQUNsQ21LLEVBQWEzSixZQUFjMEosQ0FBWSxFQVdyQ0QsQ0FDRTlKLEVBQ0FDLEVBQ0FBLEVBQWFnSyxrQkFDYi9KLEVBSUosRUEwQ0kySixDQUFtQjdKLEVBQWFDLEVBQWNDLEdBQzlDVSxFQUFrQkMsRUFBV0osRUFBZVAsRUFDOUMsR0FBRSxHQUNGLEVBTUF1SixDQUFrQnpKLEVBQWFFLEVBQU8sR0VvTDFDLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL0FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICAgIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICAgIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fc3VibWl0LWJ0blwiLFxuICAgIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5faW5hY3RpdmVcIixcbiAgICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvclwiLFxuICB9O1xuICBcbiAgY29uc3Qgc2hvd0lucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlLCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICB9O1xuICBcbiAgY29uc3QgaGlkZUlucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gIH07XG4gIFxuICBjb25zdCBjaGVja0lucHV0VmFsaWRpdHkgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHNob3dJbnB1dEVycm9yKFxuICAgICAgICBmb3JtRWxlbWVudCxcbiAgICAgICAgaW5wdXRFbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH07XG4gIFxuICBjb25zdCBoYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PiB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGRpc2FibGVCdXR0b24gPSAoYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IHRvZ2dsZUJ1dHRvblN0YXRlID0gKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBkaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgfVxuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWxlbWVudCwgaW5wdXRMaXN0LCBjb25maWcpID0+IHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGNvbnN0IHNldEV2ZW50TGlzdGVuZXJzID0gKGZvcm1FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gIFxuICAgIGNvbnNvbGUubG9nKGlucHV0TGlzdCk7XG4gICAgY29uc29sZS5sb2coYnV0dG9uRWxlbWVudCk7XG4gIFxuICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgXG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgICAgICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGZvcm1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKTtcbiAgICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xuICAgICAgc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH07XG4gICIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJMb2FkaW5nKFxuICAgIGlzTG9hZGluZyxcbiAgICBidG4sXG4gICAgZGVmYXVsdFRleHQgPSBcIlNhdmVcIixcbiAgICBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCJcbiAgKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGRlZmF1bHRUZXh0O1xuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChyZXF1ZXN0LCBldnQsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gc3VibWl0QnRuLnRleHRDb250ZW50O1xuICBcbiAgICByZW5kZXJMb2FkaW5nKHRydWUsIHN1Ym1pdEJ0biwgaW5pdGlhbFRleHQsIGxvYWRpbmdUZXh0KTtcbiAgXG4gICAgcmVxdWVzdCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGV2dC50YXJnZXQucmVzZXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcmVuZGVyTG9hZGluZyhmYWxzZSwgc3VibWl0QnRuLCBpbml0aWFsVGV4dCk7XG4gICAgICB9KTtcbiAgfVxuICAiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuaW1wb3J0IHtcbiAgZW5hYmxlVmFsaWRhdGlvbixcbiAgc2V0dGluZ3MsXG4gIHJlc2V0VmFsaWRhdGlvbixcbiAgZGlzYWJsZUJ1dHRvbixcbn0gZnJvbSBcIi4uL3NjcmlwdHMvdmFsaWRhdGlvbi5qc1wiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vdXRpbHMvQXBpLmpzXCI7XG5pbXBvcnQgeyBoYW5kbGVTdWJtaXQgfSBmcm9tIFwiLi4vdXRpbHMvaGVscGVyc1wiO1xuXG5sZXQgc2VsZWN0ZWRDYXJkLCBzZWxlY3RlZENhcmRJZDtcblxuLy8gQVBJIHNldHVwXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCIzZjEyYzViNS0zZTc0LTQ4ZWEtOTM3Zi0yM2FjMzdmMGYyZTFcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG4vLyBGZXRjaCB1c2VyIGluZm8gYW5kIGNhcmRzIHdoZW4gdGhlIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3QgY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRlbXBsYXRlXCIpPy5jb250ZW50O1xuICBjb25zdCBjYXJkc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saXN0XCIpO1xuXG4gIC8vIFVuaXZlcnNhbCBlbGVtZW50c1xuICBjb25zdCBjbG9zZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19jbG9zZS1idG5cIik7XG5cbiAgLy8gUHJvZmlsZSBlbGVtZW50c1xuICBjb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZWRpdC1idG5cIik7XG4gIGNvbnN0IHByb2ZpbGVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyXCIpO1xuICBjb25zdCBwcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcbiAgY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcbiAgY29uc3QgY2FyZE1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnRuXCIpO1xuICBjb25zdCBhdmF0YXJNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyLWJ0blwiKTtcblxuICAvLyBDYXJkIGZvcm0gZWxlbWVudHNcbiAgY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1tb2RhbFwiKTtcbiAgY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZWRpdFByb2ZpbGVNb2RhbD8ucXVlcnlTZWxlY3RvcihcIiNlZGl0LXByb2ZpbGUtZm9ybVwiKTtcbiAgY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVNb2RhbD8ucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLW5hbWUtaW5wdXRcIik7XG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBlZGl0UHJvZmlsZU1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24taW5wdXRcIik7XG4gIGNvbnN0IGNhcmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1tb2RhbFwiKTtcbiAgY29uc3QgY2FyZE1vZGFsRm9ybSA9IGNhcmRNb2RhbD8ucXVlcnlTZWxlY3RvcihcIiNjYXJkLWZvcm1cIik7XG4gIGNvbnN0IGNhcmRTdWJtaXRCdXR0b24gPSBjYXJkTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5cIik7XG4gIGNvbnN0IGltYWdlSW5wdXQgPSBjYXJkTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1saW5rLWlucHV0XCIpO1xuICBjb25zdCB0aXRsZUlucHV0ID0gY2FyZE1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtY2FwdGlvbi1pbnB1dFwiKTtcblxuICAvLyBBdmF0YXIgZm9ybSBlbGVtZW50c1xuICBjb25zdCBhdmF0YXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLW1vZGFsXCIpO1xuICBjb25zdCBhdmF0YXJNb2RhbEZvcm0gPSBhdmF0YXJNb2RhbD8ucXVlcnlTZWxlY3RvcihcIiNlZGl0LWF2YXRhci1mb3JtXCIpO1xuICBjb25zdCBhdmF0YXJJbnB1dCA9IGF2YXRhck1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtYXZhdGFyLWlucHV0XCIpO1xuICBjb25zdCBhdmF0YXJTdWJtaXRCdXR0b24gPSBhdmF0YXJNb2RhbD8ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0blwiKTtcblxuICAvLyBEZWxldGUgZm9ybSBlbGVtZW50c1xuICBjb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuICBjb25zdCBkZWxldGVGb3JtID0gZGVsZXRlTW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XG4gIGNvbnN0IGRlbGV0ZUNhbmNlbEJ1dHRvbiA9IGRlbGV0ZU1vZGFsPy5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnRuX3R5cGVfY2FuY2VsXCIpO1xuXG4gIC8vIFByZXZpZXcgaW1hZ2UgcG9wdXAgZWxlbWVudHNcbiAgY29uc3QgcHJldmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmV2aWV3LW1vZGFsXCIpO1xuICBjb25zdCBwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQgPSBwcmV2aWV3TW9kYWw/LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpO1xuICBjb25zdCBwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudCA9IHByZXZpZXdNb2RhbD8ucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2FwdGlvblwiKTtcblxuICAvLyBGZXRjaCB1c2VyIGluZm8gYW5kIGNhcmRzIHdoZW4gdGhlIERPTSBpcyBsb2FkZWRcbiAgYXBpXG4gICAgLmdldEFwcEluZm8oKVxuICAgIC50aGVuKChbY2FyZHMsIHVzZXJzXSkgPT4ge1xuICAgICAgY2FyZHMucmV2ZXJzZSgpO1xuICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICByZW5kZXJDYXJkKGNhcmQpO1xuICAgICAgfSk7XG5cbiAgICAgIHByb2ZpbGVJbWFnZS5zcmMgPSB1c2Vycy5hdmF0YXI7XG4gICAgICBwcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IHVzZXJzLm5hbWU7XG4gICAgICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB1c2Vycy5hYm91dDtcbiAgICB9KVxuICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcblxuICAvLyBFdmVudCBsaXN0ZW5lcnMgZm9yIGNsb3NlIGJ1dHRvbnNcbiAgY2xvc2VCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gYnV0dG9uLmNsb3Nlc3QoXCIubW9kYWxcIik7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZU1vZGFsKG1vZGFsKSk7XG4gIH0pO1xuXG4gIC8vIE9wZW4gYXZhdGFyIG1vZGFsXG4gIGF2YXRhck1vZGFsQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG9wZW5Nb2RhbChhdmF0YXJNb2RhbCk7XG4gIH0pO1xuXG4gIC8vIEhhbmRsZSBhdmF0YXIgc3VibWl0XG4gIGF2YXRhck1vZGFsRm9ybT8uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBdmF0YXJTdWJtaXQpO1xuXG4gIC8vIE9wZW4gZWRpdCBwcm9maWxlIG1vZGFsXG4gIGVkaXRQcm9maWxlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChuYW1lSW5wdXQgJiYgcHJvZmlsZU5hbWUgJiYgZGVzY3JpcHRpb25JbnB1dCAmJiBwcm9maWxlRGVzY3JpcHRpb24pIHtcbiAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IHByb2ZpbGVOYW1lLnRleHRDb250ZW50O1xuICAgICAgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudDtcbiAgICAgIHJlc2V0VmFsaWRhdGlvbihlZGl0UHJvZmlsZUZvcm0sIFtuYW1lSW5wdXQsIGRlc2NyaXB0aW9uSW5wdXRdLCBzZXR0aW5ncyk7XG4gICAgICBvcGVuTW9kYWwoZWRpdFByb2ZpbGVNb2RhbCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBIYW5kbGUgcHJvZmlsZSBmb3JtIHN1Ym1pdFxuICBlZGl0UHJvZmlsZUZvcm0/LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlRWRpdFByb2ZpbGVTdWJtaXQpO1xuXG4gIC8vIE9wZW4gYWRkIGNhcmQgbW9kYWxcbiAgY2FyZE1vZGFsQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG9wZW5Nb2RhbChjYXJkTW9kYWwpO1xuICB9KTtcblxuICAvLyBIYW5kbGUgYWRkIGNhcmQgc3VibWl0XG4gIGNhcmRNb2RhbEZvcm0/LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlQWRkQ2FyZFN1Ym1pdCk7XG5cbiAgLy8gSGFuZGxlIGRlbGV0ZSBjYXJkIHN1Ym1pdFxuICBkZWxldGVGb3JtPy5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQpO1xuXG4gIC8vIEhhbmRsZSBkZWxldGUgY2FuY2VsIGJ1dHRvblxuICBkZWxldGVDYW5jZWxCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2xvc2VNb2RhbChkZWxldGVNb2RhbCk7XG4gIH0pO1xuXG4gIC8vIEVuYWJsZSBmb3JtIHZhbGlkYXRpb25cbiAgZW5hYmxlVmFsaWRhdGlvbihzZXR0aW5ncyk7XG5cbiAgLy8gRnVuY3Rpb25zXG4gIGZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbCkge1xuICAgIGlmIChtb2RhbCkge1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlTW9kYWxFc2MpO1xuICAgICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBjbG9zZU1vZGFsT3ZlcmxheSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICAgIGlmIChtb2RhbCkge1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlTW9kYWxFc2MpO1xuICAgICAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBjbG9zZU1vZGFsT3ZlcmxheSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VNb2RhbE92ZXJsYXkoZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQgPT09IGV2dC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICBjbG9zZU1vZGFsKGV2dC5jdXJyZW50VGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZU1vZGFsRXNjKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBjb25zdCBtb2RhbE9wZW5lZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfb3BlbmVkXCIpO1xuICAgICAgY2xvc2VNb2RhbChtb2RhbE9wZW5lZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQ2FyZChpdGVtLCBtZXRob2QgPSBcInByZXBlbmRcIikge1xuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gZ2V0Q2FyZEVsZW1lbnQoaXRlbSk7XG4gICAgY2FyZHNMaXN0W21ldGhvZF0oY2FyZEVsZW1lbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2FyZEVsZW1lbnQoZGF0YSkge1xuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gY2FyZFRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgY29uc3QgY2FyZE5hbWVFbGVtZW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgICBjb25zdCBjYXJkSW1hZ2VFbGVtZW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgICBjb25zdCBjYXJkTGlrZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idG5cIik7XG4gICAgY29uc3QgY2FyZEJpbkJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fYmluLWJ0blwiKTtcblxuICAgIGlmIChkYXRhLmlzTGlrZWQpIHtcbiAgICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcbiAgICB9XG5cbiAgICBjYXJkSW1hZ2VFbGVtZW50LnNyYyA9IGRhdGEubGluaztcbiAgICBjYXJkSW1hZ2VFbGVtZW50LmFsdCA9IGRhdGEuYWx0IHx8IGRhdGEubmFtZTtcbiAgICBjYXJkTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG5cbiAgICBjYXJkTGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gaGFuZGxlTGlrZShldnQsIGRhdGEuX2lkKSk7XG4gICAgY2FyZEJpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgZGF0YS5faWQpKTtcbiAgICBjYXJkSW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVJbWFnZUNsaWNrKGRhdGEpKTtcblxuICAgIHJldHVybiBjYXJkRWxlbWVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUxpa2UoZXZ0LCBpZCkge1xuICAgIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gZXZ0LnRhcmdldDtcbiAgICBjb25zdCBpc0xpa2VkID0gY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZS1idG5fbGlrZWRcIik7XG5cbiAgICBhcGlcbiAgICAgIC5jaGFuZ2VMaWtlU3RhdHVzKGlkLCBpc0xpa2VkKVxuICAgICAgLnRoZW4oKGlzTGlrZWQpID0+IHtcbiAgICAgICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIsICFpc0xpa2VkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBjYXJkSWQpIHtcbiAgICBzZWxlY3RlZENhcmQgPSBjYXJkRWxlbWVudDtcbiAgICBzZWxlY3RlZENhcmRJZCA9IGNhcmRJZDtcbiAgICBvcGVuTW9kYWwoZGVsZXRlTW9kYWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZFN1Ym1pdChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICAgIHJldHVybiBhcGkuZGVsZXRlQ2FyZChzZWxlY3RlZENhcmRJZCkudGhlbigoKSA9PiB7XG4gICAgICAgIHNlbGVjdGVkQ2FyZC5yZW1vdmUoKTtcbiAgICAgICAgY2xvc2VNb2RhbChkZWxldGVNb2RhbCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQsIFwiRGVsZXRpbmcuLi5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVBdmF0YXJTdWJtaXQoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgICByZXR1cm4gYXBpLmVkaXRBdmF0YXJJbmZvKGF2YXRhcklucHV0LnZhbHVlKS50aGVuKChhdmF0YXJEYXRhKSA9PiB7XG4gICAgICAgIHByb2ZpbGVJbWFnZS5zcmMgPSBhdmF0YXJEYXRhLmF2YXRhcjtcbiAgICAgICAgZGlzYWJsZUJ1dHRvbihhdmF0YXJTdWJtaXRCdXR0b24sIHNldHRpbmdzKTtcbiAgICAgICAgY2xvc2VNb2RhbChhdmF0YXJNb2RhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVFZGl0UHJvZmlsZVN1Ym1pdChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICAgIHJldHVybiBhcGlcbiAgICAgICAgLmVkaXRVc2VySW5mbyh7XG4gICAgICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgIGFib3V0OiBkZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigodXNlckRhdGEpID0+IHtcbiAgICAgICAgICBwcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IHVzZXJEYXRhLm5hbWU7XG4gICAgICAgICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdXNlckRhdGEuYWJvdXQ7XG4gICAgICAgICAgY2xvc2VNb2RhbChlZGl0UHJvZmlsZU1vZGFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQWRkQ2FyZFN1Ym1pdChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICAgIHJldHVybiBhcGlcbiAgICAgICAgLmFkZENhcmQoeyBuYW1lOiB0aXRsZUlucHV0LnZhbHVlLCBsaW5rOiBpbWFnZUlucHV0LnZhbHVlIH0pXG4gICAgICAgIC50aGVuKChjYXJkRGF0YSkgPT4ge1xuICAgICAgICAgIHJlbmRlckNhcmQoY2FyZERhdGEpO1xuICAgICAgICAgIGRpc2FibGVCdXR0b24oY2FyZFN1Ym1pdEJ1dHRvbiwgc2V0dGluZ3MpO1xuICAgICAgICAgIGNsb3NlTW9kYWwoY2FyZE1vZGFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhkYXRhKSB7XG4gICAgcHJldmlld01vZGFsSW1hZ2VFbGVtZW50LnNyYyA9IGRhdGEubGluaztcbiAgICBwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQuYWx0ID0gZGF0YS5uYW1lO1xuICAgIHByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIG9wZW5Nb2RhbChwcmV2aWV3TW9kYWwpO1xuICB9XG59KTtcbiIsImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBjaGVja1Jlc3BvbnNlKHJlcykge1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuXG4gIHJlcXVlc3QodXJsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucykudGhlbih0aGlzLmNoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBlZGl0VXNlckluZm8oeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWJvdXQsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRBdmF0YXJJbmZvKGF2YXRhcikge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENhcmQoeyBuYW1lLCBsaW5rIH0pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxpbmssXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUxpa2VTdGF0dXMoaWQsIGlzTGlrZWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBpc0xpa2VkID8gXCJERUxFVEVcIiA6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcbiJdLCJuYW1lcyI6WyJzZXR0aW5ncyIsImZvcm1TZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiaGlkZUlucHV0RXJyb3IiLCJmb3JtRWxlbWVudCIsImlucHV0RWxlbWVudCIsImNvbmZpZyIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZGlzYWJsZUJ1dHRvbiIsImJ1dHRvbkVsZW1lbnQiLCJkaXNhYmxlZCIsImFkZCIsInRvZ2dsZUJ1dHRvblN0YXRlIiwiaW5wdXRMaXN0Iiwic29tZSIsInZhbGlkaXR5IiwidmFsaWQiLCJoYXNJbnZhbGlkSW5wdXQiLCJyZW5kZXJMb2FkaW5nIiwiaXNMb2FkaW5nIiwiYnRuIiwiZGVmYXVsdFRleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJsb2FkaW5nVGV4dCIsImhhbmRsZVN1Ym1pdCIsInJlcXVlc3QiLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEJ0biIsInN1Ym1pdHRlciIsImluaXRpYWxUZXh0IiwidGhlbiIsInRhcmdldCIsInJlc2V0IiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJmaW5hbGx5Iiwic2VsZWN0ZWRDYXJkIiwic2VsZWN0ZWRDYXJkSWQiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIl9yZWYiLCJiYXNlVXJsIiwiaGVhZGVycyIsInRoaXMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImNoZWNrUmVzcG9uc2UiLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJzdGF0dXMiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJlZGl0VXNlckluZm8iLCJfcmVmMiIsIm5hbWUiLCJhYm91dCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZWRpdEF2YXRhckluZm8iLCJhdmF0YXIiLCJhZGRDYXJkIiwiX3JlZjMiLCJsaW5rIiwiZGVsZXRlQ2FyZCIsImNoYW5nZUxpa2VTdGF0dXMiLCJpc0xpa2VkIiwiYXV0aG9yaXphdGlvbiIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhcmRUZW1wbGF0ZSIsImNvbnRlbnQiLCJjYXJkc0xpc3QiLCJjbG9zZUJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJwcm9maWxlSW1hZ2UiLCJwcm9maWxlTmFtZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsImNhcmRNb2RhbEJ1dHRvbiIsImF2YXRhck1vZGFsQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsIm5hbWVJbnB1dCIsImRlc2NyaXB0aW9uSW5wdXQiLCJjYXJkTW9kYWwiLCJjYXJkTW9kYWxGb3JtIiwiY2FyZFN1Ym1pdEJ1dHRvbiIsImltYWdlSW5wdXQiLCJ0aXRsZUlucHV0IiwiYXZhdGFyTW9kYWwiLCJhdmF0YXJNb2RhbEZvcm0iLCJhdmF0YXJJbnB1dCIsImF2YXRhclN1Ym1pdEJ1dHRvbiIsImRlbGV0ZU1vZGFsIiwiZGVsZXRlRm9ybSIsImRlbGV0ZUNhbmNlbEJ1dHRvbiIsInByZXZpZXdNb2RhbCIsInByZXZpZXdNb2RhbEltYWdlRWxlbWVudCIsInByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50Iiwib3Blbk1vZGFsIiwibW9kYWwiLCJjbG9zZU1vZGFsRXNjIiwiY2xvc2VNb2RhbE92ZXJsYXkiLCJjbG9zZU1vZGFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImN1cnJlbnRUYXJnZXQiLCJrZXkiLCJyZW5kZXJDYXJkIiwiaXRlbSIsImNhcmRFbGVtZW50IiwiZGF0YSIsImNsb25lTm9kZSIsImNhcmROYW1lRWxlbWVudCIsImNhcmRJbWFnZUVsZW1lbnQiLCJjYXJkTGlrZUJ1dHRvbiIsImNhcmRCaW5CdXR0b24iLCJzcmMiLCJhbHQiLCJjb250YWlucyIsInRvZ2dsZSIsImhhbmRsZUxpa2UiLCJfaWQiLCJjYXJkSWQiLCJoYW5kbGVEZWxldGVDYXJkIiwiaGFuZGxlSW1hZ2VDbGljayIsImdldENhcmRFbGVtZW50IiwiY2FyZHMiLCJ1c2VycyIsInJldmVyc2UiLCJmb3JFYWNoIiwiY2FyZCIsImJ1dHRvbiIsImNsb3Nlc3QiLCJ2YWx1ZSIsImF2YXRhckRhdGEiLCJyZXNldFZhbGlkYXRpb24iLCJpbnB1dCIsInVzZXJEYXRhIiwiY2FyZERhdGEiLCJzZXRFdmVudExpc3RlbmVycyIsIkFycmF5IiwiZnJvbSIsImxvZyIsImNoZWNrSW5wdXRWYWxpZGl0eSIsInNob3dJbnB1dEVycm9yIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9