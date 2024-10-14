!function(){"use strict";const e=(e,t,o)=>{(e=>e.some((e=>!e.validity.valid)))(e)?((e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)})(t,o):(t.disabled=!1,t.classList.remove(o.inactiveButtonClass))},t=new class{constructor(e){let{baseUrl:t,headers:o}=e;this._baseUrl=t,this._headers=o}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:o}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:o})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:o}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:o})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"58406471-2704-4b39-bb10-f7b7656fbc17","Content-Type":"application/json"}});t.getAppInfo().then((e=>{let[t,n]=e;t.forEach((e=>{const t=i(e);r.list.append(t)})),o.nameElement.textContent=n.name,o.jobElement.textContent=n.about,v.src=n.avatar})).catch((e=>console.error(e)));const o={editButton:document.querySelector(".profile__edit-button"),modal:document.querySelector("#edit-profile-modal"),closeButton:document.querySelector("#close-profile-modal"),form:document.querySelector("#edit-profile-form"),nameInput:document.querySelector("#edit-profile-input-name"),jobInput:document.querySelector("#edit-profile-input-description"),nameElement:document.querySelector(".profile__title"),jobElement:document.querySelector(".profile__description")},n={button:document.querySelector(".profile__add-button"),modal:document.querySelector("#new-post-modal"),closeButton:document.querySelector("#close-new-post-modal"),linkInput:document.querySelector("#new-post-image-link"),nameInput:document.querySelector("#new-post-input-description"),form:document.querySelector("#new-post-form")},r={template:document.querySelector("#card-template"),list:document.querySelector(".cards__list"),modal:document.querySelector("#preview-modal"),modalImage:document.querySelector(".modal__image"),modalCloseButton:document.querySelector(".modal__close-button"),modalCaption:document.querySelector(".modal__caption")};function a(e){e.classList.add("modal_opened"),document.addEventListener("keydown",s),e.addEventListener("click",c),e.addEventListener("click",d)}function l(e){e.classList.remove("modal_opened"),document.removeEventListener("keydown",s),e.removeEventListener("click",c),e.removeEventListener("click",d)}const s=e=>{if("Escape"===e.key){const e=document.querySelector(".modal_opened");e&&l(e)}},c=e=>{e.target.classList.contains("modal")&&l(e.currentTarget)},d=e=>{e.target.classList.contains("modal__close-button")&&l(e.currentTarget)};function i(e){const o=r.template.content.querySelector(".card").cloneNode(!0),n=o.querySelector(".card__title"),l=o.querySelector(".card__image"),s=o.querySelector(".card__like-button"),c=o.querySelector(".card__delete-button"),d=e._id;return n.textContent=e.name,l.src=e.link,l.alt=e.name,e.isLiked&&s.classList.add("card__like-button_liked"),s.addEventListener("click",(()=>{s.classList.contains("card__like-button_liked")?t.deleteLike(d).then((()=>{s.classList.remove("card__like-button_liked")})).catch((e=>console.error(`Error: ${e}`))):t.addLike(d).then((()=>{s.classList.add("card__like-button_liked")})).catch((e=>console.error(`Error: ${e}`)))})),c.addEventListener("click",(()=>{q=o,E=d,a(y)})),l.addEventListener("click",(()=>{r.modalCaption.textContent=e.name,r.modalImage.src=e.link,r.modalImage.alt=e.name,a(r.modal)})),o}o.editButton.addEventListener("click",(()=>{o.nameInput.value=o.nameElement.textContent,o.jobInput.value=o.jobElement.textContent,a(o.modal)})),o.closeButton.addEventListener("click",(()=>{l(o.modal)})),n.button.addEventListener("click",(()=>{a(n.modal)})),n.closeButton.addEventListener("click",(()=>{l(n.modal)})),o.form.addEventListener("submit",(function(e){e.preventDefault();const n=o.form.querySelector(".modal__submit-button"),r=n.textContent;n.textContent="Saving...",t.editUserInfo({name:o.nameInput.value,about:o.jobInput.value}).then((e=>{o.nameElement.textContent=e.name,o.jobElement.textContent=e.about,l(o.modal)})).catch((e=>console.error(`Error: ${e}`))).finally((()=>{n.textContent=r}))})),n.form.addEventListener("submit",(function(e){e.preventDefault();const o=n.form.querySelector(".modal__submit-button"),a=o.textContent;o.textContent="Saving...",t.addNewCard({name:n.nameInput.value,link:n.linkInput.value}).then((e=>{const t=i(e);r.list.prepend(t),n.form.reset(),l(n.modal)})).catch((e=>console.error(`Error: ${e}`))).finally((()=>{o.textContent=a}))})),r.modalCloseButton.addEventListener("click",(()=>{l(r.modal)}));const u=document.querySelector("#edit-avatar-modal"),m=u.querySelector(".modal__form"),_=document.querySelector(".profile__avatar-button"),h=(u.querySelector(".modal__submit-button"),u.querySelector(".modal__close-button")),p=u.querySelector("#edit-avatar-input-link"),v=document.querySelector(".profile__avatar");_.addEventListener("click",(()=>{a(u)})),h.addEventListener("click",(()=>{l(u)})),m.addEventListener("submit",(e=>{e.preventDefault();const o=m.querySelector(".modal__submit-button"),n=o.textContent;o.textContent="Saving...";const r=p.value;t.editAvatar(r).then((e=>{v.src=e.avatar,l(u)})).catch((e=>console.error(`Error: ${e}`))).finally((()=>{o.textContent=n}))}));const y=document.querySelector("#delete-modal"),b=document.querySelector("#delete-modal-form"),f=document.querySelector(".modal__cancel-button"),S=document.querySelector("#close-delete-modal");let q,E;var k;b.addEventListener("submit",(e=>{e.preventDefault();const o=b.querySelector(".modal__submit-button"),n=o.textContent;o.textContent="Deleting...",t.deleteCard(E).then((()=>{q.remove(),l(y)})).catch((e=>console.error(`Error: ${e}`))).finally((()=>{o.textContent=n}))})),f.addEventListener("click",(()=>l(y))),S.addEventListener("click",(()=>l(y))),k=validationConfig,document.querySelectorAll(k.formSelector).forEach((t=>{((t,o)=>{const n=Array.from(t.querySelectorAll(o.inputSelector)),r=t.querySelector(o.submitButtonSelector);console.log(n),console.log(r),e(n,r,o),n.forEach((a=>{a.addEventListener("input",(function(){((e,t,o)=>{t.validity.valid?((e,t,o)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(o.inputErrorClass)})(e,t,o):((e,t,o,n)=>{const r=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),r.textContent=o})(e,t,t.validationMessage,o)})(t,a,o),e(n,r,o)}))}))})(t,k)}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxFQUFDUixFQUFhdEksRUFBY0YsS0FDNUJ3SSxFQUFZN0QsY0FBYyxJQUFJekUsRUFBYWdELFlBQ25EZSxZQUFjLEdBQzNCL0QsRUFBYU0sVUFBVUcsT0FBT1gsRUFBT2lKLGdCQUFnQixFQVluREQsQ0FBZVIsRUFBYXRJLEVBQWNGLEdBckJ2QmtKLEVBQUNWLEVBQWF0SSxFQUFjaUosRUFBY25KLEtBQy9ELE1BQU1vSixFQUFlWixFQUFZN0QsY0FBYyxJQUFJekUsRUFBYWdELFlBQ2hFaEQsRUFBYU0sVUFBVUMsSUFBSVQsRUFBT2lKLGlCQUNsQ0csRUFBYW5GLFlBQWNrRixDQUFZLEVBV3JDRCxDQUNFVixFQUNBdEksRUFDQUEsRUFBYW1KLGtCQUNickosRUFJSixFQTBDSStJLENBQW1CUCxFQUFhdEksRUFBY0YsR0FDOUNILEVBQWtCQyxFQUFXQyxFQUFlQyxFQUM5QyxHQUFFLEdBQ0YsRUFNQXlJLENBQWtCRCxFQUFheEksRUFBTyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9zY3JpcHRzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL0FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICAgIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICAgIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fc3VibWl0LWJ0blwiLFxuICAgIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5faW5hY3RpdmVcIixcbiAgICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvclwiLFxuICB9O1xuICBcbiAgY29uc3Qgc2hvd0lucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlLCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICB9O1xuICBcbiAgY29uc3QgaGlkZUlucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gIH07XG4gIFxuICBjb25zdCBjaGVja0lucHV0VmFsaWRpdHkgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHNob3dJbnB1dEVycm9yKFxuICAgICAgICBmb3JtRWxlbWVudCxcbiAgICAgICAgaW5wdXRFbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH07XG4gIFxuICBjb25zdCBoYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PiB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGRpc2FibGVCdXR0b24gPSAoYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IHRvZ2dsZUJ1dHRvblN0YXRlID0gKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBkaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgfVxuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWxlbWVudCwgaW5wdXRMaXN0LCBjb25maWcpID0+IHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGNvbnN0IHNldEV2ZW50TGlzdGVuZXJzID0gKGZvcm1FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gIFxuICAgIGNvbnNvbGUubG9nKGlucHV0TGlzdCk7XG4gICAgY29uc29sZS5sb2coYnV0dG9uRWxlbWVudCk7XG4gIFxuICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgXG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgICAgICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGZvcm1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKTtcbiAgICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xuICAgICAgc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH07XG4gICIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5pbXBvcnQge1xuICBlbmFibGVWYWxpZGF0aW9uLFxuICBzZXR0aW5ncyxcbiAgcmVzZXRWYWxpZGF0aW9uLFxuICBkaXNhYmxlQnV0dG9uLFxufSBmcm9tIFwiLi4vc2NyaXB0cy92YWxpZGF0aW9uLmpzXCI7XG5pbXBvcnQgeyBoYW5kbGVTdWJtaXQgfSBmcm9tIFwiLi4vdXRpbHMvaGVscGVyc1wiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vdXRpbHMvQXBpLmpzXCI7XG5cbmxldCBzZWxlY3RlZENhcmQsIHNlbGVjdGVkQ2FyZElkO1xuXG4vLyBBUElcbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcIjU4NDA2NDcxLTI3MDQtNGIzOS1iYjEwLWY3Yjc2NTZmYmMxN1wiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cblxuYXBpXG4gIC5nZXRBcHBJbmZvKClcbiAgLnRoZW4oKFtjYXJkcywgdXNlckluZm9dKSA9PiB7XG4gICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSBnZXRDYXJkRWxlbWVudChjYXJkKTtcbiAgICAgIGNhcmRFbGVtZW50cy5saXN0LmFwcGVuZChjYXJkRWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICBwcm9maWxlRWxlbWVudHMubmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSB1c2VySW5mby5uYW1lO1xuICAgIHByb2ZpbGVFbGVtZW50cy5qb2JFbGVtZW50LnRleHRDb250ZW50ID0gdXNlckluZm8uYWJvdXQ7XG4gICAgcHJvZmlsZUF2YXRhckltYWdlLnNyYyA9IHVzZXJJbmZvLmF2YXRhcjtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG5cbi8vIFByb2ZpbGUgRWxlbWVudHNcbmNvbnN0IHByb2ZpbGVFbGVtZW50cyA9IHtcbiAgZWRpdEJ1dHRvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19lZGl0LWJ1dHRvblwiKSxcbiAgbW9kYWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLW1vZGFsXCIpLFxuICBjbG9zZUJ1dHRvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9zZS1wcm9maWxlLW1vZGFsXCIpLFxuICBmb3JtOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1mb3JtXCIpLFxuICBuYW1lSW5wdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLWlucHV0LW5hbWVcIiksXG4gIGpvYklucHV0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1pbnB1dC1kZXNjcmlwdGlvblwiKSxcbiAgbmFtZUVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIiksXG4gIGpvYkVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIiksXG59O1xuXG4vLyBOZXcgUG9zdCBFbGVtZW50c1xuY29uc3QgbmV3UG9zdEVsZW1lbnRzID0ge1xuICBidXR0b246IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKSxcbiAgbW9kYWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXBvc3QtbW9kYWxcIiksXG4gIGNsb3NlQnV0dG9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLW5ldy1wb3N0LW1vZGFsXCIpLFxuICBsaW5rSW5wdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXBvc3QtaW1hZ2UtbGlua1wiKSxcbiAgbmFtZUlucHV0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wb3N0LWlucHV0LWRlc2NyaXB0aW9uXCIpLFxuICBmb3JtOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wb3N0LWZvcm1cIiksXG59O1xuXG4vLyBDYXJkIEVsZW1lbnRzXG5jb25zdCBjYXJkRWxlbWVudHMgPSB7XG4gIHRlbXBsYXRlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGVtcGxhdGVcIiksXG4gIGxpc3Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2xpc3RcIiksXG4gIG1vZGFsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByZXZpZXctbW9kYWxcIiksXG4gIG1vZGFsSW1hZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpLFxuICBtb2RhbENsb3NlQnV0dG9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jbG9zZS1idXR0b25cIiksXG4gIG1vZGFsQ2FwdGlvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2FwdGlvblwiKSxcbn07XG5cbi8vIFV0aWxpdHkgRnVuY3Rpb25zXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbE9uRXNjKTtcbiAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlTW9kYWxPbk92ZXJsYXlDbGljayk7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZU1vZGFsT25CdXR0b25DbGljayk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbE9uRXNjKTtcbiAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlTW9kYWxPbk92ZXJsYXlDbGljayk7XG4gIG1vZGFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZU1vZGFsT25CdXR0b25DbGljayk7XG59XG5cbmNvbnN0IGNsb3NlTW9kYWxPbkVzYyA9IChldmVudCkgPT4ge1xuICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY29uc3Qgb3BlbmVkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX29wZW5lZFwiKTtcbiAgICBpZiAob3BlbmVkTW9kYWwpIGNsb3NlTW9kYWwob3BlbmVkTW9kYWwpO1xuICB9XG59O1xuXG5jb25zdCBjbG9zZU1vZGFsT25PdmVybGF5Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSkge1xuICAgIGNsb3NlTW9kYWwoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gIH1cbn07XG5cbmNvbnN0IGNsb3NlTW9kYWxPbkJ1dHRvbkNsaWNrID0gKGV2ZW50KSA9PiB7XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfX2Nsb3NlLWJ1dHRvblwiKSkge1xuICAgIGNsb3NlTW9kYWwoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gIH1cbn07XG5cbi8vIEV2ZW50IExpc3RlbmVyc1xucHJvZmlsZUVsZW1lbnRzLmVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcHJvZmlsZUVsZW1lbnRzLm5hbWVJbnB1dC52YWx1ZSA9IHByb2ZpbGVFbGVtZW50cy5uYW1lRWxlbWVudC50ZXh0Q29udGVudDtcbiAgcHJvZmlsZUVsZW1lbnRzLmpvYklucHV0LnZhbHVlID0gcHJvZmlsZUVsZW1lbnRzLmpvYkVsZW1lbnQudGV4dENvbnRlbnQ7XG4gIG9wZW5Nb2RhbChwcm9maWxlRWxlbWVudHMubW9kYWwpO1xufSk7XG5cbnByb2ZpbGVFbGVtZW50cy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjbG9zZU1vZGFsKHByb2ZpbGVFbGVtZW50cy5tb2RhbCk7XG59KTtcblxubmV3UG9zdEVsZW1lbnRzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBvcGVuTW9kYWwobmV3UG9zdEVsZW1lbnRzLm1vZGFsKTtcbn0pO1xuXG5uZXdQb3N0RWxlbWVudHMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY2xvc2VNb2RhbChuZXdQb3N0RWxlbWVudHMubW9kYWwpO1xufSk7XG5cbnByb2ZpbGVFbGVtZW50cy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlUHJvZmlsZUZvcm1TdWJtaXQpO1xubmV3UG9zdEVsZW1lbnRzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVOZXdQb3N0Rm9ybVN1Ym1pdCk7XG5cbmNhcmRFbGVtZW50cy5tb2RhbENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNsb3NlTW9kYWwoY2FyZEVsZW1lbnRzLm1vZGFsKTtcbn0pO1xuXG4vLyBGb3JtIFN1Ym1pc3Npb24gSGFuZGxlcnNcbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVGb3JtU3VibWl0KGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3Qgc3VibWl0QnV0dG9uID0gcHJvZmlsZUVsZW1lbnRzLmZvcm0ucXVlcnlTZWxlY3RvcihcbiAgICBcIi5tb2RhbF9fc3VibWl0LWJ1dHRvblwiXG4gICk7XG4gIGNvbnN0IG9yaWdpbmFsVGV4dCA9IHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudDtcbiAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZpbmcuLi5cIjtcblxuICBhcGlcbiAgICAuZWRpdFVzZXJJbmZvKHtcbiAgICAgIG5hbWU6IHByb2ZpbGVFbGVtZW50cy5uYW1lSW5wdXQudmFsdWUsXG4gICAgICBhYm91dDogcHJvZmlsZUVsZW1lbnRzLmpvYklucHV0LnZhbHVlLFxuICAgIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVFbGVtZW50cy5uYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICAgIHByb2ZpbGVFbGVtZW50cy5qb2JFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5hYm91dDtcbiAgICAgIGNsb3NlTW9kYWwocHJvZmlsZUVsZW1lbnRzLm1vZGFsKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlcnJ9YCkpXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gb3JpZ2luYWxUZXh0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVOZXdQb3N0Rm9ybVN1Ym1pdChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IG5ld1Bvc3RFbGVtZW50cy5mb3JtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIubW9kYWxfX3N1Ym1pdC1idXR0b25cIlxuICApO1xuICBjb25zdCBvcmlnaW5hbFRleHQgPSBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2aW5nLi4uXCI7XG5cbiAgYXBpXG4gICAgLmFkZE5ld0NhcmQoe1xuICAgICAgbmFtZTogbmV3UG9zdEVsZW1lbnRzLm5hbWVJbnB1dC52YWx1ZSxcbiAgICAgIGxpbms6IG5ld1Bvc3RFbGVtZW50cy5saW5rSW5wdXQudmFsdWUsXG4gICAgfSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSBnZXRDYXJkRWxlbWVudChkYXRhKTtcbiAgICAgIGNhcmRFbGVtZW50cy5saXN0LnByZXBlbmQoY2FyZEVsZW1lbnQpO1xuICAgICAgbmV3UG9zdEVsZW1lbnRzLmZvcm0ucmVzZXQoKTtcbiAgICAgIGNsb3NlTW9kYWwobmV3UG9zdEVsZW1lbnRzLm1vZGFsKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlcnJ9YCkpXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gb3JpZ2luYWxUZXh0O1xuICAgIH0pO1xufVxuXG4vLyBDYXJkIENyZWF0aW9uIEZ1bmN0aW9uXG5mdW5jdGlvbiBnZXRDYXJkRWxlbWVudChkYXRhKSB7XG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY2FyZEVsZW1lbnRzLnRlbXBsYXRlLmNvbnRlbnRcbiAgICAucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpXG4gICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgY2FyZFRpdGxlID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgY29uc3QgY2FyZEltYWdlID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgY29uc3QgY2FyZExpa2VCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xuICBjb25zdCBjYXJkRGVsZXRlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuXG4gIGNvbnN0IGNhcmRJRCA9IGRhdGEuX2lkO1xuICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIGNhcmRJbWFnZS5zcmMgPSBkYXRhLmxpbms7XG4gIGNhcmRJbWFnZS5hbHQgPSBkYXRhLm5hbWU7XG5cbiAgaWYgKGRhdGEuaXNMaWtlZCkge1xuICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ1dHRvbl9saWtlZFwiKTtcbiAgfVxuXG4gIGNhcmRMaWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgaXNMaWtlZCA9IGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgIFwiY2FyZF9fbGlrZS1idXR0b25fbGlrZWRcIlxuICAgICk7XG5cbiAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgYXBpXG4gICAgICAgIC5kZWxldGVMaWtlKGNhcmRJRClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlLWJ1dHRvbl9saWtlZFwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2Vycn1gKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaVxuICAgICAgICAuYWRkTGlrZShjYXJkSUQpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fbGlrZS1idXR0b25fbGlrZWRcIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlcnJ9YCkpO1xuICAgIH1cbiAgfSk7XG5cbiAgY2FyZERlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGN1cnJlbnRDYXJkRWxlbWVudCA9IGNhcmRFbGVtZW50O1xuICAgIGN1cnJlbnRDYXJkSUQgPSBjYXJkSUQ7XG4gICAgb3Blbk1vZGFsKGRlbGV0ZU1vZGFsKTtcbiAgfSk7XG5cbiAgY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2FyZEVsZW1lbnRzLm1vZGFsQ2FwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICBjYXJkRWxlbWVudHMubW9kYWxJbWFnZS5zcmMgPSBkYXRhLmxpbms7XG4gICAgY2FyZEVsZW1lbnRzLm1vZGFsSW1hZ2UuYWx0ID0gZGF0YS5uYW1lO1xuICAgIG9wZW5Nb2RhbChjYXJkRWxlbWVudHMubW9kYWwpO1xuICB9KTtcblxuICByZXR1cm4gY2FyZEVsZW1lbnQ7XG59XG5cbi8vIEVkaXQgQXZhdGFyIE1vZGFsXG5jb25zdCBhdmF0YXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hdmF0YXItbW9kYWxcIik7XG5jb25zdCBhdmF0YXJGb3JtID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbmNvbnN0IGF2YXRhclByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhci1idXR0b25cIik7XG5jb25zdCBhdmF0YXJTdWJtaXRCdXR0b24gPSBhdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnV0dG9uXCIpO1xuY29uc3QgYXZhdGFyTW9kYWxDbG9zZUJ1dHRvbiA9IGF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLm1vZGFsX19jbG9zZS1idXR0b25cIlxuKTtcbmNvbnN0IGF2YXRhcklucHV0ID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNlZGl0LWF2YXRhci1pbnB1dC1saW5rXCIpO1xuY29uc3QgcHJvZmlsZUF2YXRhckltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG5cbmF2YXRhclByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgb3Blbk1vZGFsKGF2YXRhck1vZGFsKTtcbn0pO1xuXG5hdmF0YXJNb2RhbENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNsb3NlTW9kYWwoYXZhdGFyTW9kYWwpO1xufSk7XG5cbmF2YXRhckZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBzdWJtaXRCdXR0b24gPSBhdmF0YXJGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idXR0b25cIik7XG4gIGNvbnN0IG9yaWdpbmFsVGV4dCA9IHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudDtcbiAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZpbmcuLi5cIjtcblxuICBjb25zdCBhdmF0YXJVcmwgPSBhdmF0YXJJbnB1dC52YWx1ZTtcblxuICBhcGlcbiAgICAuZWRpdEF2YXRhcihhdmF0YXJVcmwpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVBdmF0YXJJbWFnZS5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgICAgIGNsb3NlTW9kYWwoYXZhdGFyTW9kYWwpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2Vycn1gKSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBvcmlnaW5hbFRleHQ7XG4gICAgfSk7XG59KTtcblxuLy8gRGVsZXRlIE1vZGFsXG5jb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuY29uc3QgZGVsZXRlTW9kYWxGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtbW9kYWwtZm9ybVwiKTtcbmNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhbmNlbC1idXR0b25cIik7XG5jb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtZGVsZXRlLW1vZGFsXCIpO1xuXG5sZXQgY3VycmVudENhcmRFbGVtZW50O1xubGV0IGN1cnJlbnRDYXJkSUQ7XG5cbmRlbGV0ZU1vZGFsRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRlbGV0ZU1vZGFsRm9ybS5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnV0dG9uXCIpO1xuICBjb25zdCBvcmlnaW5hbFRleHQgPSBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XG4gIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRpbmcuLi5cIjtcblxuICBhcGlcbiAgICAuZGVsZXRlQ2FyZChjdXJyZW50Q2FyZElEKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGN1cnJlbnRDYXJkRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2Vycn1gKSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBvcmlnaW5hbFRleHQ7XG4gICAgfSk7XG59KTtcblxuY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKSk7XG5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VNb2RhbChkZWxldGVNb2RhbCkpO1xuXG4vLyBFbmFibGUgRm9ybSBWYWxpZGF0aW9uXG5lbmFibGVWYWxpZGF0aW9uKHZhbGlkYXRpb25Db25maWcpOyIsImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBjaGVja1Jlc3BvbnNlKHJlcykge1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuXG4gIHJlcXVlc3QodXJsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucykudGhlbih0aGlzLmNoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBlZGl0VXNlckluZm8oeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWJvdXQsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRBdmF0YXJJbmZvKGF2YXRhcikge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENhcmQoeyBuYW1lLCBsaW5rIH0pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxpbmssXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUxpa2VTdGF0dXMoaWQsIGlzTGlrZWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7aWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiBpc0xpa2VkID8gXCJERUxFVEVcIiA6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcbiJdLCJuYW1lcyI6WyJ0b2dnbGVCdXR0b25TdGF0ZSIsImlucHV0TGlzdCIsImJ1dHRvbkVsZW1lbnQiLCJjb25maWciLCJzb21lIiwiaW5wdXRFbGVtZW50IiwidmFsaWRpdHkiLCJ2YWxpZCIsImhhc0ludmFsaWRJbnB1dCIsImRpc2FibGVCdXR0b24iLCJkaXNhYmxlZCIsImNsYXNzTGlzdCIsImFkZCIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJyZW1vdmUiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIl9yZWYiLCJiYXNlVXJsIiwiaGVhZGVycyIsInRoaXMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsImNoZWNrUmVzcG9uc2UiLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJzdGF0dXMiLCJyZXF1ZXN0IiwidXJsIiwib3B0aW9ucyIsImZldGNoIiwidGhlbiIsImVkaXRVc2VySW5mbyIsIl9yZWYyIiwibmFtZSIsImFib3V0IiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0QXZhdGFySW5mbyIsImF2YXRhciIsImFkZENhcmQiLCJfcmVmMyIsImxpbmsiLCJkZWxldGVDYXJkIiwiaWQiLCJjaGFuZ2VMaWtlU3RhdHVzIiwiaXNMaWtlZCIsImF1dGhvcml6YXRpb24iLCJjYXJkcyIsInVzZXJJbmZvIiwiZm9yRWFjaCIsImNhcmQiLCJjYXJkRWxlbWVudCIsImdldENhcmRFbGVtZW50IiwiY2FyZEVsZW1lbnRzIiwibGlzdCIsImFwcGVuZCIsInByb2ZpbGVFbGVtZW50cyIsIm5hbWVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJqb2JFbGVtZW50IiwicHJvZmlsZUF2YXRhckltYWdlIiwic3JjIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJlZGl0QnV0dG9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibW9kYWwiLCJjbG9zZUJ1dHRvbiIsImZvcm0iLCJuYW1lSW5wdXQiLCJqb2JJbnB1dCIsIm5ld1Bvc3RFbGVtZW50cyIsImJ1dHRvbiIsImxpbmtJbnB1dCIsInRlbXBsYXRlIiwibW9kYWxJbWFnZSIsIm1vZGFsQ2xvc2VCdXR0b24iLCJtb2RhbENhcHRpb24iLCJvcGVuTW9kYWwiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbE9uRXNjIiwiY2xvc2VNb2RhbE9uT3ZlcmxheUNsaWNrIiwiY2xvc2VNb2RhbE9uQnV0dG9uQ2xpY2siLCJjbG9zZU1vZGFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwia2V5Iiwib3BlbmVkTW9kYWwiLCJ0YXJnZXQiLCJjb250YWlucyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhIiwiY29udGVudCIsImNsb25lTm9kZSIsImNhcmRUaXRsZSIsImNhcmRJbWFnZSIsImNhcmRMaWtlQnV0dG9uIiwiY2FyZERlbGV0ZUJ1dHRvbiIsImNhcmRJRCIsIl9pZCIsImFsdCIsImRlbGV0ZUxpa2UiLCJhZGRMaWtlIiwiY3VycmVudENhcmRFbGVtZW50IiwiY3VycmVudENhcmRJRCIsImRlbGV0ZU1vZGFsIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEJ1dHRvbiIsIm9yaWdpbmFsVGV4dCIsImZpbmFsbHkiLCJhZGROZXdDYXJkIiwicHJlcGVuZCIsInJlc2V0IiwiYXZhdGFyTW9kYWwiLCJhdmF0YXJGb3JtIiwiYXZhdGFyUHJvZmlsZUJ1dHRvbiIsImF2YXRhck1vZGFsQ2xvc2VCdXR0b24iLCJhdmF0YXJJbnB1dCIsImF2YXRhclVybCIsImVkaXRBdmF0YXIiLCJkZWxldGVNb2RhbEZvcm0iLCJjYW5jZWxCdXR0b24iLCJ2YWxpZGF0aW9uQ29uZmlnIiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm1TZWxlY3RvciIsImZvcm1FbGVtZW50Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJBcnJheSIsImZyb20iLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJsb2ciLCJjaGVja0lucHV0VmFsaWRpdHkiLCJoaWRlSW5wdXRFcnJvciIsImlucHV0RXJyb3JDbGFzcyIsInNob3dJbnB1dEVycm9yIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9