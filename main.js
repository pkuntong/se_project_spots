!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}let i,l;const s=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"b3ddf623-2d0f-4e5a-a7b9-d7f30d2fad6e","Content-Type":"application/json"}});function d(e){e.target===e.currentTarget&&m(e.currentTarget)}function c(e){"Escape"===e.key&&m(document.querySelector(".modal_opened"))}function u(e){e.classList.add("modal_opened"),document.addEventListener("keydown",c),e.addEventListener("mousedown",d)}function m(e){e&&(e.classList.remove("modal_opened"),document.removeEventListener("keydown",c),e.removeEventListener("mousedown",d))}function _(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){const t=cardTemplate.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return r.textContent=e.name,n.src=e.link,n.alt=e.name,e.isLiked&&o.classList.add("card__like-btn_liked"),o.addEventListener("click",(t=>function(e,t){const r=e.target,n=r.classList.contains("card__like-btn_liked");s.changeLikeStatus(t,n).then((()=>{r.classList.toggle("card__like-btn_liked",!n)})).catch(console.error)}(t,e._id))),a.addEventListener("click",(()=>function(e,t){i=e,l=t,u(deleteModal)}(t,e._id))),n.addEventListener("click",(()=>function(e){previewModalImageElement.src=e.link,previewModalImageElement.alt=e.name,previewModalCaptionElement.textContent=e.name,u(previewModal)}(e))),t}(e);cardsList[t](r)}function h(t){a((function(){return s.editAvatarInfo(avatarInput.value).then((t=>{profileImage.src=t.avatar,r(avatarSubmitButton,e),m(avatarModal)}))}),t)}function v(e){a((function(){return s.editUserInfo({name:nameInput.value,about:descriptionInput.value}).then((e=>{profileName.textContent=e.name,profileDescription.textContent=e.about,m(editProfileModal)}))}),e)}function p(t){a((function(){return s.addCard({name:titleInput.value,link:imageInput.value}).then((t=>{_(t),r(cardSubmitButton,e),m(cardModal)}))}),t)}function f(e){a((function(){return s.deleteCard(l).then((()=>{i.remove(),m(deleteModal)}))}),e,"Deleting...")}document.addEventListener("DOMContentLoaded",(()=>{const r=document.querySelectorAll(".modal__close-btn"),o=document.querySelector(".profile__edit-btn"),a=document.querySelector(".profile__avatar"),i=document.querySelector(".profile__name"),l=document.querySelector(".profile__description"),d=document.querySelector(".profile__add-btn"),c=document.querySelector(".profile__avatar-btn"),y=document.querySelector("#edit-modal"),S=y.querySelector("#edit-profile-form"),b=y.querySelector("#profile-name-input"),q=y.querySelector("#profile-description-input"),E=document.querySelector("#card-modal"),g=E.querySelector("#card-form"),L=(E.querySelector(".modal__submit-btn"),E.querySelector("#card-link-input"),E.querySelector("#card-caption-input"),document.querySelector("#avatar-modal")),C=L.querySelector("#edit-avatar-form"),k=(L.querySelector("#profile-avatar-input"),L.querySelector(".modal__submit-btn"),document.querySelector("#delete-modal")),I=k.querySelector(".modal__form"),U=k.querySelector(".modal__submit-btn_type_cancel"),x=document.querySelector("#card-template")?.content,M=document.querySelector(".cards__list");var $;(console.log("Card template:",x),x)?(document.querySelector("#preview-modal"),document.querySelector(".modal__image"),document.querySelector(".modal__caption"),s.getAppInfo().then((e=>{let[t,r]=e;0===t.length?(console.log("No cards available"),M.innerHTML="<p>No cards to display.</p>"):(t.reverse(),t.forEach((e=>{_(e)}))),a.src=r.avatar,i.textContent=r.name,l.textContent=r.about})).catch(console.error),r.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>m(t)))})),c&&c.addEventListener("click",(()=>u(L))),C&&C.addEventListener("submit",h),o&&o.addEventListener("click",(()=>{var r,n;b.value=i.textContent,q.value=l.textContent,r=S,n=e,[b,q].forEach((e=>{t(r,e,n)})),u(y)})),S&&S.addEventListener("submit",v),d&&d.addEventListener("click",(()=>u(E))),g&&g.addEventListener("submit",p),I&&I.addEventListener("submit",f),U&&U.addEventListener("click",(()=>m(k))),$=e,document.querySelectorAll($.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((i=>{i.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,i,r),n(o,a,r)}))}))})(e,$)}))):console.error("Error: Card template not found.")}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FDaERELEVBQWFjLFNBQVNDLE1BUXpCakIsRUFBZUMsRUFBYUMsRUFBY0MsR0FyQnZCaUssRUFBQ25LLEVBQWFDLEVBQWNtSyxFQUFjbEssS0FDL0QsTUFBTW1LLEVBQWVySyxFQUFZRyxjQUFjLElBQUlGLEVBQWFHLFlBQ2hFSCxFQUFhSyxVQUFVSyxJQUFJVCxFQUFPTCxpQkFDbEN3SyxFQUFhaEssWUFBYytKLENBQVksRUFXckNELENBQ0VuSyxFQUNBQyxFQUNBQSxFQUFhcUssa0JBQ2JwSyxFQUlKLEVBMENJZ0ssQ0FBbUJsSyxFQUFhQyxFQUFjQyxHQUM5Q1UsRUFBa0JDLEVBQVdKLEVBQWVQLEVBQzlDLEdBQUUsR0FDRixFQU1BNkosQ0FBa0IvSixFQUFhRSxFQUFPLEtFK0d4Q21DLFFBQVFDLE1BQU0sa0NBeUVVLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL0FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICAgIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICAgIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fc3VibWl0LWJ0blwiLFxuICAgIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5faW5hY3RpdmVcIixcbiAgICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvclwiLFxuICB9O1xuICBcbiAgY29uc3Qgc2hvd0lucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlLCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICB9O1xuICBcbiAgY29uc3QgaGlkZUlucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gIH07XG4gIFxuICBjb25zdCBjaGVja0lucHV0VmFsaWRpdHkgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHNob3dJbnB1dEVycm9yKFxuICAgICAgICBmb3JtRWxlbWVudCxcbiAgICAgICAgaW5wdXRFbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH07XG4gIFxuICBjb25zdCBoYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PiB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGRpc2FibGVCdXR0b24gPSAoYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IHRvZ2dsZUJ1dHRvblN0YXRlID0gKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBkaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgfVxuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWxlbWVudCwgaW5wdXRMaXN0LCBjb25maWcpID0+IHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGNvbnN0IHNldEV2ZW50TGlzdGVuZXJzID0gKGZvcm1FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gIFxuICAgIGNvbnNvbGUubG9nKGlucHV0TGlzdCk7XG4gICAgY29uc29sZS5sb2coYnV0dG9uRWxlbWVudCk7XG4gIFxuICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgXG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgICAgICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGZvcm1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKTtcbiAgICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xuICAgICAgc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH07XG4gICIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJMb2FkaW5nKFxuICAgIGlzTG9hZGluZyxcbiAgICBidG4sXG4gICAgZGVmYXVsdFRleHQgPSBcIlNhdmVcIixcbiAgICBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCJcbiAgKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGRlZmF1bHRUZXh0O1xuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChyZXF1ZXN0LCBldnQsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gc3VibWl0QnRuLnRleHRDb250ZW50O1xuICBcbiAgICByZW5kZXJMb2FkaW5nKHRydWUsIHN1Ym1pdEJ0biwgaW5pdGlhbFRleHQsIGxvYWRpbmdUZXh0KTtcbiAgXG4gICAgcmVxdWVzdCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGV2dC50YXJnZXQucmVzZXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcmVuZGVyTG9hZGluZyhmYWxzZSwgc3VibWl0QnRuLCBpbml0aWFsVGV4dCk7XG4gICAgICB9KTtcbiAgfVxuICAiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuaW1wb3J0IHtcbiAgZW5hYmxlVmFsaWRhdGlvbixcbiAgc2V0dGluZ3MsXG4gIHJlc2V0VmFsaWRhdGlvbixcbiAgZGlzYWJsZUJ1dHRvbixcbn0gZnJvbSBcIi4uL3NjcmlwdHMvdmFsaWRhdGlvbi5qc1wiO1xuaW1wb3J0IHsgaGFuZGxlU3VibWl0IH0gZnJvbSBcIi4uL3V0aWxzL2hlbHBlcnNcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL3V0aWxzL0FwaS5qc1wiO1xuXG5sZXQgc2VsZWN0ZWRDYXJkLCBzZWxlY3RlZENhcmRJZDtcblxuLy8gQVBJIHNldHVwXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiM2RkZjYyMy0yZDBmLTRlNWEtYTdiOS1kN2YzMGQyZmFkNmVcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG4vLyBGdW5jdGlvbnMgdG8gaGFuZGxlIG1vZGFsc1xuZnVuY3Rpb24gY2xvc2VNb2RhbE92ZXJsYXkoZXZ0KSB7XG4gIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xuICAgIGNsb3NlTW9kYWwoZXZ0LmN1cnJlbnRUYXJnZXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWxFc2MoZXZ0KSB7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY29uc3QgbW9kYWxPcGVuZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX29wZW5lZFwiKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsT3BlbmVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgY2xvc2VNb2RhbE92ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIGlmIChtb2RhbCkge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gICAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBjbG9zZU1vZGFsT3ZlcmxheSk7XG4gIH1cbn1cblxuLy8gRnVuY3Rpb24gdG8gcmVuZGVyIGEgY2FyZFxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpdGVtLCBtZXRob2QgPSBcInByZXBlbmRcIikge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGdldENhcmRFbGVtZW50KGl0ZW0pO1xuICBjYXJkc0xpc3RbbWV0aG9kXShjYXJkRWxlbWVudCk7IC8vIFVzZSBwcmVwZW5kIHRvIGFkZCBuZXcgY2FyZHMgYXQgdGhlIHRvcFxufVxuXG4vLyBDcmVhdGUgYSBjYXJkIGVsZW1lbnQgZnJvbSB0aGUgdGVtcGxhdGVcbmZ1bmN0aW9uIGdldENhcmRFbGVtZW50KGRhdGEpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjYXJkVGVtcGxhdGUucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgY2FyZE5hbWVFbGVtZW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgY29uc3QgY2FyZEltYWdlRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ0blwiKTtcbiAgY29uc3QgY2FyZERlbGV0ZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ0blwiKTtcblxuICBjYXJkTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIGNhcmRJbWFnZUVsZW1lbnQuc3JjID0gZGF0YS5saW5rO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFsdCA9IGRhdGEubmFtZTtcblxuICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuICB9XG5cbiAgY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldnQpID0+IGhhbmRsZUxpa2UoZXZ0LCBkYXRhLl9pZCkpO1xuICBjYXJkRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBkYXRhLl9pZCkpO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVJbWFnZUNsaWNrKGRhdGEpKTtcblxuICByZXR1cm4gY2FyZEVsZW1lbnQ7XG59XG5cbi8vIEV2ZW50IGhhbmRsZXJzXG5mdW5jdGlvbiBoYW5kbGVBdmF0YXJTdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZWRpdEF2YXRhckluZm8oYXZhdGFySW5wdXQudmFsdWUpLnRoZW4oKGF2YXRhckRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVJbWFnZS5zcmMgPSBhdmF0YXJEYXRhLmF2YXRhcjtcbiAgICAgIGRpc2FibGVCdXR0b24oYXZhdGFyU3VibWl0QnV0dG9uLCBzZXR0aW5ncyk7XG4gICAgICBjbG9zZU1vZGFsKGF2YXRhck1vZGFsKTtcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUxpa2UoZXZ0LCBpZCkge1xuICBjb25zdCBjYXJkTGlrZUJ1dHRvbiA9IGV2dC50YXJnZXQ7XG4gIGNvbnN0IGlzTGlrZWQgPSBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcblxuICBhcGkuY2hhbmdlTGlrZVN0YXR1cyhpZCwgaXNMaWtlZCkudGhlbigoKSA9PiB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIsICFpc0xpa2VkKTtcbiAgfSkuY2F0Y2goY29uc29sZS5lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZUNhcmQoY2FyZEVsZW1lbnQsIGNhcmRJZCkge1xuICBzZWxlY3RlZENhcmQgPSBjYXJkRWxlbWVudDtcbiAgc2VsZWN0ZWRDYXJkSWQgPSBjYXJkSWQ7XG4gIG9wZW5Nb2RhbChkZWxldGVNb2RhbCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUltYWdlQ2xpY2soZGF0YSkge1xuICBwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQuc3JjID0gZGF0YS5saW5rO1xuICBwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQuYWx0ID0gZGF0YS5uYW1lO1xuICBwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgb3Blbk1vZGFsKHByZXZpZXdNb2RhbCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KGV2dCkge1xuICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICByZXR1cm4gYXBpLmVkaXRVc2VySW5mbyh7XG4gICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICBhYm91dDogZGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcbiAgICB9KS50aGVuKCh1c2VyRGF0YSkgPT4ge1xuICAgICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSB1c2VyRGF0YS5uYW1lO1xuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdXNlckRhdGEuYWJvdXQ7XG4gICAgICBjbG9zZU1vZGFsKGVkaXRQcm9maWxlTW9kYWwpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQWRkQ2FyZFN1Ym1pdChldnQpIHtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5hZGRDYXJkKHtcbiAgICAgIG5hbWU6IHRpdGxlSW5wdXQudmFsdWUsXG4gICAgICBsaW5rOiBpbWFnZUlucHV0LnZhbHVlLFxuICAgIH0pLnRoZW4oKGNhcmREYXRhKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKGNhcmREYXRhKTtcbiAgICAgIGRpc2FibGVCdXR0b24oY2FyZFN1Ym1pdEJ1dHRvbiwgc2V0dGluZ3MpO1xuICAgICAgY2xvc2VNb2RhbChjYXJkTW9kYWwpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZFN1Ym1pdChldnQpIHtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5kZWxldGVDYXJkKHNlbGVjdGVkQ2FyZElkKS50aGVuKCgpID0+IHtcbiAgICAgIHNlbGVjdGVkQ2FyZC5yZW1vdmUoKTtcbiAgICAgIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0LCBcIkRlbGV0aW5nLi4uXCIpO1xufVxuXG4vLyBET00gUmVhZHlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xuXG4gIC8vIFByb2ZpbGUgZWxlbWVudHNcbiAgY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnRuXCIpO1xuICBjb25zdCBwcm9maWxlSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcbiAgY29uc3QgcHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG4gIGNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IGNhcmRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbiAgY29uc3QgYXZhdGFyTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhci1idG5cIik7XG5cbiAgLy8gQ2FyZCBmb3JtIGVsZW1lbnRzXG4gIGNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtbW9kYWxcIik7XG4gIGNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIiNlZGl0LXByb2ZpbGUtZm9ybVwiKTtcbiAgY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZS1pbnB1dFwiKTtcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCIpO1xuICBjb25zdCBjYXJkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbW9kYWxcIik7XG4gIGNvbnN0IGNhcmRNb2RhbEZvcm0gPSBjYXJkTW9kYWwucXVlcnlTZWxlY3RvcihcIiNjYXJkLWZvcm1cIik7XG4gIGNvbnN0IGNhcmRTdWJtaXRCdXR0b24gPSBjYXJkTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0blwiKTtcbiAgY29uc3QgaW1hZ2VJbnB1dCA9IGNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGluay1pbnB1dFwiKTtcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtY2FwdGlvbi1pbnB1dFwiKTtcblxuICAvLyBBdmF0YXIgZm9ybSBlbGVtZW50c1xuICBjb25zdCBhdmF0YXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLW1vZGFsXCIpO1xuICBjb25zdCBhdmF0YXJNb2RhbEZvcm0gPSBhdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLWZvcm1cIik7XG4gIGNvbnN0IGF2YXRhcklucHV0ID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWF2YXRhci1pbnB1dFwiKTtcbiAgY29uc3QgYXZhdGFyU3VibWl0QnV0dG9uID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0blwiKTtcblxuICAvLyBEZWxldGUgZm9ybSBlbGVtZW50c1xuICBjb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuICBjb25zdCBkZWxldGVGb3JtID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbiAgY29uc3QgZGVsZXRlQ2FuY2VsQnV0dG9uID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0bl90eXBlX2NhbmNlbFwiKTtcblxuICAvLyBDYXJkLXJlbGF0ZWQgZWxlbWVudHNcbiAgY29uc3QgY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRlbXBsYXRlXCIpPy5jb250ZW50OyAvLyBUZW1wbGF0ZSBmb3IgY2FyZHNcbiAgY29uc3QgY2FyZHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc19fbGlzdFwiKTtcblxuICAvLyBMb2cgdGhlIGNhcmQgdGVtcGxhdGUgdG8gc2VlIGlmIGl0J3MgYmVpbmcgc2VsZWN0ZWQgcHJvcGVybHlcbiAgY29uc29sZS5sb2coJ0NhcmQgdGVtcGxhdGU6JywgY2FyZFRlbXBsYXRlKTtcblxuICAvLyBDaGVjayBpZiBjYXJkVGVtcGxhdGUgaXMgYmVpbmcgc2VsZWN0ZWQgcHJvcGVybHlcbiAgaWYgKCFjYXJkVGVtcGxhdGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IENhcmQgdGVtcGxhdGUgbm90IGZvdW5kLlwiKTtcbiAgICByZXR1cm47ICAvLyBTdG9wIHRoZSBleGVjdXRpb24gaWYgY2FyZFRlbXBsYXRlIGlzIG51bGwgb3IgdW5kZWZpbmVkXG4gIH1cblxuICAvLyBQcmV2aWV3IGltYWdlIHBvcHVwIGVsZW1lbnRzXG4gIGNvbnN0IHByZXZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJldmlldy1tb2RhbFwiKTtcbiAgY29uc3QgcHJldmlld01vZGFsSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG4gIGNvbnN0IHByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2FwdGlvblwiKTtcblxuICAvLyBGZXRjaCB1c2VyIGluZm8gYW5kIGNhcmRzIHdoZW4gdGhlIERPTSBpcyBsb2FkZWRcbiAgYXBpXG4gICAgLmdldEFwcEluZm8oKVxuICAgIC50aGVuKChbY2FyZHMsIHVzZXJzXSkgPT4ge1xuICAgICAgaWYgKGNhcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGNhcmRzIGF2YWlsYWJsZVwiKTtcbiAgICAgICAgY2FyZHNMaXN0LmlubmVySFRNTCA9IFwiPHA+Tm8gY2FyZHMgdG8gZGlzcGxheS48L3A+XCI7ICAvLyBEaXNwbGF5IG1lc3NhZ2UgaWYgbm8gY2FyZHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcmRzLnJldmVyc2UoKTtcbiAgICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICAgIHJlbmRlckNhcmQoY2FyZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBwcm9maWxlSW1hZ2Uuc3JjID0gdXNlcnMuYXZhdGFyO1xuICAgICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSB1c2Vycy5uYW1lO1xuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdXNlcnMuYWJvdXQ7XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG5cbiAgLy8gQ2xvc2UgYnV0dG9uIGV2ZW50IGxpc3RlbmVyc1xuICBjbG9zZUJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBidXR0b24uY2xvc2VzdChcIi5tb2RhbFwiKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlTW9kYWwobW9kYWwpKTtcbiAgfSk7XG5cbiAgaWYgKGF2YXRhck1vZGFsQnV0dG9uKSB7XG4gICAgYXZhdGFyTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IG9wZW5Nb2RhbChhdmF0YXJNb2RhbCkpO1xuICB9XG5cbiAgaWYgKGF2YXRhck1vZGFsRm9ybSkge1xuICAgIGF2YXRhck1vZGFsRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUF2YXRhclN1Ym1pdCk7XG4gIH1cblxuICBpZiAoZWRpdFByb2ZpbGVCdXR0b24pIHtcbiAgICBlZGl0UHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgbmFtZUlucHV0LnZhbHVlID0gcHJvZmlsZU5hbWUudGV4dENvbnRlbnQ7XG4gICAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50O1xuICAgICAgcmVzZXRWYWxpZGF0aW9uKGVkaXRQcm9maWxlRm9ybSwgW25hbWVJbnB1dCwgZGVzY3JpcHRpb25JbnB1dF0sIHNldHRpbmdzKTtcbiAgICAgIG9wZW5Nb2RhbChlZGl0UHJvZmlsZU1vZGFsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChlZGl0UHJvZmlsZUZvcm0pIHtcbiAgICBlZGl0UHJvZmlsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVFZGl0UHJvZmlsZVN1Ym1pdCk7XG4gIH1cblxuICBpZiAoY2FyZE1vZGFsQnV0dG9uKSB7XG4gICAgY2FyZE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBvcGVuTW9kYWwoY2FyZE1vZGFsKSk7XG4gIH1cblxuICBpZiAoY2FyZE1vZGFsRm9ybSkge1xuICAgIGNhcmRNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBZGRDYXJkU3VibWl0KTtcbiAgfVxuXG4gIGlmIChkZWxldGVGb3JtKSB7XG4gICAgZGVsZXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQpO1xuICB9XG5cbiAgaWYgKGRlbGV0ZUNhbmNlbEJ1dHRvbikge1xuICAgIGRlbGV0ZUNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VNb2RhbChkZWxldGVNb2RhbCkpO1xuICB9XG5cbiAgLy8gRW5hYmxlIGZvcm0gdmFsaWRhdGlvblxuICBlbmFibGVWYWxpZGF0aW9uKHNldHRpbmdzKTtcbn0pO1xuIiwiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIGdldEFwcEluZm8oKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFVzZXJJbmZvKCldKTtcbiAgfVxuXG4gIGNoZWNrUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3IgJHtyZXMuc3RhdHVzfWApO1xuICB9XG5cbiAgcmVxdWVzdCh1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKS50aGVuKHRoaXMuY2hlY2tSZXNwb25zZSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRVc2VySW5mbyh7IG5hbWUsIGFib3V0IH0pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhYm91dCxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZWRpdEF2YXRhckluZm8oYXZhdGFyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZS9hdmF0YXJgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGF2YXRhcixcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ2FyZCh7IG5hbWUsIGxpbmsgfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbGluayxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlTGlrZVN0YXR1cyhpZCwgaXNMaWtlZCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IGlzTGlrZWQgPyBcIkRFTEVURVwiIDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuIl0sIm5hbWVzIjpbInNldHRpbmdzIiwiZm9ybVNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJoaWRlSW5wdXRFcnJvciIsImZvcm1FbGVtZW50IiwiaW5wdXRFbGVtZW50IiwiY29uZmlnIiwicXVlcnlTZWxlY3RvciIsImlkIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJkaXNhYmxlQnV0dG9uIiwiYnV0dG9uRWxlbWVudCIsImRpc2FibGVkIiwiYWRkIiwidG9nZ2xlQnV0dG9uU3RhdGUiLCJpbnB1dExpc3QiLCJzb21lIiwidmFsaWRpdHkiLCJ2YWxpZCIsImhhc0ludmFsaWRJbnB1dCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidG4iLCJkZWZhdWx0VGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImxvYWRpbmdUZXh0IiwiaGFuZGxlU3VibWl0IiwicmVxdWVzdCIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic3VibWl0QnRuIiwic3VibWl0dGVyIiwiaW5pdGlhbFRleHQiLCJ0aGVuIiwidGFyZ2V0IiwicmVzZXQiLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImZpbmFsbHkiLCJzZWxlY3RlZENhcmQiLCJzZWxlY3RlZENhcmRJZCIsImFwaSIsImNvbnN0cnVjdG9yIiwiX3JlZiIsImJhc2VVcmwiLCJoZWFkZXJzIiwidGhpcyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJnZXRBcHBJbmZvIiwiUHJvbWlzZSIsImFsbCIsImdldEluaXRpYWxDYXJkcyIsImdldFVzZXJJbmZvIiwiY2hlY2tSZXNwb25zZSIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsInVybCIsIm9wdGlvbnMiLCJmZXRjaCIsImVkaXRVc2VySW5mbyIsIl9yZWYyIiwibmFtZSIsImFib3V0IiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0QXZhdGFySW5mbyIsImF2YXRhciIsImFkZENhcmQiLCJfcmVmMyIsImxpbmsiLCJkZWxldGVDYXJkIiwiY2hhbmdlTGlrZVN0YXR1cyIsImlzTGlrZWQiLCJhdXRob3JpemF0aW9uIiwiY2xvc2VNb2RhbE92ZXJsYXkiLCJjdXJyZW50VGFyZ2V0IiwiY2xvc2VNb2RhbCIsImNsb3NlTW9kYWxFc2MiLCJrZXkiLCJkb2N1bWVudCIsIm9wZW5Nb2RhbCIsIm1vZGFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJDYXJkIiwiaXRlbSIsImNhcmRFbGVtZW50IiwiZGF0YSIsImNhcmRUZW1wbGF0ZSIsImNsb25lTm9kZSIsImNhcmROYW1lRWxlbWVudCIsImNhcmRJbWFnZUVsZW1lbnQiLCJjYXJkTGlrZUJ1dHRvbiIsImNhcmREZWxldGVCdXR0b24iLCJzcmMiLCJhbHQiLCJjb250YWlucyIsInRvZ2dsZSIsImhhbmRsZUxpa2UiLCJfaWQiLCJjYXJkSWQiLCJkZWxldGVNb2RhbCIsImhhbmRsZURlbGV0ZUNhcmQiLCJwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQiLCJwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudCIsInByZXZpZXdNb2RhbCIsImhhbmRsZUltYWdlQ2xpY2siLCJnZXRDYXJkRWxlbWVudCIsImNhcmRzTGlzdCIsImhhbmRsZUF2YXRhclN1Ym1pdCIsImF2YXRhcklucHV0IiwidmFsdWUiLCJhdmF0YXJEYXRhIiwicHJvZmlsZUltYWdlIiwiYXZhdGFyU3VibWl0QnV0dG9uIiwiYXZhdGFyTW9kYWwiLCJoYW5kbGVFZGl0UHJvZmlsZVN1Ym1pdCIsIm5hbWVJbnB1dCIsImRlc2NyaXB0aW9uSW5wdXQiLCJ1c2VyRGF0YSIsInByb2ZpbGVOYW1lIiwicHJvZmlsZURlc2NyaXB0aW9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImhhbmRsZUFkZENhcmRTdWJtaXQiLCJ0aXRsZUlucHV0IiwiaW1hZ2VJbnB1dCIsImNhcmREYXRhIiwiY2FyZFN1Ym1pdEJ1dHRvbiIsImNhcmRNb2RhbCIsImhhbmRsZURlbGV0ZUNhcmRTdWJtaXQiLCJjbG9zZUJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJjYXJkTW9kYWxCdXR0b24iLCJhdmF0YXJNb2RhbEJ1dHRvbiIsImVkaXRQcm9maWxlRm9ybSIsImNhcmRNb2RhbEZvcm0iLCJhdmF0YXJNb2RhbEZvcm0iLCJkZWxldGVGb3JtIiwiZGVsZXRlQ2FuY2VsQnV0dG9uIiwiY29udGVudCIsImxvZyIsImNhcmRzIiwidXNlcnMiLCJpbm5lckhUTUwiLCJyZXZlcnNlIiwiZm9yRWFjaCIsImNhcmQiLCJidXR0b24iLCJjbG9zZXN0IiwicmVzZXRWYWxpZGF0aW9uIiwiaW5wdXQiLCJzZXRFdmVudExpc3RlbmVycyIsIkFycmF5IiwiZnJvbSIsImNoZWNrSW5wdXRWYWxpZGl0eSIsInNob3dJbnB1dEVycm9yIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9