!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},n=(e,t,n)=>{(e=>e.some((e=>!e.validity.valid)))(e)?r(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))};function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,a=n.textContent;o(!0,n,a,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{o(!1,n,a)}))}let s,i;const c=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}checkResponse(e){return e.ok?e.json():Promise.reject(`Error ${e.status}`)}request(e,t){return fetch(e,t).then(this.checkResponse)}getInitialCards(){return this.request(`${this._baseUrl}/cards`,{headers:this._headers})}getUserInfo(){return this.request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserInfo(e){let{name:t,about:r}=e;return this.request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}editAvatarInfo(e){return this.request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){let{name:t,link:r}=e;return this.request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}deleteCard(e){return this.request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}changeLikeStatus(e,t){return this.request(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers})}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"128cdac4-846c-4fc5-a0d1-eaaaa7448e3c","Content-Type":"application/json"}});c.getAppInfo().then((e=>{let[t,r]=e;t.reverse(),t.forEach((e=>{H(e)})),u.src=r.avatar,m.textContent=r.name,_.textContent=r.about})).catch(console.error);const l=document.querySelectorAll("#modal-close-btn"),d=document.querySelector(".profile__edit-btn"),u=document.querySelector(".profile__avatar"),m=document.querySelector(".profile__name"),_=document.querySelector(".profile__description"),h=document.querySelector(".profile__add-btn"),v=document.querySelector(".profile__avatar-btn"),f=document.querySelector("#edit-modal"),y=f.querySelector("#edit-profile-form"),S=f.querySelector("#profile-name-input"),p=f.querySelector("#profile-description-input"),b=document.querySelector("#card-modal"),q=b.querySelector("#card-form"),k=b.querySelector(".modal__submit-btn"),E=b.querySelector("#card-link-input"),g=b.querySelector("#card-caption-input"),L=document.querySelector("#avatar-modal"),C=L.querySelector("#edit-avatar-form"),U=L.querySelector("#profile-avatar-input"),x=L.querySelector(".modal__submit-btn"),$=document.querySelector("#delete-modal"),A=$.querySelector(".modal__form"),I=$.querySelector(".modal__submit-btn_type_cancel"),T=document.querySelector("#card-template").content,w=document.querySelector(".cards__list"),P=document.querySelector("#preview-modal"),B=document.querySelector(".modal__image"),D=document.querySelector(".modal__caption");function N(e){e.target===e.currentTarget&&J(e.currentTarget)}function O(e){"Escape"===e.key&&J(document.querySelector(".modal_opened"))}function j(e){e.classList.add("modal_opened"),document.addEventListener("keydown",O),e.addEventListener("mousedown",N)}function J(e){e.classList.remove("modal_opened"),document.removeEventListener("keydown",O),e.removeEventListener("mousedown",N)}function H(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){const t=T.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return e.isLiked&&o.classList.add("card__like-btn_liked"),n.src=e.link,n.alt=e.alt,r.textContent=e.name,o.addEventListener("click",(t=>function(e,t){const r=e.target,n=r.classList.contains("card__like-btn_liked");c.changeLikeStatus(t,n).then((e=>{e?(e=!0,r.classList.toggle("card__like-btn_liked")):(e=!1,r.classList.toggle("card__like-btn_liked"))})).catch(console.error)}(t,e._id))),a.addEventListener("click",(()=>function(e,t){s=e,i=t,j($)}(t,e._id))),n.addEventListener("click",(()=>function(e){B.src=e.link,B.alt=e.name,D.textContent=e.name,j(P)}(e))),t}(e);w[t](r)}var R;l.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>J(t)))})),v.addEventListener("click",(()=>{j(L)})),C.addEventListener("submit",(function(t){a((function(){return c.editAvatarInfo(U.value).then((t=>{u.src=t.avatar,r(x,e),J(L)}))}),t)})),d.addEventListener("click",(()=>{var r,n;S.value=m.textContent,p.value=_.textContent,r=y,n=e,[S,p].forEach((e=>{t(r,e,n)})),j(f)})),y.addEventListener("submit",(function(e){a((function(){return c.editUserInfo({name:S.value,about:p.value}).then((e=>{m.textContent=e.name,_.textContent=e.about,J(f)}))}),e)})),h.addEventListener("click",(()=>{j(b)})),q.addEventListener("submit",(function(t){a((function(){return c.addCard({name:g.value,link:E.value}).then((t=>{H(t),r(k,e),J(b)}))}),t)})),A.addEventListener("submit",(function(e){a((function(){return c.deleteCard(i).then((()=>{s.remove(),J($)}))}),e,"Deleting...")})),I.addEventListener("click",(()=>{J($)})),R=e,document.querySelectorAll(R.formSelector).forEach((e=>{((e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);console.log(o),console.log(a),n(o,a,r),o.forEach((s=>{s.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r})(e,r,r.validationMessage,n)})(e,s,r),n(o,a,r)}))}))})(e,R)}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoieUJBQU8sTUFBTUEsRUFBVyxDQUNwQkMsYUFBYyxlQUNkQyxjQUFlLGdCQUNmQyxxQkFBc0IscUJBQ3RCQyxvQkFBcUIsNkJBQ3JCQyxnQkFBaUIsMEJBQ2pCQyxXQUFZLGdCQVNSQyxFQUFpQkEsQ0FBQ0MsRUFBYUMsRUFBY0MsS0FDNUJGLEVBQVlHLGNBQWMsSUFBSUYsRUFBYUcsWUFDbkRDLFlBQWMsR0FDM0JKLEVBQWFLLFVBQVVDLE9BQU9MLEVBQU9MLGdCQUFnQixFQXNCMUNXLEVBQWdCQSxDQUFDQyxFQUFlUCxLQUMzQ08sRUFBY0MsVUFBVyxFQUN6QkQsRUFBY0gsVUFBVUssSUFBSVQsRUFBT04sb0JBQW9CLEVBR25EZ0IsRUFBb0JBLENBQUNDLEVBQVdKLEVBQWVQLEtBWDVCVyxJQUNoQkEsRUFBVUMsTUFBTWIsSUFDYkEsRUFBYWMsU0FBU0MsUUFVNUJDLENBQWdCSixHQUNsQkwsRUFBY0MsRUFBZVAsSUFFN0JPLEVBQWNDLFVBQVcsRUFDekJELEVBQWNILFVBQVVDLE9BQU9MLEVBQU9OLHFCQUN4QyxFQ25ERyxTQUFTc0IsRUFDWkMsRUFDQUMsR0FHQSxJQUZBQyxFQUFXQyxVQUFBQyxPQUFBLFFBQUFDLElBQUFGLFVBQUEsR0FBQUEsVUFBQSxHQUFHLE9BQ2RHLEVBQVdILFVBQUFDLE9BQUEsUUFBQUMsSUFBQUYsVUFBQSxHQUFBQSxVQUFBLEdBQUcsWUFHWkYsRUFBSWYsWUFERmMsRUFDZ0JNLEVBRUFKLENBRXRCLENBRU8sU0FBU0ssRUFBYUMsRUFBU0MsR0FBZ0MsSUFBM0JILEVBQVdILFVBQUFDLE9BQUEsUUFBQUMsSUFBQUYsVUFBQSxHQUFBQSxVQUFBLEdBQUcsWUFDdkRNLEVBQUlDLGlCQUVKLE1BQU1DLEVBQVlGLEVBQUlHLFVBQ2hCQyxFQUFjRixFQUFVekIsWUFFOUJhLEdBQWMsRUFBTVksRUFBV0UsRUFBYVAsR0FFNUNFLElBQ0dNLE1BQUssS0FDSkwsRUFBSU0sT0FBT0MsT0FBTyxJQUVuQkMsTUFBTUMsUUFBUUMsT0FDZEMsU0FBUSxLQUNQckIsR0FBYyxFQUFPWSxFQUFXRSxFQUFZLEdBRWxELENDbkJGLElBQUlRLEVBQWNDLEVBR2xCLE1BQU1DLEVBQU0sSUNiWixNQUNFQyxXQUFBQSxDQUFXQyxHQUF1QixJQUF0QixRQUFFQyxFQUFPLFFBQUVDLEdBQVNGLEVBQzlCRyxLQUFLQyxTQUFXSCxFQUNoQkUsS0FBS0UsU0FBV0gsQ0FDbEIsQ0FFQUksVUFBQUEsR0FDRSxPQUFPQyxRQUFRQyxJQUFJLENBQUNMLEtBQUtNLGtCQUFtQk4sS0FBS08sZUFDbkQsQ0FFQUMsYUFBQUEsQ0FBY0MsR0FDWixPQUFJQSxFQUFJQyxHQUNDRCxFQUFJRSxPQUVOUCxRQUFRUSxPQUFPLFNBQVNILEVBQUlJLFNBQ3JDLENBRUFqQyxPQUFBQSxDQUFRa0MsRUFBS0MsR0FDWCxPQUFPQyxNQUFNRixFQUFLQyxHQUFTN0IsS0FBS2MsS0FBS1EsY0FDdkMsQ0FFQUYsZUFBQUEsR0FDRSxPQUFPTixLQUFLcEIsUUFBUSxHQUFHb0IsS0FBS0MsaUJBQWtCLENBQzVDRixRQUFTQyxLQUFLRSxVQUVsQixDQUVBSyxXQUFBQSxHQUNFLE9BQU9QLEtBQUtwQixRQUFRLEdBQUdvQixLQUFLQyxvQkFBcUIsQ0FDL0NGLFFBQVNDLEtBQUtFLFVBRWxCLENBRUFlLFlBQUFBLENBQVlDLEdBQWtCLElBQWpCLEtBQUVDLEVBQUksTUFBRUMsR0FBT0YsRUFDMUIsT0FBT2xCLEtBQUtwQixRQUFRLEdBQUdvQixLQUFLQyxvQkFBcUIsQ0FDL0NvQixPQUFRLFFBQ1J0QixRQUFTQyxLQUFLRSxTQUNkb0IsS0FBTUMsS0FBS0MsVUFBVSxDQUNuQkwsT0FDQUMsV0FHTixDQUVBSyxjQUFBQSxDQUFlQyxHQUNiLE9BQU8xQixLQUFLcEIsUUFBUSxHQUFHb0IsS0FBS0MsMkJBQTRCLENBQ3REb0IsT0FBUSxRQUNSdEIsUUFBU0MsS0FBS0UsU0FDZG9CLEtBQU1DLEtBQUtDLFVBQVUsQ0FDbkJFLFlBR04sQ0FFQUMsT0FBQUEsQ0FBT0MsR0FBaUIsSUFBaEIsS0FBRVQsRUFBSSxLQUFFVSxHQUFNRCxFQUNwQixPQUFPNUIsS0FBS3BCLFFBQVEsR0FBR29CLEtBQUtDLGlCQUFrQixDQUM1Q29CLE9BQVEsT0FDUnRCLFFBQVNDLEtBQUtFLFNBQ2RvQixLQUFNQyxLQUFLQyxVQUFVLENBQ25CTCxPQUNBVSxVQUdOLENBRUFDLFVBQUFBLENBQVd6RSxHQUNULE9BQU8yQyxLQUFLcEIsUUFBUSxHQUFHb0IsS0FBS0Msa0JBQWtCNUMsSUFBTSxDQUNsRGdFLE9BQVEsU0FDUnRCLFFBQVNDLEtBQUtFLFVBRWxCLENBRUE2QixnQkFBQUEsQ0FBaUIxRSxFQUFJMkUsR0FDbkIsT0FBT2hDLEtBQUtwQixRQUFRLEdBQUdvQixLQUFLQyxrQkFBa0I1QyxVQUFZLENBQ3hEZ0UsT0FBUVcsRUFBVSxTQUFXLE1BQzdCakMsUUFBU0MsS0FBS0UsVUFFbEIsR0RoRWtCLENBQ2xCSixRQUFTLGtEQUNUQyxRQUFTLENBQ1BrQyxjQUFlLHVDQUNmLGVBQWdCLHNCQUlwQnRDLEVBQ0dRLGFBQ0FqQixNQUFLVyxJQUFvQixJQUFsQnFDLEVBQU9DLEdBQU10QyxFQUNuQnFDLEVBQU1FLFVBQ05GLEVBQU1HLFNBQVNDLElBQ2JDLEVBQVdELEVBQUssSUFHbEJFLEVBQWFDLElBQU1OLEVBQU1ULE9BQ3pCZ0IsRUFBWXBGLFlBQWM2RSxFQUFNaEIsS0FDaEN3QixFQUFtQnJGLFlBQWM2RSxFQUFNZixLQUFLLElBRTdDL0IsTUFBTUMsUUFBUUMsT0FHakIsTUFBTXFELEVBQWVDLFNBQVNDLGlCQUFpQixvQkFHekNDLEVBQW9CRixTQUFTekYsY0FBYyxzQkFDM0NvRixFQUFlSyxTQUFTekYsY0FBYyxvQkFDdENzRixFQUFjRyxTQUFTekYsY0FBYyxrQkFDckN1RixFQUFxQkUsU0FBU3pGLGNBQWMseUJBQzVDNEYsRUFBa0JILFNBQVN6RixjQUFjLHFCQUN6QzZGLEVBQW9CSixTQUFTekYsY0FBYyx3QkFHM0M4RixFQUFtQkwsU0FBU3pGLGNBQWMsZUFDMUMrRixFQUFrQkQsRUFBaUI5RixjQUFjLHNCQUNqRGdHLEVBQVlGLEVBQWlCOUYsY0FBYyx1QkFDM0NpRyxFQUFtQkgsRUFBaUI5RixjQUN4Qyw4QkFFSWtHLEVBQVlULFNBQVN6RixjQUFjLGVBQ25DbUcsRUFBZ0JELEVBQVVsRyxjQUFjLGNBQ3hDb0csRUFBbUJGLEVBQVVsRyxjQUFjLHNCQUMzQ3FHLEVBQWFILEVBQVVsRyxjQUFjLG9CQUNyQ3NHLEVBQWFKLEVBQVVsRyxjQUFjLHVCQUdyQ3VHLEVBQWNkLFNBQVN6RixjQUFjLGlCQUNyQ3dHLEVBQWtCRCxFQUFZdkcsY0FBYyxxQkFDNUN5RyxFQUFjRixFQUFZdkcsY0FBYyx5QkFDeEMwRyxFQUFxQkgsRUFBWXZHLGNBQWMsc0JBRy9DMkcsRUFBY2xCLFNBQVN6RixjQUFjLGlCQUNyQzRHLEVBQWFELEVBQVkzRyxjQUFjLGdCQUN2QzZHLEVBQXFCRixFQUFZM0csY0FDckMsa0NBSUk4RyxFQUFlckIsU0FBU3pGLGNBQWMsa0JBQWtCK0csUUFDeERDLEVBQVl2QixTQUFTekYsY0FBYyxnQkFHbkNpSCxFQUFleEIsU0FBU3pGLGNBQWMsa0JBQ3RDa0gsRUFBMkJ6QixTQUFTekYsY0FBYyxpQkFDbERtSCxFQUE2QjFCLFNBQVN6RixjQUFjLG1CQUcxRCxTQUFTb0gsRUFBa0IzRixHQUNyQkEsRUFBSU0sU0FBV04sRUFBSTRGLGVBQ3JCQyxFQUFXN0YsRUFBSTRGLGNBRW5CLENBRUEsU0FBU0UsRUFBYzlGLEdBQ0wsV0FBWkEsRUFBSStGLEtBRU5GLEVBRG9CN0IsU0FBU3pGLGNBQWMsaUJBRy9DLENBRUEsU0FBU3lILEVBQVVDLEdBQ2pCQSxFQUFNdkgsVUFBVUssSUFBSSxnQkFDcEJpRixTQUFTa0MsaUJBQWlCLFVBQVdKLEdBQ3JDRyxFQUFNQyxpQkFBaUIsWUFBYVAsRUFDdEMsQ0FFQSxTQUFTRSxFQUFXSSxHQUNsQkEsRUFBTXZILFVBQVVDLE9BQU8sZ0JBQ3ZCcUYsU0FBU21DLG9CQUFvQixVQUFXTCxHQUN4Q0csRUFBTUUsb0JBQW9CLFlBQWFSLEVBQ3pDLENBRUEsU0FBU2pDLEVBQVcwQyxHQUEwQixJQUFwQjVELEVBQU05QyxVQUFBQyxPQUFBLFFBQUFDLElBQUFGLFVBQUEsR0FBQUEsVUFBQSxHQUFHLFVBQ2pDLE1BQU0yRyxFQUlSLFNBQXdCQyxHQUN0QixNQUFNRCxFQUFjaEIsRUFBYTlHLGNBQWMsU0FBU2dJLFdBQVUsR0FDNURDLEVBQWtCSCxFQUFZOUgsY0FBYyxnQkFDNUNrSSxFQUFtQkosRUFBWTlILGNBQWMsZ0JBQzdDbUksRUFBaUJMLEVBQVk5SCxjQUFjLG1CQUMzQ29JLEVBQW1CTixFQUFZOUgsY0FBYyxxQkFnQm5ELE9BZEkrSCxFQUFLbkQsU0FDUHVELEVBQWVoSSxVQUFVSyxJQUFJLHdCQUcvQjBILEVBQWlCN0MsSUFBTTBDLEVBQUt0RCxLQUM1QnlELEVBQWlCRyxJQUFNTixFQUFLTSxJQUM1QkosRUFBZ0IvSCxZQUFjNkgsRUFBS2hFLEtBRW5Db0UsRUFBZVIsaUJBQWlCLFNBQVVsRyxHQXNCNUMsU0FBb0JBLEVBQUt4QixHQUN2QixNQUFNa0ksRUFBaUIxRyxFQUFJTSxPQUNyQjZDLEVBQVV1RCxFQUFlaEksVUFBVW1JLFNBQVMsd0JBRWxEL0YsRUFDR29DLGlCQUFpQjFFLEVBQUkyRSxHQUNyQjlDLE1BQU04QyxJQUNEQSxHQUNGQSxHQUFVLEVBQ1Z1RCxFQUFlaEksVUFBVW9JLE9BQU8sMEJBRWhDM0QsR0FBVSxFQUNWdUQsRUFBZWhJLFVBQVVvSSxPQUFPLHdCQUNsQyxJQUVEdEcsTUFBTUMsUUFBUUMsTUFDbkIsQ0F0Q29EcUcsQ0FBVy9HLEVBQUtzRyxFQUFLVSxPQUN2RUwsRUFBaUJULGlCQUFpQixTQUFTLElBdUM3QyxTQUEwQkcsRUFBYVksR0FDckNyRyxFQUFleUYsRUFDZnhGLEVBQWlCb0csRUFDakJqQixFQUFVZCxFQUNaLENBMUNJZ0MsQ0FBaUJiLEVBQWFDLEVBQUtVLE9BRXJDUCxFQUFpQlAsaUJBQWlCLFNBQVMsSUEwQzdDLFNBQTBCSSxHQUN4QmIsRUFBeUI3QixJQUFNMEMsRUFBS3RELEtBQ3BDeUMsRUFBeUJtQixJQUFNTixFQUFLaEUsS0FDcENvRCxFQUEyQmpILFlBQWM2SCxFQUFLaEUsS0FDOUMwRCxFQUFVUixFQUNaLENBL0NtRDJCLENBQWlCYixLQUUzREQsQ0FDVCxDQTFCc0JlLENBQWVoQixHQUNuQ2IsRUFBVS9DLEdBQVE2RCxFQUNwQixDRi9CbUMvSCxNRWdKbkN5RixFQUFhUCxTQUFTNkQsSUFDcEIsTUFBTXBCLEVBQVFvQixFQUFPQyxRQUFRLFVBQzdCRCxFQUFPbkIsaUJBQWlCLFNBQVMsSUFBTUwsRUFBV0ksSUFBTyxJQUczRDdCLEVBQWtCOEIsaUJBQWlCLFNBQVMsS0FDMUNGLEVBQVVsQixFQUFZLElBR3hCQyxFQUFnQm1CLGlCQUFpQixVQS9GakMsU0FBNEJsRyxHQVMxQkYsR0FSQSxXQUNFLE9BQU9nQixFQUFJOEIsZUFBZW9DLEVBQVl1QyxPQUFPbEgsTUFBTW1ILElBQ2pEN0QsRUFBYUMsSUFBTTRELEVBQVczRSxPQUM5QmpFLEVBQWNxRyxFQUFvQnJILEdBQ2xDaUksRUFBV2YsRUFBWSxHQUUzQixHQUUwQjlFLEVBQzVCLElBdUZBa0UsRUFBa0JnQyxpQkFBaUIsU0FBUyxLRnBMWHVCLElBQUNySixFQUF3QkUsRUVxTHhEaUcsRUFBVWdELE1BQVExRCxFQUFZcEYsWUFDOUIrRixFQUFpQitDLE1BQVF6RCxFQUFtQnJGLFlGdExaTCxFRXVMaEJrRyxFRnZMd0NoRyxFRXVMUVYsRUFBL0IsQ0FBQzJHLEVBQVdDLEdGdExqQ2hCLFNBQVNrRSxJQUNqQnZKLEVBQWVDLEVBQWFzSixFQUFPcEosRUFBTyxJRXNMOUMwSCxFQUFVM0IsRUFBaUIsSUFHN0JDLEVBQWdCNEIsaUJBQWlCLFVBN0RqQyxTQUFpQ2xHLEdBYy9CRixHQWJBLFdBQ0UsT0FBT2dCLEVBQ0pzQixhQUFhLENBQ1pFLEtBQU1pQyxFQUFVZ0QsTUFDaEJoRixNQUFPaUMsRUFBaUIrQyxRQUV6QmxILE1BQU1zSCxJQUNMOUQsRUFBWXBGLFlBQWNrSixFQUFTckYsS0FDbkN3QixFQUFtQnJGLFlBQWNrSixFQUFTcEYsTUFDMUNzRCxFQUFXeEIsRUFBaUIsR0FFbEMsR0FFMEJyRSxFQUM1QixJQWdEQW1FLEVBQWdCK0IsaUJBQWlCLFNBQVMsS0FDeENGLEVBQVV2QixFQUFVLElBR3RCQyxFQUFjd0IsaUJBQWlCLFVBbEQvQixTQUE2QmxHLEdBVzNCRixHQVZBLFdBQ0UsT0FBT2dCLEVBQ0pnQyxRQUFRLENBQUVSLEtBQU11QyxFQUFXMEMsTUFBT3ZFLEtBQU00QixFQUFXMkMsUUFDbkRsSCxNQUFNdUgsSUFDTGxFLEVBQVdrRSxHQUNYaEosRUFBYytGLEVBQWtCL0csR0FDaENpSSxFQUFXcEIsRUFBVSxHQUUzQixHQUUwQnpFLEVBQzVCLElBd0NBbUYsRUFBV2UsaUJBQWlCLFVBdEM1QixTQUFnQ2xHLEdBUTlCRixHQVBBLFdBQ0UsT0FBT2dCLEVBQUltQyxXQUFXcEMsR0FBZ0JSLE1BQUssS0FDekNPLEVBQWFqQyxTQUNia0gsRUFBV1gsRUFBWSxHQUUzQixHQUUwQmxGLEVBQUssY0FDakMsSUErQkFvRixFQUFtQmMsaUJBQWlCLFNBQVMsS0FDM0NMLEVBQVdYLEVBQVksSUY3S1U1RyxFRWdMbEJWLEVGL0tJb0csU0FBU0MsaUJBQWlCM0YsRUFBT1QsY0FDekMyRixTQUFTcEYsSUFyQk15SixFQUFDekosRUFBYUUsS0FDdEMsTUFBTVcsRUFBWTZJLE1BQU1DLEtBQ3RCM0osRUFBWTZGLGlCQUFpQjNGLEVBQU9SLGdCQUVoQ2UsRUFBZ0JULEVBQVlHLGNBQWNELEVBQU9QLHNCQUV2RDBDLFFBQVF1SCxJQUFJL0ksR0FDWndCLFFBQVF1SCxJQUFJbkosR0FFWkcsRUFBa0JDLEVBQVdKLEVBQWVQLEdBRTVDVyxFQUFVdUUsU0FBU25GLElBQ2pCQSxFQUFhNkgsaUJBQWlCLFNBQVMsV0FuRGhCK0IsRUFBQzdKLEVBQWFDLEVBQWNDLEtBQ2hERCxFQUFhYyxTQUFTQyxNQVF6QmpCLEVBQWVDLEVBQWFDLEVBQWNDLEdBckJ2QjRKLEVBQUM5SixFQUFhQyxFQUFjOEosRUFBYzdKLEtBQy9ELE1BQU04SixFQUFlaEssRUFBWUcsY0FBYyxJQUFJRixFQUFhRyxZQUNoRUgsRUFBYUssVUFBVUssSUFBSVQsRUFBT0wsaUJBQ2xDbUssRUFBYTNKLFlBQWMwSixDQUFZLEVBV3JDRCxDQUNFOUosRUFDQUMsRUFDQUEsRUFBYWdLLGtCQUNiL0osRUFJSixFQTBDSTJKLENBQW1CN0osRUFBYUMsRUFBY0MsR0FDOUNVLEVBQWtCQyxFQUFXSixFQUFlUCxFQUM5QyxHQUFFLEdBQ0YsRUFNQXVKLENBQWtCekosRUFBYUUsRUFBTyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9zY3JpcHRzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy91dGlscy9oZWxwZXJzLmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy91dGlscy9BcGkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuICAgIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcbiAgICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX3N1Ym1pdC1idG5cIixcbiAgICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcIm1vZGFsX19zdWJtaXQtYnRuX2luYWN0aXZlXCIsXG4gICAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gICAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JcIixcbiAgfTtcbiAgXG4gIGNvbnN0IHNob3dJbnB1dEVycm9yID0gKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGVycm9yTWVzc2FnZSwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgfTtcbiAgXG4gIGNvbnN0IGhpZGVJbnB1dEVycm9yID0gKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5pbnB1dEVycm9yQ2xhc3MpO1xuICB9O1xuICBcbiAgY29uc3QgY2hlY2tJbnB1dFZhbGlkaXR5ID0gKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGNvbmZpZykgPT4ge1xuICAgIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICBzaG93SW5wdXRFcnJvcihcbiAgICAgICAgZm9ybUVsZW1lbnQsXG4gICAgICAgIGlucHV0RWxlbWVudCxcbiAgICAgICAgaW5wdXRFbGVtZW50LnZhbGlkYXRpb25NZXNzYWdlLFxuICAgICAgICBjb25maWdcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGNvbmZpZyk7XG4gICAgfVxuICB9O1xuICBcbiAgY29uc3QgaGFzSW52YWxpZElucHV0ID0gKGlucHV0TGlzdCkgPT4ge1xuICAgIHJldHVybiBpbnB1dExpc3Quc29tZSgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZDtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCBkaXNhYmxlQnV0dG9uID0gKGJ1dHRvbkVsZW1lbnQsIGNvbmZpZykgPT4ge1xuICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIH07XG4gIFxuICBjb25zdCB0b2dnbGVCdXR0b25TdGF0ZSA9IChpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZykgPT4ge1xuICAgIGlmIChoYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50LCBjb25maWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGV4cG9ydCBjb25zdCByZXNldFZhbGlkYXRpb24gPSAoZm9ybUVsZW1lbnQsIGlucHV0TGlzdCwgY29uZmlnKSA9PiB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXQsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH07XG4gIFxuICBjb25zdCBzZXRFdmVudExpc3RlbmVycyA9IChmb3JtRWxlbWVudCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShcbiAgICAgIGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnLmlucHV0U2VsZWN0b3IpXG4gICAgKTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xuICBcbiAgICBjb25zb2xlLmxvZyhpbnB1dExpc3QpO1xuICAgIGNvbnNvbGUubG9nKGJ1dHRvbkVsZW1lbnQpO1xuICBcbiAgICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG4gIFxuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGVja0lucHV0VmFsaWRpdHkoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcbiAgICAgICAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIFxuICBleHBvcnQgY29uc3QgZW5hYmxlVmFsaWRhdGlvbiA9IChjb25maWcpID0+IHtcbiAgICBjb25zdCBmb3JtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnLmZvcm1TZWxlY3Rvcik7XG4gICAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsZW1lbnQpID0+IHtcbiAgICAgIHNldEV2ZW50TGlzdGVuZXJzKGZvcm1FbGVtZW50LCBjb25maWcpO1xuICAgIH0pO1xuICB9O1xuICAiLCJleHBvcnQgZnVuY3Rpb24gcmVuZGVyTG9hZGluZyhcbiAgICBpc0xvYWRpbmcsXG4gICAgYnRuLFxuICAgIGRlZmF1bHRUZXh0ID0gXCJTYXZlXCIsXG4gICAgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiXG4gICkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBidG4udGV4dENvbnRlbnQgPSBkZWZhdWx0VGV4dDtcbiAgICB9XG4gIH1cbiAgXG4gIGV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTdWJtaXQocmVxdWVzdCwgZXZ0LCBsb2FkaW5nVGV4dCA9IFwiU2F2aW5nLi4uXCIpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZXZ0LnN1Ym1pdHRlcjtcbiAgICBjb25zdCBpbml0aWFsVGV4dCA9IHN1Ym1pdEJ0bi50ZXh0Q29udGVudDtcbiAgXG4gICAgcmVuZGVyTG9hZGluZyh0cnVlLCBzdWJtaXRCdG4sIGluaXRpYWxUZXh0LCBsb2FkaW5nVGV4dCk7XG4gIFxuICAgIHJlcXVlc3QoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBldnQudGFyZ2V0LnJlc2V0KCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHJlbmRlckxvYWRpbmcoZmFsc2UsIHN1Ym1pdEJ0biwgaW5pdGlhbFRleHQpO1xuICAgICAgfSk7XG4gIH1cbiAgIiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcbmltcG9ydCB7XG4gIGVuYWJsZVZhbGlkYXRpb24sXG4gIHNldHRpbmdzLFxuICByZXNldFZhbGlkYXRpb24sXG4gIGRpc2FibGVCdXR0b24sXG59IGZyb20gXCIuLi9zY3JpcHRzL3ZhbGlkYXRpb24uanNcIjtcbmltcG9ydCB7IGhhbmRsZVN1Ym1pdCB9IGZyb20gXCIuLi91dGlscy9oZWxwZXJzXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi91dGlscy9BcGkuanNcIjtcblxubGV0IHNlbGVjdGVkQ2FyZCwgc2VsZWN0ZWRDYXJkSWQ7XG5cbi8vIEFQSVxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQtYXBpLmVuLnRyaXBsZXRlbi1zZXJ2aWNlcy5jb20vdjFcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiMTI4Y2RhYzQtODQ2Yy00ZmM1LWEwZDEtZWFhYWE3NDQ4ZTNjXCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuYXBpXG4gIC5nZXRBcHBJbmZvKClcbiAgLnRoZW4oKFtjYXJkcywgdXNlcnNdKSA9PiB7XG4gICAgY2FyZHMucmV2ZXJzZSgpO1xuICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoY2FyZCk7XG4gICAgfSk7XG5cbiAgICBwcm9maWxlSW1hZ2Uuc3JjID0gdXNlcnMuYXZhdGFyO1xuICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlcnMubmFtZTtcbiAgICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB1c2Vycy5hYm91dDtcbiAgfSlcbiAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuXG4vLyBVbml2ZXJzYWwgZWxlbWVudHNcbmNvbnN0IGNsb3NlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjbW9kYWwtY2xvc2UtYnRuXCIpO1xuXG4vLyBQcm9maWxlIGVsZW1lbnRzXG5jb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZWRpdC1idG5cIik7XG5jb25zdCBwcm9maWxlSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcbmNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcbmNvbnN0IGNhcmRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbmNvbnN0IGF2YXRhck1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXItYnRuXCIpO1xuXG4vLyBDYXJkIGZvcm0gZWxlbWVudHNcbmNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtbW9kYWxcIik7XG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLWZvcm1cIik7XG5jb25zdCBuYW1lSW5wdXQgPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lLWlucHV0XCIpO1xuY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcbiAgXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiXG4pO1xuY29uc3QgY2FyZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLW1vZGFsXCIpO1xuY29uc3QgY2FyZE1vZGFsRm9ybSA9IGNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtZm9ybVwiKTtcbmNvbnN0IGNhcmRTdWJtaXRCdXR0b24gPSBjYXJkTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0blwiKTtcbmNvbnN0IGltYWdlSW5wdXQgPSBjYXJkTW9kYWwucXVlcnlTZWxlY3RvcihcIiNjYXJkLWxpbmstaW5wdXRcIik7XG5jb25zdCB0aXRsZUlucHV0ID0gY2FyZE1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1jYXB0aW9uLWlucHV0XCIpO1xuXG4vLyBBdmF0YXIgZm9ybSBlbGVtZW50c1xuY29uc3QgYXZhdGFyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci1tb2RhbFwiKTtcbmNvbnN0IGF2YXRhck1vZGFsRm9ybSA9IGF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1hdmF0YXItZm9ybVwiKTtcbmNvbnN0IGF2YXRhcklucHV0ID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWF2YXRhci1pbnB1dFwiKTtcbmNvbnN0IGF2YXRhclN1Ym1pdEJ1dHRvbiA9IGF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3N1Ym1pdC1idG5cIik7XG5cbi8vIERlbGV0ZSBmb3JtIGVsZW1lbnRzXG5jb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuY29uc3QgZGVsZXRlRm9ybSA9IGRlbGV0ZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XG5jb25zdCBkZWxldGVDYW5jZWxCdXR0b24gPSBkZWxldGVNb2RhbC5xdWVyeVNlbGVjdG9yKFxuICBcIi5tb2RhbF9fc3VibWl0LWJ0bl90eXBlX2NhbmNlbFwiXG4pO1xuXG4vLyBDYXJkLXJlbGF0ZWQgZWxlbWVudHNcbmNvbnN0IGNhcmRUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC10ZW1wbGF0ZVwiKS5jb250ZW50O1xuY29uc3QgY2FyZHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc19fbGlzdFwiKTtcblxuLy8gUHJldmlldyBpbWFnZSBwb3B1cCBlbGVtZW50c1xuY29uc3QgcHJldmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmV2aWV3LW1vZGFsXCIpO1xuY29uc3QgcHJldmlld01vZGFsSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XG5jb25zdCBwcmV2aWV3TW9kYWxDYXB0aW9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XG5cbi8vIEZ1bmN0aW9uc1xuZnVuY3Rpb24gY2xvc2VNb2RhbE92ZXJsYXkoZXZ0KSB7XG4gIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xuICAgIGNsb3NlTW9kYWwoZXZ0LmN1cnJlbnRUYXJnZXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWxFc2MoZXZ0KSB7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY29uc3QgbW9kYWxPcGVuZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX29wZW5lZFwiKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsT3BlbmVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VNb2RhbEVzYyk7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgY2xvc2VNb2RhbE92ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsKSB7XG4gIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlTW9kYWxFc2MpO1xuICBtb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGNsb3NlTW9kYWxPdmVybGF5KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpdGVtLCBtZXRob2QgPSBcInByZXBlbmRcIikge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGdldENhcmRFbGVtZW50KGl0ZW0pO1xuICBjYXJkc0xpc3RbbWV0aG9kXShjYXJkRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldENhcmRFbGVtZW50KGRhdGEpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjYXJkVGVtcGxhdGUucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgY2FyZE5hbWVFbGVtZW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgY29uc3QgY2FyZEltYWdlRWxlbWVudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ0blwiKTtcbiAgY29uc3QgY2FyZGRlbGV0ZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ0blwiKTtcblxuICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuICB9XG5cbiAgY2FyZEltYWdlRWxlbWVudC5zcmMgPSBkYXRhLmxpbms7XG4gIGNhcmRJbWFnZUVsZW1lbnQuYWx0ID0gZGF0YS5hbHQ7XG4gIGNhcmROYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcblxuICBjYXJkTGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gaGFuZGxlTGlrZShldnQsIGRhdGEuX2lkKSk7XG4gIGNhcmRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgZGF0YS5faWQpXG4gICk7XG4gIGNhcmRJbWFnZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUltYWdlQ2xpY2soZGF0YSkpO1xuXG4gIHJldHVybiBjYXJkRWxlbWVudDtcbn1cblxuLy8gRXZlbnQgaGFuZGxlcnNcbmZ1bmN0aW9uIGhhbmRsZUF2YXRhclN1Ym1pdChldnQpIHtcbiAgZnVuY3Rpb24gbWFrZVJlcXVlc3QoKSB7XG4gICAgcmV0dXJuIGFwaS5lZGl0QXZhdGFySW5mbyhhdmF0YXJJbnB1dC52YWx1ZSkudGhlbigoYXZhdGFyRGF0YSkgPT4ge1xuICAgICAgcHJvZmlsZUltYWdlLnNyYyA9IGF2YXRhckRhdGEuYXZhdGFyO1xuICAgICAgZGlzYWJsZUJ1dHRvbihhdmF0YXJTdWJtaXRCdXR0b24sIHNldHRpbmdzKTtcbiAgICAgIGNsb3NlTW9kYWwoYXZhdGFyTW9kYWwpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KG1ha2VSZXF1ZXN0LCBldnQpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMaWtlKGV2dCwgaWQpIHtcbiAgY29uc3QgY2FyZExpa2VCdXR0b24gPSBldnQudGFyZ2V0O1xuICBjb25zdCBpc0xpa2VkID0gY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZS1idG5fbGlrZWRcIik7XG5cbiAgYXBpXG4gICAgLmNoYW5nZUxpa2VTdGF0dXMoaWQsIGlzTGlrZWQpXG4gICAgLnRoZW4oKGlzTGlrZWQpID0+IHtcbiAgICAgIGlmIChpc0xpa2VkKSB7XG4gICAgICAgIGlzTGlrZWQgPSB0cnVlO1xuICAgICAgICBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idG5fbGlrZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0xpa2VkID0gZmFsc2U7XG4gICAgICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZChjYXJkRWxlbWVudCwgY2FyZElkKSB7XG4gIHNlbGVjdGVkQ2FyZCA9IGNhcmRFbGVtZW50O1xuICBzZWxlY3RlZENhcmRJZCA9IGNhcmRJZDtcbiAgb3Blbk1vZGFsKGRlbGV0ZU1vZGFsKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhkYXRhKSB7XG4gIHByZXZpZXdNb2RhbEltYWdlRWxlbWVudC5zcmMgPSBkYXRhLmxpbms7XG4gIHByZXZpZXdNb2RhbEltYWdlRWxlbWVudC5hbHQgPSBkYXRhLm5hbWU7XG4gIHByZXZpZXdNb2RhbENhcHRpb25FbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICBvcGVuTW9kYWwocHJldmlld01vZGFsKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRWRpdFByb2ZpbGVTdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGlcbiAgICAgIC5lZGl0VXNlckluZm8oe1xuICAgICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICAgIGFib3V0OiBkZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuICAgICAgfSlcbiAgICAgIC50aGVuKCh1c2VyRGF0YSkgPT4ge1xuICAgICAgICBwcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IHVzZXJEYXRhLm5hbWU7XG4gICAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHVzZXJEYXRhLmFib3V0O1xuICAgICAgICBjbG9zZU1vZGFsKGVkaXRQcm9maWxlTW9kYWwpO1xuICAgICAgfSk7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUFkZENhcmRTdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGlcbiAgICAgIC5hZGRDYXJkKHsgbmFtZTogdGl0bGVJbnB1dC52YWx1ZSwgbGluazogaW1hZ2VJbnB1dC52YWx1ZSB9KVxuICAgICAgLnRoZW4oKGNhcmREYXRhKSA9PiB7XG4gICAgICAgIHJlbmRlckNhcmQoY2FyZERhdGEpO1xuICAgICAgICBkaXNhYmxlQnV0dG9uKGNhcmRTdWJtaXRCdXR0b24sIHNldHRpbmdzKTtcbiAgICAgICAgY2xvc2VNb2RhbChjYXJkTW9kYWwpO1xuICAgICAgfSk7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQobWFrZVJlcXVlc3QsIGV2dCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQoZXZ0KSB7XG4gIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuICAgIHJldHVybiBhcGkuZGVsZXRlQ2FyZChzZWxlY3RlZENhcmRJZCkudGhlbigoKSA9PiB7XG4gICAgICBzZWxlY3RlZENhcmQucmVtb3ZlKCk7XG4gICAgICBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChtYWtlUmVxdWVzdCwgZXZ0LCBcIkRlbGV0aW5nLi4uXCIpO1xufVxuXG4vLyBFdmVudCBsaXN0ZW5lcnNcbmNsb3NlQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgY29uc3QgbW9kYWwgPSBidXR0b24uY2xvc2VzdChcIi5tb2RhbFwiKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjbG9zZU1vZGFsKG1vZGFsKSk7XG59KTtcblxuYXZhdGFyTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgb3Blbk1vZGFsKGF2YXRhck1vZGFsKTtcbn0pO1xuXG5hdmF0YXJNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBdmF0YXJTdWJtaXQpO1xuXG5lZGl0UHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBuYW1lSW5wdXQudmFsdWUgPSBwcm9maWxlTmFtZS50ZXh0Q29udGVudDtcbiAgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudDtcbiAgcmVzZXRWYWxpZGF0aW9uKGVkaXRQcm9maWxlRm9ybSwgW25hbWVJbnB1dCwgZGVzY3JpcHRpb25JbnB1dF0sIHNldHRpbmdzKTtcbiAgb3Blbk1vZGFsKGVkaXRQcm9maWxlTW9kYWwpO1xufSk7XG5cbmVkaXRQcm9maWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUVkaXRQcm9maWxlU3VibWl0KTtcblxuY2FyZE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIG9wZW5Nb2RhbChjYXJkTW9kYWwpO1xufSk7XG5cbmNhcmRNb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBZGRDYXJkU3VibWl0KTtcblxuZGVsZXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZURlbGV0ZUNhcmRTdWJtaXQpO1xuXG5kZWxldGVDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY2xvc2VNb2RhbChkZWxldGVNb2RhbCk7XG59KTtcblxuZW5hYmxlVmFsaWRhdGlvbihzZXR0aW5ncyk7XG4iLCJjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGhlYWRlcnMgfSkge1xuICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG5cbiAgZ2V0QXBwSW5mbygpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SW5pdGlhbENhcmRzKCksIHRoaXMuZ2V0VXNlckluZm8oKV0pO1xuICB9XG5cbiAgY2hlY2tSZXNwb25zZShyZXMpIHtcbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvciAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cblxuICByZXF1ZXN0KHVybCwgb3B0aW9ucykge1xuICAgIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpLnRoZW4odGhpcy5jaGVja1Jlc3BvbnNlKTtcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgZWRpdFVzZXJJbmZvKHsgbmFtZSwgYWJvdXQgfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGFib3V0LFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBlZGl0QXZhdGFySW5mbyhhdmF0YXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBhZGRDYXJkKHsgbmFtZSwgbGluayB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBsaW5rLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VMaWtlU3RhdHVzKGlkLCBpc0xpa2VkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogaXNMaWtlZCA/IFwiREVMRVRFXCIgOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG4iXSwibmFtZXMiOlsic2V0dGluZ3MiLCJmb3JtU2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsImhpZGVJbnB1dEVycm9yIiwiZm9ybUVsZW1lbnQiLCJpbnB1dEVsZW1lbnQiLCJjb25maWciLCJxdWVyeVNlbGVjdG9yIiwiaWQiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImRpc2FibGVCdXR0b24iLCJidXR0b25FbGVtZW50IiwiZGlzYWJsZWQiLCJhZGQiLCJ0b2dnbGVCdXR0b25TdGF0ZSIsImlucHV0TGlzdCIsInNvbWUiLCJ2YWxpZGl0eSIsInZhbGlkIiwiaGFzSW52YWxpZElucHV0IiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsImJ0biIsImRlZmF1bHRUZXh0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibG9hZGluZ1RleHQiLCJoYW5kbGVTdWJtaXQiLCJyZXF1ZXN0IiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJzdWJtaXRCdG4iLCJzdWJtaXR0ZXIiLCJpbml0aWFsVGV4dCIsInRoZW4iLCJ0YXJnZXQiLCJyZXNldCIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZmluYWxseSIsInNlbGVjdGVkQ2FyZCIsInNlbGVjdGVkQ2FyZElkIiwiYXBpIiwiY29uc3RydWN0b3IiLCJfcmVmIiwiYmFzZVVybCIsImhlYWRlcnMiLCJ0aGlzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImdldEFwcEluZm8iLCJQcm9taXNlIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiZ2V0VXNlckluZm8iLCJjaGVja1Jlc3BvbnNlIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwidXJsIiwib3B0aW9ucyIsImZldGNoIiwiZWRpdFVzZXJJbmZvIiwiX3JlZjIiLCJuYW1lIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVkaXRBdmF0YXJJbmZvIiwiYXZhdGFyIiwiYWRkQ2FyZCIsIl9yZWYzIiwibGluayIsImRlbGV0ZUNhcmQiLCJjaGFuZ2VMaWtlU3RhdHVzIiwiaXNMaWtlZCIsImF1dGhvcml6YXRpb24iLCJjYXJkcyIsInVzZXJzIiwicmV2ZXJzZSIsImZvckVhY2giLCJjYXJkIiwicmVuZGVyQ2FyZCIsInByb2ZpbGVJbWFnZSIsInNyYyIsInByb2ZpbGVOYW1lIiwicHJvZmlsZURlc2NyaXB0aW9uIiwiY2xvc2VCdXR0b25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJjYXJkTW9kYWxCdXR0b24iLCJhdmF0YXJNb2RhbEJ1dHRvbiIsImVkaXRQcm9maWxlTW9kYWwiLCJlZGl0UHJvZmlsZUZvcm0iLCJuYW1lSW5wdXQiLCJkZXNjcmlwdGlvbklucHV0IiwiY2FyZE1vZGFsIiwiY2FyZE1vZGFsRm9ybSIsImNhcmRTdWJtaXRCdXR0b24iLCJpbWFnZUlucHV0IiwidGl0bGVJbnB1dCIsImF2YXRhck1vZGFsIiwiYXZhdGFyTW9kYWxGb3JtIiwiYXZhdGFySW5wdXQiLCJhdmF0YXJTdWJtaXRCdXR0b24iLCJkZWxldGVNb2RhbCIsImRlbGV0ZUZvcm0iLCJkZWxldGVDYW5jZWxCdXR0b24iLCJjYXJkVGVtcGxhdGUiLCJjb250ZW50IiwiY2FyZHNMaXN0IiwicHJldmlld01vZGFsIiwicHJldmlld01vZGFsSW1hZ2VFbGVtZW50IiwicHJldmlld01vZGFsQ2FwdGlvbkVsZW1lbnQiLCJjbG9zZU1vZGFsT3ZlcmxheSIsImN1cnJlbnRUYXJnZXQiLCJjbG9zZU1vZGFsIiwiY2xvc2VNb2RhbEVzYyIsImtleSIsIm9wZW5Nb2RhbCIsIm1vZGFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpdGVtIiwiY2FyZEVsZW1lbnQiLCJkYXRhIiwiY2xvbmVOb2RlIiwiY2FyZE5hbWVFbGVtZW50IiwiY2FyZEltYWdlRWxlbWVudCIsImNhcmRMaWtlQnV0dG9uIiwiY2FyZGRlbGV0ZUJ1dHRvbiIsImFsdCIsImNvbnRhaW5zIiwidG9nZ2xlIiwiaGFuZGxlTGlrZSIsIl9pZCIsImNhcmRJZCIsImhhbmRsZURlbGV0ZUNhcmQiLCJoYW5kbGVJbWFnZUNsaWNrIiwiZ2V0Q2FyZEVsZW1lbnQiLCJidXR0b24iLCJjbG9zZXN0IiwidmFsdWUiLCJhdmF0YXJEYXRhIiwicmVzZXRWYWxpZGF0aW9uIiwiaW5wdXQiLCJ1c2VyRGF0YSIsImNhcmREYXRhIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJBcnJheSIsImZyb20iLCJsb2ciLCJjaGVja0lucHV0VmFsaWRpdHkiLCJzaG93SW5wdXRFcnJvciIsImVycm9yTWVzc2FnZSIsImVycm9yRWxlbWVudCIsInZhbGlkYXRpb25NZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==