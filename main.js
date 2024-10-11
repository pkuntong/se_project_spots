!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}let i,l;const s=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"b3ddf623-2d0f-4e5a-a7b9-d7f30d2fad6e","Content-Type":"application/json"}});function d(e){e.target===e.currentTarget&&m(e.currentTarget)}function c(e){"Escape"===e.key&&m(document.querySelector(".modal_opened"))}function u(e){e.classList.add("modal_opened"),document.addEventListener("keydown",c),e.addEventListener("mousedown",d)}function m(e){e&&(e.classList.remove("modal_opened"),document.removeEventListener("keydown",c),e.removeEventListener("mousedown",d))}function _(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){if(!cardTemplate)return console.error("Error: cardTemplate is not defined or not found."),null;const t=cardTemplate.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return r.textContent=e.name,n.src=e.link,n.alt=e.name,e.isLiked&&o.classList.add("card__like-btn_liked"),o.addEventListener("click",(t=>function(e,t){const r=e.target,n=r.classList.contains("card__like-btn_liked");s.changeLikeStatus(t,n).then((()=>{r.classList.toggle("card__like-btn_liked",!n)})).catch(console.error)}(t,e._id))),a.addEventListener("click",(()=>function(e,t){i=e,l=t,u(deleteModal)}(t,e._id))),n.addEventListener("click",(()=>function(e){previewModalImageElement.src=e.link,previewModalImageElement.alt=e.name,previewModalCaptionElement.textContent=e.name,u(previewModal)}(e))),t}(e);r&&cardsList[t](r)}function h(t){a((function(){return s.editAvatarInfo(avatarInput.value).then((t=>{profileImage.src=t.avatar,r(avatarSubmitButton,e),m(avatarModal)}))}),t)}function p(e){a((function(){return s.editUserInfo({name:nameInput.value,about:descriptionInput.value}).then((e=>{profileName.textContent=e.name,profileDescription.textContent=e.about,m(editProfileModal)}))}),e)}function v(t){a((function(){return s.addCard({name:titleInput.value,link:imageInput.value}).then((t=>{_(t),r(cardSubmitButton,e),m(cardModal)}))}),t)}function f(e){a((function(){return s.deleteCard(l).then((()=>{i.remove(),m(deleteModal)}))}),e,"Deleting...")}document.addEventListener("DOMContentLoaded",(()=>{const r=document.querySelectorAll(".modal__close-btn"),o=document.querySelector(".profile__edit-btn"),a=document.querySelector(".profile__avatar"),i=document.querySelector(".profile__name"),l=document.querySelector(".profile__description"),d=document.querySelector(".profile__add-btn"),c=document.querySelector(".profile__avatar-btn"),y=document.querySelector("#edit-modal"),S=y.querySelector("#edit-profile-form"),b=y.querySelector("#profile-name-input"),q=y.querySelector("#profile-description-input"),E=document.querySelector("#card-modal"),g=E.querySelector("#card-form"),L=(E.querySelector(".modal__submit-btn"),E.querySelector("#card-link-input"),E.querySelector("#card-caption-input"),document.querySelector("#avatar-modal")),C=L.querySelector("#edit-avatar-form"),k=(L.querySelector("#profile-avatar-input"),L.querySelector(".modal__submit-btn"),document.querySelector("#delete-modal")),I=k.querySelector(".modal__form"),U=k.querySelector(".modal__submit-btn_type_cancel"),T=document.querySelector("#card-template")?.content,x=document.querySelector(".cards__list");var M;(console.log("Card template:",T),T)?(document.querySelector("#preview-modal"),document.querySelector(".modal__image"),document.querySelector(".modal__caption"),s.getAppInfo().then((e=>{let[t,r]=e;0===t.length?(console.log("No cards available"),x.innerHTML="<p>No cards to display.</p>"):(t.reverse(),t.forEach((e=>{_(e)}))),a.src=r.avatar,i.textContent=r.name,l.textContent=r.about})).catch(console.error),r.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>m(t)))})),c&&c.addEventListener("click",(()=>u(L))),C&&C.addEventListener("submit",h),o&&o.addEventListener("click",(()=>{var r,n;b.value=i.textContent,q.value=l.textContent,r=S,n=e,[b,q].forEach((e=>{t(r,e,n)})),u(y)})),S&&S.addEventListener("submit",p),d&&d.addEventListener("click",(()=>u(E))),g&&g.addEventListener("submit",v),I&&I.addEventListener("submit",f),U&&U.addEventListener("click",(()=>m(k))),M=e,document.querySelectorAll(M.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((i=>{i.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,i,r),n(o,a,r)}))}))})(e,M)}))):console.error("Error: Card template not found.")}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBYXdGLGlCQUFpQixTQUFTLFdBbkRoQnlFLEVBQUNsSyxFQUFhQyxFQUFjQyxLQUNoREQsRUFBYWMsU0FBU0MsTUFRekJqQixFQUFlQyxFQUFhQyxFQUFjQyxHQXJCdkJpSyxFQUFDbkssRUFBYUMsRUFBY21LLEVBQWNsSyxLQUMvRCxNQUFNbUssRUFBZXJLLEVBQVlHLGNBQWMsSUFBSUYsRUFBYUcsWUFDaEVILEVBQWFLLFVBQVVLLElBQUlULEVBQU9MLGlCQUNsQ3dLLEVBQWFoSyxZQUFjK0osQ0FBWSxFQVdyQ0QsQ0FDRW5LLEVBQ0FDLEVBQ0FBLEVBQWFxSyxrQkFDYnBLLEVBSUosRUEwQ0lnSyxDQUFtQmxLLEVBQWFDLEVBQWNDLEdBQzlDVSxFQUFrQkMsRUFBV0osRUFBZVAsRUFDOUMsR0FBRSxHQUNGLEVBTUE2SixDQUFrQi9KLEVBQWFFLEVBQU8sS0V1SHhDbUMsUUFBUUMsTUFBTSxrQ0F5RVUsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvc2NyaXB0cy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvQXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXG4gICAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXG4gICAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zdWJtaXQtYnRuXCIsXG4gICAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc3VibWl0LWJ0bl9pbmFjdGl2ZVwiLFxuICAgIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxuICAgIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yXCIsXG4gIH07XG4gIFxuICBjb25zdCBzaG93SW5wdXRFcnJvciA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gIH07XG4gIFxuICBjb25zdCBoaWRlSW5wdXRFcnJvciA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IGNoZWNrSW5wdXRWYWxpZGl0eSA9IChmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgc2hvd0lucHV0RXJyb3IoXG4gICAgICAgIGZvcm1FbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQsXG4gICAgICAgIGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZSxcbiAgICAgICAgY29uZmlnXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGNvbnN0IGhhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+IHtcbiAgICByZXR1cm4gaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQ7XG4gICAgfSk7XG4gIH07XG4gIFxuICBleHBvcnQgY29uc3QgZGlzYWJsZUJ1dHRvbiA9IChidXR0b25FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9O1xuICBcbiAgY29uc3QgdG9nZ2xlQnV0dG9uU3RhdGUgPSAoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBpZiAoaGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGRpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICB9XG4gIH07XG4gIFxuICBleHBvcnQgY29uc3QgcmVzZXRWYWxpZGF0aW9uID0gKGZvcm1FbGVtZW50LCBpbnB1dExpc3QsIGNvbmZpZykgPT4ge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0LCBjb25maWcpO1xuICAgIH0pO1xuICB9O1xuICBcbiAgY29uc3Qgc2V0RXZlbnRMaXN0ZW5lcnMgPSAoZm9ybUVsZW1lbnQsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKVxuICAgICk7XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcbiAgXG4gICAgY29uc29sZS5sb2coaW5wdXRMaXN0KTtcbiAgICBjb25zb2xlLmxvZyhidXR0b25FbGVtZW50KTtcbiAgXG4gICAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpO1xuICBcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hlY2tJbnB1dFZhbGlkaXR5KGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGVuYWJsZVZhbGlkYXRpb24gPSAoY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZm9ybUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5mb3JtU2VsZWN0b3IpO1xuICAgIGZvcm1MaXN0LmZvckVhY2goKGZvcm1FbGVtZW50KSA9PiB7XG4gICAgICBzZXRFdmVudExpc3RlbmVycyhmb3JtRWxlbWVudCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmcoXG4gICAgaXNMb2FkaW5nLFxuICAgIGJ0bixcbiAgICBkZWZhdWx0VGV4dCA9IFwiU2F2ZVwiLFxuICAgIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIlxuICApIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBidG4udGV4dENvbnRlbnQgPSBsb2FkaW5nVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gZGVmYXVsdFRleHQ7XG4gICAgfVxuICB9XG4gIFxuICBleHBvcnQgZnVuY3Rpb24gaGFuZGxlU3VibWl0KHJlcXVlc3QsIGV2dCwgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiKSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIFxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGV2dC5zdWJtaXR0ZXI7XG4gICAgY29uc3QgaW5pdGlhbFRleHQgPSBzdWJtaXRCdG4udGV4dENvbnRlbnQ7XG4gIFxuICAgIHJlbmRlckxvYWRpbmcodHJ1ZSwgc3VibWl0QnRuLCBpbml0aWFsVGV4dCwgbG9hZGluZ1RleHQpO1xuICBcbiAgICByZXF1ZXN0KClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgZXZ0LnRhcmdldC5yZXNldCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICByZW5kZXJMb2FkaW5nKGZhbHNlLCBzdWJtaXRCdG4sIGluaXRpYWxUZXh0KTtcbiAgICAgIH0pO1xuICB9XG4gICIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5pbXBvcnQge1xuICBlbmFibGVWYWxpZGF0aW9uLFxuICBzZXR0aW5ncyxcbiAgcmVzZXRWYWxpZGF0aW9uLFxuICBkaXNhYmxlQnV0dG9uLFxufSBmcm9tIFwiLi4vc2NyaXB0cy92YWxpZGF0aW9uLmpzXCI7XG5pbXBvcnQgeyBoYW5kbGVTdWJtaXQgfSBmcm9tIFwiLi4vdXRpbHMvaGVscGVyc1wiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vdXRpbHMvQXBpLmpzXCI7XG5cbmxldCBzZWxlY3RlZENhcmQsIHNlbGVjdGVkQ2FyZElkO1xuXG4vLyBBUEkgc2V0dXBcbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIzZGRmNjIzLTJkMGYtNGU1YS1hN2I5LWQ3ZjMwZDJmYWQ2ZVwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbi8vIEZ1bmN0aW9ucyB0byBoYW5kbGUgbW9kYWxzXG5mdW5jdGlvbiBjbG9zZU1vZGFsT3ZlcmxheShldnQpIHtcbiAgaWYgKGV2dC50YXJnZXQgPT09IGV2dC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgY2xvc2VNb2RhbChldnQuY3VycmVudFRhcmdldCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VNb2RhbEVzYyhldnQpIHtcbiAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICBjb25zdCBtb2RhbE9wZW5lZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfb3BlbmVkXCIpO1xuICAgIGNsb3NlTW9kYWwobW9kYWxPcGVuZWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbCkge1xuICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU1vZGFsRXNjKTtcbiAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBjbG9zZU1vZGFsT3ZlcmxheSk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcbiAgaWYgKG1vZGFsKSB7XG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU1vZGFsRXNjKTtcbiAgICBtb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGNsb3NlTW9kYWxPdmVybGF5KTtcbiAgfVxufVxuXG4vLyBGdW5jdGlvbiB0byByZW5kZXIgYSBjYXJkXG5mdW5jdGlvbiByZW5kZXJDYXJkKGl0ZW0sIG1ldGhvZCA9IFwicHJlcGVuZFwiKSB7XG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gZ2V0Q2FyZEVsZW1lbnQoaXRlbSk7XG4gIGlmIChjYXJkRWxlbWVudCkge1xuICAgIGNhcmRzTGlzdFttZXRob2RdKGNhcmRFbGVtZW50KTsgLy8gVXNlIHByZXBlbmQgdG8gYWRkIG5ldyBjYXJkcyBhdCB0aGUgdG9wXG4gIH1cbn1cblxuLy8gQ3JlYXRlIGEgY2FyZCBlbGVtZW50IGZyb20gdGhlIHRlbXBsYXRlXG5mdW5jdGlvbiBnZXRDYXJkRWxlbWVudChkYXRhKSB7XG4gIC8vIENoZWNrIGlmIGNhcmRUZW1wbGF0ZSBleGlzdHNcbiAgaWYgKCFjYXJkVGVtcGxhdGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IGNhcmRUZW1wbGF0ZSBpcyBub3QgZGVmaW5lZCBvciBub3QgZm91bmQuXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjYXJkVGVtcGxhdGUucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgY2FyZE5hbWVFbGVtZW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgY29uc3QgY2FyZEltYWdlRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ0blwiKTtcbiAgY29uc3QgY2FyZERlbGV0ZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ0blwiKTtcblxuICBjYXJkTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIGNhcmRJbWFnZUVsZW1lbnQuc3JjID0gZGF0YS5saW5rO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFsdCA9IGRhdGEubmFtZTtcblxuICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuICB9XG5cbiAgY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldnQpID0+IGhhbmRsZUxpa2UoZXZ0LCBkYXRhLl9pZCkpO1xuICBjYXJkRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBkYXRhLl9pZCkpO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVJbWFnZUNsaWNrKGRhdGEpKTtcblxuICByZXR1cm4gY2FyZEVsZW1lbnQ7XG59XG5cbi8vIEV2ZW50IGhhbmRsZXJzXG5mdW5jdGlvbiBoYW5kbGVBdmF0YXJTdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZWRpdEF2YXRhckluZm8oYXZhdGFySW5wdXQudmFsdWUpLnRoZW4oKGF2YXRhckRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVJbWFnZS5zcmMgPSBhdmF0YXJEYXRhLmF2YXRhcjtcbiAgICAgIGRpc2FibGVCdXR0b24oYXZhdGFyU3VibWl0QnV0dG9uLCBzZXR0aW5ncyk7XG4gICAgICBjbG9zZU1vZGFsKGF2YXRhck1vZGFsKTtcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUxpa2UoZXZ0LCBpZCkge1xuICBjb25zdCBjYXJkTGlrZUJ1dHRvbiA9IGV2dC50YXJnZXQ7XG4gIGNvbnN0IGlzTGlrZWQgPSBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcblxuICBhcGkuY2hhbmdlTGlrZVN0YXR1cyhpZCwgaXNMaWtlZCkudGhlbigoKSA9PiB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIsICFpc0xpa2VkKTtcbiAgfSkuY2F0Y2goY29uc29sZS5lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZUNhcmQoY2FyZEVsZW1lbnQsIGNhcmRJZCkge1xuICBzZWxlY3RlZENhcmQgPSBjYXJkRWxlbWVudDtcbiAgc2VsZWN0ZWRDYXJkSWQgPSBjYXJkSWQ7XG4gIG9wZW5Nb2RhbChkZWxldGVNb2RhbCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUltYWdlQ2xpY2soZGF0YSkge1xuICBwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQuc3JjID0gZGF0YS5saW5rO1xuICBwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQuYWx0ID0gZGF0YS5uYW1lO1xuICBwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgb3Blbk1vZGFsKHByZXZpZXdNb2RhbCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KGV2dCkge1xuICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICByZXR1cm4gYXBpLmVkaXRVc2VySW5mbyh7XG4gICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICBhYm91dDogZGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcbiAgICB9KS50aGVuKCh1c2VyRGF0YSkgPT4ge1xuICAgICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSB1c2VyRGF0YS5uYW1lO1xuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdXNlckRhdGEuYWJvdXQ7XG4gICAgICBjbG9zZU1vZGFsKGVkaXRQcm9maWxlTW9kYWwpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQWRkQ2FyZFN1Ym1pdChldnQpIHtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5hZGRDYXJkKHtcbiAgICAgIG5hbWU6IHRpdGxlSW5wdXQudmFsdWUsXG4gICAgICBsaW5rOiBpbWFnZUlucHV0LnZhbHVlLFxuICAgIH0pLnRoZW4oKGNhcmREYXRhKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKGNhcmREYXRhKTtcbiAgICAgIGRpc2FibGVCdXR0b24oY2FyZFN1Ym1pdEJ1dHRvbiwgc2V0dGluZ3MpO1xuICAgICAgY2xvc2VNb2RhbChjYXJkTW9kYWwpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZFN1Ym1pdChldnQpIHtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5kZWxldGVDYXJkKHNlbGVjdGVkQ2FyZElkKS50aGVuKCgpID0+IHtcbiAgICAgIHNlbGVjdGVkQ2FyZC5yZW1vdmUoKTtcbiAgICAgIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0LCBcIkRlbGV0aW5nLi4uXCIpO1xufVxuXG4vLyBET00gUmVhZHlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xuXG4gIC8vIFByb2ZpbGUgZWxlbWVudHNcbiAgY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnRuXCIpO1xuICBjb25zdCBwcm9maWxlSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcbiAgY29uc3QgcHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG4gIGNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IGNhcmRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbiAgY29uc3QgYXZhdGFyTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhci1idG5cIik7XG5cbiAgLy8gQ2FyZCBmb3JtIGVsZW1lbnRzXG4gIGNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtbW9kYWxcIik7XG4gIGNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIiNlZGl0LXByb2ZpbGUtZm9ybVwiKTtcbiAgY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZS1pbnB1dFwiKTtcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCIpO1xuICBjb25zdCBjYXJkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbW9kYWxcIik7XG4gIGNvbnN0IGNhcmRNb2RhbEZvcm0gPSBjYXJkTW9kYWwucXVlcnlTZWxlY3RvcihcIiNjYXJkLWZvcm1cIik7XG4gIGNvbnN0IGNhcmRTdWJtaXRCdXR0b24gPSBjYXJkTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0blwiKTtcbiAgY29uc3QgaW1hZ2VJbnB1dCA9IGNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtbGluay1pbnB1dFwiKTtcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtY2FwdGlvbi1pbnB1dFwiKTtcblxuICAvLyBBdmF0YXIgZm9ybSBlbGVtZW50c1xuICBjb25zdCBhdmF0YXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLW1vZGFsXCIpO1xuICBjb25zdCBhdmF0YXJNb2RhbEZvcm0gPSBhdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLWZvcm1cIik7XG4gIGNvbnN0IGF2YXRhcklucHV0ID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWF2YXRhci1pbnB1dFwiKTtcbiAgY29uc3QgYXZhdGFyU3VibWl0QnV0dG9uID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0blwiKTtcblxuICAvLyBEZWxldGUgZm9ybSBlbGVtZW50c1xuICBjb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuICBjb25zdCBkZWxldGVGb3JtID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcbiAgY29uc3QgZGVsZXRlQ2FuY2VsQnV0dG9uID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0bl90eXBlX2NhbmNlbFwiKTtcblxuICAvLyBDYXJkLXJlbGF0ZWQgZWxlbWVudHNcbiAgY29uc3QgY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRlbXBsYXRlXCIpPy5jb250ZW50OyAvLyBUZW1wbGF0ZSBmb3IgY2FyZHNcbiAgY29uc3QgY2FyZHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc19fbGlzdFwiKTtcblxuICAvLyBMb2cgdGhlIGNhcmQgdGVtcGxhdGUgdG8gc2VlIGlmIGl0J3MgYmVpbmcgc2VsZWN0ZWQgcHJvcGVybHlcbiAgY29uc29sZS5sb2coJ0NhcmQgdGVtcGxhdGU6JywgY2FyZFRlbXBsYXRlKTtcblxuICAvLyBDaGVjayBpZiBjYXJkVGVtcGxhdGUgaXMgYmVpbmcgc2VsZWN0ZWQgcHJvcGVybHlcbiAgaWYgKCFjYXJkVGVtcGxhdGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IENhcmQgdGVtcGxhdGUgbm90IGZvdW5kLlwiKTtcbiAgICByZXR1cm47ICAvLyBTdG9wIHRoZSBleGVjdXRpb24gaWYgY2FyZFRlbXBsYXRlIGlzIG51bGwgb3IgdW5kZWZpbmVkXG4gIH1cblxuICAvLyBQcmV2aWV3IGltYWdlIHBvcHVwIGVsZW1lbnRzXG4gIGNvbnN0IHByZXZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJldmlldy1tb2RhbFwiKTtcbiAgY29uc3QgcHJldmlld01vZGFsSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG4gIGNvbnN0IHByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2FwdGlvblwiKTtcblxuICAvLyBGZXRjaCB1c2VyIGluZm8gYW5kIGNhcmRzIHdoZW4gdGhlIERPTSBpcyBsb2FkZWRcbiAgYXBpXG4gICAgLmdldEFwcEluZm8oKVxuICAgIC50aGVuKChbY2FyZHMsIHVzZXJzXSkgPT4ge1xuICAgICAgaWYgKGNhcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGNhcmRzIGF2YWlsYWJsZVwiKTtcbiAgICAgICAgY2FyZHNMaXN0LmlubmVySFRNTCA9IFwiPHA+Tm8gY2FyZHMgdG8gZGlzcGxheS48L3A+XCI7ICAvLyBEaXNwbGF5IG1lc3NhZ2UgaWYgbm8gY2FyZHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcmRzLnJldmVyc2UoKTtcbiAgICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICAgIHJlbmRlckNhcmQoY2FyZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBwcm9maWxlSW1hZ2Uuc3JjID0gdXNlcnMuYXZhdGFyO1xuICAgICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSB1c2Vycy5uYW1lO1xuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdXNlcnMuYWJvdXQ7XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG5cbiAgLy8gQ2xvc2UgYnV0dG9uIGV2ZW50IGxpc3RlbmVyc1xuICBjbG9zZUJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBidXR0b24uY2xvc2VzdChcIi5tb2RhbFwiKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsb3NlTW9kYWwobW9kYWwpKTtcbiAgfSk7XG5cbiAgaWYgKGF2YXRhck1vZGFsQnV0dG9uKSB7XG4gICAgYXZhdGFyTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IG9wZW5Nb2RhbChhdmF0YXJNb2RhbCkpO1xuICB9XG5cbiAgaWYgKGF2YXRhck1vZGFsRm9ybSkge1xuICAgIGF2YXRhck1vZGFsRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUF2YXRhclN1Ym1pdCk7XG4gIH1cblxuICBpZiAoZWRpdFByb2ZpbGVCdXR0b24pIHtcbiAgICBlZGl0UHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgbmFtZUlucHV0LnZhbHVlID0gcHJvZmlsZU5hbWUudGV4dENvbnRlbnQ7XG4gICAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50O1xuICAgICAgcmVzZXRWYWxpZGF0aW9uKGVkaXRQcm9maWxlRm9ybSwgW25hbWVJbnB1dCwgZGVzY3JpcHRpb25JbnB1dF0sIHNldHRpbmdzKTtcbiAgICAgIG9wZW5Nb2RhbChlZGl0UHJvZmlsZU1vZGFsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChlZGl0UHJvZmlsZUZvcm0pIHtcbiAgICBlZGl0UHJvZmlsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVFZGl0UHJvZmlsZVN1Ym1pdCk7XG4gIH1cblxuICBpZiAoY2FyZE1vZGFsQnV0dG9uKSB7XG4gICAgY2FyZE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBvcGVuTW9kYWwoY2FyZE1vZGFsKSk7XG4gIH1cblxuICBpZiAoY2FyZE1vZGFsRm9ybSkge1xuICAgIGNhcmRNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBZGRDYXJkU3VibWl0KTtcbiAgfVxuXG4gIGlmIChkZWxldGVGb3JtKSB7XG4gICAgZGVsZXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQpO1xuICB9XG5cbiAgaWYgKGRlbGV0ZUNhbmNlbEJ1dHRvbikge1xuICAgIGRlbGV0ZUNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VNb2RhbChkZWxldGVNb2RhbCkpO1xuICB9XG5cbiAgLy8gRW5hYmxlIGZvcm0gdmFsaWRhdGlvblxuICBlbmFibGVWYWxpZGF0aW9uKHNldHRpbmdzKTtcbn0pO1xuIiwiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIGdldEFwcEluZm8oKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFVzZXJJbmZvKCldKTtcbiAgfVxuXG4gIGNoZWNrUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3IgJHtyZXMuc3RhdHVzfWApO1xuICB9XG5cbiAgcmVxdWVzdCh1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKS50aGVuKHRoaXMuY2hlY2tSZXNwb25zZSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRVc2VySW5mbyh7IG5hbWUsIGFib3V0IH0pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhYm91dCxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZWRpdEF2YXRhckluZm8oYXZhdGFyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZS9hdmF0YXJgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGF2YXRhcixcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ2FyZCh7IG5hbWUsIGxpbmsgfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbGluayxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlTGlrZVN0YXR1cyhpZCwgaXNMaWtlZCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IGlzTGlrZWQgPyBcIkRFTEVURVwiIDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuIl0sIm5hbWVzIjpbInNldHRpbmdzIiwiZm9ybVNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJoaWRlSW5wdXRFcnJvciIsImZvcm1FbGVtZW50IiwiaW5wdXRFbGVtZW50IiwiY29uZmlnIiwicXVlcnlTZWxlY3RvciIsImlkIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJkaXNhYmxlQnV0dG9uIiwiYnV0dG9uRWxlbWVudCIsImRpc2FibGVkIiwiYWRkIiwidG9nZ2xlQnV0dG9uU3RhdGUiLCJpbnB1dExpc3QiLCJzb21lIiwidmFsaWRpdHkiLCJ2YWxpZCIsImhhc0ludmFsaWRJbnB1dCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidG4iLCJkZWZhdWx0VGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImxvYWRpbmdUZXh0IiwiaGFuZGxlU3VibWl0IiwicmVxdWVzdCIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic3VibWl0QnRuIiwic3VibWl0dGVyIiwiaW5pdGlhbFRleHQiLCJ0aGVuIiwidGFyZ2V0IiwicmVzZXQiLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImZpbmFsbHkiLCJzZWxlY3RlZENhcmQiLCJzZWxlY3RlZENhcmRJZCIsImFwaSIsImNvbnN0cnVjdG9yIiwiX3JlZiIsImJhc2VVcmwiLCJoZWFkZXJzIiwidGhpcyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJnZXRBcHBJbmZvIiwiUHJvbWlzZSIsImFsbCIsImdldEluaXRpYWxDYXJkcyIsImdldFVzZXJJbmZvIiwiY2hlY2tSZXNwb25zZSIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsInVybCIsIm9wdGlvbnMiLCJmZXRjaCIsImVkaXRVc2VySW5mbyIsIl9yZWYyIiwibmFtZSIsImFib3V0IiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0QXZhdGFySW5mbyIsImF2YXRhciIsImFkZENhcmQiLCJfcmVmMyIsImxpbmsiLCJkZWxldGVDYXJkIiwiY2hhbmdlTGlrZVN0YXR1cyIsImlzTGlrZWQiLCJhdXRob3JpemF0aW9uIiwiY2xvc2VNb2RhbE92ZXJsYXkiLCJjdXJyZW50VGFyZ2V0IiwiY2xvc2VNb2RhbCIsImNsb3NlTW9kYWxFc2MiLCJrZXkiLCJkb2N1bWVudCIsIm9wZW5Nb2RhbCIsIm1vZGFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXJDYXJkIiwiaXRlbSIsImNhcmRFbGVtZW50IiwiZGF0YSIsImNhcmRUZW1wbGF0ZSIsImNsb25lTm9kZSIsImNhcmROYW1lRWxlbWVudCIsImNhcmRJbWFnZUVsZW1lbnQiLCJjYXJkTGlrZUJ1dHRvbiIsImNhcmREZWxldGVCdXR0b24iLCJzcmMiLCJhbHQiLCJjb250YWlucyIsInRvZ2dsZSIsImhhbmRsZUxpa2UiLCJfaWQiLCJjYXJkSWQiLCJkZWxldGVNb2RhbCIsImhhbmRsZURlbGV0ZUNhcmQiLCJwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQiLCJwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudCIsInByZXZpZXdNb2RhbCIsImhhbmRsZUltYWdlQ2xpY2siLCJnZXRDYXJkRWxlbWVudCIsImNhcmRzTGlzdCIsImhhbmRsZUF2YXRhclN1Ym1pdCIsImF2YXRhcklucHV0IiwidmFsdWUiLCJhdmF0YXJEYXRhIiwicHJvZmlsZUltYWdlIiwiYXZhdGFyU3VibWl0QnV0dG9uIiwiYXZhdGFyTW9kYWwiLCJoYW5kbGVFZGl0UHJvZmlsZVN1Ym1pdCIsIm5hbWVJbnB1dCIsImRlc2NyaXB0aW9uSW5wdXQiLCJ1c2VyRGF0YSIsInByb2ZpbGVOYW1lIiwicHJvZmlsZURlc2NyaXB0aW9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImhhbmRsZUFkZENhcmRTdWJtaXQiLCJ0aXRsZUlucHV0IiwiaW1hZ2VJbnB1dCIsImNhcmREYXRhIiwiY2FyZFN1Ym1pdEJ1dHRvbiIsImNhcmRNb2RhbCIsImhhbmRsZURlbGV0ZUNhcmRTdWJtaXQiLCJjbG9zZUJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJjYXJkTW9kYWxCdXR0b24iLCJhdmF0YXJNb2RhbEJ1dHRvbiIsImVkaXRQcm9maWxlRm9ybSIsImNhcmRNb2RhbEZvcm0iLCJhdmF0YXJNb2RhbEZvcm0iLCJkZWxldGVGb3JtIiwiZGVsZXRlQ2FuY2VsQnV0dG9uIiwiY29udGVudCIsImxvZyIsImNhcmRzIiwidXNlcnMiLCJpbm5lckhUTUwiLCJyZXZlcnNlIiwiZm9yRWFjaCIsImNhcmQiLCJidXR0b24iLCJjbG9zZXN0IiwicmVzZXRWYWxpZGF0aW9uIiwiaW5wdXQiLCJzZXRFdmVudExpc3RlbmVycyIsIkFycmF5IiwiZnJvbSIsImNoZWNrSW5wdXRWYWxpZGl0eSIsInNob3dJbnB1dEVycm9yIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9