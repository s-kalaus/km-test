import{g as b,e as P,s as k,r as u,h as I,j as r,i as D,k as F,a2 as A,a3 as E,$ as n,A as a,Z as C,U as N}from"./index-CPOxYNCj.js";import{g as R,u as S,L as w,A as O,F as T}from"./favorites-toggle-BK51OV6G.js";import{B as U}from"./Breadcrumbs-4sA-jsIz.js";import{C as x,a as g}from"./CardContent-yXd6Mh3d.js";function $(t){return P("MuiCardMedia",t)}b("MuiCardMedia",["root","media","img"]);const B=t=>{const{classes:e,isMediaComponent:o,isImageComponent:s}=t;return F({root:["root",o&&"media",s&&"img"]},$,e)},Y=k("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t,{isMediaComponent:s,isImageComponent:c}=o;return[e.root,s&&e.media,c&&e.img]}})({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",variants:[{props:{isMediaComponent:!0},style:{width:"100%"}},{props:{isImageComponent:!0},style:{objectFit:"cover"}}]}),L=["video","audio","picture","iframe","img"],V=["picture","img"],q=u.forwardRef(function(e,o){const s=I({props:e,name:"MuiCardMedia"}),{children:c,className:v,component:d="div",image:l,src:h,style:m,...M}=s,p=L.includes(d),f=!p&&l?{backgroundImage:`url("${l}")`,...m}:m,j={...s,component:d,isMediaComponent:p,isImageComponent:V.includes(d)},y=B(j);return r.jsx(Y,{className:D(y.root,v),as:d,role:!p&&l?"img":void 0,ref:o,style:f,ownerState:j,src:p?l||h:void 0,...M,children:c})}),G={},Q=R`
  query movie($id: ID!) {
    movie(id: $id) {
      id
      title
      plot
      director
      releaseDate
      poster
      genres {
        id
        title
      }
      actors {
        id
        name
      }
      rating
    }
  }
`;function _(t){const e={...G,...t};return S(Q,e)}const K=()=>{const{id:t}=A(),{data:e,loading:o,error:s}=_({variables:{id:`${t}`},skip:!t}),c=u.useMemo(()=>r.jsxs(U,{"aria-label":"breadcrumb",children:[r.jsx(E,{underline:"hover",color:"inherit",href:"/km-test",children:n`Movie search`}),r.jsx(a,{sx:i.breadcrumbCurrent,children:n`Details`})]}),[]),v=u.useMemo(()=>e!=null&&e.movie||s||o?null:r.jsx(x,{children:r.jsx(g,{sx:i.contentPadding,children:r.jsx(a,{variant:"body1",children:n`Movie not found`})})}),[e,s,o]),d=u.useMemo(()=>!o||s?null:r.jsx(x,{children:r.jsx(g,{sx:i.contentPadding,children:r.jsx(w,{})})}),[o,s]),l=u.useMemo(()=>s?r.jsx(x,{children:r.jsx(g,{sx:i.contentPadding,children:r.jsx(O,{severity:"error",children:n`API error. Try again later`})})}):null,[s]),h=u.useMemo(()=>o||!(e!=null&&e.movie)||s?null:r.jsxs(x,{children:[r.jsx(q,{sx:i.media,image:e==null?void 0:e.movie.poster}),r.jsxs(g,{sx:i.flexVertical,children:[r.jsxs(C,{sx:i.title,children:[r.jsxs(a,{gutterBottom:!0,variant:"h5",component:"div",role:"main",children:[e.movie.title,r.jsx("span",{children:", "}),N(e.movie.releaseDate).format("YYYY")]}),r.jsx(T,{id:e.movie.id})]}),r.jsxs(a,{variant:"body2",children:[n`Cast`,": ",e.movie.actors.map(({name:m})=>m).join(", ")]}),r.jsxs(a,{variant:"body2",children:[n`Director`,": ",e.movie.director]}),r.jsxs(a,{variant:"body2",children:[n`Genres`,":"," ",e.movie.genres.map(({title:m})=>m).join(", ")]}),r.jsx(a,{variant:"body2",sx:i.plot,children:e.movie.plot})]})]}),[s,o,e]);return r.jsxs(C,{sx:i.flexVertical,children:[c,d,l,v,h]})},i={media:{height:200},flexVertical:{display:"flex",flexDirection:"column",gap:2},title:{display:"flex",gap:2,justifyContent:"space-between",alignItems:"center"},plot:{color:"text.secondary"},contentPadding:{pt:3},breadcrumbCurrent:{color:"text.primary"}};export{K as Movie};
