!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}let s,i;const l=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"e406c5d0-c926-42e6-85c9-73e707970c80","Content-Type":"application/json"}});function d(e){e.target===e.currentTarget&&m(e.currentTarget)}function c(e){"Escape"===e.key&&m(document.querySelector(".modal_opened"))}function u(e){e.classList.add("modal_opened"),document.addEventListener("keydown",c),e.addEventListener("mousedown",d)}function m(e){e&&(e.classList.remove("modal_opened"),document.removeEventListener("keydown",c),e.removeEventListener("mousedown",d))}function h(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){const t=cardTemplate.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return r.textContent=e.name,n.src=e.link,n.alt=e.name,e.isLiked&&o.classList.add("card__like-btn_liked"),o.addEventListener("click",(t=>function(e,t){const r=e.target,n=r.classList.contains("card__like-btn_liked");l.changeLikeStatus(t,n).then((()=>{r.classList.toggle("card__like-btn_liked",!n)})).catch(console.error)}(t,e._id))),a.addEventListener("click",(()=>function(e,t){s=e,i=t,u(deleteModal)}(t,e._id))),n.addEventListener("click",(()=>function(e){previewModalImageElement.src=e.link,previewModalImageElement.alt=e.name,previewModalCaptionElement.textContent=e.name,u(previewModal)}(e))),t}(e);cardsList[t](r)}function v(t){t.preventDefault(),a((function(){return l.editAvatarInfo(avatarInput.value).then((t=>{profileImage.src=t.avatar,r(avatarSubmitButton,e),m(avatarModal)}))}),t)}function _(e){e.preventDefault(),a((function(){return l.editUserInfo({name:nameInput.value,about:descriptionInput.value}).then((e=>{profileName.textContent=e.name,profileDescription.textContent=e.about,m(editProfileModal)}))}),e)}function f(t){t.preventDefault(),a((function(){return l.addCard({name:titleInput.value,link:imageInput.value}).then((t=>{h(t),r(cardSubmitButton,e),m(cardModal)}))}),t)}function p(e){e.preventDefault(),a((function(){return l.deleteCard(i).then((()=>{s.remove(),m(deleteModal)}))}),e,"Deleting...")}document.addEventListener("DOMContentLoaded",(()=>{const r=document.querySelectorAll(".modal__close-btn"),o=document.querySelector("#card-template")?.content,a=document.querySelector(".cards__list");if(!o)return void console.error("Error: Card template not found.");const s=document.querySelector(".profile__avatar"),i=document.querySelector(".profile__name"),d=document.querySelector(".profile__description");l.getAppInfo().then((e=>{let[t,r]=e;0===t.length?a.innerHTML="<p>No cards to display.</p>":(t.reverse(),t.forEach((e=>{h(e)}))),s.src=r.avatar,i.textContent=r.name,d.textContent=r.about})).catch(console.error),r.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>m(t)))}));const c=document.querySelector(".profile__avatar-btn"),y=document.querySelector("#avatar-modal"),S=y.querySelector("#edit-avatar-form");c.addEventListener("click",(()=>u(y))),S.addEventListener("submit",v);const b=document.querySelector(".profile__edit-btn"),q=document.querySelector("#edit-modal"),E=q.querySelector("#edit-profile-form"),L=q.querySelector("#profile-name-input"),g=q.querySelector("#profile-description-input");b.addEventListener("click",(()=>{var r,n;L.value=i.textContent,g.value=d.textContent,r=E,n=e,[L,g].forEach((e=>{t(r,e,n)})),u(q)})),E.addEventListener("submit",_);const C=document.querySelector(".profile__add-btn"),k=document.querySelector("#card-modal"),I=k.querySelector("#card-form");C.addEventListener("click",(()=>u(k))),I.addEventListener("submit",f);const U=document.querySelector("#delete-modal"),x=U.querySelector(".modal__form"),M=U.querySelector(".modal__submit-btn_type_cancel");var $;x.addEventListener("submit",p),M.addEventListener("click",(()=>m(U))),$=e,document.querySelectorAll($.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((s=>{s.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,s,r),n(o,a,r)}))}))})(e,$)}))}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQU9MLGlCQUNsQ3dLLEVBQWFoSyxZQUFjK0osQ0FBWSxFQVdyQ0QsQ0FDRW5LLEVBQ0FDLEVBQ0FBLEVBQWFxSyxrQkFDYnBLLEVBSUosRUEwQ0lnSyxDQUFtQmxLLEVBQWFDLEVBQWNDLEdBQzlDVSxFQUFrQkMsRUFBV0osRUFBZVAsRUFDOUMsR0FBRSxHQUNGLEVBTUE0SixDQUFrQjlKLEVBQWFFLEVBQU8sR0VpSmhCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL0FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICAgIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICAgIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fc3VibWl0LWJ0blwiLFxuICAgIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5faW5hY3RpdmVcIixcbiAgICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvclwiLFxuICB9O1xuICBcbiAgY29uc3Qgc2hvd0lucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlLCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICB9O1xuICBcbiAgY29uc3QgaGlkZUlucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gIH07XG4gIFxuICBjb25zdCBjaGVja0lucHV0VmFsaWRpdHkgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHNob3dJbnB1dEVycm9yKFxuICAgICAgICBmb3JtRWxlbWVudCxcbiAgICAgICAgaW5wdXRFbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH07XG4gIFxuICBjb25zdCBoYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PiB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGRpc2FibGVCdXR0b24gPSAoYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IHRvZ2dsZUJ1dHRvblN0YXRlID0gKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBkaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgfVxuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWxlbWVudCwgaW5wdXRMaXN0LCBjb25maWcpID0+IHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGNvbnN0IHNldEV2ZW50TGlzdGVuZXJzID0gKGZvcm1FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gIFxuICAgIGNvbnNvbGUubG9nKGlucHV0TGlzdCk7XG4gICAgY29uc29sZS5sb2coYnV0dG9uRWxlbWVudCk7XG4gIFxuICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgXG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgICAgICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGZvcm1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKTtcbiAgICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xuICAgICAgc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH07XG4gICIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJMb2FkaW5nKFxuICAgIGlzTG9hZGluZyxcbiAgICBidG4sXG4gICAgZGVmYXVsdFRleHQgPSBcIlNhdmVcIixcbiAgICBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCJcbiAgKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGRlZmF1bHRUZXh0O1xuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChyZXF1ZXN0LCBldnQsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gc3VibWl0QnRuLnRleHRDb250ZW50O1xuICBcbiAgICByZW5kZXJMb2FkaW5nKHRydWUsIHN1Ym1pdEJ0biwgaW5pdGlhbFRleHQsIGxvYWRpbmdUZXh0KTtcbiAgXG4gICAgcmVxdWVzdCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGV2dC50YXJnZXQucmVzZXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcmVuZGVyTG9hZGluZyhmYWxzZSwgc3VibWl0QnRuLCBpbml0aWFsVGV4dCk7XG4gICAgICB9KTtcbiAgfVxuICAiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuaW1wb3J0IHtcbiAgZW5hYmxlVmFsaWRhdGlvbixcbiAgc2V0dGluZ3MsXG4gIHJlc2V0VmFsaWRhdGlvbixcbiAgZGlzYWJsZUJ1dHRvbixcbn0gZnJvbSBcIi4uL3NjcmlwdHMvdmFsaWRhdGlvbi5qc1wiO1xuaW1wb3J0IHsgaGFuZGxlU3VibWl0IH0gZnJvbSBcIi4uL3V0aWxzL2hlbHBlcnNcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL3V0aWxzL0FwaS5qc1wiO1xuXG5sZXQgc2VsZWN0ZWRDYXJkLCBzZWxlY3RlZENhcmRJZDtcblxuLy8gQVBJIHNldHVwXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJlNDA2YzVkMC1jOTI2LTQyZTYtODVjOS03M2U3MDc5NzBjODBcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG4vLyBGdW5jdGlvbnMgdG8gaGFuZGxlIG1vZGFsc1xuZnVuY3Rpb24gY2xvc2VNb2RhbE92ZXJsYXkoZXZ0KSB7XG4gIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xuICAgIGNsb3NlTW9kYWwoZXZ0LmN1cnJlbnRUYXJnZXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWxFc2MoZXZ0KSB7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY29uc3QgbW9kYWxPcGVuZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX29wZW5lZFwiKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsT3BlbmVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgY2xvc2VNb2RhbE92ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIGlmIChtb2RhbCkge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gICAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBjbG9zZU1vZGFsT3ZlcmxheSk7XG4gIH1cbn1cblxuLy8gQ3JlYXRlIGEgY2FyZCBlbGVtZW50IGZyb20gdGhlIHRlbXBsYXRlXG5mdW5jdGlvbiBnZXRDYXJkRWxlbWVudChkYXRhKSB7XG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY2FyZFRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKS5jbG9uZU5vZGUodHJ1ZSk7XG4gIGNvbnN0IGNhcmROYW1lRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gIGNvbnN0IGNhcmRJbWFnZUVsZW1lbnQgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICBjb25zdCBjYXJkTGlrZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idG5cIik7XG4gIGNvbnN0IGNhcmREZWxldGVCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idG5cIik7XG5cbiAgY2FyZE5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICBjYXJkSW1hZ2VFbGVtZW50LnNyYyA9IGRhdGEubGluaztcbiAgY2FyZEltYWdlRWxlbWVudC5hbHQgPSBkYXRhLm5hbWU7XG5cbiAgaWYgKGRhdGEuaXNMaWtlZCkge1xuICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcbiAgfVxuXG4gIGNhcmRMaWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZ0KSA9PiBoYW5kbGVMaWtlKGV2dCwgZGF0YS5faWQpKTtcbiAgY2FyZERlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgZGF0YS5faWQpKTtcbiAgY2FyZEltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlSW1hZ2VDbGljayhkYXRhKSk7XG5cbiAgcmV0dXJuIGNhcmRFbGVtZW50OyAvLyBSZXR1cm4gdGhlIGNyZWF0ZWQgY2FyZCBlbGVtZW50XG59XG5cbi8vIEZ1bmN0aW9uIHRvIHJlbmRlciBhIGNhcmRcbmZ1bmN0aW9uIHJlbmRlckNhcmQoaXRlbSwgbWV0aG9kID0gXCJwcmVwZW5kXCIpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBnZXRDYXJkRWxlbWVudChpdGVtKTsgLy8gRG9uJ3QgcGFzcyBjYXJkVGVtcGxhdGUgYW55bW9yZSBzaW5jZSBpdCdzIGEgZ2xvYmFsIHZhcmlhYmxlXG4gIGNhcmRzTGlzdFttZXRob2RdKGNhcmRFbGVtZW50KTsgLy8gQXBwZW5kIHRoZSBjYXJkIHRvIHRoZSBjYXJkcyBsaXN0XG59XG5cbi8vIEV2ZW50IGhhbmRsZXJzXG5mdW5jdGlvbiBoYW5kbGVBdmF0YXJTdWJtaXQoZXZ0KSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uXG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZWRpdEF2YXRhckluZm8oYXZhdGFySW5wdXQudmFsdWUpLnRoZW4oKGF2YXRhckRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVJbWFnZS5zcmMgPSBhdmF0YXJEYXRhLmF2YXRhcjsgLy8gVXBkYXRlIHRoZSBwcm9maWxlIGltYWdlXG4gICAgICBkaXNhYmxlQnV0dG9uKGF2YXRhclN1Ym1pdEJ1dHRvbiwgc2V0dGluZ3MpOyAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICAgIGNsb3NlTW9kYWwoYXZhdGFyTW9kYWwpOyAvLyBDbG9zZSB0aGUgbW9kYWwgYWZ0ZXIgc3VibWlzc2lvblxuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0KTsgLy8gQ2FsbCBoYW5kbGVTdWJtaXRcbn1cblxuZnVuY3Rpb24gaGFuZGxlTGlrZShldnQsIGlkKSB7XG4gIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gZXZ0LnRhcmdldDtcbiAgY29uc3QgaXNMaWtlZCA9IGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuXG4gIGFwaS5jaGFuZ2VMaWtlU3RhdHVzKGlkLCBpc0xpa2VkKS50aGVuKCgpID0+IHtcbiAgICBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idG5fbGlrZWRcIiwgIWlzTGlrZWQpO1xuICB9KS5jYXRjaChjb25zb2xlLmVycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgY2FyZElkKSB7XG4gIHNlbGVjdGVkQ2FyZCA9IGNhcmRFbGVtZW50O1xuICBzZWxlY3RlZENhcmRJZCA9IGNhcmRJZDtcbiAgb3Blbk1vZGFsKGRlbGV0ZU1vZGFsKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhkYXRhKSB7XG4gIHByZXZpZXdNb2RhbEltYWdlRWxlbWVudC5zcmMgPSBkYXRhLmxpbms7XG4gIHByZXZpZXdNb2RhbEltYWdlRWxlbWVudC5hbHQgPSBkYXRhLm5hbWU7XG4gIHByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICBvcGVuTW9kYWwocHJldmlld01vZGFsKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRWRpdFByb2ZpbGVTdWJtaXQoZXZ0KSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uXG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZWRpdFVzZXJJbmZvKHtcbiAgICAgIG5hbWU6IG5hbWVJbnB1dC52YWx1ZSxcbiAgICAgIGFib3V0OiBkZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuICAgIH0pLnRoZW4oKHVzZXJEYXRhKSA9PiB7XG4gICAgICBwcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IHVzZXJEYXRhLm5hbWU7IC8vIFVwZGF0ZSBwcm9maWxlIG5hbWVcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHVzZXJEYXRhLmFib3V0OyAvLyBVcGRhdGUgcHJvZmlsZSBkZXNjcmlwdGlvblxuICAgICAgY2xvc2VNb2RhbChlZGl0UHJvZmlsZU1vZGFsKTsgLy8gQ2xvc2UgdGhlIG1vZGFsIGFmdGVyIHN1Ym1pc3Npb25cbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7IC8vIENhbGwgaGFuZGxlU3VibWl0XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUFkZENhcmRTdWJtaXQoZXZ0KSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uXG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuYWRkQ2FyZCh7XG4gICAgICBuYW1lOiB0aXRsZUlucHV0LnZhbHVlLFxuICAgICAgbGluazogaW1hZ2VJbnB1dC52YWx1ZSxcbiAgICB9KS50aGVuKChjYXJkRGF0YSkgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChjYXJkRGF0YSk7IC8vIERvbid0IHBhc3MgY2FyZFRlbXBsYXRlXG4gICAgICBkaXNhYmxlQnV0dG9uKGNhcmRTdWJtaXRCdXR0b24sIHNldHRpbmdzKTsgLy8gRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXG4gICAgICBjbG9zZU1vZGFsKGNhcmRNb2RhbCk7IC8vIENsb3NlIHRoZSBtb2RhbCBhZnRlciBzdWJtaXNzaW9uXG4gICAgfSk7XG4gIH1cbiAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQpOyAvLyBDYWxsIGhhbmRsZVN1Ym1pdFxufVxuXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGZvcm0gc3VibWlzc2lvblxuICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICByZXR1cm4gYXBpLmRlbGV0ZUNhcmQoc2VsZWN0ZWRDYXJkSWQpLnRoZW4oKCkgPT4ge1xuICAgICAgc2VsZWN0ZWRDYXJkLnJlbW92ZSgpOyAvLyBSZW1vdmUgdGhlIGNhcmQgZnJvbSB0aGUgRE9NXG4gICAgICBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKTsgLy8gQ2xvc2UgdGhlIGRlbGV0ZSBtb2RhbFxuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0LCBcIkRlbGV0aW5nLi4uXCIpOyAvLyBDYWxsIGhhbmRsZVN1Ym1pdFxufVxuXG4vLyBET00gUmVhZHlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xuICBjb25zdCBjYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGVtcGxhdGVcIik/LmNvbnRlbnQ7IC8vIEFjY2VzcyB0ZW1wbGF0ZSBoZXJlXG4gIGNvbnN0IGNhcmRzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2xpc3RcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBjYXJkVGVtcGxhdGUgZXhpc3RzIGJlZm9yZSBwcm9jZWVkaW5nXG4gIGlmICghY2FyZFRlbXBsYXRlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yOiBDYXJkIHRlbXBsYXRlIG5vdCBmb3VuZC5cIik7XG4gICAgcmV0dXJuOyAvLyBTdG9wIGV4ZWN1dGlvbiBpZiB0ZW1wbGF0ZSBpcyBub3QgZm91bmRcbiAgfVxuXG4gIC8vIFByb2ZpbGUgZWxlbWVudHNcbiAgY29uc3QgcHJvZmlsZUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG4gIGNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuICBjb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xuXG4gIC8vIEZldGNoIHVzZXIgaW5mbyBhbmQgY2FyZHMgd2hlbiB0aGUgRE9NIGlzIGxvYWRlZFxuICBhcGkuZ2V0QXBwSW5mbygpLnRoZW4oKFtjYXJkcywgdXNlcnNdKSA9PiB7XG4gICAgaWYgKGNhcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY2FyZHNMaXN0LmlubmVySFRNTCA9IFwiPHA+Tm8gY2FyZHMgdG8gZGlzcGxheS48L3A+XCI7IC8vIERpc3BsYXkgbWVzc2FnZSBpZiBubyBjYXJkc1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXJkcy5yZXZlcnNlKCk7XG4gICAgICBjYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICAgIHJlbmRlckNhcmQoY2FyZCk7IC8vIERvbid0IHBhc3MgY2FyZFRlbXBsYXRlIGFueW1vcmVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNldCB1c2VyIHByb2ZpbGUgaW5mb1xuICAgIHByb2ZpbGVJbWFnZS5zcmMgPSB1c2Vycy5hdmF0YXI7XG4gICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSB1c2Vycy5uYW1lO1xuICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHVzZXJzLmFib3V0O1xuICB9KS5jYXRjaChjb25zb2xlLmVycm9yKTtcblxuICAvLyBDbG9zZSBidXR0b24gZXZlbnQgbGlzdGVuZXJzXG4gIGNsb3NlQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBjb25zdCBtb2RhbCA9IGJ1dHRvbi5jbG9zZXN0KFwiLm1vZGFsXCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VNb2RhbChtb2RhbCkpO1xuICB9KTtcblxuICAvLyBTZXR1cCBldmVudCBsaXN0ZW5lcnMgZm9yIG1vZGFscyBhbmQgZm9ybSBzdWJtaXNzaW9uc1xuICBjb25zdCBhdmF0YXJNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyLWJ0blwiKTtcbiAgY29uc3QgYXZhdGFyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci1tb2RhbFwiKTtcbiAgY29uc3QgYXZhdGFyTW9kYWxGb3JtID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNlZGl0LWF2YXRhci1mb3JtXCIpO1xuICBhdmF0YXJNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gb3Blbk1vZGFsKGF2YXRhck1vZGFsKSk7XG4gIGF2YXRhck1vZGFsRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUF2YXRhclN1Ym1pdCk7XG5cbiAgY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnRuXCIpO1xuICBjb25zdCBlZGl0UHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LW1vZGFsXCIpO1xuICBjb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLWZvcm1cIik7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLW5hbWUtaW5wdXRcIik7XG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiKTtcbiAgZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBuYW1lSW5wdXQudmFsdWUgPSBwcm9maWxlTmFtZS50ZXh0Q29udGVudDtcbiAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50O1xuICAgIHJlc2V0VmFsaWRhdGlvbihlZGl0UHJvZmlsZUZvcm0sIFtuYW1lSW5wdXQsIGRlc2NyaXB0aW9uSW5wdXRdLCBzZXR0aW5ncyk7XG4gICAgb3Blbk1vZGFsKGVkaXRQcm9maWxlTW9kYWwpO1xuICB9KTtcbiAgZWRpdFByb2ZpbGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlRWRpdFByb2ZpbGVTdWJtaXQpO1xuXG4gIGNvbnN0IGNhcmRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbiAgY29uc3QgY2FyZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLW1vZGFsXCIpO1xuICBjb25zdCBjYXJkTW9kYWxGb3JtID0gY2FyZE1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1mb3JtXCIpO1xuICBjYXJkTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IG9wZW5Nb2RhbChjYXJkTW9kYWwpKTtcbiAgY2FyZE1vZGFsRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUFkZENhcmRTdWJtaXQpOyAvLyBFbnN1cmUgdGhpcyBmdW5jdGlvbiBpcyBkZWZpbmVkXG5cbiAgY29uc3QgZGVsZXRlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlbGV0ZS1tb2RhbFwiKTtcbiAgY29uc3QgZGVsZXRlRm9ybSA9IGRlbGV0ZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XG4gIGNvbnN0IGRlbGV0ZUNhbmNlbEJ1dHRvbiA9IGRlbGV0ZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5fdHlwZV9jYW5jZWxcIik7XG4gIGRlbGV0ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVEZWxldGVDYXJkU3VibWl0KTsgLy8gRW5zdXJlIHRoaXMgZnVuY3Rpb24gaXMgZGVmaW5lZFxuICBkZWxldGVDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpKTtcblxuICAvLyBFbmFibGUgZm9ybSB2YWxpZGF0aW9uXG4gIGVuYWJsZVZhbGlkYXRpb24oc2V0dGluZ3MpO1xufSk7XG4iLCJjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGhlYWRlcnMgfSkge1xuICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG5cbiAgZ2V0QXBwSW5mbygpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SW5pdGlhbENhcmRzKCksIHRoaXMuZ2V0VXNlckluZm8oKV0pO1xuICB9XG5cbiAgY2hlY2tSZXNwb25zZShyZXMpIHtcbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvciAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cblxuICByZXF1ZXN0KHVybCwgb3B0aW9ucykge1xuICAgIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpLnRoZW4odGhpcy5jaGVja1Jlc3BvbnNlKTtcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgZWRpdFVzZXJJbmZvKHsgbmFtZSwgYWJvdXQgfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGFib3V0LFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBlZGl0QXZhdGFySW5mbyhhdmF0YXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBhZGRDYXJkKHsgbmFtZSwgbGluayB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBsaW5rLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VMaWtlU3RhdHVzKGlkLCBpc0xpa2VkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogaXNMaWtlZCA/IFwiREVMRVRFXCIgOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG4iXSwibmFtZXMiOlsic2V0dGluZ3MiLCJmb3JtU2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsImhpZGVJbnB1dEVycm9yIiwiZm9ybUVsZW1lbnQiLCJpbnB1dEVsZW1lbnQiLCJjb25maWciLCJxdWVyeVNlbGVjdG9yIiwiaWQiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImRpc2FibGVCdXR0b24iLCJidXR0b25FbGVtZW50IiwiZGlzYWJsZWQiLCJhZGQiLCJ0b2dnbGVCdXR0b25TdGF0ZSIsImlucHV0TGlzdCIsInNvbWUiLCJ2YWxpZGl0eSIsInZhbGlkIiwiaGFzSW52YWxpZElucHV0IiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsImJ0biIsImRlZmF1bHRUZXh0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibG9hZGluZ1RleHQiLCJoYW5kbGVTdWJtaXQiLCJyZXF1ZXN0IiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJzdWJtaXRCdG4iLCJzdWJtaXR0ZXIiLCJpbml0aWFsVGV4dCIsInRoZW4iLCJ0YXJnZXQiLCJyZXNldCIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZmluYWxseSIsInNlbGVjdGVkQ2FyZCIsInNlbGVjdGVkQ2FyZElkIiwiYXBpIiwiY29uc3RydWN0b3IiLCJfcmVmIiwiYmFzZVVybCIsImhlYWRlcnMiLCJ0aGlzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImdldEFwcEluZm8iLCJQcm9taXNlIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiZ2V0VXNlckluZm8iLCJjaGVja1Jlc3BvbnNlIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwidXJsIiwib3B0aW9ucyIsImZldGNoIiwiZWRpdFVzZXJJbmZvIiwiX3JlZjIiLCJuYW1lIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVkaXRBdmF0YXJJbmZvIiwiYXZhdGFyIiwiYWRkQ2FyZCIsIl9yZWYzIiwibGluayIsImRlbGV0ZUNhcmQiLCJjaGFuZ2VMaWtlU3RhdHVzIiwiaXNMaWtlZCIsImF1dGhvcml6YXRpb24iLCJjbG9zZU1vZGFsT3ZlcmxheSIsImN1cnJlbnRUYXJnZXQiLCJjbG9zZU1vZGFsIiwiY2xvc2VNb2RhbEVzYyIsImtleSIsImRvY3VtZW50Iiwib3Blbk1vZGFsIiwibW9kYWwiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlckNhcmQiLCJpdGVtIiwiY2FyZEVsZW1lbnQiLCJkYXRhIiwiY2FyZFRlbXBsYXRlIiwiY2xvbmVOb2RlIiwiY2FyZE5hbWVFbGVtZW50IiwiY2FyZEltYWdlRWxlbWVudCIsImNhcmRMaWtlQnV0dG9uIiwiY2FyZERlbGV0ZUJ1dHRvbiIsInNyYyIsImFsdCIsImNvbnRhaW5zIiwidG9nZ2xlIiwiaGFuZGxlTGlrZSIsIl9pZCIsImNhcmRJZCIsImRlbGV0ZU1vZGFsIiwiaGFuZGxlRGVsZXRlQ2FyZCIsInByZXZpZXdNb2RhbEltYWdlRWxlbWVudCIsInByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50IiwicHJldmlld01vZGFsIiwiaGFuZGxlSW1hZ2VDbGljayIsImdldENhcmRFbGVtZW50IiwiY2FyZHNMaXN0IiwiaGFuZGxlQXZhdGFyU3VibWl0IiwiYXZhdGFySW5wdXQiLCJ2YWx1ZSIsImF2YXRhckRhdGEiLCJwcm9maWxlSW1hZ2UiLCJhdmF0YXJTdWJtaXRCdXR0b24iLCJhdmF0YXJNb2RhbCIsImhhbmRsZUVkaXRQcm9maWxlU3VibWl0IiwibmFtZUlucHV0IiwiZGVzY3JpcHRpb25JbnB1dCIsInVzZXJEYXRhIiwicHJvZmlsZU5hbWUiLCJwcm9maWxlRGVzY3JpcHRpb24iLCJlZGl0UHJvZmlsZU1vZGFsIiwiaGFuZGxlQWRkQ2FyZFN1Ym1pdCIsInRpdGxlSW5wdXQiLCJpbWFnZUlucHV0IiwiY2FyZERhdGEiLCJjYXJkU3VibWl0QnV0dG9uIiwiY2FyZE1vZGFsIiwiaGFuZGxlRGVsZXRlQ2FyZFN1Ym1pdCIsImNsb3NlQnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb250ZW50IiwiY2FyZHMiLCJ1c2VycyIsImlubmVySFRNTCIsInJldmVyc2UiLCJmb3JFYWNoIiwiY2FyZCIsImJ1dHRvbiIsImNsb3Nlc3QiLCJhdmF0YXJNb2RhbEJ1dHRvbiIsImF2YXRhck1vZGFsRm9ybSIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVGb3JtIiwicmVzZXRWYWxpZGF0aW9uIiwiaW5wdXQiLCJjYXJkTW9kYWxCdXR0b24iLCJjYXJkTW9kYWxGb3JtIiwiZGVsZXRlRm9ybSIsImRlbGV0ZUNhbmNlbEJ1dHRvbiIsInNldEV2ZW50TGlzdGVuZXJzIiwiQXJyYXkiLCJmcm9tIiwibG9nIiwiY2hlY2tJbnB1dFZhbGlkaXR5Iiwic2hvd0lucHV0RXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckVsZW1lbnQiLCJ2YWxpZGF0aW9uTWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=