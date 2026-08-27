import React, { useState } from "react";
import type { HassEntity, HomeAssistant, RoomConfig } from "../types";

const Icon=({icon}:{icon:string})=>React.createElement("ha-icon",{icon});
type Domain="light"|"climate"|"media_player"|"security"|"person";
const groups:Array<{id:Domain;label:string;icon:string}>=[
  {id:"light",label:"תאורה",icon:"mdi:lightbulb-group"},{id:"climate",label:"אקלים",icon:"mdi:thermostat"},{id:"media_player",label:"מדיה",icon:"mdi:speaker-multiple"},{id:"security",label:"ביטחון",icon:"mdi:shield-home"}
];
const friendly=(state:HassEntity|undefined,id:string)=>String(state?.attributes.friendly_name||id);

export function ControlCenter({hass,rooms,roomEntities,hiddenByRoom,cameraSelection,onHiddenChange,onCameraChange}:{hass?:HomeAssistant;rooms:RoomConfig[];roomEntities:Record<string,Record<Domain,string[]>>;hiddenByRoom:Record<string,string[]>;cameraSelection:string[]|null;onHiddenChange:(roomId:string,next:string[])=>void;onCameraChange:(next:string[])=>void}){
  const [roomId,setRoomId]=useState(rooms[0]?.id||"");
  const [section,setSection]=useState<"rooms"|"cameras">("rooms");
  const [query,setQuery]=useState("");
  const room=rooms.find((item)=>item.id===roomId);
  const hidden=new Set(hiddenByRoom[roomId]||[]);
  const cameras=Object.keys(hass?.states||{}).filter((id)=>id.startsWith("camera."));
  const selectedCameras=new Set(cameraSelection===null?cameras:cameraSelection);
  const unavailable=Object.values(hass?.states||{}).filter((state)=>["unknown","unavailable"].includes(state.state)).length;
  const matches=(id:string)=>!query.trim()||`${id} ${friendly(hass?.states[id],id)}`.toLocaleLowerCase("he").includes(query.trim().toLocaleLowerCase("he"));
  const toggleEntity=(id:string)=>{const next=new Set(hidden);next.has(id)?next.delete(id):next.add(id);onHiddenChange(roomId,[...next]);};
  const toggleCamera=(id:string)=>{const next=new Set(selectedCameras);next.has(id)?next.delete(id):next.add(id);onCameraChange([...next]);};
  return <section className="control-center">
    <header className="control-center-title"><span><Icon icon="mdi:tune-vertical-variant"/></span><div><small>HOMEii Control Center</small><h3>ניהול תוכן</h3></div></header>
    <div className="control-center-tabs"><button className={section==="rooms"?"selected":""} onClick={()=>setSection("rooms")}><Icon icon="mdi:floor-plan"/>חדרים</button><button className={section==="cameras"?"selected":""} onClick={()=>setSection("cameras")}><Icon icon="mdi:cctv"/>מצלמות</button></div>
    <div className="manager-health"><span className={hass?"healthy":"issue"}><Icon icon={hass?"mdi:check-network-outline":"mdi:lan-disconnect"}/><b>{hass?"HA מחובר":"מנותק"}</b></span><span className={unavailable?"warning":"healthy"}><Icon icon="mdi:heart-pulse"/><b>{unavailable} לא זמינות</b></span><span><Icon icon="mdi:home-map-marker"/><b>{rooms.length} חדרים</b></span></div>
    <label className="manager-search"><Icon icon="mdi:magnify"/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="חיפוש ישות בשם או Entity ID"/><button onClick={()=>setQuery("")} aria-label="ניקוי"><Icon icon="mdi:close"/></button></label>
    {section==="rooms"?<>
      <div className="room-picker" aria-label="בחירת חדר">{rooms.map((item)=><button className={item.id===roomId?"selected":""} key={item.id} onClick={()=>setRoomId(item.id)}><Icon icon={item.icon}/><span>{item.name}</span></button>)}</div>
      <div className="manager-summary"><div><strong>{room?.name}</strong><small>{Object.values(roomEntities[roomId]||{}).flat().length-hidden.size} ישויות מוצגות</small></div><button onClick={()=>onHiddenChange(roomId,[])}>הצג הכול</button></div>
      <div className="manager-groups">{groups.map((group)=>{const allIds=roomEntities[roomId]?.[group.id]||[];const ids=allIds.filter(matches);if(!ids.length)return null;return <section key={group.id}><header><Icon icon={group.icon}/><strong>{group.label}</strong><small>{allIds.filter((id)=>!hidden.has(id)).length}/{allIds.length}</small><div className="group-bulk"><button onClick={()=>onHiddenChange(roomId,[...hidden].filter((id)=>!allIds.includes(id)))} aria-label={`הצגת כל ${group.label}`}><Icon icon="mdi:eye-outline"/></button><button onClick={()=>onHiddenChange(roomId,[...new Set([...hidden,...allIds])])} aria-label={`הסתרת כל ${group.label}`}><Icon icon="mdi:eye-off-outline"/></button></div></header><div>{ids.map((id)=><label className={!hidden.has(id)?"enabled":"disabled"} key={id}><span><strong>{friendly(hass?.states[id],id)}</strong><small>{id}</small></span><input type="checkbox" checked={!hidden.has(id)} onChange={()=>toggleEntity(id)}/></label>)}</div></section>})}</div>
    </>:<>
      <div className="manager-summary"><div><strong>מצלמות בפאנל</strong><small>{selectedCameras.size} מתוך {cameras.length} מוצגות</small></div><button onClick={()=>onCameraChange(cameras)}>הצג הכול</button></div>
      <div className="camera-picker">{cameras.length?cameras.filter(matches).map((id)=><label className={selectedCameras.has(id)?"enabled":"disabled"} key={id}><span className="camera-picker-icon"><Icon icon="mdi:cctv"/></span><span><strong>{friendly(hass?.states[id],id)}</strong><small>{id}</small></span><input type="checkbox" checked={selectedCameras.has(id)} onChange={()=>toggleCamera(id)}/></label>):<div className="manager-empty"><Icon icon="mdi:camera-off-outline"/><span>לא נמצאו ישויות camera ב־HA</span></div>}</div>
    </>}
    <p className="manager-note"><Icon icon="mdi:shield-lock-outline"/>ההגדרות זמינות למנהל בלבד ומוחלות מיד על HOMEii.</p>
  </section>;
}
