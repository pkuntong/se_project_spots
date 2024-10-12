!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}let s,i;const l=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"bb096d8b-aaae-4f98-a43d-8639c071b248","Content-Type":"application/json"}}),c=document.querySelector("#card-template").content.querySelector(".card"),d=document.querySelector(".cards__list");function u(e){e.target===e.currentTarget&&_(e.currentTarget)}function m(e){"Escape"===e.key&&_(document.querySelector(".modal_opened"))}function h(e){e.classList.add("modal_opened"),document.addEventListener("keydown",m),e.addEventListener("mousedown",u)}function _(e){e&&(e.classList.remove("modal_opened"),document.removeEventListener("keydown",m),e.removeEventListener("mousedown",u))}function v(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){const t=c.content.cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return r.textContent=e.name,n.src=e.link,n.alt=e.name,e.isLiked&&o.classList.add("card__like-btn_liked"),o.addEventListener("click",(t=>function(e,t){const r=e.target,n=r.classList.contains("card__like-btn_liked");l.changeLikeStatus(t,n).then((()=>{r.classList.toggle("card__like-btn_liked",!n)})).catch(console.error)}(t,e._id))),a.addEventListener("click",(()=>function(e,t){s=e,i=t,h($)}(t,e._id))),n.addEventListener("click",(()=>function(e){previewModalImageElement.src=e.link,previewModalImageElement.alt=e.name,previewModalCaptionElement.textContent=e.name,h(previewModal)}(e))),t}(e);d[t](r)}const f=document.querySelector(".profile__avatar"),p=document.querySelector(".profile__name"),b=document.querySelector(".profile__description");l.getAppInfo().then((e=>{let[t,r]=e;0===t.length?d.innerHTML="<p>No cards to display.</p>":(t.reverse(),t.forEach((e=>{v(e)}))),f.src=r.avatar,p.textContent=r.name,b.textContent=r.about})).catch(console.error),document.querySelectorAll(".modal__close-btn").forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>_(t)))}));const y=document.querySelector(".profile__avatar-btn"),S=document.querySelector("#avatar-modal"),q=S.querySelector("#edit-avatar-form");y.addEventListener("click",(()=>h(S))),q.addEventListener("submit",(function(t){t.preventDefault(),a((function(){return l.editAvatarInfo(avatarInput.value).then((t=>{f.src=t.avatar,r(avatarSubmitButton,e),_(S)}))}),t)}));const E=document.querySelector(".profile__edit-btn"),g=document.querySelector("#edit-modal"),L=g.querySelector("#edit-profile-form"),k=g.querySelector("#profile-name-input"),C=g.querySelector("#profile-description-input");E.addEventListener("click",(()=>{var r,n;k.value=p.textContent,C.value=b.textContent,r=L,n=e,[k,C].forEach((e=>{t(r,e,n)})),h(g)})),L.addEventListener("submit",(function(e){e.preventDefault(),a((function(){return l.editUserInfo({name:k.value,about:C.value}).then((e=>{p.textContent=e.name,b.textContent=e.about,_(g)}))}),e)}));const I=document.querySelector(".profile__add-btn"),U=document.querySelector("#card-modal"),x=U.querySelector("#card-form");I.addEventListener("click",(()=>h(U))),x.addEventListener("submit",(function(t){t.preventDefault(),a((function(){return l.addCard({name:titleInput.value,link:imageInput.value}).then((t=>{v(t),r(cardSubmitButton,e),_(U)}))}),t)}));const $=document.querySelector("#delete-modal"),A=$.querySelector(".modal__form"),T=$.querySelector(".modal__submit-btn_type_cancel");var w;A.addEventListener("submit",(function(e){e.preventDefault(),a((function(){return l.deleteCard(i).then((()=>{s.remove(),_($)}))}),e,"Deleting...")})),T.addEventListener("click",(()=>_($))),w=e,document.querySelectorAll(w.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((s=>{s.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,s,r),n(o,a,r)}))}))})(e,w)}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoieUJBQU8sTUFBTUEsRUFBVyxDQUNwQkMsYUFBYyxlQUNkQyxjQUFlLGdCQUNmQyxxQkFBc0IscUJBQ3RCQyxvQkFBcUIsNkJBQ3JCQyxnQkFBaUIsMEJBQ2pCQyxXQUFZLGdCQVNSQyxFQUFpQkEsQ0FBQ0MsRUFBYUMsRUFBY0MsS0FDNUJGLEVBQVlHLGNBQWMsSUFBSUYsRUFBYUcsWUFDbkRDLFlBQWMsR0FDM0JKLEVBQWFLLFVBQVVDLE9BQU9MLEVBQU9MLGdCQUFnQixFQXNCMUNXLEVBQWdCQSxDQUFDQyxFQUFlUCxLQUMzQ08sRUFBY0MsVUFBVyxFQUN6QkQsRUFBY0gsVUFBVUssSUFBSVQsRUFBT04sb0JBQW9CLEVBR25EZ0IsRUFBb0JBLENBQUNDLEVBQVdKLEVBQWVQLEtBWDVCVyxJQUNoQkEsRUFBVUMsTUFBTWIsSUFDYkEsRUFBYWMsU0FBU0MsUUFVNUJDLENBQWdCSixHQUNsQkwsRUFBY0MsRUFBZVAsSUFFN0JPLEVBQWNDLFVBQVcsRUFDekJELEVBQWNILFVBQVVDLE9BQU9MLEVBQU9OLHFCQUN4QyxFQ25ERyxTQUFTc0IsRUFDWkMsRUFDQUMsR0FHQSxJQUZBQyxFQUFXQyxVQUFBQyxPQUFBLFFBQUFDLElBQUFGLFVBQUEsR0FBQUEsVUFBQSxHQUFHLE9BQ2RHLEVBQVdILFVBQUFDLE9BQUEsUUFBQUMsSUFBQUYsVUFBQSxHQUFBQSxVQUFBLEdBQUcsWUFHWkYsRUFBSWYsWUFERmMsRUFDZ0JNLEVBRUFKLENBRXRCLENBRU8sU0FBU0ssRUFBYUMsRUFBU0MsR0FBZ0MsSUFBM0JILEVBQVdILFVBQUFDLE9BQUEsUUFBQUMsSUFBQUYsVUFBQSxHQUFBQSxVQUFBLEdBQUcsWUFDdkRNLEVBQUlDLGlCQUVKLE1BQU1DLEVBQVlGLEVBQUlHLFVBQ2hCQyxFQUFjRixFQUFVekIsWUFFOUJhLEdBQWMsRUFBTVksRUFBV0UsRUFBYVAsR0FFNUNFLElBQ0dNLE1BQUssS0FDSkwsRUFBSU0sT0FBT0MsT0FBTyxJQUVuQkMsTUFBTUMsUUFBUUMsT0FDZEMsU0FBUSxLQUNQckIsR0FBYyxFQUFPWSxFQUFXRSxFQUFZLEdBRWxELENDbkJGLElBQUlRLEVBQWNDLEVBR2xCLE1BQU1DLEVBQU0sSUNiWixNQUNFQyxXQUFBQSxDQUFXQyxHQUF1QixJQUF0QixRQUFFQyxFQUFPLFFBQUVDLEdBQVNGLEVBQzlCRyxLQUFLQyxTQUFXSCxFQUNoQkUsS0FBS0UsU0FBV0gsQ0FDbEIsQ0FFQUksVUFBQUEsR0FDRSxPQUFPQyxRQUFRQyxJQUFJLENBQUNMLEtBQUtNLGtCQUFtQk4sS0FBS08sZUFDbkQsQ0FFQUMsYUFBQUEsQ0FBY0MsR0FDWixPQUFJQSxFQUFJQyxHQUNDRCxFQUFJRSxPQUVOUCxRQUFRUSxPQUFPLFNBQVNILEVBQUlJLFNBQ3JDLENBRUFqQyxPQUFBQSxDQUFRa0MsRUFBS0MsR0FDWCxPQUFPQyxNQUFNRixFQUFLQyxHQUFTN0IsS0FBS2MsS0FBS1EsY0FDdkMsQ0FFQUYsZUFBQUEsR0FDRSxPQUFPTixLQUFLcEIsUUFBUSxHQUFHb0IsS0FBS0MsaUJBQWtCLENBQzVDRixRQUFTQyxLQUFLRSxVQUVsQixDQUVBSyxXQUFBQSxHQUNFLE9BQU9QLEtBQUtwQixRQUFRLEdBQUdvQixLQUFLQyxvQkFBcUIsQ0FDL0NGLFFBQVNDLEtBQUtFLFVBRWxCLENBRUFlLFlBQUFBLENBQVlDLEdBQWtCLElBQWpCLEtBQUVDLEVBQUksTUFBRUMsR0FBT0YsRUFDMUIsT0FBT2xCLEtBQUtwQixRQUFRLEdBQUdvQixLQUFLQyxvQkFBcUIsQ0FDL0NvQixPQUFRLFFBQ1J0QixRQUFTQyxLQUFLRSxTQUNkb0IsS0FBTUMsS0FBS0MsVUFBVSxDQUNuQkwsT0FDQUMsV0FHTixDQUVBSyxjQUFBQSxDQUFlQyxHQUNiLE9BQU8xQixLQUFLcEIsUUFBUSxHQUFHb0IsS0FBS0MsMkJBQTRCLENBQ3REb0IsT0FBUSxRQUNSdEIsUUFBU0MsS0FBS0UsU0FDZG9CLEtBQU1DLEtBQUtDLFVBQVUsQ0FDbkJFLFlBR04sQ0FFQUMsT0FBQUEsQ0FBT0MsR0FBaUIsSUFBaEIsS0FBRVQsRUFBSSxLQUFFVSxHQUFNRCxFQUNwQixPQUFPNUIsS0FBS3BCLFFBQVEsR0FBR29CLEtBQUtDLGlCQUFrQixDQUM1Q29CLE9BQVEsT0FDUnRCLFFBQVNDLEtBQUtFLFNBQ2RvQixLQUFNQyxLQUFLQyxVQUFVLENBQ25CTCxPQUNBVSxVQUdOLENBRUFDLFVBQUFBLENBQVd6RSxHQUNULE9BQU8yQyxLQUFLcEIsUUFBUSxHQUFHb0IsS0FBS0Msa0JBQWtCNUMsSUFBTSxDQUNsRGdFLE9BQVEsU0FDUnRCLFFBQVNDLEtBQUtFLFVBRWxCLENBRUE2QixnQkFBQUEsQ0FBaUIxRSxFQUFJMkUsR0FDbkIsT0FBT2hDLEtBQUtwQixRQUFRLEdBQUdvQixLQUFLQyxrQkFBa0I1QyxVQUFZLENBQ3hEZ0UsT0FBUVcsRUFBVSxTQUFXLE1BQzdCakMsUUFBU0MsS0FBS0UsVUFFbEIsR0RoRWtCLENBQ2xCSixRQUFTLGtEQUNUQyxRQUFTLENBQ1BrQyxjQUFlLHVDQUNmLGVBQWdCLHNCQUtkQyxFQUFlQyxTQUFTL0UsY0FBYyxrQkFBa0JnRixRQUFRaEYsY0FBYyxTQUM5RWlGLEVBQVlGLFNBQVMvRSxjQUFjLGdCQUd6QyxTQUFTa0YsRUFBa0J6RCxHQUNyQkEsRUFBSU0sU0FBV04sRUFBSTBELGVBQ3JCQyxFQUFXM0QsRUFBSTBELGNBRW5CLENBRUEsU0FBU0UsRUFBYzVELEdBQ0wsV0FBWkEsRUFBSTZELEtBRU5GLEVBRG9CTCxTQUFTL0UsY0FBYyxpQkFHL0MsQ0FFQSxTQUFTdUYsRUFBVUMsR0FDakJBLEVBQU1yRixVQUFVSyxJQUFJLGdCQUNwQnVFLFNBQVNVLGlCQUFpQixVQUFXSixHQUNyQ0csRUFBTUMsaUJBQWlCLFlBQWFQLEVBQ3RDLENBRUEsU0FBU0UsRUFBV0ksR0FDZEEsSUFDRkEsRUFBTXJGLFVBQVVDLE9BQU8sZ0JBQ3ZCMkUsU0FBU1csb0JBQW9CLFVBQVdMLEdBQ3hDRyxFQUFNRSxvQkFBb0IsWUFBYVIsR0FFM0MsQ0EyQkEsU0FBU1MsRUFBV0MsR0FBMEIsSUFBcEIzQixFQUFNOUMsVUFBQUMsT0FBQSxRQUFBQyxJQUFBRixVQUFBLEdBQUFBLFVBQUEsR0FBRyxVQUNqQyxNQUFNMEUsRUExQlIsU0FBd0JDLEdBQ3RCLE1BQU1ELEVBQWNmLEVBQWFFLFFBQVFlLFdBQVUsR0FHN0NDLEVBQWtCSCxFQUFZN0YsY0FBYyxnQkFDNUNpRyxFQUFtQkosRUFBWTdGLGNBQWMsZ0JBQzdDa0csRUFBaUJMLEVBQVk3RixjQUFjLG1CQUMzQ21HLEVBQW1CTixFQUFZN0YsY0FBYyxxQkFjbkQsT0FaQWdHLEVBQWdCOUYsWUFBYzRGLEVBQUsvQixLQUNuQ2tDLEVBQWlCRyxJQUFNTixFQUFLckIsS0FDNUJ3QixFQUFpQkksSUFBTVAsRUFBSy9CLEtBRXhCK0IsRUFBS2xCLFNBQ1BzQixFQUFlL0YsVUFBVUssSUFBSSx3QkFHL0IwRixFQUFlVCxpQkFBaUIsU0FBVWhFLEdBMEI1QyxTQUFvQkEsRUFBS3hCLEdBQ3ZCLE1BQU1pRyxFQUFpQnpFLEVBQUlNLE9BQ3JCNkMsRUFBVXNCLEVBQWUvRixVQUFVbUcsU0FBUyx3QkFFbEQvRCxFQUFJb0MsaUJBQWlCMUUsRUFBSTJFLEdBQVM5QyxNQUFLLEtBQ3JDb0UsRUFBZS9GLFVBQVVvRyxPQUFPLHdCQUF5QjNCLEVBQVEsSUFDaEUzQyxNQUFNQyxRQUFRQyxNQUNuQixDQWpDb0RxRSxDQUFXL0UsRUFBS3FFLEVBQUtXLE9BQ3ZFTixFQUFpQlYsaUJBQWlCLFNBQVMsSUFrQzdDLFNBQTBCSSxFQUFhYSxHQUNyQ3JFLEVBQWV3RCxFQUNmdkQsRUFBaUJvRSxFQUNqQm5CLEVBQVVvQixFQUNaLENBdENtREMsQ0FBaUJmLEVBQWFDLEVBQUtXLE9BQ3BGUixFQUFpQlIsaUJBQWlCLFNBQVMsSUF1QzdDLFNBQTBCSyxHQUN4QmUseUJBQXlCVCxJQUFNTixFQUFLckIsS0FDcENvQyx5QkFBeUJSLElBQU1QLEVBQUsvQixLQUNwQytDLDJCQUEyQjVHLFlBQWM0RixFQUFLL0IsS0FDOUN3QixFQUFVd0IsYUFDWixDQTVDbURDLENBQWlCbEIsS0FFM0RELENBQ1QsQ0FJc0JvQixDQUFlckIsR0FDbkNYLEVBQVVoQixHQUFRNEIsRUFDcEIsQ0ErRUEsTUFBTXFCLEVBQWVuQyxTQUFTL0UsY0FBYyxvQkFDdENtSCxFQUFjcEMsU0FBUy9FLGNBQWMsa0JBQ3JDb0gsRUFBcUJyQyxTQUFTL0UsY0FBYyx5QkFHbER1QyxFQUFJUSxhQUFhakIsTUFBS1csSUFBb0IsSUFBbEI0RSxFQUFPQyxHQUFNN0UsRUFDZCxJQUFqQjRFLEVBQU1qRyxPQUNSNkQsRUFBVXNDLFVBQVksK0JBRXRCRixFQUFNRyxVQUNOSCxFQUFNSSxTQUFTQyxJQUNiL0IsRUFBVytCLEVBQUssS0FLcEJSLEVBQWFkLElBQU1rQixFQUFNaEQsT0FDekI2QyxFQUFZakgsWUFBY29ILEVBQU12RCxLQUNoQ3FELEVBQW1CbEgsWUFBY29ILEVBQU10RCxLQUFLLElBQzNDL0IsTUFBTUMsUUFBUUMsT0FHSTRDLFNBQVM0QyxpQkFBaUIscUJBQ2xDRixTQUFTRyxJQUNwQixNQUFNcEMsRUFBUW9DLEVBQU9DLFFBQVEsVUFDN0JELEVBQU9uQyxpQkFBaUIsU0FBUyxJQUFNTCxFQUFXSSxJQUFPLElBSTNELE1BQU1zQyxFQUFvQi9DLFNBQVMvRSxjQUFjLHdCQUMzQytILEVBQWNoRCxTQUFTL0UsY0FBYyxpQkFDckNnSSxFQUFrQkQsRUFBWS9ILGNBQWMscUJBQ2xEOEgsRUFBa0JyQyxpQkFBaUIsU0FBUyxJQUFNRixFQUFVd0MsS0FDNURDLEVBQWdCdkMsaUJBQWlCLFVBN0dqQyxTQUE0QmhFLEdBQzFCQSxFQUFJQyxpQkFRSkgsR0FQQSxXQUNFLE9BQU9nQixFQUFJOEIsZUFBZTRELFlBQVlDLE9BQU9wRyxNQUFNcUcsSUFDakRqQixFQUFhZCxJQUFNK0IsRUFBVzdELE9BQzlCakUsRUFBYytILG1CQUFvQi9JLEdBQ2xDK0YsRUFBVzJDLEVBQVksR0FFM0IsR0FDMEJ0RyxFQUM1QixJQXFHQSxNQUFNNEcsRUFBb0J0RCxTQUFTL0UsY0FBYyxzQkFDM0NzSSxFQUFtQnZELFNBQVMvRSxjQUFjLGVBQzFDdUksRUFBa0JELEVBQWlCdEksY0FBYyxzQkFDakR3SSxFQUFZRixFQUFpQnRJLGNBQWMsdUJBQzNDeUksRUFBbUJILEVBQWlCdEksY0FBYyw4QkFDeERxSSxFQUFrQjVDLGlCQUFpQixTQUFTLEtGbEpYaUQsSUFBQzdJLEVBQXdCRSxFRW1KeER5SSxFQUFVTixNQUFRZixFQUFZakgsWUFDOUJ1SSxFQUFpQlAsTUFBUWQsRUFBbUJsSCxZRnBKWkwsRUVxSmhCMEksRUZySndDeEksRUVxSlFWLEVBQS9CLENBQUNtSixFQUFXQyxHRnBKakNoQixTQUFTa0IsSUFDakIvSSxFQUFlQyxFQUFhOEksRUFBTzVJLEVBQU8sSUVvSjlDd0YsRUFBVStDLEVBQWlCLElBRTdCQyxFQUFnQjlDLGlCQUFpQixVQXhGakMsU0FBaUNoRSxHQUMvQkEsRUFBSUMsaUJBV0pILEdBVkEsV0FDRSxPQUFPZ0IsRUFBSXNCLGFBQWEsQ0FDdEJFLEtBQU15RSxFQUFVTixNQUNoQmxFLE1BQU95RSxFQUFpQlAsUUFDdkJwRyxNQUFNOEcsSUFDUHpCLEVBQVlqSCxZQUFjMEksRUFBUzdFLEtBQ25DcUQsRUFBbUJsSCxZQUFjMEksRUFBUzVFLE1BQzFDb0IsRUFBV2tELEVBQWlCLEdBRWhDLEdBQzBCN0csRUFDNUIsSUE2RUEsTUFBTW9ILEVBQWtCOUQsU0FBUy9FLGNBQWMscUJBQ3pDOEksRUFBWS9ELFNBQVMvRSxjQUFjLGVBQ25DK0ksRUFBZ0JELEVBQVU5SSxjQUFjLGNBQzlDNkksRUFBZ0JwRCxpQkFBaUIsU0FBUyxJQUFNRixFQUFVdUQsS0FDMURDLEVBQWN0RCxpQkFBaUIsVUEvRS9CLFNBQTZCaEUsR0FDM0JBLEVBQUlDLGlCQVdKSCxHQVZBLFdBQ0UsT0FBT2dCLEVBQUlnQyxRQUFRLENBQ2pCUixLQUFNaUYsV0FBV2QsTUFDakJ6RCxLQUFNd0UsV0FBV2YsUUFDaEJwRyxNQUFNb0gsSUFDUHZELEVBQVd1RCxHQUNYN0ksRUFBYzhJLGlCQUFrQjlKLEdBQ2hDK0YsRUFBVzBELEVBQVUsR0FFekIsR0FDMEJySCxFQUM1QixJQW9FQSxNQUFNa0YsRUFBYzVCLFNBQVMvRSxjQUFjLGlCQUNyQ29KLEVBQWF6QyxFQUFZM0csY0FBYyxnQkFDdkNxSixFQUFxQjFDLEVBQVkzRyxjQUFjLGtDRnpJbEJELE1FMEluQ3FKLEVBQVczRCxpQkFBaUIsVUFyRTVCLFNBQWdDaEUsR0FDOUJBLEVBQUlDLGlCQU9KSCxHQU5BLFdBQ0UsT0FBT2dCLEVBQUltQyxXQUFXcEMsR0FBZ0JSLE1BQUssS0FDekNPLEVBQWFqQyxTQUNiZ0YsRUFBV3VCLEVBQVksR0FFM0IsR0FDMEJsRixFQUFLLGNBQ2pDLElBNkRBNEgsRUFBbUI1RCxpQkFBaUIsU0FBUyxJQUFNTCxFQUFXdUIsS0YzSTNCNUcsRUU4SWxCVixFRjdJSTBGLFNBQVM0QyxpQkFBaUI1SCxFQUFPVCxjQUN6Q21JLFNBQVM1SCxJQXJCTXlKLEVBQUN6SixFQUFhRSxLQUN0QyxNQUFNVyxFQUFZNkksTUFBTUMsS0FDdEIzSixFQUFZOEgsaUJBQWlCNUgsRUFBT1IsZ0JBRWhDZSxFQUFnQlQsRUFBWUcsY0FBY0QsRUFBT1Asc0JBRXZEMEMsUUFBUXVILElBQUkvSSxHQUNad0IsUUFBUXVILElBQUluSixHQUVaRyxFQUFrQkMsRUFBV0osRUFBZVAsR0FFNUNXLEVBQVUrRyxTQUFTM0gsSUFDakJBLEVBQWEyRixpQkFBaUIsU0FBUyxXQW5EaEJpRSxFQUFDN0osRUFBYUMsRUFBY0MsS0FDaERELEVBQWFjLFNBQVNDLE1BUXpCakIsRUFBZUMsRUFBYUMsRUFBY0MsR0FyQnZCNEosRUFBQzlKLEVBQWFDLEVBQWM4SixFQUFjN0osS0FDL0QsTUFBTThKLEVBQWVoSyxFQUFZRyxjQUFjLElBQUlGLEVBQWFHLFlBQ2hFSCxFQUFhSyxVQUFVSyxJQUFJVCxFQUFPTCxpQkFDbENtSyxFQUFhM0osWUFBYzBKLENBQVksRUFXckNELENBQ0U5SixFQUNBQyxFQUNBQSxFQUFhZ0ssa0JBQ2IvSixFQUlKLEVBMENJMkosQ0FBbUI3SixFQUFhQyxFQUFjQyxHQUM5Q1UsRUFBa0JDLEVBQVdKLEVBQWVQLEVBQzlDLEdBQUUsR0FDRixFQU1BdUosQ0FBa0J6SixFQUFhRSxFQUFPLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL0FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICAgIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxuICAgIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fc3VibWl0LWJ0blwiLFxuICAgIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5faW5hY3RpdmVcIixcbiAgICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcbiAgICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvclwiLFxuICB9O1xuICBcbiAgY29uc3Qgc2hvd0lucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlLCBjb25maWcpID0+IHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICB9O1xuICBcbiAgY29uc3QgaGlkZUlucHV0RXJyb3IgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gIH07XG4gIFxuICBjb25zdCBjaGVja0lucHV0VmFsaWRpdHkgPSAoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHNob3dJbnB1dEVycm9yKFxuICAgICAgICBmb3JtRWxlbWVudCxcbiAgICAgICAgaW5wdXRFbGVtZW50LFxuICAgICAgICBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgICB9XG4gIH07XG4gIFxuICBjb25zdCBoYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PiB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IGRpc2FibGVCdXR0b24gPSAoYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfTtcbiAgXG4gIGNvbnN0IHRvZ2dsZUJ1dHRvblN0YXRlID0gKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBkaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgfVxuICB9O1xuICBcbiAgZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWxlbWVudCwgaW5wdXRMaXN0LCBjb25maWcpID0+IHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGNvbnN0IHNldEV2ZW50TGlzdGVuZXJzID0gKGZvcm1FbGVtZW50LCBjb25maWcpID0+IHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gIFxuICAgIGNvbnNvbGUubG9nKGlucHV0TGlzdCk7XG4gICAgY29uc29sZS5sb2coYnV0dG9uRWxlbWVudCk7XG4gIFxuICAgIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcbiAgXG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgICAgICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGZvcm1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKTtcbiAgICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xuICAgICAgc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH07XG4gICIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJMb2FkaW5nKFxuICAgIGlzTG9hZGluZyxcbiAgICBidG4sXG4gICAgZGVmYXVsdFRleHQgPSBcIlNhdmVcIixcbiAgICBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCJcbiAgKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gbG9hZGluZ1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGRlZmF1bHRUZXh0O1xuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChyZXF1ZXN0LCBldnQsIGxvYWRpbmdUZXh0ID0gXCJTYXZpbmcuLi5cIikge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gc3VibWl0QnRuLnRleHRDb250ZW50O1xuICBcbiAgICByZW5kZXJMb2FkaW5nKHRydWUsIHN1Ym1pdEJ0biwgaW5pdGlhbFRleHQsIGxvYWRpbmdUZXh0KTtcbiAgXG4gICAgcmVxdWVzdCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGV2dC50YXJnZXQucmVzZXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcmVuZGVyTG9hZGluZyhmYWxzZSwgc3VibWl0QnRuLCBpbml0aWFsVGV4dCk7XG4gICAgICB9KTtcbiAgfVxuICAiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuaW1wb3J0IHtcbiAgZW5hYmxlVmFsaWRhdGlvbixcbiAgc2V0dGluZ3MsXG4gIHJlc2V0VmFsaWRhdGlvbixcbiAgZGlzYWJsZUJ1dHRvbixcbn0gZnJvbSBcIi4uL3NjcmlwdHMvdmFsaWRhdGlvbi5qc1wiO1xuaW1wb3J0IHsgaGFuZGxlU3VibWl0IH0gZnJvbSBcIi4uL3V0aWxzL2hlbHBlcnNcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL3V0aWxzL0FwaS5qc1wiO1xuXG5sZXQgc2VsZWN0ZWRDYXJkLCBzZWxlY3RlZENhcmRJZDtcblxuLy8gQVBJIHNldHVwXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC1hcGkuZW4udHJpcGxldGVuLXNlcnZpY2VzLmNvbS92MVwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiYjA5NmQ4Yi1hYWFlLTRmOTgtYTQzZC04NjM5YzA3MWIyNDhcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG4vLyBBY2Nlc3MgdGhlIGNhcmQgdGVtcGxhdGUgZ2xvYmFsbHkgc28gaXQncyBhdmFpbGFibGUgYWNyb3NzIHRoZSBjb2RlXG5jb25zdCBjYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGVtcGxhdGVcIikuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIik7XG5jb25zdCBjYXJkc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saXN0XCIpO1xuXG4vLyBGdW5jdGlvbnMgdG8gaGFuZGxlIG1vZGFsc1xuZnVuY3Rpb24gY2xvc2VNb2RhbE92ZXJsYXkoZXZ0KSB7XG4gIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xuICAgIGNsb3NlTW9kYWwoZXZ0LmN1cnJlbnRUYXJnZXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWxFc2MoZXZ0KSB7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY29uc3QgbW9kYWxPcGVuZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX29wZW5lZFwiKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsT3BlbmVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgY2xvc2VNb2RhbE92ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIGlmIChtb2RhbCkge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gICAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBjbG9zZU1vZGFsT3ZlcmxheSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2FyZEVsZW1lbnQoZGF0YSkge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGNhcmRUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcblxuICAvLyBTZXQgY2FyZCBjb250ZW50IChuYW1lIGFuZCBpbWFnZSlcbiAgY29uc3QgY2FyZE5hbWVFbGVtZW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgY29uc3QgY2FyZEltYWdlRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ0blwiKTtcbiAgY29uc3QgY2FyZERlbGV0ZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ0blwiKTtcblxuICBjYXJkTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIGNhcmRJbWFnZUVsZW1lbnQuc3JjID0gZGF0YS5saW5rO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFsdCA9IGRhdGEubmFtZTtcblxuICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuICB9XG5cbiAgY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldnQpID0+IGhhbmRsZUxpa2UoZXZ0LCBkYXRhLl9pZCkpO1xuICBjYXJkRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBkYXRhLl9pZCkpO1xuICBjYXJkSW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVJbWFnZUNsaWNrKGRhdGEpKTtcblxuICByZXR1cm4gY2FyZEVsZW1lbnQ7XG59XG5cbi8vIEZ1bmN0aW9uIHRvIHJlbmRlciBhIGNhcmRcbmZ1bmN0aW9uIHJlbmRlckNhcmQoaXRlbSwgbWV0aG9kID0gXCJwcmVwZW5kXCIpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBnZXRDYXJkRWxlbWVudChpdGVtKTtcbiAgY2FyZHNMaXN0W21ldGhvZF0oY2FyZEVsZW1lbnQpOyAvLyBBcHBlbmQgdGhlIGNhcmQgdG8gdGhlIGNhcmRzIGxpc3Rcbn1cblxuLy8gRXZlbnQgaGFuZGxlcnNcbmZ1bmN0aW9uIGhhbmRsZUF2YXRhclN1Ym1pdChldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZWRpdEF2YXRhckluZm8oYXZhdGFySW5wdXQudmFsdWUpLnRoZW4oKGF2YXRhckRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVJbWFnZS5zcmMgPSBhdmF0YXJEYXRhLmF2YXRhcjtcbiAgICAgIGRpc2FibGVCdXR0b24oYXZhdGFyU3VibWl0QnV0dG9uLCBzZXR0aW5ncyk7XG4gICAgICBjbG9zZU1vZGFsKGF2YXRhck1vZGFsKTtcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUxpa2UoZXZ0LCBpZCkge1xuICBjb25zdCBjYXJkTGlrZUJ1dHRvbiA9IGV2dC50YXJnZXQ7XG4gIGNvbnN0IGlzTGlrZWQgPSBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcblxuICBhcGkuY2hhbmdlTGlrZVN0YXR1cyhpZCwgaXNMaWtlZCkudGhlbigoKSA9PiB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIsICFpc0xpa2VkKTtcbiAgfSkuY2F0Y2goY29uc29sZS5lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZUNhcmQoY2FyZEVsZW1lbnQsIGNhcmRJZCkge1xuICBzZWxlY3RlZENhcmQgPSBjYXJkRWxlbWVudDtcbiAgc2VsZWN0ZWRDYXJkSWQgPSBjYXJkSWQ7XG4gIG9wZW5Nb2RhbChkZWxldGVNb2RhbCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUltYWdlQ2xpY2soZGF0YSkge1xuICBwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQuc3JjID0gZGF0YS5saW5rO1xuICBwcmV2aWV3TW9kYWxJbWFnZUVsZW1lbnQuYWx0ID0gZGF0YS5uYW1lO1xuICBwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgb3Blbk1vZGFsKHByZXZpZXdNb2RhbCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5lZGl0VXNlckluZm8oe1xuICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgYWJvdXQ6IGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG4gICAgfSkudGhlbigodXNlckRhdGEpID0+IHtcbiAgICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlckRhdGEubmFtZTtcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHVzZXJEYXRhLmFib3V0O1xuICAgICAgY2xvc2VNb2RhbChlZGl0UHJvZmlsZU1vZGFsKTtcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUFkZENhcmRTdWJtaXQoZXZ0KSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBmdW5jdGlvbiBtYWtlUmVxdWVzdCgpIHtcbiAgICByZXR1cm4gYXBpLmFkZENhcmQoe1xuICAgICAgbmFtZTogdGl0bGVJbnB1dC52YWx1ZSxcbiAgICAgIGxpbms6IGltYWdlSW5wdXQudmFsdWUsXG4gICAgfSkudGhlbigoY2FyZERhdGEpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoY2FyZERhdGEpO1xuICAgICAgZGlzYWJsZUJ1dHRvbihjYXJkU3VibWl0QnV0dG9uLCBzZXR0aW5ncyk7XG4gICAgICBjbG9zZU1vZGFsKGNhcmRNb2RhbCk7XG4gICAgfSk7XG4gIH1cbiAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5kZWxldGVDYXJkKHNlbGVjdGVkQ2FyZElkKS50aGVuKCgpID0+IHtcbiAgICAgIHNlbGVjdGVkQ2FyZC5yZW1vdmUoKTtcbiAgICAgIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0LCBcIkRlbGV0aW5nLi4uXCIpO1xufVxuXG4vLyBQcm9maWxlIGVsZW1lbnRzXG5jb25zdCBwcm9maWxlSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcbmNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcblxuLy8gRmV0Y2ggdXNlciBpbmZvIGFuZCBjYXJkcyBpbW1lZGlhdGVseVxuYXBpLmdldEFwcEluZm8oKS50aGVuKChbY2FyZHMsIHVzZXJzXSkgPT4ge1xuICBpZiAoY2FyZHMubGVuZ3RoID09PSAwKSB7XG4gICAgY2FyZHNMaXN0LmlubmVySFRNTCA9IFwiPHA+Tm8gY2FyZHMgdG8gZGlzcGxheS48L3A+XCI7XG4gIH0gZWxzZSB7XG4gICAgY2FyZHMucmV2ZXJzZSgpO1xuICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoY2FyZCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXQgdXNlciBwcm9maWxlIGluZm9cbiAgcHJvZmlsZUltYWdlLnNyYyA9IHVzZXJzLmF2YXRhcjtcbiAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSB1c2Vycy5uYW1lO1xuICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB1c2Vycy5hYm91dDtcbn0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuXG4vLyBDbG9zZSBidXR0b24gZXZlbnQgbGlzdGVuZXJzXG5jb25zdCBjbG9zZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19jbG9zZS1idG5cIik7XG5jbG9zZUJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gIGNvbnN0IG1vZGFsID0gYnV0dG9uLmNsb3Nlc3QoXCIubW9kYWxcIik7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xvc2VNb2RhbChtb2RhbCkpO1xufSk7XG5cbi8vIFNldHVwIGV2ZW50IGxpc3RlbmVycyBmb3IgbW9kYWxzIGFuZCBmb3JtIHN1Ym1pc3Npb25zXG5jb25zdCBhdmF0YXJNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyLWJ0blwiKTtcbmNvbnN0IGF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItbW9kYWxcIik7XG5jb25zdCBhdmF0YXJNb2RhbEZvcm0gPSBhdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtYXZhdGFyLWZvcm1cIik7XG5hdmF0YXJNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gb3Blbk1vZGFsKGF2YXRhck1vZGFsKSk7XG5hdmF0YXJNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBdmF0YXJTdWJtaXQpO1xuXG5jb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZWRpdC1idG5cIik7XG5jb25zdCBlZGl0UHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LW1vZGFsXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1mb3JtXCIpO1xuY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZS1pbnB1dFwiKTtcbmNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiKTtcbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHByb2ZpbGVOYW1lLnRleHRDb250ZW50O1xuICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50O1xuICByZXNldFZhbGlkYXRpb24oZWRpdFByb2ZpbGVGb3JtLCBbbmFtZUlucHV0LCBkZXNjcmlwdGlvbklucHV0XSwgc2V0dGluZ3MpO1xuICBvcGVuTW9kYWwoZWRpdFByb2ZpbGVNb2RhbCk7XG59KTtcbmVkaXRQcm9maWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KTtcblxuY29uc3QgY2FyZE1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnRuXCIpO1xuY29uc3QgY2FyZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLW1vZGFsXCIpO1xuY29uc3QgY2FyZE1vZGFsRm9ybSA9IGNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtZm9ybVwiKTtcbmNhcmRNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gb3Blbk1vZGFsKGNhcmRNb2RhbCkpO1xuY2FyZE1vZGFsRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUFkZENhcmRTdWJtaXQpO1xuXG5jb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuY29uc3QgZGVsZXRlRm9ybSA9IGRlbGV0ZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XG5jb25zdCBkZWxldGVDYW5jZWxCdXR0b24gPSBkZWxldGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnRuX3R5cGVfY2FuY2VsXCIpO1xuZGVsZXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQpO1xuZGVsZXRlQ2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKSk7XG5cbi8vIEVuYWJsZSBmb3JtIHZhbGlkYXRpb25cbmVuYWJsZVZhbGlkYXRpb24oc2V0dGluZ3MpO1xuIiwiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIGdldEFwcEluZm8oKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFVzZXJJbmZvKCldKTtcbiAgfVxuXG4gIGNoZWNrUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3IgJHtyZXMuc3RhdHVzfWApO1xuICB9XG5cbiAgcmVxdWVzdCh1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKS50aGVuKHRoaXMuY2hlY2tSZXNwb25zZSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRVc2VySW5mbyh7IG5hbWUsIGFib3V0IH0pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhYm91dCxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZWRpdEF2YXRhckluZm8oYXZhdGFyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZS9hdmF0YXJgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGF2YXRhcixcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ2FyZCh7IG5hbWUsIGxpbmsgfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbGluayxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlTGlrZVN0YXR1cyhpZCwgaXNMaWtlZCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IGlzTGlrZWQgPyBcIkRFTEVURVwiIDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuIl0sIm5hbWVzIjpbInNldHRpbmdzIiwiZm9ybVNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJoaWRlSW5wdXRFcnJvciIsImZvcm1FbGVtZW50IiwiaW5wdXRFbGVtZW50IiwiY29uZmlnIiwicXVlcnlTZWxlY3RvciIsImlkIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJkaXNhYmxlQnV0dG9uIiwiYnV0dG9uRWxlbWVudCIsImRpc2FibGVkIiwiYWRkIiwidG9nZ2xlQnV0dG9uU3RhdGUiLCJpbnB1dExpc3QiLCJzb21lIiwidmFsaWRpdHkiLCJ2YWxpZCIsImhhc0ludmFsaWRJbnB1dCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidG4iLCJkZWZhdWx0VGV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImxvYWRpbmdUZXh0IiwiaGFuZGxlU3VibWl0IiwicmVxdWVzdCIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic3VibWl0QnRuIiwic3VibWl0dGVyIiwiaW5pdGlhbFRleHQiLCJ0aGVuIiwidGFyZ2V0IiwicmVzZXQiLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImZpbmFsbHkiLCJzZWxlY3RlZENhcmQiLCJzZWxlY3RlZENhcmRJZCIsImFwaSIsImNvbnN0cnVjdG9yIiwiX3JlZiIsImJhc2VVcmwiLCJoZWFkZXJzIiwidGhpcyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJnZXRBcHBJbmZvIiwiUHJvbWlzZSIsImFsbCIsImdldEluaXRpYWxDYXJkcyIsImdldFVzZXJJbmZvIiwiY2hlY2tSZXNwb25zZSIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsInVybCIsIm9wdGlvbnMiLCJmZXRjaCIsImVkaXRVc2VySW5mbyIsIl9yZWYyIiwibmFtZSIsImFib3V0IiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0QXZhdGFySW5mbyIsImF2YXRhciIsImFkZENhcmQiLCJfcmVmMyIsImxpbmsiLCJkZWxldGVDYXJkIiwiY2hhbmdlTGlrZVN0YXR1cyIsImlzTGlrZWQiLCJhdXRob3JpemF0aW9uIiwiY2FyZFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJjb250ZW50IiwiY2FyZHNMaXN0IiwiY2xvc2VNb2RhbE92ZXJsYXkiLCJjdXJyZW50VGFyZ2V0IiwiY2xvc2VNb2RhbCIsImNsb3NlTW9kYWxFc2MiLCJrZXkiLCJvcGVuTW9kYWwiLCJtb2RhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyQ2FyZCIsIml0ZW0iLCJjYXJkRWxlbWVudCIsImRhdGEiLCJjbG9uZU5vZGUiLCJjYXJkTmFtZUVsZW1lbnQiLCJjYXJkSW1hZ2VFbGVtZW50IiwiY2FyZExpa2VCdXR0b24iLCJjYXJkRGVsZXRlQnV0dG9uIiwic3JjIiwiYWx0IiwiY29udGFpbnMiLCJ0b2dnbGUiLCJoYW5kbGVMaWtlIiwiX2lkIiwiY2FyZElkIiwiZGVsZXRlTW9kYWwiLCJoYW5kbGVEZWxldGVDYXJkIiwicHJldmlld01vZGFsSW1hZ2VFbGVtZW50IiwicHJldmlld01vZGFsQ2FwdGlvbkVsZW1lbnQiLCJwcmV2aWV3TW9kYWwiLCJoYW5kbGVJbWFnZUNsaWNrIiwiZ2V0Q2FyZEVsZW1lbnQiLCJwcm9maWxlSW1hZ2UiLCJwcm9maWxlTmFtZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsImNhcmRzIiwidXNlcnMiLCJpbm5lckhUTUwiLCJyZXZlcnNlIiwiZm9yRWFjaCIsImNhcmQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYnV0dG9uIiwiY2xvc2VzdCIsImF2YXRhck1vZGFsQnV0dG9uIiwiYXZhdGFyTW9kYWwiLCJhdmF0YXJNb2RhbEZvcm0iLCJhdmF0YXJJbnB1dCIsInZhbHVlIiwiYXZhdGFyRGF0YSIsImF2YXRhclN1Ym1pdEJ1dHRvbiIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsIm5hbWVJbnB1dCIsImRlc2NyaXB0aW9uSW5wdXQiLCJyZXNldFZhbGlkYXRpb24iLCJpbnB1dCIsInVzZXJEYXRhIiwiY2FyZE1vZGFsQnV0dG9uIiwiY2FyZE1vZGFsIiwiY2FyZE1vZGFsRm9ybSIsInRpdGxlSW5wdXQiLCJpbWFnZUlucHV0IiwiY2FyZERhdGEiLCJjYXJkU3VibWl0QnV0dG9uIiwiZGVsZXRlRm9ybSIsImRlbGV0ZUNhbmNlbEJ1dHRvbiIsInNldEV2ZW50TGlzdGVuZXJzIiwiQXJyYXkiLCJmcm9tIiwibG9nIiwiY2hlY2tJbnB1dFZhbGlkaXR5Iiwic2hvd0lucHV0RXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckVsZW1lbnQiLCJ2YWxpZGF0aW9uTWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=