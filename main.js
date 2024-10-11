!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}const s=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"8821c207-7c9b-4450-ae25-85456081faad","Content-Type":"application/json"}});function i(e){e.target===e.currentTarget&&c(e.currentTarget)}function d(e){"Escape"===e.key&&c(document.querySelector(".modal_opened"))}function l(e){e.classList.add("modal_opened"),document.addEventListener("keydown",d),e.addEventListener("mousedown",i)}function c(e){e&&(e.classList.remove("modal_opened"),document.removeEventListener("keydown",d),e.removeEventListener("mousedown",i))}function u(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){if(!cardTemplate)return console.error("Error: cardTemplate is not defined or not found."),null;const t=cardTemplate.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return r.textContent=e.name,n.src=e.link,n.alt=e.name,e.isLiked&&o.classList.add("card__like-btn_liked"),o.addEventListener("click",(t=>handleLike(t,e._id))),a.addEventListener("click",(()=>handleDeleteCard(t,e._id))),n.addEventListener("click",(()=>handleImageClick(e))),t}(e);r&&cardsList[t](r)}function m(t){t.preventDefault(),a((function(){return s.editAvatarInfo(avatarInput.value).then((t=>{profileImage.src=t.avatar,r(avatarSubmitButton,e),c(avatarModal)}))}),t)}function h(e){e.preventDefault(),a((function(){return s.editUserInfo({name:nameInput.value,about:descriptionInput.value}).then((e=>{profileName.textContent=e.name,profileDescription.textContent=e.about,c(editProfileModal)}))}),e)}function v(t){t.preventDefault(),a((function(){return s.addCard({name:titleInput.value,link:imageInput.value}).then((t=>{u(t),r(cardSubmitButton,e),c(cardModal)}))}),t)}function _(e){e.preventDefault(),a((function(){return s.deleteCard(void 0).then((()=>{(void 0).remove(),c(deleteModal)}))}),e,"Deleting...")}document.addEventListener("DOMContentLoaded",(()=>{const r=document.querySelectorAll(".modal__close-btn"),o=document.querySelector("#card-template")?.content,a=document.querySelector(".cards__list");if(console.log("Card template:",o),!o)return void console.error("Error: Card template not found.");const i=document.querySelector(".profile__avatar"),d=document.querySelector(".profile__name"),f=document.querySelector(".profile__description");s.getAppInfo().then((e=>{let[t,r]=e;console.log("Fetched cards:",t),0===t.length?(console.log("No cards available"),a.innerHTML="<p>No cards to display.</p>"):(t.reverse(),t.forEach((e=>{u(e)}))),i.src=r.avatar,d.textContent=r.name,f.textContent=r.about})).catch(console.error),r.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>c(t)))}));const p=document.querySelector(".profile__avatar-btn"),y=document.querySelector("#avatar-modal"),S=y.querySelector("#edit-avatar-form");p.addEventListener("click",(()=>l(y))),S.addEventListener("submit",m);const b=document.querySelector(".profile__edit-btn"),q=document.querySelector("#edit-modal"),E=q.querySelector("#edit-profile-form"),L=q.querySelector("#profile-name-input"),g=q.querySelector("#profile-description-input");b.addEventListener("click",(()=>{var r,n;L.value=d.textContent,g.value=f.textContent,r=E,n=e,[L,g].forEach((e=>{t(r,e,n)})),l(q)})),E.addEventListener("submit",h);const C=document.querySelector(".profile__add-btn"),k=document.querySelector("#card-modal"),I=k.querySelector("#card-form");C.addEventListener("click",(()=>l(k))),I.addEventListener("submit",v);const U=document.querySelector("#delete-modal"),T=U.querySelector(".modal__form"),$=U.querySelector(".modal__submit-btn_type_cancel");var x;T.addEventListener("submit",_),$.addEventListener("click",(()=>c(U))),x=e,document.querySelectorAll(x.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((s=>{s.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,s,r),n(o,a,r)}))}))})(e,x)}))}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGNBQWMsaUJBQ3JDb0osRUFBYXJCLEVBQVkvSCxjQUFjLGdCQUN2Q3FKLEVBQXFCdEIsRUFBWS9ILGNBQWMsa0NGM0lwQkQsTUU0SWpDcUosRUFBV2hFLGlCQUFpQixTQUFVd0MsR0FDdEN5QixFQUFtQmpFLGlCQUFpQixTQUFTLElBQU1OLEVBQVdpRCxLRjdJN0JoSSxFRWdKaEJWLEVGL0lFNEYsU0FBU2dELGlCQUFpQmxJLEVBQU9ULGNBQ3pDa0osU0FBUzNJLElBckJNeUosRUFBQ3pKLEVBQWFFLEtBQ3RDLE1BQU1XLEVBQVk2SSxNQUFNQyxLQUN0QjNKLEVBQVlvSSxpQkFBaUJsSSxFQUFPUixnQkFFaENlLEVBQWdCVCxFQUFZRyxjQUFjRCxFQUFPUCxzQkFFdkQwQyxRQUFRaUcsSUFBSXpILEdBQ1p3QixRQUFRaUcsSUFBSTdILEdBRVpHLEVBQWtCQyxFQUFXSixFQUFlUCxHQUU1Q1csRUFBVThILFNBQVMxSSxJQUNqQkEsRUFBYXNGLGlCQUFpQixTQUFTLFdBbkRoQnFFLEVBQUM1SixFQUFhQyxFQUFjQyxLQUNoREQsRUFBYWMsU0FBU0MsTUFRekJqQixFQUFlQyxFQUFhQyxFQUFjQyxHQXJCdkIySixFQUFDN0osRUFBYUMsRUFBYzZKLEVBQWM1SixLQUMvRCxNQUFNNkosRUFBZS9KLEVBQVlHLGNBQWMsSUFBSUYsRUFBYUcsWUFDaEVILEVBQWFLLFVBQVVLLElBQUlULEVBQU9MLGlCQUNsQ2tLLEVBQWExSixZQUFjeUosQ0FBWSxFQVdyQ0QsQ0FDRTdKLEVBQ0FDLEVBQ0FBLEVBQWErSixrQkFDYjlKLEVBSUosRUEwQ0kwSixDQUFtQjVKLEVBQWFDLEVBQWNDLEdBQzlDVSxFQUFrQkMsRUFBV0osRUFBZVAsRUFDOUMsR0FBRSxHQUNGLEVBTUF1SixDQUFrQnpKLEVBQWFFLEVBQU8sR0U2SWhCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL0FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICAgIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICAgIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fc3VibWl0LWJ0blwiLFxuICAgIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5faW5hY3RpdmVcIixcbiAgICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvclwiLFxuICB9O1xuICBcbiAgY29uc3Qgc2hvd0lucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlLCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICB9O1xuICBcbiAgY29uc3QgaGlkZUlucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gIH07XG4gIFxuICBjb25zdCBjaGVja0lucHV0VmFsaWRpdHkgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHNob3dJbnB1dEVycm9yKFxuICAgICAgICBmb3JtRWxlbWVudCxcbiAgICAgICAgaW5wdXRFbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH07XG4gIFxuICBjb25zdCBoYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PiB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGRpc2FibGVCdXR0b24gPSAoYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IHRvZ2dsZUJ1dHRvblN0YXRlID0gKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBkaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgfVxuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWxlbWVudCwgaW5wdXRMaXN0LCBjb25maWcpID0+IHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGNvbnN0IHNldEV2ZW50TGlzdGVuZXJzID0gKGZvcm1FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gIFxuICAgIGNvbnNvbGUubG9nKGlucHV0TGlzdCk7XG4gICAgY29uc29sZS5sb2coYnV0dG9uRWxlbWVudCk7XG4gIFxuICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgXG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgICAgICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGZvcm1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKTtcbiAgICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xuICAgICAgc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH07XG4gICIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJMb2FkaW5nKFxuICAgIGlzTG9hZGluZyxcbiAgICBidG4sXG4gICAgZGVmYXVsdFRleHQgPSBcIlNhdmVcIixcbiAgICBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCJcbiAgKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGRlZmF1bHRUZXh0O1xuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChyZXF1ZXN0LCBldnQsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gc3VibWl0QnRuLnRleHRDb250ZW50O1xuICBcbiAgICByZW5kZXJMb2FkaW5nKHRydWUsIHN1Ym1pdEJ0biwgaW5pdGlhbFRleHQsIGxvYWRpbmdUZXh0KTtcbiAgXG4gICAgcmVxdWVzdCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGV2dC50YXJnZXQucmVzZXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcmVuZGVyTG9hZGluZyhmYWxzZSwgc3VibWl0QnRuLCBpbml0aWFsVGV4dCk7XG4gICAgICB9KTtcbiAgfVxuICAiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuaW1wb3J0IHtcbiAgZW5hYmxlVmFsaWRhdGlvbixcbiAgc2V0dGluZ3MsXG4gIHJlc2V0VmFsaWRhdGlvbixcbiAgZGlzYWJsZUJ1dHRvbixcbn0gZnJvbSBcIi4uL3NjcmlwdHMvdmFsaWRhdGlvbi5qc1wiO1xuaW1wb3J0IHsgaGFuZGxlU3VibWl0IH0gZnJvbSBcIi4uL3V0aWxzL2hlbHBlcnNcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL3V0aWxzL0FwaS5qc1wiO1xuXG5sZXQgc2VsZWN0ZWRDYXJkLCBzZWxlY3RlZENhcmRJZDtcblxuLy8gQVBJIHNldHVwXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCI4ODIxYzIwNy03YzliLTQ0NTAtYWUyNS04NTQ1NjA4MWZhYWRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG4vLyBGdW5jdGlvbnMgdG8gaGFuZGxlIG1vZGFsc1xuZnVuY3Rpb24gY2xvc2VNb2RhbE92ZXJsYXkoZXZ0KSB7XG4gIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xuICAgIGNsb3NlTW9kYWwoZXZ0LmN1cnJlbnRUYXJnZXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWxFc2MoZXZ0KSB7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY29uc3QgbW9kYWxPcGVuZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX29wZW5lZFwiKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsT3BlbmVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgY2xvc2VNb2RhbE92ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIGlmIChtb2RhbCkge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gICAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBjbG9zZU1vZGFsT3ZlcmxheSk7XG4gIH1cbn1cblxuLy8gRnVuY3Rpb24gdG8gcmVuZGVyIGEgY2FyZFxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpdGVtLCBtZXRob2QgPSBcInByZXBlbmRcIikge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGdldENhcmRFbGVtZW50KGl0ZW0pO1xuICBpZiAoY2FyZEVsZW1lbnQpIHtcbiAgICBjYXJkc0xpc3RbbWV0aG9kXShjYXJkRWxlbWVudCk7IC8vIEFwcGVuZCB0aGUgY2FyZCB0byB0aGUgY2FyZHMgbGlzdFxuICB9XG59XG5cbi8vIENyZWF0ZSBhIGNhcmQgZWxlbWVudCBmcm9tIHRoZSB0ZW1wbGF0ZVxuZnVuY3Rpb24gZ2V0Q2FyZEVsZW1lbnQoZGF0YSkge1xuICBpZiAoIWNhcmRUZW1wbGF0ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogY2FyZFRlbXBsYXRlIGlzIG5vdCBkZWZpbmVkIG9yIG5vdCBmb3VuZC5cIik7XG4gICAgcmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRlbXBsYXRlIGlzIG5vdCBmb3VuZFxuICB9XG5cbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjYXJkVGVtcGxhdGUucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgY2FyZE5hbWVFbGVtZW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgY29uc3QgY2FyZEltYWdlRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ0blwiKTtcbiAgY29uc3QgY2FyZERlbGV0ZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ0blwiKTtcblxuICBjYXJkTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIGNhcmRJbWFnZUVsZW1lbnQuc3JjID0gZGF0YS5saW5rO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFsdCA9IGRhdGEubmFtZTtcblxuICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuICB9XG5cbiAgY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldnQpID0+IGhhbmRsZUxpa2UoZXZ0LCBkYXRhLl9pZCkpO1xuICBjYXJkRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBkYXRhLl9pZCkpO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVJbWFnZUNsaWNrKGRhdGEpKTtcblxuICByZXR1cm4gY2FyZEVsZW1lbnQ7IC8vIFJldHVybiB0aGUgY3JlYXRlZCBjYXJkIGVsZW1lbnRcbn1cblxuLy8gRGVmaW5lIHRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYXZhdGFyIHN1Ym1pc3Npb25cbmZ1bmN0aW9uIGhhbmRsZUF2YXRhclN1Ym1pdChldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZWRpdEF2YXRhckluZm8oYXZhdGFySW5wdXQudmFsdWUpLnRoZW4oKGF2YXRhckRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVJbWFnZS5zcmMgPSBhdmF0YXJEYXRhLmF2YXRhcjsgLy8gVXBkYXRlIHRoZSBwcm9maWxlIGltYWdlXG4gICAgICBkaXNhYmxlQnV0dG9uKGF2YXRhclN1Ym1pdEJ1dHRvbiwgc2V0dGluZ3MpOyAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICAgIGNsb3NlTW9kYWwoYXZhdGFyTW9kYWwpOyAvLyBDbG9zZSB0aGUgbW9kYWwgYWZ0ZXIgc3VibWlzc2lvblxuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0KTsgLy8gQ2FsbCB5b3VyIGV4aXN0aW5nIGhhbmRsZVN1Ym1pdCBmdW5jdGlvblxufVxuXG4vLyBEZWZpbmUgdGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBwcm9maWxlIHN1Ym1pc3Npb25cbmZ1bmN0aW9uIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5lZGl0VXNlckluZm8oe1xuICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgYWJvdXQ6IGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG4gICAgfSkudGhlbigodXNlckRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlckRhdGEubmFtZTsgLy8gVXBkYXRlIHByb2ZpbGUgbmFtZVxuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdXNlckRhdGEuYWJvdXQ7IC8vIFVwZGF0ZSBwcm9maWxlIGRlc2NyaXB0aW9uXG4gICAgICBjbG9zZU1vZGFsKGVkaXRQcm9maWxlTW9kYWwpOyAvLyBDbG9zZSB0aGUgbW9kYWwgYWZ0ZXIgc3VibWlzc2lvblxuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0KTsgLy8gQ2FsbCB5b3VyIGV4aXN0aW5nIGhhbmRsZVN1Ym1pdCBmdW5jdGlvblxufVxuXG4vLyBEZWZpbmUgdGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBhZGRpbmcgYSBuZXcgY2FyZFxuZnVuY3Rpb24gaGFuZGxlQWRkQ2FyZFN1Ym1pdChldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuYWRkQ2FyZCh7XG4gICAgICBuYW1lOiB0aXRsZUlucHV0LnZhbHVlLFxuICAgICAgbGluazogaW1hZ2VJbnB1dC52YWx1ZSxcbiAgICB9KS50aGVuKChjYXJkRGF0YSkgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChjYXJkRGF0YSk7IC8vIFJlbmRlciB0aGUgbmV3IGNhcmRcbiAgICAgIGRpc2FibGVCdXR0b24oY2FyZFN1Ym1pdEJ1dHRvbiwgc2V0dGluZ3MpOyAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICAgIGNsb3NlTW9kYWwoY2FyZE1vZGFsKTsgLy8gQ2xvc2UgdGhlIG1vZGFsIGFmdGVyIHN1Ym1pc3Npb25cbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7IC8vIENhbGwgeW91ciBleGlzdGluZyBoYW5kbGVTdWJtaXQgZnVuY3Rpb25cbn1cblxuLy8gRGVmaW5lIHRoZSBmdW5jdGlvbiB0byBoYW5kbGUgZGVsZXRpbmcgYSBjYXJkXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5kZWxldGVDYXJkKHNlbGVjdGVkQ2FyZElkKS50aGVuKCgpID0+IHtcbiAgICAgIHNlbGVjdGVkQ2FyZC5yZW1vdmUoKTsgLy8gUmVtb3ZlIHRoZSBjYXJkIGZyb20gdGhlIERPTVxuICAgICAgY2xvc2VNb2RhbChkZWxldGVNb2RhbCk7IC8vIENsb3NlIHRoZSBkZWxldGUgbW9kYWxcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCwgXCJEZWxldGluZy4uLlwiKTsgLy8gQ2FsbCB5b3VyIGV4aXN0aW5nIGhhbmRsZVN1Ym1pdCBmdW5jdGlvblxufVxuXG4vLyBPdGhlciBldmVudCBoYW5kbGVyIGZ1bmN0aW9ucyAobGlrZSwgZGVsZXRlLCBldGMuKSBjYW4gYmUgZGVmaW5lZCBzaW1pbGFybHlcblxuLy8gRE9NIFJlYWR5XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGNsb3NlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWxfX2Nsb3NlLWJ0blwiKTtcbiAgY29uc3QgY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRlbXBsYXRlXCIpPy5jb250ZW50OyAvLyBBY2Nlc3MgdGVtcGxhdGUgaGVyZVxuICBjb25zdCBjYXJkc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saXN0XCIpO1xuXG4gIC8vIExvZyB0aGUgY2FyZCB0ZW1wbGF0ZSB0byBjaGVjayBpZiBpdCdzIGZvdW5kXG4gIGNvbnNvbGUubG9nKFwiQ2FyZCB0ZW1wbGF0ZTpcIiwgY2FyZFRlbXBsYXRlKTsgXG5cbiAgLy8gRW5zdXJlIHRoZSBjYXJkVGVtcGxhdGUgZXhpc3RzIGJlZm9yZSBwcm9jZWVkaW5nXG4gIGlmICghY2FyZFRlbXBsYXRlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yOiBDYXJkIHRlbXBsYXRlIG5vdCBmb3VuZC5cIik7XG4gICAgcmV0dXJuOyAvLyBTdG9wIGV4ZWN1dGlvbiBpZiB0ZW1wbGF0ZSBpcyBub3QgZm91bmRcbiAgfVxuXG4gIC8vIFByb2ZpbGUgZWxlbWVudHNcbiAgY29uc3QgcHJvZmlsZUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG4gIGNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuICBjb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xuXG4gIC8vIEZldGNoIHVzZXIgaW5mbyBhbmQgY2FyZHMgd2hlbiB0aGUgRE9NIGlzIGxvYWRlZFxuICBhcGkuZ2V0QXBwSW5mbygpLnRoZW4oKFtjYXJkcywgdXNlcnNdKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJGZXRjaGVkIGNhcmRzOlwiLCBjYXJkcyk7IC8vIExvZyBmZXRjaGVkIGNhcmRzXG5cbiAgICBpZiAoY2FyZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIGNhcmRzIGF2YWlsYWJsZVwiKTtcbiAgICAgIGNhcmRzTGlzdC5pbm5lckhUTUwgPSBcIjxwPk5vIGNhcmRzIHRvIGRpc3BsYXkuPC9wPlwiOyAvLyBEaXNwbGF5IG1lc3NhZ2UgaWYgbm8gY2FyZHNcbiAgICB9IGVsc2Uge1xuICAgICAgY2FyZHMucmV2ZXJzZSgpO1xuICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICByZW5kZXJDYXJkKGNhcmQpOyAvLyBSZW5kZXIgZWFjaCBjYXJkXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdXNlciBwcm9maWxlIGluZm9cbiAgICBwcm9maWxlSW1hZ2Uuc3JjID0gdXNlcnMuYXZhdGFyO1xuICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlcnMubmFtZTtcbiAgICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB1c2Vycy5hYm91dDtcbiAgfSkuY2F0Y2goY29uc29sZS5lcnJvcik7XG5cbiAgLy8gQ2xvc2UgYnV0dG9uIGV2ZW50IGxpc3RlbmVyc1xuICBjbG9zZUJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBidXR0b24uY2xvc2VzdChcIi5tb2RhbFwiKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlTW9kYWwobW9kYWwpKTtcbiAgfSk7XG5cbiAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzIGZvciBtb2RhbHMgYW5kIGZvcm0gc3VibWlzc2lvbnNcbiAgY29uc3QgYXZhdGFyTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhci1idG5cIik7XG4gIGNvbnN0IGF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItbW9kYWxcIik7XG4gIGNvbnN0IGF2YXRhck1vZGFsRm9ybSA9IGF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hdmF0YXItZm9ybVwiKTtcbiAgYXZhdGFyTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IG9wZW5Nb2RhbChhdmF0YXJNb2RhbCkpO1xuICBhdmF0YXJNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBdmF0YXJTdWJtaXQpO1xuXG4gIGNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19lZGl0LWJ0blwiKTtcbiAgY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1tb2RhbFwiKTtcbiAgY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1mb3JtXCIpO1xuICBjb25zdCBuYW1lSW5wdXQgPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lLWlucHV0XCIpO1xuICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZGVzY3JpcHRpb24taW5wdXRcIik7XG4gIGVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmFtZUlucHV0LnZhbHVlID0gcHJvZmlsZU5hbWUudGV4dENvbnRlbnQ7XG4gICAgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudDtcbiAgICByZXNldFZhbGlkYXRpb24oZWRpdFByb2ZpbGVGb3JtLCBbbmFtZUlucHV0LCBkZXNjcmlwdGlvbklucHV0XSwgc2V0dGluZ3MpO1xuICAgIG9wZW5Nb2RhbChlZGl0UHJvZmlsZU1vZGFsKTtcbiAgfSk7XG4gIGVkaXRQcm9maWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KTtcblxuICBjb25zdCBjYXJkTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idG5cIik7XG4gIGNvbnN0IGNhcmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1tb2RhbFwiKTtcbiAgY29uc3QgY2FyZE1vZGFsRm9ybSA9IGNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtZm9ybVwiKTtcbiAgY2FyZE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBvcGVuTW9kYWwoY2FyZE1vZGFsKSk7XG4gIGNhcmRNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBZGRDYXJkU3VibWl0KTsgLy8gRW5zdXJlIHRoaXMgZnVuY3Rpb24gaXMgZGVmaW5lZFxuXG4gIGNvbnN0IGRlbGV0ZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtbW9kYWxcIik7XG4gIGNvbnN0IGRlbGV0ZUZvcm0gPSBkZWxldGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xuICBjb25zdCBkZWxldGVDYW5jZWxCdXR0b24gPSBkZWxldGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnRuX3R5cGVfY2FuY2VsXCIpO1xuICBkZWxldGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlRGVsZXRlQ2FyZFN1Ym1pdCk7IC8vIEVuc3VyZSB0aGlzIGZ1bmN0aW9uIGlzIGRlZmluZWRcbiAgZGVsZXRlQ2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKSk7XG5cbiAgLy8gRW5hYmxlIGZvcm0gdmFsaWRhdGlvblxuICBlbmFibGVWYWxpZGF0aW9uKHNldHRpbmdzKTtcbn0pO1xuIiwiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIGdldEFwcEluZm8oKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFVzZXJJbmZvKCldKTtcbiAgfVxuXG4gIGNoZWNrUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3IgJHtyZXMuc3RhdHVzfWApO1xuICB9XG5cbiAgcmVxdWVzdCh1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKS50aGVuKHRoaXMuY2hlY2tSZXNwb25zZSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRVc2VySW5mbyh7IG5hbWUsIGFib3V0IH0pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhYm91dCxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZWRpdEF2YXRhckluZm8oYXZhdGFyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZS9hdmF0YXJgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGF2YXRhcixcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ2FyZCh7IG5hbWUsIGxpbmsgfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbGluayxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlTGlrZVN0YXR1cyhpZCwgaXNMaWtlZCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IGlzTGlrZWQgPyBcIkRFTEVURVwiIDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuIl0sIm5hbWVzIjpbInNldHRpbmdzIiwiZm9ybVNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJoaWRlSW5wdXRFcnJvciIsImZvcm1FbGVtZW50IiwiaW5wdXRFbGVtZW50IiwiY29uZmlnIiwicXVlcnlTZWxlY3RvciIsImlkIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJkaXNhYmxlQnV0dG9uIiwiYnV0dG9uRWxlbWVudCIsImRpc2FibGVkIiwiYWRkIiwidG9nZ2xlQnV0dG9uU3RhdGUiLCJpbnB1dExpc3QiLCJzb21lIiwidmFsaWRpdHkiLCJ2YWxpZCIsImhhc0ludmFsaWRJbnB1dCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidG4iLCJkZWZhdWx0VGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImxvYWRpbmdUZXh0IiwiaGFuZGxlU3VibWl0IiwicmVxdWVzdCIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic3VibWl0QnRuIiwic3VibWl0dGVyIiwiaW5pdGlhbFRleHQiLCJ0aGVuIiwidGFyZ2V0IiwicmVzZXQiLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImZpbmFsbHkiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIl9yZWYiLCJiYXNlVXJsIiwiaGVhZGVycyIsInRoaXMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImNoZWNrUmVzcG9uc2UiLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJzdGF0dXMiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJlZGl0VXNlckluZm8iLCJfcmVmMiIsIm5hbWUiLCJhYm91dCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZWRpdEF2YXRhckluZm8iLCJhdmF0YXIiLCJhZGRDYXJkIiwiX3JlZjMiLCJsaW5rIiwiZGVsZXRlQ2FyZCIsImNoYW5nZUxpa2VTdGF0dXMiLCJpc0xpa2VkIiwiYXV0aG9yaXphdGlvbiIsImNsb3NlTW9kYWxPdmVybGF5IiwiY3VycmVudFRhcmdldCIsImNsb3NlTW9kYWwiLCJjbG9zZU1vZGFsRXNjIiwia2V5IiwiZG9jdW1lbnQiLCJvcGVuTW9kYWwiLCJtb2RhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyQ2FyZCIsIml0ZW0iLCJjYXJkRWxlbWVudCIsImRhdGEiLCJjYXJkVGVtcGxhdGUiLCJjbG9uZU5vZGUiLCJjYXJkTmFtZUVsZW1lbnQiLCJjYXJkSW1hZ2VFbGVtZW50IiwiY2FyZExpa2VCdXR0b24iLCJjYXJkRGVsZXRlQnV0dG9uIiwic3JjIiwiYWx0IiwiaGFuZGxlTGlrZSIsIl9pZCIsImhhbmRsZURlbGV0ZUNhcmQiLCJoYW5kbGVJbWFnZUNsaWNrIiwiZ2V0Q2FyZEVsZW1lbnQiLCJjYXJkc0xpc3QiLCJoYW5kbGVBdmF0YXJTdWJtaXQiLCJhdmF0YXJJbnB1dCIsInZhbHVlIiwiYXZhdGFyRGF0YSIsInByb2ZpbGVJbWFnZSIsImF2YXRhclN1Ym1pdEJ1dHRvbiIsImF2YXRhck1vZGFsIiwiaGFuZGxlRWRpdFByb2ZpbGVTdWJtaXQiLCJuYW1lSW5wdXQiLCJkZXNjcmlwdGlvbklucHV0IiwidXNlckRhdGEiLCJwcm9maWxlTmFtZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsImVkaXRQcm9maWxlTW9kYWwiLCJoYW5kbGVBZGRDYXJkU3VibWl0IiwidGl0bGVJbnB1dCIsImltYWdlSW5wdXQiLCJjYXJkRGF0YSIsImNhcmRTdWJtaXRCdXR0b24iLCJjYXJkTW9kYWwiLCJoYW5kbGVEZWxldGVDYXJkU3VibWl0Iiwic2VsZWN0ZWRDYXJkSWQiLCJzZWxlY3RlZENhcmQiLCJkZWxldGVNb2RhbCIsImNsb3NlQnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb250ZW50IiwibG9nIiwiY2FyZHMiLCJ1c2VycyIsImlubmVySFRNTCIsInJldmVyc2UiLCJmb3JFYWNoIiwiY2FyZCIsImJ1dHRvbiIsImNsb3Nlc3QiLCJhdmF0YXJNb2RhbEJ1dHRvbiIsImF2YXRhck1vZGFsRm9ybSIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVGb3JtIiwicmVzZXRWYWxpZGF0aW9uIiwiaW5wdXQiLCJjYXJkTW9kYWxCdXR0b24iLCJjYXJkTW9kYWxGb3JtIiwiZGVsZXRlRm9ybSIsImRlbGV0ZUNhbmNlbEJ1dHRvbiIsInNldEV2ZW50TGlzdGVuZXJzIiwiQXJyYXkiLCJmcm9tIiwiY2hlY2tJbnB1dFZhbGlkaXR5Iiwic2hvd0lucHV0RXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckVsZW1lbnQiLCJ2YWxpZGF0aW9uTWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=