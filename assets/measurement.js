/* Privacy-aware measurement hooks. Disabled until IDs and consent policy are configured. */
(function(){
const config={ga4MeasurementId:"",adsenseClientId:"",adsenseArticleSlotId:"",enableArticleAds:false,analyticsConsent:false};
window.WinetMeasurementConfig=config;
window.winetTrack=function(name,params){if(!config.analyticsConsent||!config.ga4MeasurementId||typeof window.gtag!=="function")return;window.gtag("event",name,params||{})};
if(config.analyticsConsent&&/^G-[A-Z0-9]+$/.test(config.ga4MeasurementId)){
const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(config.ga4MeasurementId);document.head.appendChild(s);
window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag("js",new Date());window.gtag("config",config.ga4MeasurementId,{anonymize_ip:true});
}
if(config.enableArticleAds&&/^ca-pub-[0-9]+$/.test(config.adsenseClientId)&&config.adsenseArticleSlotId&&window.location.pathname.includes("/insights/")){
document.querySelectorAll("[data-ad-slot]").forEach(x=>{x.hidden=false;x.innerHTML='<div><div class="w-ad-slot-label">ADVERTISEMENT</div><ins class="adsbygoogle" style="display:block" data-ad-client="'+config.adsenseClientId+'" data-ad-slot="'+config.adsenseArticleSlotId+'" data-ad-format="auto" data-full-width-responsive="true"></ins></div>'});
const t=document.createElement("script");t.async=true;t.crossOrigin="anonymous";t.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+encodeURIComponent(config.adsenseClientId);t.onload=()=>document.querySelectorAll(".adsbygoogle").forEach(()=>{(window.adsbygoogle=window.adsbygoogle||[]).push({})});document.head.appendChild(t);
}
document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(a&&/^(mailto:|tel:)/.test(a.getAttribute("href")))window.winetTrack("contact_click",{method:a.getAttribute("href").split(":")[0]})});
const form=document.getElementById("w-enquiry-form");if(form)form.addEventListener("submit",e=>{if(!form.reportValidity())return;e.preventDefault();const d=new FormData(form),name=String(d.get("name")||"").trim(),email=String(d.get("email")||"").trim(),service=String(d.get("service")||""),message=String(d.get("message")||"");window.winetTrack("generate_lead",{lead_source:"email_draft",service});const subject=encodeURIComponent("Winet website enquiry — "+service),body=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\nService: "+service+"\n\nProject requirements:\n"+message);window.location.href="mailto:william@winet.com.my?subject="+subject+"&body="+body});
})();