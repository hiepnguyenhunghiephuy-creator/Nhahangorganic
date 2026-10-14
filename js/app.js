/* Nhà hàng Organic — quản lý vận hành nhà hàng khách tour.
   SPA tĩnh, không dependency. Dữ liệu lưu localStorage, có nút reset về dữ liệu mẫu.
   Mọi số liệu trong bản demo đều là SỐ LIỆU MẪU — cần thay bằng số thật của quán. */
(function(){
"use strict";

/* ================= DỮ LIỆU MẪU (SEED) ================= */
const SAMPLE = "SỐ LIỆU MẪU — cần thay bằng số thật của quán";

function seed(){
  return {
    suppliers:[
      {id:"ncc1",name:"Hải sản Sơn Trà",phone:"0901 234 567",note:"Hải sản tươi sống, giao 2 lần/ngày"},
      {id:"ncc2",name:"Rau củ Organic Đà Lạt",phone:"0902 345 678",note:"Rau, nấm, củ quả theo mùa"},
      {id:"ncc3",name:"Thực phẩm An Hải",phone:"0903 456 789",note:"Thịt, gà, bò, đậu hủ, chả, trứng"},
      {id:"ncc4",name:"Khô & Gia vị Miền Trung",phone:"0904 567 890",note:"Gạo, mỳ, chè, nước, gia vị"}
    ],
    ingredients:[
      {id:"ghe",name:"Ghẹ sống",unit:"kg",cat:"be_song",supplier:"ncc1",price:200000,stock:6,min:8,prices:[190000,200000,210000]},
      {id:"cua",name:"Cua biển",unit:"kg",cat:"be_song",supplier:"ncc1",price:220000,stock:4,min:6,prices:[210000,220000,225000]},
      {id:"tomsu",name:"Tôm sú",unit:"kg",cat:"be_song",supplier:"ncc1",price:170000,stock:3,min:10,prices:[160000,165000,170000]},
      {id:"tomcang",name:"Tôm càng xanh",unit:"kg",cat:"be_song",supplier:"ncc1",price:260000,stock:2,min:5,prices:[250000,260000,270000]},
      {id:"baongu",name:"Bào ngư",unit:"con",cat:"be_song",supplier:"ncc1",price:25000,stock:40,min:100,prices:[23000,25000,26000]},
      {id:"ngao",name:"Ngao",unit:"kg",cat:"be_song",supplier:"ncc1",price:45000,stock:6,min:8,prices:[40000,45000,45000]},
      {id:"vem",name:"Vẹm biển",unit:"kg",cat:"be_song",supplier:"ncc1",price:35000,stock:5,min:8,prices:[30000,35000,35000]},
      {id:"hau",name:"Hàu sữa",unit:"kg",cat:"be_song",supplier:"ncc1",price:35000,stock:4,min:6,prices:[30000,35000,35000]},
      {id:"muc",name:"Mực biển",unit:"kg",cat:"be_song",supplier:"ncc1",price:170000,stock:4,min:8,prices:[160000,170000,175000]},
      {id:"so",name:"Sò tím",unit:"kg",cat:"be_song",supplier:"ncc1",price:110000,stock:3,min:5,prices:[100000,110000,110000]},
      {id:"ca",name:"Cá biển",unit:"kg",cat:"be_song",supplier:"ncc1",price:130000,stock:5,min:8,prices:[120000,130000,135000]},
      {id:"tomhum",name:"Tôm hùm",unit:"kg",cat:"be_song",supplier:"ncc1",price:450000,stock:2,min:3,prices:[430000,450000,470000]},
      {id:"bachi",name:"Ba chỉ heo",unit:"kg",cat:"tuoi",supplier:"ncc3",price:110000,stock:8,min:10,prices:[105000,110000,110000]},
      {id:"ga",name:"Thịt gà",unit:"kg",cat:"tuoi",supplier:"ncc3",price:75000,stock:10,min:12,prices:[70000,75000,75000]},
      {id:"bo",name:"Thịt bò",unit:"kg",cat:"tuoi",supplier:"ncc3",price:220000,stock:4,min:6,prices:[210000,220000,230000]},
      {id:"rau",name:"Rau theo mùa",unit:"kg",cat:"tuoi",supplier:"ncc2",price:18000,stock:25,min:20,prices:[16000,18000,18000]},
      {id:"nam",name:"Nấm",unit:"kg",cat:"tuoi",supplier:"ncc2",price:70000,stock:6,min:8,prices:[65000,70000,70000]},
      {id:"bap",name:"Bắp (ngô)",unit:"kg",cat:"tuoi",supplier:"ncc2",price:22000,stock:8,min:8,prices:[20000,22000,22000]},
      {id:"suplo",name:"Súp lơ",unit:"kg",cat:"tuoi",supplier:"ncc2",price:28000,stock:7,min:8,prices:[25000,28000,28000]},
      {id:"carot",name:"Cà rốt",unit:"kg",cat:"tuoi",supplier:"ncc2",price:18000,stock:10,min:8,prices:[16000,18000,18000]},
      {id:"dauhu",name:"Đậu hủ",unit:"kg",cat:"tuoi",supplier:"ncc3",price:16000,stock:12,min:10,prices:[15000,16000,16000]},
      {id:"trung",name:"Trứng",unit:"quả",cat:"tuoi",supplier:"ncc3",price:2800,stock:120,min:100,prices:[2600,2800,2800]},
      {id:"chaca",name:"Chả cá",unit:"kg",cat:"tuoi",supplier:"ncc3",price:95000,stock:6,min:8,prices:[90000,95000,95000]},
      {id:"chamuc",name:"Chả mực",unit:"kg",cat:"tuoi",supplier:"ncc3",price:150000,stock:4,min:6,prices:[140000,150000,155000]},
      {id:"gao",name:"Gạo",unit:"kg",cat:"kho",supplier:"ncc4",price:18000,stock:60,min:40,prices:[17000,18000,18000]},
      {id:"my",name:"Mỳ / Miến",unit:"kg",cat:"kho",supplier:"ncc4",price:22000,stock:15,min:12,prices:[20000,22000,22000]},
      {id:"che",name:"Chè / Rau câu dừa",unit:"phần",cat:"kho",supplier:"ncc4",price:8000,stock:100,min:150,prices:[7500,8000,8000]},
      {id:"nuoc",name:"Nước lọc / Trà đá",unit:"chai",cat:"kho",supplier:"ncc4",price:3000,stock:200,min:300,prices:[3000,3000,3000]},
      {id:"mam",name:"Nước mắm",unit:"lít",cat:"gia_vi",supplier:"ncc4",price:45000,stock:8,min:6,prices:[42000,45000,45000]},
      {id:"xidau",name:"Xì dầu",unit:"lít",cat:"gia_vi",supplier:"ncc4",price:40000,stock:6,min:5,prices:[38000,40000,40000]},
      {id:"dau",name:"Dầu ăn",unit:"lít",cat:"gia_vi",supplier:"ncc4",price:35000,stock:10,min:8,prices:[33000,35000,35000]},
      {id:"gvi",name:"Gia vị khô",unit:"kg",cat:"gia_vi",supplier:"ncc4",price:25000,stock:12,min:10,prices:[23000,25000,25000]}
    ],
    dishes:[
      {id:"d01",name:"Rau xào tỏi theo mùa",cat:"Món xào",bom:[["rau",0.10],["dau",0.008],["gvi",0.004]]},
      {id:"d02",name:"Rau xào nấm",cat:"Món xào",bom:[["rau",0.06],["nam",0.04],["dau",0.008],["gvi",0.004]]},
      {id:"d03",name:"Thịt kho dừa",cat:"Món kho",bom:[["bachi",0.06],["mam",0.015],["gvi",0.008]]},
      {id:"d04",name:"Gà kho",cat:"Món kho",bom:[["ga",0.08],["mam",0.015],["gvi",0.008]]},
      {id:"d05",name:"Cơm trắng",cat:"Cơm",bom:[["gao",0.18]]},
      {id:"d06",name:"Trứng hấp miến cà chua",cat:"Món hấp",bom:[["trung",1],["carot",0.02],["my",0.02]]},
      {id:"d07",name:"Hấp thủy nhiệt 2 tầng (Suất 150k)",cat:"Hấp thủy nhiệt",bom:[["ngao",0.04],["vem",0.04],["tomsu",0.02],["bap",0.025],["suplo",0.025],["carot",0.015]]},
      {id:"d08",name:"Hấp thủy nhiệt 2 tầng (Suất 200k+)",cat:"Hấp thủy nhiệt",bom:[["ngao",0.04],["vem",0.04],["tomsu",0.03],["bap",0.025],["suplo",0.025],["nam",0.02],["carot",0.015]]},
      {id:"d09",name:"Hấp thủy nhiệt Bào ngư",cat:"Hấp thủy nhiệt",bom:[["baongu",1],["tomsu",0.025],["vem",0.04],["suplo",0.025]]},
      {id:"d10",name:"Hàu nướng âm dương",cat:"Món nướng",bom:[["hau",0.08]]},
      {id:"d11",name:"Cá xốt chua ngọt HongKong",cat:"Món chính",bom:[["ca",0.06],["carot",0.02],["gvi",0.005]]},
      {id:"d12",name:"Lẩu Titanic (Suất 150k)",cat:"Lẩu",buf:true,bom:[["tomsu",0.015],["ca",0.025],["bachi",0.025],["muc",0.015],["chaca",0.015],["dauhu",0.02],["rau",0.05,true],["my",0.025,true]]},
      {id:"d13",name:"Lẩu Titanic (Suất 200k)",cat:"Lẩu",buf:true,bom:[["tomsu",0.025],["ca",0.025],["bachi",0.025],["muc",0.02],["chaca",0.015],["dauhu",0.02],["rau",0.05,true],["my",0.025,true]]},
      {id:"d14",name:"Lẩu Titanic Ghẹ",cat:"Lẩu",buf:true,bom:[["ghe",0.08],["ca",0.025],["bachi",0.025],["muc",0.02],["chaca",0.015],["dauhu",0.02],["rau",0.05,true],["my",0.025,true]]},
      {id:"d15",name:"Lẩu Titanic Bào ngư",cat:"Lẩu",buf:true,bom:[["tomcang",0.03],["ca",0.025],["chaca",0.015],["chamuc",0.015],["muc",0.015],["so",0.015],["dauhu",0.02],["rau",0.05,true],["my",0.025,true]]},
      {id:"d16",name:"Lẩu Titanic Cua",cat:"Lẩu",buf:true,bom:[["cua",0.08],["ca",0.025],["bachi",0.025],["muc",0.02],["chaca",0.015],["dauhu",0.02],["rau",0.05,true],["my",0.025,true]]},
      {id:"d17",name:"Chè Việt Nam / Rau câu dừa",cat:"Tráng miệng",bom:[["che",1]]},
      {id:"d18",name:"Nước lọc / Trà đá",cat:"Đồ uống",bom:[["nuoc",1]]},
      {id:"d19",name:"Tôm sốt Thái",cat:"Món chính",bom:[["tomsu",0.05],["gvi",0.005]]},
      {id:"d20",name:"Bò lúc lắc",cat:"Món chính",bom:[["bo",0.05],["carot",0.02]]},
      {id:"d21",name:"Gà nướng Teriyaki",cat:"Món nướng",bom:[["ga",0.08],["xidau",0.015]]},
      {id:"d22",name:"Gỏi hải sản",cat:"Khai vị",bom:[["muc",0.03],["tomsu",0.03],["rau",0.04]]},
      {id:"d23",name:"Tôm hùm nướng bơ tỏi",cat:"Món chính",bom:[["tomhum",0.18],["gvi",0.005]]},
      {id:"d24",name:"Đậu hủ sốt cà",cat:"Món chay",bom:[["dauhu",0.10],["carot",0.02],["gvi",0.005]]},
      {id:"d25",name:"Nấm xào cải thìa",cat:"Món chay",bom:[["nam",0.06],["suplo",0.04],["dau",0.008]]},
      {id:"d26",name:"Đậu hủ hấp xì dầu",cat:"Món chay",bom:[["dauhu",0.12],["xidau",0.02]]},
      {id:"d27",name:"Lẩu chay Organic",cat:"Lẩu",buf:true,bom:[["rau",0.08],["nam",0.05],["dauhu",0.05],["bap",0.03],["my",0.04,true],["carot",0.03]]}
    ],
    sets:[
      {id:"s150",name:"Suất 150.000đ",price:150000,desc:"Set đoàn cơ bản, đủ vị hải sản và lẩu.",dishes:["d01","d04","d05","d06","d07","d12","d17","d18"]},
      {id:"s180",name:"Suất Gia Đình 180.000đ",price:180000,desc:"Set đoàn gia đình, thêm món, khẩu phần đầy đặn hơn.",dishes:["d01","d04","d05","d06","d07","d12","d17","d18"]},
      {id:"s200",name:"Suất 200.000đ",price:200000,desc:"Set đoàn phổ biến nhất: thêm hàu nướng và cá xốt.",dishes:["d02","d03","d05","d08","d10","d11","d13","d17","d18"]},
      {id:"s250g",name:"Set Ghẹ Trung 250.000đ",price:250000,desc:"Set đoàn có lẩu ghẹ — điểm nhấn hải sản tươi sống.",dishes:["d02","d03","d05","d08","d10","d11","d14","d17","d18"]},
      {id:"s250b",name:"Set Bào Ngư 250.000đ",price:250000,desc:"Set đoàn cao cấp: hấp bào ngư 1 con/khách và lẩu bào ngư.",dishes:["d09","d15","d05","d02","d17","d18"]},
      {id:"s280",name:"Set Cua 280.000đ",price:280000,desc:"Set đoàn có lẩu cua biển, hợp đoàn khách thích hải sản.",dishes:["d02","d03","d05","d08","d10","d11","d16","d17","d18"]},
      {id:"s300",name:"Set Lẩu Sauna 300.000đ",price:300000,desc:"Set nhấn mạnh lẩu hấp 2 tầng và gỏi khai vị.",dishes:["d22","d02","d05","d08","d10","d11","d14","d17","d18"]},
      {id:"s340",name:"Set Hải Sản Tổng Hợp 340.000đ",price:340000,desc:"Set đoàn đầy đủ: gỏi, hấp, lẩu cua và gà nướng.",dishes:["d22","d08","d10","d19","d11","d16","d21","d05","d17","d18"]},
      {id:"s500",name:"Set Tôm Hùm 500.000đ",price:500000,desc:"Set đoàn VIP: tôm hùm nướng, lẩu bào ngư, bò lúc lắc.",dishes:["d22","d19","d20","d08","d23","d15","d05","d17","d18"]},
      {id:"s140c",name:"Set Chay Organic 140.000đ",price:140000,desc:"Set chay thanh đạm từ rau củ organic và đậu hủ.",dishes:["d02","d24","d05","d25","d26","d27","d17","d18"]}
    ],
    tables:[
      {id:"t1",zone:"Tầng 1 — Sảnh chính",name:"Bàn 01",seats:6},
      {id:"t2",zone:"Tầng 1 — Sảnh chính",name:"Bàn 02",seats:6},
      {id:"t3",zone:"Tầng 1 — Sảnh chính",name:"Bàn 03",seats:6},
      {id:"t4",zone:"Tầng 2 — Phòng đoàn",name:"Bàn 11",seats:10},
      {id:"t5",zone:"Tầng 2 — Phòng đoàn",name:"Bàn 12",seats:10},
      {id:"t6",zone:"Tầng 2 — Phòng đoàn",name:"Bàn 13",seats:10}
    ],
    bookings:[
      {id:"b1",name:"Đoàn Vietravel",phone:"0905 111 222",date:"today",time:"11:30",guests:150,setId:"s200",deposit:9000000,depositPaid:9000000,status:"confirmed",note:"Đoàn khách Hà Nội, ăn trưa"},
      {id:"b2",name:"Đoàn Hanoitour",phone:"0905 333 444",date:"today",time:"12:00",guests:120,setId:"s150",deposit:5400000,depositPaid:5400000,status:"confirmed",note:"Đoàn khách lẻ ghép"},
      {id:"b3",name:"Đoàn Saigontourist",phone:"0905 555 666",date:"today",time:"18:00",guests:130,setId:"s250b",deposit:9750000,depositPaid:5000000,status:"confirmed",note:"Đoàn khách TP.HCM, ăn tối"}
    ],
    receipts:[
      {id:"r1",supplier:"ncc1",date:"Sáng nay",items:[["tomsu",8,170000],["ngao",10,45000],["muc",5,170000]],note:"Hải sản buổi sáng"},
      {id:"r2",supplier:"ncc2",date:"Sáng nay",items:[["rau",30,18000],["nam",8,70000]],note:"Rau củ buổi sáng"}
    ],
    counts:[
      {ing:"ghe",actual:null,note:""},
      {ing:"tomsu",actual:null,note:""},
      {ing:"baongu",actual:null,note:""},
      {ing:"rau",actual:null,note:""},
      {ing:"gao",actual:null,note:""}
    ],
    /* Phiếu kiểm kê đã chốt (lưu lại để xem lại) + nhật ký thao tác. */
    countSheets:[],
    audit:[],
    history:[
      {date:"07/10",guests:380,revenue:74000000,cost:23800000},
      {date:"08/10",guests:410,revenue:81000000,cost:25500000},
      {date:"09/10",guests:365,revenue:70500000,cost:22900000},
      {date:"10/10",guests:430,revenue:84500000,cost:26200000},
      {date:"11/10",guests:395,revenue:77500000,cost:24100000},
      {date:"12/10",guests:420,revenue:83000000,cost:25800000},
      {date:"13/10",guests:400,revenue:80500000,cost:25200000}
    ],
    kds:{},
    payments:{},
    nextId:100
  };
}

/* ================= STATE ================= */
const KEY="nhahang-organic-v1";
let S;
try{ S = JSON.parse(localStorage.getItem(KEY)) || seed(); }catch(e){ S = seed(); }
/* Nâng cấp dữ liệu cũ (trình duyệt đã lưu bản trước): thêm mảng rỗng, đổi lịch sử thu dạng số → dạng danh sách. */
if(!Array.isArray(S.audit)) S.audit=[];
if(!Array.isArray(S.countSheets)) S.countSheets=[];
if(!S.payments || typeof S.payments!=="object") S.payments={};
Object.keys(S.payments).forEach(k=>{
  const v=S.payments[k];
  if(typeof v==="number") S.payments[k]= v>0 ? [{id:"old-"+k,date:"—",cash:v,bank:0,total:v,note:"Dữ liệu cũ (trước khi có lịch sử thu)",role:"—"}] : [];
});
if(!Array.isArray(S.counts)) S.counts=[];
let role = localStorage.getItem(KEY+"-role") || "owner";
/* Di dời 1 lần: phiếu kiểm kê bản cũ lưu sẵn số đếm (actual khác null) nên
   trình duyệt cũ vẫn hiện số "ma" và Lưu chốt cả phiếu. Xóa số đếm cũ,
   đánh dấu đã di dời và ghi ngay để lần load sau không chạy lại. */
if(!S.countsMigrated){
  S.counts.forEach(c=>{ c.actual=null; c.note=""; });
  S.countsMigrated=true;
  save();
}
let view = "dashboard";
let catalogTab = "dishes";
let selectedOrderId = null;

function save(){ localStorage.setItem(KEY, JSON.stringify(S)); localStorage.setItem(KEY+"-role", role); }
function uid(){ return "x"+(S.nextId++); save(); }

/* ================= HELPERS ================= */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money = n => (Math.round(n)||0).toLocaleString("vi-VN")+"đ";
const round2 = n => Math.round((+n||0)*100)/100; // làm tròn 2 số thập phân — chặn số rác float kiểu 2.799999952316284
const round0 = n => Math.round(+n||0); // làm tròn đồng chẵn
const num = (n,d) => (Math.round(n*100)/100).toLocaleString("vi-VN",{maximumFractionDigits:d==null?2:d});
const pct = n => (Math.round(n*10)/10).toLocaleString("vi-VN")+"%";
const byId = (arr,id) => arr.find(x=>x.id===id);
/* Tên set hiển thị cho vai không thấy tiền: tên set gốc chứa giá ("Suất 200.000đ")
   nên phải lược bỏ phần giá; set "Suất" trơ trụi thì kèm số món để phân biệt. */
function setLabel(set, hideMoney){
  if(!set) return "";
  if(!hideMoney) return set.name;
  const stripped=set.name.replace(/\d[\d.]*\s*đ/g,"").replace(/\s{2,}/g," ").trim();
  if(stripped==="Suất") return "Suất · "+set.dishes.length+" món";
  return stripped || set.name;
}
const ing = id => byId(S.ingredients,id);
const dish = id => byId(S.dishes,id);
const setOf = id => byId(S.sets,id);
const supplier = id => byId(S.suppliers,id);
const booking = id => byId(S.bookings,id);
const CATS = {be_song:"Hải sản bể sống",tuoi:"Hàng tươi",kho:"Hàng khô",gia_vi:"Gia vị"};
const BUFFER = 0.15; // dự phòng 15% cho rau/mỳ gọi thêm miễn phí

function toast(msg){ const t=$("#toast"); t.textContent=msg; t.hidden=false; setTimeout(()=>t.hidden=true,2600); }

/* Nhật ký thao tác (P0-7): vai trò + hành động + thời gian, Chủ quán/Quản lý xem được ở Tổng quan. */
function logAction(action, detail){
  S.audit = S.audit || [];
  S.audit.unshift({time:new Date().toLocaleString("vi-VN"), role: role, action, detail: detail||""});
  if(S.audit.length>200) S.audit.length=200;
}

/* ================= TÍNH TOÁN (TRUNG TÂM) ================= */
/* Chi phí nguyên liệu cho 1 khách của 1 món (đã cộng buffer cho dòng rau/mỳ lẩu) */
function dishCostPerPax(d){
  let c=0;
  d.bom.forEach(([iid,qty,buf])=>{
    const g=ing(iid); if(!g) return;
    let q=qty; if(buf) q = qty*(1+BUFFER);
    c += q*g.price;
  });
  return c;
}
/* Chi phí nguyên liệu cho 1 khách của 1 set */
function setCostPerPax(set){
  return set.dishes.reduce((s,did)=>{ const d=dish(did); return s+(d?dishCostPerPax(d):0); },0);
}
/* Tính toán đầy đủ cho 1 đơn đoàn: đổi số khách là tính lại toàn bộ.
   P0-1 — Các dòng món là NGUỒN SỰ THẬT DUY NHẤT: tổng đoàn = tổng các dòng món
   (mỗi dòng làm tròn đồng chẵn trước khi cộng), nên bảng dòng món luôn cộng đúng
   bằng tổng đoàn ở mọi thời điểm, không còn 2 công thức song song lệch nhau. */
function orderCalc(b){
  const set=setOf(b.setId); if(!set) return null;
  const lines=set.dishes.map(did=>{
    const d=dish(did); if(!d) return null;
    const perPax=dishCostPerPax(d);
    return {dish:d, perPax, total: round0(perPax*b.guests)};
  }).filter(Boolean);
  const cost=lines.reduce((s,l)=>s+l.total,0);
  const revenue=set.price*b.guests;
  const costPerPax=b.guests?cost/b.guests:0;
  return {set,lines,costPerPax,cost,revenue,profit:revenue-cost,foodCost:revenue?cost/revenue:0};
}
/* Nhu cầu nguyên liệu cộng dồn cho tất cả đoàn trong ngày */
function dayNeeds(){
  const needs={};
  S.bookings.forEach(b=>{
    const set=setOf(b.setId); if(!set) return;
    set.dishes.forEach(did=>{
      const d=dish(did); if(!d) return;
      d.bom.forEach(([iid,qty,buf])=>{
        let q=qty*b.guests; if(buf) q*= (1+BUFFER);
        needs[iid]=(needs[iid]||0)+q;
      });
    });
  });
  Object.keys(needs).forEach(k=>needs[k]=round2(needs[k]));
  return needs;
}
/* Đã nhập hôm nay của 1 nguyên liệu (cộng dồn các phiếu nhập — đã cộng vào tồn kho). */
function receivedToday(ingId){
  return round2(S.receipts.reduce((s,r)=>s+r.items.reduce((a,[iid,q])=>a+(iid===ingId?q:0),0),0));
}
/* P0-4 — TỒN LÝ THUYẾT: MỘT định nghĩa duy nhất ở mọi màn hình:
   Tồn lý thuyết = Tồn hiện tại − Xuất (tiêu hao hôm nay).
   Tồn hiện tại đã gồm hàng nhập hôm nay (phiếu nhập cộng thẳng vào tồn),
   nên Tồn hiện tại = Tồn đầu + Nhập — không trừ nhập lần nữa, không ra tồn âm. */
function theoreticalRaw(ingId){
  const g=ing(ingId); if(!g) return 0;
  return round2(g.stock - (dayNeeds()[ingId]||0));
}
/* Tồn lý thuyết hiển thị: không bao giờ âm — phần thiếu tách ra cột "Thiếu". */
function theoretical(ingId){ return Math.max(0, theoreticalRaw(ingId)); }
/* Thiếu = phần nhu cầu vượt tồn (số dương), hiện riêng, không hiển thị như tồn âm. */
function shortage(ingId){
  const g=ing(ingId); if(!g) return 0;
  return Math.max(0, round2((dayNeeds()[ingId]||0) - g.stock));
}

/* P0-5 — Cọc = 30% doanh thu HIỆN TẠI, tính lại khi đổi số khách / đổi set.
   Không lưu cọc yêu cầu cố định nữa (số cũ trong dữ liệu mẫu không còn được đọc). */
const DEPOSIT_RATE=0.30;
function depositRequired(b){ const c=orderCalc(b); return c?round0(c.revenue*DEPOSIT_RATE):0; }
function depositShort(b){ return Math.max(0, depositRequired(b)-(b.depositPaid||0)); }

/* P0-6 — Lịch sử thu tiền: mỗi đoàn lưu DANH SÁCH các lần thu, không còn 1 con số tổng. */
function paymentRecords(bid){
  const v=S.payments[bid];
  if(Array.isArray(v)) return v;
  if(typeof v==="number" && v>0) return [{id:"old-"+bid,date:"—",cash:v,bank:0,total:v,note:"Dữ liệu cũ (trước khi có lịch sử thu)",role:"—"}];
  return [];
}
function paidTotal(bid){ return paymentRecords(bid).reduce((s,r)=>s+r.total,0); }
/* Tổng quan hôm nay */
function todayStats(){
  const guests=S.bookings.reduce((s,b)=>s+b.guests,0);
  let revenue=0,cost=0;
  S.bookings.forEach(b=>{ const c=orderCalc(b); if(c){revenue+=c.revenue;cost+=c.cost;} });
  const low=S.ingredients.filter(g=>g.stock<g.min).length;
  return {guests,revenue,cost,profit:revenue-cost,foodCost:revenue?cost/revenue:0,low};
}

/* ================= MODAL ================= */
function openModal(html){
  $("#modal").innerHTML=html;
  $("#modalBackdrop").hidden=false;
}
function closeModal(){ $("#modalBackdrop").hidden=true; }
$("#modalBackdrop").addEventListener("click",e=>{ if(e.target.id==="modalBackdrop") closeModal(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModal(); });

/* ================= ĐIỀU HƯỚNG ================= */
const NAV=[
  {sec:"Vận hành"},
  {id:"dashboard",label:"Tổng quan",icon:"▦"},
  {id:"bookings",label:"Booking đoàn",icon:"📅"},
  {id:"orders",label:"Đơn đoàn",icon:"🧾"},
  {id:"purchase",label:"Kế hoạch mua",icon:"🛒"},
  {id:"receiving",label:"Nhập kho",icon:"📦"},
  {id:"kds",label:"Bếp (KDS)",icon:"👨‍🍳"},
  {id:"payment",label:"Thu tiền",icon:"💳"},
  {sec:"Kiểm soát"},
  {id:"count",label:"Kiểm kê",icon:"📋"},
  {id:"reports",label:"Báo cáo",icon:"📊"},
  {id:"catalog",label:"Danh mục",icon:"🗂️"}
];
const ROLE_NAV={
  owner:["dashboard","bookings","orders","purchase","receiving","kds","payment","count","reports","catalog"],
  manager:["dashboard","bookings","orders","purchase","receiving","kds","payment","count","reports","catalog"],
  warehouse:["dashboard","purchase","receiving","count","catalog"],
  kitchen:["dashboard","orders","kds"]
};
const ROLE_NAMES={owner:"Chủ quán",manager:"Quản lý",warehouse:"Kho",kitchen:"Bếp"};
/* P0-7 — Quyền thao tác theo vai trò (chặn ở MỨC CODE, không chỉ ẩn menu).
   "*" = toàn quyền. Kho: nhập kho + kiểm kê + danh mục nguyên liệu/NCC. Bếp: xem đơn + KDS. */
const CAN={
  owner:["*"],
  manager:["*"],
  warehouse:["dashboard","purchase","receiving","count","catalog","close-modal","go-receiving",
    "new-receipt","add-receipt-line","add-count","save-count","count-input","count-note",
    "new-sup","edit-sup","del-sup"],
  kitchen:["dashboard","orders","kds","close-modal","kds-goto","order-detail","kds-next"]
};
function canAct(act){ const list=CAN[role]||[]; return list.includes("*")||list.includes(act); }
const PAGE_TITLES={
  dashboard:["Tổng quan",""], // tiêu đề phụ tính live trong refreshHeader()
  bookings:["Booking đoàn","Đoàn đặt trước — đầu vào của toàn bộ vận hành"],
  orders:["Đơn đoàn","Đổi số khách là cost, doanh thu, food cost tính lại ngay"],
  purchase:["Kế hoạch mua","Cộng dồn nhu cầu tất cả đoàn, trừ tồn kho, tách theo NCC"],
  receiving:["Nhập kho","Phiếu nhập theo nhà cung cấp, giá từng lần nhập"],
  kds:["Bếp (KDS)","Màn hình bếp: thẻ món theo đoàn, 1 chạm đổi trạng thái"],
  payment:["Thu tiền","Chốt đơn đoàn, đối soát tiền mặt / chuyển khoản trừ cọc"],
  count:["Kiểm kê cuối ngày","Nhập tồn thực tế — chênh lệch hiện ngay"],
  reports:["Báo cáo","Food cost theo đoàn / set / khách, thực tế vs định mức"],
  catalog:["Danh mục","Món, định mức BOM, nguyên liệu, NCC, bàn — tự quản lý trong app"]
};
/* P0-8 — Tiêu đề phụ của Tổng quan tính LIVE từ dữ liệu hiện tại (không ghi cứng). */
function refreshHeader(){
  const t=PAGE_TITLES[view]||["Tổng quan",""];
  $("#pageTitle").textContent=t[0];
  if(view==="dashboard"){
    const st=todayStats();
    /* Kho/Bếp không thấy doanh thu ở tiêu đề. */
    const hideMoney=(role==="warehouse"||role==="kitchen");
    $("#pageSub").textContent="Hôm nay · "+S.bookings.length+" đoàn · "+st.guests.toLocaleString("vi-VN")+" khách"+(hideMoney?"":" · "+money(st.revenue));
  } else $("#pageSub").textContent=t[1];
}
function renderNav(){
  const allowed=ROLE_NAV[role];
  let h="";
  NAV.forEach(n=>{
    if(n.sec){ h+='<div class="nav-sec">'+n.sec+'</div>'; return; }
    if(!allowed.includes(n.id)) return;
    h+='<button data-nav="'+n.id+'" class="'+(view===n.id?"active":"")+'"><span class="ic">'+n.icon+'</span>'+n.label+'</button>';
  });
  $("#nav").innerHTML=h;
  refreshHeader();
}
function go(v){
  if(!ROLE_NAV[role].includes(v)) v=ROLE_NAV[role][0];
  view=v; renderNav(); render(); $("#sidebar").classList.remove("open"); $("#sidebarBackdrop").hidden=true;
}

/* ================= RENDER: TỔNG QUAN ================= */
function vDashboard(){
  const st=todayStats();
  const lowItems=S.ingredients.filter(g=>g.stock<g.min);
  const hideMoney=(role==="warehouse"||role==="kitchen"); // P0-7: Kho/Bếp không thấy doanh thu, lãi, cọc
  let h='<div class="grid grid-4">';
  h+='<div class="card kpi accent"><div class="kpi-label">Khách hôm nay</div><div class="kpi-value">'+st.guests.toLocaleString("vi-VN")+'</div><div class="kpi-hint">'+S.bookings.length+' đoàn · '+S.bookings.map(b=>b.time).join(" · ")+'</div></div>';
  if(!hideMoney){
    h+='<div class="card kpi"><div class="kpi-label">Doanh thu dự kiến</div><div class="kpi-value">'+money(st.revenue)+'</div><div class="kpi-hint">Theo set menu đã chốt</div></div>';
    h+='<div class="card kpi"><div class="kpi-label">Food cost dự kiến</div><div class="kpi-value">'+pct(st.foodCost*100)+'</div><div class="kpi-hint">Chi phí NL: '+money(st.cost)+' · Lãi: '+money(st.profit)+'</div></div>';
  }
  h+='<div class="card kpi '+(st.low?'alert':'')+'"><div class="kpi-label">Nguyên liệu dưới mức tối thiểu</div><div class="kpi-value">'+st.low+'</div><div class="kpi-hint">Cần đặt mua ngay trong hôm nay</div></div></div>';

  h+='<div class="section-head"><div><h2>Đoàn hôm nay</h2><p>Nhấn vào đoàn để xem đơn đoàn và điều chỉnh số khách.</p></div><button class="btn btn-primary btn-sm" data-act="new-booking">+ Thêm booking</button></div>';
  h+='<div class="grid grid-3">';
  S.bookings.forEach(b=>{
    const c=orderCalc(b); if(!c) return;
    const req=depositRequired(b);
    const remain=depositShort(b);
    h+='<div class="card"><div style="display:flex;justify-content:space-between;gap:8px"><h3>'+esc(b.name)+'</h3><span class="chip chip-blue">'+esc(b.time)+'</span></div>'
      +'<p class="muted small">'+esc(b.guests)+' khách · '+esc(setLabel(c.set,hideMoney))+(!hideMoney?' · '+money(c.set.price)+'/khách':'')+'</p>';
    if(!hideMoney){
      h+='<p><strong>Doanh thu:</strong> '+money(c.revenue)+' · <strong>Food cost:</strong> '+pct(c.foodCost*100)+'</p>'
      +'<p><strong>Cọc:</strong> '+money(b.depositPaid)+' / '+money(req)+(remain>0?' · <span style="color:var(--red)">còn thiếu cọc '+money(remain)+'</span>':' · <span style="color:var(--green)">đủ cọc</span>')+'</p>';
    }
    h+='<div class="btn-row">';
    if(role==="kitchen") h+='<button class="btn btn-primary btn-sm" data-act="open-order" data-id="'+b.id+'">Xem đơn đoàn →</button>';
    else if(!hideMoney) h+='<button class="btn btn-primary btn-sm" data-act="open-order" data-id="'+b.id+'">Xem đơn đoàn →</button>'
      +'<button class="btn btn-ghost btn-sm" data-act="edit-booking" data-id="'+b.id+'">Sửa</button>';
    h+='</div></div>';
  });
  h+='</div>';

  if(lowItems.length){
    h+='<div class="section-head"><div><h2>⚠ Cảnh báo tồn kho thấp</h2><p>Các nguyên liệu dưới mức tối thiểu — đã đưa vào kế hoạch mua.</p></div></div>';
    h+='<div class="card"><div class="tblwrap"><table><thead><tr><th>Nguyên liệu</th><th>Loại</th><th class="num">Tồn hiện tại</th><th class="num">Mức tối thiểu</th><th>Nhà cung cấp</th></tr></thead><tbody>';
    lowItems.forEach(g=>{
      h+='<tr><td><strong>'+esc(g.name)+'</strong></td><td>'+esc(CATS[g.cat]||g.cat)+'</td><td class="num" style="color:var(--red)">'+num(g.stock)+' '+esc(g.unit)+'</td><td class="num">'+num(g.min)+' '+esc(g.unit)+'</td><td>'+esc(supplier(g.supplier)?.name||"")+'</td></tr>';
    });
    h+='</tbody></table></div></div>';
  }

  // P0-7: biểu đồ food cost là thông tin nhạy cảm — Kho/Bếp không thấy.
  if(!hideMoney){
    h+='<div class="section-head"><div><h2>Food cost 7 ngày gần nhất</h2><p>Thực tế vs định mức theo ngày.</p></div></div>';
    h+='<div class="card">';
    S.history.forEach(r=>{
      const fc=r.revenue?r.cost/r.revenue*100:0;
      h+='<div class="bar-row"><span class="bar-label">'+esc(r.date)+' · '+r.guests+' khách</span><div class="bar-track"><div class="bar-fill" style="width:'+Math.min(100,fc*2.2)+'%"></div></div><span class="bar-val">'+pct(fc)+'</span></div>';
    });
    const fcs=S.history.map(r=>r.revenue?r.cost/r.revenue*100:0);
    const lo=fcs.length?Math.min(...fcs):0, hi=fcs.length?Math.max(...fcs):0;
    h+='<p class="muted small">Food cost 7 ngày dao động '+pct(lo)+'–'+pct(hi)+' — trong ngưỡng kiểm soát.</p></div>';
  }

  // P0-7 — Nhật ký thao tác, chỉ Chủ quán / Quản lý thấy.
  if(role==="owner"||role==="manager"){
    h+='<div class="section-head"><div><h2>Nhật ký thao tác</h2><p>Ai đã làm gì, lúc nào — 30 dòng gần nhất.</p></div></div>';
    h+='<div class="card"><div class="tblwrap"><table><thead><tr><th>Thời gian</th><th>Vai trò</th><th>Hành động</th><th>Chi tiết</th></tr></thead><tbody>';
    (S.audit||[]).slice(0,30).forEach(a=>{
      h+='<tr><td>'+esc(a.time)+'</td><td>'+esc(ROLE_NAMES[a.role]||a.role)+'</td><td><strong>'+esc(a.action)+'</strong></td><td>'+esc(a.detail||"")+'</td></tr>';
    });
    if(!(S.audit||[]).length) h+='<tr><td colspan="4" class="muted">Chưa có thao tác nào được ghi.</td></tr>';
    h+='</tbody></table></div></div>';
  }
  return h;
}

/* ================= RENDER: BOOKING ================= */
function vBookings(){
  const canEdit=canAct("edit-booking");
  let h=canEdit?'<div class="btn-row" style="margin-top:0"><button class="btn btn-primary" data-act="new-booking">+ Thêm booking đoàn</button></div>':'';
  h+='<div class="card" style="margin-top:16px"><div class="tblwrap"><table><thead><tr><th>Đoàn</th><th>Giờ ăn</th><th class="num">Số khách</th><th>Set menu</th><th class="num">Doanh thu</th><th class="num">Cọc đã nhận</th><th class="num">Còn thiếu cọc</th><th></th></tr></thead><tbody>';
  S.bookings.forEach(b=>{
    const c=orderCalc(b); if(!c) return;
    const remain=depositShort(b);
    h+='<tr><td><strong>'+esc(b.name)+'</strong><div class="muted small">'+esc(b.phone)+' · '+esc(b.note||"")+'</div></td>'
      +'<td>'+esc(b.time)+'</td><td class="num"><strong>'+b.guests+'</strong></td>'
      +'<td>'+esc(c.set.name)+'</td><td class="num">'+money(c.revenue)+'</td>'
      +'<td class="num">'+money(b.depositPaid)+'</td>'
      +'<td class="num" style="color:'+(remain>0?'var(--red)':'var(--green)')+'">'+money(remain)+'</td>'
      +'<td><button class="btn btn-primary btn-sm" data-act="open-order" data-id="'+b.id+'">Đơn đoàn</button>'+(canEdit?' <button class="btn btn-ghost btn-sm" data-act="edit-booking" data-id="'+b.id+'">Sửa</button> <button class="btn btn-ghost btn-sm" data-act="del-booking" data-id="'+b.id+'">Xóa</button>':'')+'</td></tr>';
  });
  h+='</tbody></table></div></div>';
  h+='<div class="note" style="margin-top:14px">Booking là đầu vào của toàn bộ luồng: từ booking → đơn đoàn tự tính cost → kế hoạch mua → bếp → thu tiền → kiểm kê.<br><strong>Còn thiếu cọc</strong> = phần cọc 30% chưa nhận đủ — chưa phải tổng tiền ăn còn phải thu (xem ở mục Thu tiền).</div>';
  return h;
}
function bookingForm(b){
  const isNew=!b;
  const setOpts=S.sets.map(s=>'<option value="'+s.id+'" '+(b&&b.setId===s.id?"selected":"")+'>'+esc(s.name)+'</option>').join("");
  openModal('<h3>'+(isNew?"Thêm booking đoàn":"Sửa booking đoàn")+'</h3><p class="modal-sub">Điền thông tin đoàn khách đặt trước.</p>'
    +'<form id="bookingForm" data-id="'+(b?b.id:"")+'"><div class="form-grid">'
    +'<div><label>Tên đoàn *</label><input name="name" required value="'+esc(b?.name||"")+'"></div>'
    +'<div><label>Số điện thoại</label><input name="phone" value="'+esc(b?.phone||"")+'"></div>'
    +'<div><label>Giờ ăn</label><input name="time" type="time" value="'+esc(b?.time||"11:30")+'"></div>'
    +'<div><label>Số khách *</label><input name="guests" type="number" min="1" required value="'+(b?.guests||100)+'"></div>'
    +'<div><label>Set menu *</label><select name="setId">'+setOpts+'</select></div>'
    +'<div><label>Cọc yêu cầu (đ) — tự tính 30% doanh thu</label><input disabled value="'+(b?money(depositRequired(b)):"Tính sau khi lưu")+'"></div>'
    +'<div><label>Đã nhận cọc (đ)</label><input name="depositPaid" type="number" min="0" value="'+(b?.depositPaid||0)+'"></div>'
    +'<div class="full"><label>Ghi chú</label><input name="note" value="'+esc(b?.note||"")+'"></div>'
    +'</div><div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Lưu booking</button></div></form>');
}

/* ================= RENDER: ĐƠN ĐOÀN ================= */
function vOrders(){
  /* Bếp xem đơn đoàn để biết nấu gì — không thấy tiền (giá suất, doanh thu, cost, lãi, food cost). */
  const hideMoney=(role==="warehouse"||role==="kitchen");
  let h='<div class="note">Đơn đoàn được tạo từ booking. <strong>Đổi số khách</strong> là toàn bộ định mức BOM, chi phí nguyên liệu, doanh thu, food cost và lợi nhuận tính lại ngay lập tức.</div>';
  h+='<div class="grid grid-2" style="margin-top:16px">';
  S.bookings.forEach(b=>{
    const c=orderCalc(b); if(!c) return;
    h+='<div class="card"><div style="display:flex;justify-content:space-between;gap:8px"><h3>'+esc(b.name)+'</h3><span class="chip chip-blue">'+esc(b.time)+'</span></div>'
      +'<p class="muted small">'+esc(setLabel(c.set,hideMoney))+(hideMoney?'':' · '+money(c.set.price)+'/khách')+'</p>'
      +(hideMoney?'':'<div class="grid grid-3" style="gap:10px;margin:12px 0">'
      +'<div><div class="muted small">Doanh thu</div><strong>'+money(c.revenue)+'</strong></div>'
      +'<div><div class="muted small">Chi phí NL</div><strong>'+money(c.cost)+'</strong></div>'
      +'<div><div class="muted small">Lợi nhuận</div><strong style="color:var(--green)">'+money(c.profit)+'</strong></div></div>'
      +'<div class="kpi" style="background:var(--emerald-soft);border-radius:12px;padding:12px 14px"><div class="kpi-label">Food cost</div><div class="kpi-value" style="font-size:26px">'+pct(c.foodCost*100)+'</div><div class="kpi-hint">Chi phí NL / khách: '+money(c.costPerPax)+'</div></div>')
      +'<div class="btn-row"><button class="btn btn-primary btn-sm" data-act="order-detail" data-id="'+b.id+'">Chi tiết & đổi số khách</button>'
      +'<button class="btn btn-ghost btn-sm" data-act="kds-goto" data-id="'+b.id+'">→ Xem bếp</button></div></div>';
  });
  h+='</div>';
  return h;
}
/* Dòng chi phí từng món trong modal đơn đoàn: lấy trực tiếp từ orderCalc().lines
   (cùng nguồn với tổng đoàn) nên bảng luôn cộng đúng bằng tổng đoàn. */
function orderDishRows(c){
  return c.lines.map(l=>{
    return '<tr><td><strong>'+esc(l.dish.name)+'</strong><div class="muted small">'+esc(l.dish.cat)+'</div></td><td class="num">'+money(l.perPax)+'</td><td class="num">'+money(l.total)+'</td></tr>';
  }).join("");
}
function orderDetail(id){
  const b=booking(id); if(!b) return;
  const c=orderCalc(b); if(!c) return;
  selectedOrderId=id;
  const editable=canAct("save-guests");
  /* Bếp chỉ xem tên món + số khách — không thấy tiền (hộp tổng + cột cost). */
  const rows=editable?orderDishRows(c):c.lines.map(l=>'<tr><td><strong>'+esc(l.dish.name)+'</strong><div class="muted small">'+esc(l.dish.cat)+'</div></td></tr>').join("");
  openModal('<h3>Đơn đoàn — '+esc(b.name)+'</h3><p class="modal-sub">'+esc(setLabel(c.set,!editable))+' · '+esc(b.time)+(editable?' · Đổi số khách để xem mọi con số tính lại ngay.':'')+'</p>'
    +'<label>Số khách</label><div style="display:flex;gap:10px;align-items:center"><input id="orderGuests" type="number" min="1" value="'+b.guests+'" style="max-width:150px"'+(editable?"":" disabled")+'> <span class="muted">khách</span></div>'
    +(editable?"":'<p class="muted small">Chế độ chỉ xem — vai '+esc(ROLE_NAMES[role])+' không được đổi số khách.</p>')
    +(editable?'<div id="orderCalcBox" style="margin-top:14px"></div>':'')
    +'<div class="tblwrap" style="margin-top:12px;max-height:260px;overflow:auto"><table><thead><tr><th>Món</th>'+(editable?'<th class="num">Cost / khách</th><th class="num">Cost tổng</th>':'')+'</tr></thead><tbody id="orderDishRows">'+rows+'</tbody></table></div>'
    +'<div class="btn-row"><button class="btn btn-ghost" data-act="close-modal">Đóng</button>'+(editable?'<button class="btn btn-primary" data-act="save-guests" data-id="'+b.id+'">Lưu số khách mới</button>':'')+'</div>');
  if(editable) updateOrderCalcBox(b.id);
}
function updateOrderCalcBox(id){
  const b=booking(id); if(!b) return;
  const input=$("#orderGuests"); if(!input) return;
  const g=parseInt(input.value,10)||0;
  const tmp={...b,guests:g};
  const c=orderCalc(tmp); if(!c) return;
  const box=$("#orderCalcBox"); if(!box) return;
  box.innerHTML='<div class="grid grid-3" style="gap:10px"><div class="card" style="padding:12px"><div class="muted small">Doanh thu</div><strong>'+money(c.revenue)+'</strong></div>'
    +'<div class="card" style="padding:12px"><div class="muted small">Chi phí NL</div><strong>'+money(c.cost)+'</strong></div>'
    +'<div class="card" style="padding:12px"><div class="muted small">Food cost / Lợi nhuận</div><strong>'+pct(c.foodCost*100)+'</strong> · <strong style="color:var(--green)">'+money(c.profit)+'</strong></div></div>';
  // Tính lại cả các dòng chi phí từng món theo số khách mới (cùng nguồn orderCalc với tổng đoàn).
  const rowsEl=$("#orderDishRows");
  if(rowsEl) rowsEl.innerHTML=orderDishRows(c);
}

/* ================= RENDER: KẾ HOẠCH MUA ================= */
function vPurchase(){
  /* Kho chỉ cần biết MUA GÌ + BAO NHIÊU — không thấy tiền (giá vốn, thành tiền, tổng tiền). */
  const hideMoney=(role==="warehouse");
  const needs=dayNeeds();
  // gom theo NCC
  const bySup={};
  Object.keys(needs).forEach(iid=>{
    const g=ing(iid); if(!g) return;
    const need=needs[iid];
    const toBuy=Math.max(0, need - g.stock);
    if(toBuy<=0.001) return;
    (bySup[g.supplier]=bySup[g.supplier]||[]).push({g,need,toBuy});
  });
  let total=0;
  let h='<div class="note">Nhu cầu = cộng dồn định mức của tất cả đoàn hôm nay (đã cộng 15% dự phòng cho rau/mỳ lẩu gọi thêm miễn phí) − tồn kho hiện tại. Chỉ hiện nguyên liệu cần mua thêm.</div>';
  Object.keys(bySup).forEach(supId=>{
    const sup=supplier(supId);
    const items=bySup[supId];
    const sub=items.reduce((s,x)=>s+x.toBuy*x.g.price,0); total+=sub;
    h+='<div class="section-head"><div><h2>'+esc(sup?.name||"NCC")+'</h2><p>'+esc(sup?.phone||"")+' · '+esc(sup?.note||"")+'</p></div>'+(hideMoney?"":'<strong>'+money(sub)+'</strong>')+'</div>';
    h+='<div class="card"><div class="tblwrap"><table><thead><tr><th>Nguyên liệu</th><th class="num">Cần cho hôm nay</th><th class="num">Tồn kho</th><th class="num">Cần mua</th>'+(hideMoney?'':'<th class="num">Giá vốn bình quân</th><th class="num">Thành tiền</th>')+'</tr></thead><tbody>';
    items.forEach(({g,need,toBuy})=>{
      h+='<tr><td><strong>'+esc(g.name)+'</strong></td><td class="num">'+num(need)+' '+esc(g.unit)+'</td><td class="num">'+num(g.stock)+' '+esc(g.unit)+'</td><td class="num"><strong>'+num(toBuy)+' '+esc(g.unit)+'</strong></td>'+(hideMoney?'':'<td class="num">'+money(g.price)+'/'+esc(g.unit)+'</td><td class="num">'+money(toBuy*g.price)+'</td>')+'</tr>';
    });
    h+='</tbody></table></div></div>';
  });
  if(!Object.keys(bySup).length) h+='<div class="card empty">Tồn kho đủ cho tất cả đoàn hôm nay — không cần mua thêm.</div>';
  else h+='<div class="card" style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">'+(hideMoney?'':'<div><strong>Tổng dự kiến mua:</strong> <span style="font-size:20px">'+money(total)+'</span></div>')+'<button class="btn btn-gold" data-act="go-receiving">→ Sang nhập kho</button></div>';
  return h;
}

/* ================= RENDER: NHẬP KHO ================= */
function vReceiving(){
  let h='<div class="btn-row" style="margin-top:0"><button class="btn btn-primary" data-act="new-receipt">+ Tạo phiếu nhập</button></div>';
  h+='<div class="card" style="margin-top:16px"><div class="tblwrap"><table><thead><tr><th>Phiếu</th><th>Nhà cung cấp</th><th>Thời gian</th><th>Mặt hàng</th><th class="num">Giá trị</th><th>Ghi chú</th></tr></thead><tbody>';
  S.receipts.forEach(r=>{
    const sup=supplier(r.supplier);
    const total=r.items.reduce((s,[iid,q,p])=>s+q*p,0);
    const items=r.items.map(([iid,q])=>esc(ing(iid)?.name||iid)+' '+num(q)+' '+(ing(iid)?.unit||"")).join(" · ");
    h+='<tr><td><strong>'+esc(r.id.toUpperCase())+'</strong></td><td>'+esc(sup?.name||"")+'</td><td>'+esc(r.date)+'</td><td>'+items+'</td><td class="num">'+money(total)+'</td><td>'+esc(r.note||"")+'</td></tr>';
  });
  h+='</tbody></table></div></div>';
  h+='<div class="note" style="margin-top:14px">Phiếu nhập ghi số lượng thực nhận và giá của từng lần nhập. Tồn kho tự cộng sau khi lưu; giá vốn = bình quân gia quyền (tồn cũ × giá cũ + nhập × giá nhập) / tổng tồn — hiển thị ở Danh mục với nhãn "Giá vốn bình quân".</div>';
  return h;
}
function receiptForm(){
  const supOpts=S.suppliers.map(s=>'<option value="'+s.id+'">'+esc(s.name)+'</option>').join("");
  const ingOpts=S.ingredients.map(g=>'<option value="'+g.id+'">'+esc(g.name)+' ('+esc(g.unit)+')</option>').join("");
  openModal('<h3>Tạo phiếu nhập</h3><p class="modal-sub">Nhập hàng từ nhà cung cấp — tồn kho tự cộng sau khi lưu.</p>'
    +'<form id="receiptForm"><label>Nhà cung cấp</label><select name="supplier">'+supOpts+'</select>'
    +'<label>Ghi chú</label><input name="note" placeholder="VD: Hải sản buổi sáng">'
    +'<label>Nguyên liệu nhập</label><div id="receiptLines">'
    +'<div class="bom-row"><select name="ing">'+ingOpts+'</select><input name="qty" type="number" step="0.01" min="0" placeholder="Số lượng" value="1"><input name="price" type="number" min="0" placeholder="Giá/đơn vị"></div>'
    +'</div><button type="button" class="btn btn-ghost btn-sm" data-act="add-receipt-line">+ Thêm dòng</button>'
    +'<div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Lưu phiếu nhập</button></div></form>');
}

/* ================= RENDER: BẾP (KDS) ================= */
function kdsKey(orderId,dishId){ return orderId+"|"+dishId; }
function kdsStatus(orderId,dishId){ return S.kds[kdsKey(orderId,dishId)] || "waiting"; }
function vKds(){
  const counts={waiting:0,cooking:0,done:0};
  let cards="";
  S.bookings.forEach(b=>{
    const set=setOf(b.setId); if(!set) return;
    set.dishes.forEach(did=>{
      const d=dish(did); if(!d) return;
      const st=kdsStatus(b.id,did); counts[st]++;
      const label=st==="waiting"?"Chờ nấu":st==="cooking"?"Đang nấu":"Đã xong";
      const chip=st==="waiting"?"chip-amber":st==="cooking"?"chip-blue":"chip-green";
      const btn=st==="waiting"?'Bắt đầu nấu':st==="cooking"?'Đánh dấu xong':'Đã xong ✓';
      cards+='<div class="kds-card '+st+'"><div class="kds-top"><h4>'+esc(d.name)+'</h4><span class="chip '+chip+'">'+label+'</span></div>'
        +'<div class="kds-meta"><strong>'+esc(b.name)+'</strong> · '+esc(b.time)+' · <strong>'+b.guests+' khách</strong><br>Loại: '+esc(d.cat)+'</div>'
        +'<button class="btn '+(st==="done"?"btn-ghost":"btn-primary")+' btn-sm kds-btn" data-act="kds-next" data-order="'+b.id+'" data-dish="'+did+'" '+(st==="done"?"disabled":"")+'>'+btn+'</button></div>';
    });
  });
  let h='<div class="grid grid-3"><div class="card kpi"><div class="kpi-label">Chờ nấu</div><div class="kpi-value">'+counts.waiting+'</div></div>'
    +'<div class="card kpi"><div class="kpi-label">Đang nấu</div><div class="kpi-value">'+counts.cooking+'</div></div>'
    +'<div class="card kpi"><div class="kpi-label">Đã xong</div><div class="kpi-value">'+counts.done+'</div></div></div>';
  h+='<div class="legend" style="margin-top:16px"><span>🟡 Chờ nấu</span><span>🔵 Đang nấu</span><span>🟢 Đã xong</span><span class="muted">Bấm 1 chạm để chuyển trạng thái.</span></div>';
  h+='<div class="kds-grid" style="margin-top:14px">'+(cards||'<div class="card empty">Chưa có món nào cho bếp hôm nay.</div>')+'</div>';
  return h;
}

/* ================= RENDER: THU TIỀN ================= */
function vPayment(){
  let h='<div class="card"><div class="tblwrap"><table><thead><tr><th>Đoàn</th><th class="num">Doanh thu</th><th class="num">Đã cọc</th><th class="num">Còn phải thu</th><th>Trạng thái</th><th></th></tr></thead><tbody>';
  S.bookings.forEach(b=>{
    const c=orderCalc(b); if(!c) return;
    const paid=paidTotal(b.id);
    const remain=c.revenue - b.depositPaid - paid;
    const done=remain<=0;
    h+='<tr><td><strong>'+esc(b.name)+'</strong><div class="muted small">'+esc(b.time)+' · '+b.guests+' khách · '+esc(c.set.name)+'</div></td>'
      +'<td class="num">'+money(c.revenue)+'</td><td class="num">'+money(b.depositPaid)+'</td>'
      +'<td class="num" style="color:'+(done?'var(--green)':'var(--red)')+'"><strong>'+money(Math.max(0,remain))+'</strong></td>'
      +'<td>'+(done?'<span class="chip chip-green">Đã thu đủ</span>':'<span class="chip chip-amber">Chờ thu</span>')+'</td>'
      +'<td>'+(done?'<button class="btn btn-ghost btn-sm" data-act="pay-detail" data-id="'+b.id+'">Xem lịch sử</button>':'<button class="btn btn-primary btn-sm" data-act="pay-detail" data-id="'+b.id+'">Thu tiền</button>')+'</td></tr>';
  });
  h+='</tbody></table></div></div>';
  h+='<div class="note" style="margin-top:14px">Thu tiền = doanh thu − cọc đã nhận − số đã thu trước đó. Đối soát tiền mặt / chuyển khoản ở form thu tiền.</div>';
  return h;
}
/* P0-6 — Lịch sử thu tiền của 1 đoàn (dùng chung cho modal thu tiền và modal lịch sử). */
function payHistoryHtml(b){
  const recs=paymentRecords(b.id);
  let h='<h4 style="margin:16px 0 8px">Lịch sử thu</h4>';
  if(!recs.length){ h+='<p class="muted small">Chưa có khoản thu nào cho đoàn này.</p>'; return h; }
  h+='<div class="tblwrap"><table><thead><tr><th>Thời gian</th><th class="num">Tiền mặt</th><th class="num">Chuyển khoản</th><th class="num">Tổng</th><th>Ghi chú</th><th>Người ghi</th><th></th></tr></thead><tbody>';
  recs.forEach(r=>{
    h+='<tr><td>'+esc(r.date)+'</td><td class="num">'+money(r.cash)+'</td><td class="num">'+money(r.bank)+'</td><td class="num"><strong>'+money(r.total)+'</strong></td><td>'+esc(r.note||"")+'</td><td>'+esc(ROLE_NAMES[r.role]||r.role||"")+'</td>'
      +'<td><button class="btn btn-ghost btn-sm" data-act="edit-pay" data-id="'+b.id+'" data-pay="'+r.id+'">Sửa</button> <button class="btn btn-ghost btn-sm" data-act="del-pay" data-id="'+b.id+'" data-pay="'+r.id+'">Xóa</button></td></tr>';
  });
  h+='</tbody></table></div>';
  return h;
}
function payDetail(id){
  const b=booking(id); if(!b) return;
  const c=orderCalc(b); if(!c) return;
  const paid=paidTotal(b.id);
  const remain=c.revenue - b.depositPaid - paid;
  let h='<h3>Thu tiền — '+esc(b.name)+'</h3><p class="modal-sub">'+esc(c.set.name)+' · '+b.guests+' khách · '+esc(b.time)+'</p>'
    +'<div class="grid grid-3" style="gap:10px"><div class="card" style="padding:12px"><div class="muted small">Doanh thu</div><strong>'+money(c.revenue)+'</strong></div>'
    +'<div class="card" style="padding:12px"><div class="muted small">Đã cọc</div><strong>'+money(b.depositPaid)+'</strong></div>'
    +'<div class="card" style="padding:12px"><div class="muted small">Còn phải thu</div><strong style="color:var(--red)">'+money(Math.max(0,remain))+'</strong></div></div>';
  if(remain>0){
    h+='<form id="payForm" data-id="'+b.id+'" style="margin-top:14px"><div class="form-grid">'
      +'<div><label>Tiền mặt (đ)</label><input name="cash" type="number" min="0" value="'+Math.max(0,remain)+'"></div>'
      +'<div><label>Chuyển khoản (đ)</label><input name="bank" type="number" min="0" value="0"></div>'
      +'<div class="full"><label>Ghi chú</label><input name="note" placeholder="VD: Khách thanh toán đủ sau bữa ăn"></div></div>'
      +'<div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Xác nhận đã thu</button></div></form>';
  } else {
    h+='<p class="muted small" style="margin-top:14px">Đoàn đã thu đủ — dưới đây là lịch sử các lần thu.</p>';
  }
  h+=payHistoryHtml(b);
  h+='<div class="btn-row"><button class="btn btn-ghost" data-act="close-modal">Đóng</button></div>';
  openModal(h);
}
function payEditForm(bid, recId){
  const b=booking(bid); if(!b) return;
  const rec=paymentRecords(bid).find(r=>r.id===recId); if(!rec) return;
  openModal('<h3>Sửa khoản thu — '+esc(b.name)+'</h3><p class="modal-sub">Đã thu lúc: '+esc(rec.date)+'</p>'
    +'<form id="payEditForm" data-id="'+bid+'" data-pay="'+recId+'"><div class="form-grid">'
    +'<div><label>Tiền mặt (đ)</label><input name="cash" type="number" min="0" value="'+rec.cash+'"></div>'
    +'<div><label>Chuyển khoản (đ)</label><input name="bank" type="number" min="0" value="'+rec.bank+'"></div>'
    +'<div class="full"><label>Ghi chú</label><input name="note" value="'+esc(rec.note||"")+'"></div></div>'
    +'<div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Lưu thay đổi</button></div></form>');
}

/* ================= RENDER: KIỂM KÊ ================= */
/* Ô chênh lệch của 1 dòng kiểm kê (dùng chung cho render lần đầu và cập nhật khi gõ). */
function countDiffCells(ct){
  const g=ing(ct.ing); if(!g) return {diffHtml:"—",valHtml:"—",color:"inherit"};
  if(ct.actual==null) return {diffHtml:"—",valHtml:"—",color:"inherit"};
  const th=theoretical(ct.ing);
  const diff=round2(ct.actual-th);
  const color=diff<0?'var(--red)':diff>0?'var(--amber)':'var(--green)';
  return {
    diffHtml:'<strong>'+(diff>0?"+":"")+num(diff)+' '+esc(g.unit)+'</strong>',
    valHtml:money(round0(diff*g.price)),
    color
  };
}
/* Trạng thái đếm của 1 dòng kiểm kê: rõ ràng dòng nào đã đếm / chưa đếm. */
function countStatusHtml(ct){
  return ct.actual==null
    ? '<span class="muted">○ Chưa đếm</span>'
    : '<span style="color:var(--green)">✓ Đã đếm</span>';
}
function vCount(){
  let h='<div class="note">Nhập tồn thực tế đếm được cuối ngày — hệ thống tự so với tồn lý thuyết và báo chênh lệch ngay.<br><strong>Tồn lý thuyết = Tồn hiện tại (đã gồm hàng nhập hôm nay) − Xuất</strong> (cùng định nghĩa ở mọi màn hình). Khi nhu cầu vượt tồn, phần thiếu hiện riêng ở cột "Thiếu", tồn hiển thị tối thiểu 0 — không còn tồn âm. Ô Tồn thực tế để trống = chưa đếm. Bấm <strong>Lưu phiếu kiểm kê</strong> để chỉ chốt các dòng đã đếm.</div>';
  h+='<div class="card" style="margin-top:16px"><div class="tblwrap"><table><thead><tr><th>Nguyên liệu</th><th class="num">Tồn lý thuyết</th><th class="num">Thiếu</th><th class="num">Tồn thực tế</th><th>Trạng thái</th><th class="num">Chênh lệch</th><th class="num">Giá trị chênh lệch</th><th>Ghi chú</th></tr></thead><tbody>';
  S.counts.forEach((ct,idx)=>{
    const g=ing(ct.ing); if(!g) return;
    const th=theoretical(ct.ing);
    const sh=shortage(ct.ing);
    const cells=countDiffCells(ct);
    h+='<tr><td><strong>'+esc(g.name)+'</strong><div class="muted small">'+esc(CATS[g.cat]||g.cat)+' · '+esc(g.unit)+'</div></td>'
      +'<td class="num">'+num(th)+' '+esc(g.unit)+'</td>'
      +'<td class="num" style="color:'+(sh>0?'var(--red)':'inherit')+'">'+(sh>0?num(sh)+' '+esc(g.unit):'—')+'</td>'
      +'<td class="num"><input type="number" step="0.01" min="0" value="'+(ct.actual==null?"":String(round2(ct.actual)))+'" data-act="count-input" data-idx="'+idx+'" placeholder="Chưa đếm" style="width:110px;text-align:right"></td>'
      +'<td class="count-status">'+countStatusHtml(ct)+'</td>'
      +'<td class="num count-diff" style="color:'+cells.color+'">'+cells.diffHtml+'</td>'
      +'<td class="num count-val" style="color:'+cells.color+'">'+cells.valHtml+'</td>'
      +'<td><input type="text" value="'+esc(ct.note||"")+'" data-act="count-note" data-idx="'+idx+'" placeholder="Ghi chú"></td></tr>';
  });
  h+='</tbody></table></div>';
  h+='<div class="btn-row"><button class="btn btn-primary" data-act="add-count">+ Thêm nguyên liệu kiểm kê</button><button class="btn btn-gold" data-act="save-count">Lưu phiếu kiểm kê</button></div></div>';
  const totalVar=S.counts.reduce((s,ct)=>{ const g=ing(ct.ing); if(!g||ct.actual==null) return s; return s+round0(round2(ct.actual-theoretical(ct.ing))*g.price); },0);
  h+='<div class="card" style="margin-top:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><span><strong>Tổng giá trị chênh lệch (chỉ các dòng đã đếm):</strong></span><strong id="countTotal" style="color:'+(totalVar<0?'var(--red)':'var(--green)')+'">'+money(totalVar)+'</strong></div>';

  // Phiếu kiểm kê đã chốt — xem lại được.
  h+='<div class="section-head"><div><h2>Phiếu kiểm kê đã lưu</h2><p>Các lần chốt tồn trước đây.</p></div></div>';
  if(!(S.countSheets||[]).length){
    h+='<div class="card empty">Chưa có phiếu kiểm kê nào được lưu.</div>';
  } else {
    (S.countSheets||[]).forEach(sh=>{
      h+='<div class="card" style="margin-top:10px"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><strong>Phiếu kiểm kê — '+esc(sh.date)+'</strong><strong style="color:'+(sh.totalVar<0?'var(--red)':'var(--green)')+'">Chênh lệch: '+money(sh.totalVar)+'</strong></div><div class="tblwrap" style="margin-top:8px"><table><thead><tr><th>Nguyên liệu</th><th class="num">Tồn lý thuyết</th><th class="num">Tồn thực tế</th><th class="num">Chênh lệch</th><th class="num">Giá trị</th><th>Ghi chú</th></tr></thead><tbody>';
      sh.lines.forEach(l=>{
        const g=ing(l.ing);
        h+='<tr><td><strong>'+esc(g?.name||l.ing)+'</strong></td><td class="num">'+num(l.theoretical)+' '+(g?esc(g.unit):"")+'</td><td class="num">'+num(l.actual)+' '+(g?esc(g.unit):"")+'</td><td class="num">'+(l.diff>0?"+":"")+num(l.diff)+' '+(g?esc(g.unit):"")+'</td><td class="num">'+money(l.value)+'</td><td>'+esc(l.note||"")+'</td></tr>';
      });
      h+='</tbody></table></div></div>';
    });
  }
  return h;
}

/* ================= RENDER: BÁO CÁO ================= */
function vReports(){
  // Food cost theo set
  let setRows=S.sets.map(s=>{
    const cpp=setCostPerPax(s);
    return {s,cpp,fc:s.price?cpp/s.price:0};
  }).sort((a,b)=>b.fc-a.fc);
  let h='<div class="section-head"><div><h2>Food cost theo set menu</h2><p>Chi phí nguyên liệu / khách chia cho giá bán / khách.</p></div></div>';
  h+='<div class="card"><div class="tblwrap"><table><thead><tr><th>Set menu</th><th class="num">Giá bán / khách</th><th class="num">Cost / khách</th><th class="num">Food cost</th><th class="num">Lợi nhuận / khách</th></tr></thead><tbody>';
  setRows.forEach(({s,cpp,fc})=>{
    h+='<tr><td><strong>'+esc(s.name)+'</strong><div class="muted small">'+s.dishes.length+' món</div></td><td class="num">'+money(s.price)+'</td><td class="num">'+money(cpp)+'</td><td class="num"><strong>'+pct(fc*100)+'</strong></td><td class="num" style="color:var(--green)">'+money(s.price-cpp)+'</td></tr>';
  });
  h+='</tbody></table></div></div>';

  h+='<div class="section-head"><div><h2>Food cost theo đoàn hôm nay</h2><p>Theo đơn đoàn đã chốt.</p></div></div>';
  h+='<div class="card"><div class="tblwrap"><table><thead><tr><th>Đoàn</th><th>Set</th><th class="num">Khách</th><th class="num">Doanh thu</th><th class="num">Chi phí NL</th><th class="num">Food cost</th><th class="num">Lợi nhuận</th></tr></thead><tbody>';
  S.bookings.forEach(b=>{
    const c=orderCalc(b); if(!c) return;
    h+='<tr><td><strong>'+esc(b.name)+'</strong></td><td>'+esc(c.set.name)+'</td><td class="num">'+b.guests+'</td><td class="num">'+money(c.revenue)+'</td><td class="num">'+money(c.cost)+'</td><td class="num"><strong>'+pct(c.foodCost*100)+'</strong></td><td class="num" style="color:var(--green)">'+money(c.profit)+'</td></tr>';
  });
  h+='</tbody></table></div></div>';

  h+='<div class="section-head"><div><h2>Thực tế vs định mức — 7 ngày</h2><p>Food cost thực tế (từ tiêu hao thực) so với định mức chuẩn.</p></div></div>';
  h+='<div class="card">';
  S.history.forEach(r=>{
    const fc=r.revenue?r.cost/r.revenue*100:0;
    const std=fc-1.2; // định mức chuẩn thấp hơn thực tế ~1,2 điểm %
    h+='<div class="bar-row"><span class="bar-label">'+esc(r.date)+'</span><div class="bar-track"><div class="bar-fill" style="width:'+Math.min(100,fc*2.2)+'%"></div></div><span class="bar-val">'+pct(fc)+' <span class="muted">(định mức '+pct(std)+')</span></span></div>';
  });
  h+='<p class="muted small">Chênh lệch thực tế − định mức dao động quanh +1,2 điểm % — chủ yếu từ hao hụt bể hải sản sống và rau/mỳ gọi thêm.</p></div>';

  h+='<div class="section-head"><div><h2>Nhập – Xuất – Tồn (hôm nay)</h2><p>Tồn lý thuyết = Tồn hiện tại − Xuất. Cột "Nhập" chỉ để đối chiếu — đã cộng vào tồn hiện tại nên không cộng thêm lần nữa.</p></div></div>';
  h+='<div class="card"><div class="tblwrap"><table><thead><tr><th>Nguyên liệu</th><th class="num">Tồn hiện tại</th><th class="num">Nhập</th><th class="num">Xuất (tiêu hao)</th><th class="num">Tồn lý thuyết</th><th class="num">Thiếu</th></tr></thead><tbody>';
  const needs=dayNeeds();
  S.ingredients.forEach(g=>{
    const inn=receivedToday(g.id);
    const out=needs[g.id]||0;
    const th=theoretical(g.id);
    const sh=shortage(g.id);
    h+='<tr><td><strong>'+esc(g.name)+'</strong></td><td class="num">'+num(g.stock)+' '+esc(g.unit)+'</td><td class="num">'+num(inn)+' '+esc(g.unit)+'</td><td class="num">'+num(out)+' '+esc(g.unit)+'</td><td class="num"><strong>'+num(th)+' '+esc(g.unit)+'</strong></td><td class="num" style="color:'+(sh>0?'var(--red)':'inherit')+'">'+(sh>0?num(sh)+' '+esc(g.unit):'—')+'</td></tr>';
  });
  h+='</tbody></table></div><p class="muted small">Tồn lý thuyết dùng cùng định nghĩa với mục Kiểm kê.</p></div>';

  // Top hao hụt từ kiểm kê (chỉ các dòng đã đếm)
  h+='<div class="section-head"><div><h2>Top hao hụt (từ kiểm kê)</h2><p>Chênh lệch âm lớn nhất theo giá trị.</p></div></div>';
  const vars=S.counts.map(ct=>{ const g=ing(ct.ing); if(!g||ct.actual==null) return null; const th=theoretical(ct.ing); const diff=round2(ct.actual-th); return {g,diff,val:round0(diff*g.price)}; })
    .filter(x=>x&&x.diff<0).sort((a,b)=>a.val-b.val);
  h+='<div class="card">';
  if(!vars.length) h+='<div class="empty">Không có hao hụt ghi nhận.</div>';
  vars.forEach(({g,diff,val})=>{
    h+='<div class="bar-row"><span class="bar-label">'+esc(g.name)+'</span><div class="bar-track"><div class="bar-fill" style="width:'+Math.min(100,Math.abs(val)/9000000*100)+'%"></div></div><span class="bar-val">'+num(diff)+' '+esc(g.unit)+' · '+money(val)+'</span></div>';
  });
  h+='</div>';

  h+='<div class="section-head"><div><h2>Biến động giá theo nhà cung cấp</h2><p>Giá 3 lần nhập gần nhất — phát hiện NCC tăng giá.</p></div></div>';
  h+='<div class="card"><div class="tblwrap"><table><thead><tr><th>Nguyên liệu</th><th>NCC</th><th class="num">Nhập −2</th><th class="num">Nhập −1</th><th class="num">Mới nhất</th><th class="num">Biến động</th></tr></thead><tbody>';
  S.ingredients.filter(g=>g.prices && g.prices.length>=3).slice(0,10).forEach(g=>{
    const [a,b2,c]=g.prices;
    const ch=(c-a)/a*100;
    h+='<tr><td><strong>'+esc(g.name)+'</strong></td><td>'+esc(supplier(g.supplier)?.name||"")+'</td><td class="num">'+money(a)+'</td><td class="num">'+money(b2)+'</td><td class="num">'+money(c)+'</td><td class="num" style="color:'+(ch>5?'var(--red)':ch<-5?'var(--green)':'inherit')+'">'+(ch>0?"+":"")+pct(ch)+'</td></tr>';
  });
  h+='</tbody></table></div><p class="muted small">Giá "Mới nhất" = giá lần nhập gần nhất. Giá vốn bình quân ở Danh mục có thể khác do tính bình quân gia quyền theo tồn kho.</p></div>';
  return h;
}

/* ================= RENDER: DANH MỤC ================= */
function vCatalog(){
  // P0-7: vai Kho chỉ thấy tab Nguyên liệu + Nhà cung cấp (đúng phần việc của kho).
  if(role==="warehouse" && (catalogTab==="dishes"||catalogTab==="tables")) catalogTab="ingredients";
  let h='<div class="tabs">'
    +(role==="warehouse"?"":'<button data-tab="dishes" class="'+(catalogTab==="dishes"?"active":"")+'">Món ăn ('+S.dishes.length+')</button>')
    +'<button data-tab="ingredients" class="'+(catalogTab==="ingredients"?"active":"")+'">Nguyên liệu ('+S.ingredients.length+')</button>'
    +'<button data-tab="suppliers" class="'+(catalogTab==="suppliers"?"active":"")+'">Nhà cung cấp ('+S.suppliers.length+')</button>'
    +(role==="warehouse"?"":'<button data-tab="tables" class="'+(catalogTab==="tables"?"active":"")+'">Bàn / Khu vực ('+S.tables.length+')</button>')+'</div>';

  if(catalogTab==="dishes"){
    h+='<div class="btn-row" style="margin-top:0"><button class="btn btn-primary" data-act="new-dish">+ Thêm món</button></div>';
    h+='<div class="card" style="margin-top:14px"><div class="tblwrap"><table><thead><tr><th>Món</th><th>Loại</th><th>Định mức BOM (gam/khách)</th><th class="num">Cost / khách</th><th></th></tr></thead><tbody>';
    S.dishes.forEach(d=>{
      const bom=d.bom.map(([iid,q,buf])=>esc(ing(iid)?.name||iid)+' '+num(q*1000,0)+'g'+(buf?" (+15% dự phòng)":"")).join(" · ");
      h+='<tr><td><strong>'+esc(d.name)+'</strong></td><td>'+esc(d.cat)+'</td><td class="small">'+bom+'</td><td class="num">'+money(dishCostPerPax(d))+'</td><td><button class="btn btn-ghost btn-sm" data-act="edit-dish" data-id="'+d.id+'">Sửa</button> <button class="btn btn-ghost btn-sm" data-act="del-dish" data-id="'+d.id+'">Xóa</button></td></tr>';
    });
    h+='</tbody></table></div></div>';
  }
  if(catalogTab==="ingredients"){
    /* Kho/Bếp không thấy cột giá vốn, không thêm/sửa/xóa nguyên liệu (chặn cả ở mức code qua CAN). */
    const hideMoney=(role==="warehouse"||role==="kitchen");
    const canEditIng=canAct("edit-ing");
    h+=(canEditIng?'<div class="btn-row" style="margin-top:0"><button class="btn btn-primary" data-act="new-ing">+ Thêm nguyên liệu</button></div>':'');
    h+='<div class="card" style="margin-top:14px"><div class="tblwrap"><table><thead><tr><th>Nguyên liệu</th><th>Loại</th><th>Đơn vị</th>'+(hideMoney?'':'<th class="num">Giá vốn bình quân</th>')+'<th class="num">Tồn kho</th><th class="num">Mức tối thiểu</th><th>NCC</th>'+(canEditIng?'<th></th>':'')+'</tr></thead><tbody>';
    S.ingredients.forEach(g=>{
      h+='<tr><td><strong>'+esc(g.name)+'</strong></td><td>'+esc(CATS[g.cat]||g.cat)+'</td><td>'+esc(g.unit)+'</td>'+(hideMoney?'':'<td class="num">'+money(g.price)+'</td>')+'<td class="num" style="color:'+(g.stock<g.min?'var(--red)':'inherit')+'">'+num(g.stock)+'</td><td class="num">'+num(g.min)+'</td><td>'+esc(supplier(g.supplier)?.name||"")+'</td>'+(canEditIng?'<td><button class="btn btn-ghost btn-sm" data-act="edit-ing" data-id="'+g.id+'">Sửa</button> <button class="btn btn-ghost btn-sm" data-act="del-ing" data-id="'+g.id+'">Xóa</button></td>':'')+'</tr>';
    });
    h+='</tbody></table></div></div>';
  }
  if(catalogTab==="suppliers"){
    h+='<div class="btn-row" style="margin-top:0"><button class="btn btn-primary" data-act="new-sup">+ Thêm nhà cung cấp</button></div>';
    h+='<div class="grid grid-2" style="margin-top:14px">';
    S.suppliers.forEach(s=>{
      const count=S.ingredients.filter(g=>g.supplier===s.id).length;
      h+='<div class="card"><h3>'+esc(s.name)+'</h3><p class="muted small">'+esc(s.phone)+' · '+count+' nguyên liệu</p><p>'+esc(s.note||"")+'</p><div class="btn-row"><button class="btn btn-ghost btn-sm" data-act="edit-sup" data-id="'+s.id+'">Sửa</button> <button class="btn btn-ghost btn-sm" data-act="del-sup" data-id="'+s.id+'">Xóa</button></div></div>';
    });
    h+='</div>';
  }
  if(catalogTab==="tables"){
    h+='<div class="btn-row" style="margin-top:0"><button class="btn btn-primary" data-act="new-table">+ Thêm bàn</button></div>';
    h+='<div class="card" style="margin-top:14px"><div class="tblwrap"><table><thead><tr><th>Bàn</th><th>Khu vực</th><th class="num">Số ghế</th><th></th></tr></thead><tbody>';
    S.tables.forEach(t=>{
      h+='<tr><td><strong>'+esc(t.name)+'</strong></td><td>'+esc(t.zone)+'</td><td class="num">'+t.seats+'</td><td><button class="btn btn-ghost btn-sm" data-act="del-table" data-id="'+t.id+'">Xóa</button></td></tr>';
    });
    h+='</tbody></table></div></div>';
  }
  return h;
}

/* ---- Form danh mục ---- */
function dishForm(d){
  const isNew=!d;
  const rows=(d?d.bom:[["rau",0.1]]).map(([iid,q,buf])=>{
    const opts=S.ingredients.map(g=>'<option value="'+g.id+'" '+(g.id===iid?"selected":"")+'>'+esc(g.name)+' ('+esc(g.unit)+')</option>').join("");
    return '<div class="bom-row"><select name="bom-ing">'+opts+'</select><input name="bom-qty" type="number" step="0.001" min="0" value="'+q+'" placeholder="Lượng/khách"><label style="display:flex;align-items:center;gap:5px;margin:0;font-weight:500"><input type="checkbox" name="bom-buf" '+(buf?"checked":"")+' style="width:auto"> +15% dự phòng</label><button type="button" class="btn btn-ghost btn-sm" data-act="del-bom-row">✕</button></div>';
  }).join("");
  openModal('<h3>'+(isNew?"Thêm món":"Sửa món")+'</h3><p class="modal-sub">Định mức BOM tính trên 1 khách (pax). Đơn vị lượng theo đơn vị của nguyên liệu.</p>'
    +'<form id="dishForm" data-id="'+(d?d.id:"")+'"><label>Tên món *</label><input name="name" required value="'+esc(d?.name||"")+'">'
    +'<label>Loại</label><input name="cat" value="'+esc(d?.cat||"Món chính")+'">'
    +'<label>Định mức BOM</label><div id="bomRows">'+rows+'</div>'
    +'<button type="button" class="btn btn-ghost btn-sm" data-act="add-bom-row">+ Thêm nguyên liệu</button>'
    +'<div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Lưu món</button></div></form>');
}
function ingForm(g){
  const isNew=!g;
  const catOpts=Object.keys(CATS).map(c=>'<option value="'+c+'" '+(g&&g.cat===c?"selected":"")+'>'+esc(CATS[c])+'</option>').join("");
  const supOpts=S.suppliers.map(s=>'<option value="'+s.id+'" '+(g&&g.supplier===s.id?"selected":"")+'>'+esc(s.name)+'</option>').join("");
  openModal('<h3>'+(isNew?"Thêm nguyên liệu":"Sửa nguyên liệu")+'</h3><p class="modal-sub">Giá vốn bình quân dùng để tính cost. Sửa tay chỉ đổi giá vốn, không thêm vào lịch sử nhập.</p>'
    +'<form id="ingForm" data-id="'+(g?g.id:"")+'"><div class="form-grid">'
    +'<div><label>Tên nguyên liệu *</label><input name="name" required value="'+esc(g?.name||"")+'"></div>'
    +'<div><label>Đơn vị</label><input name="unit" value="'+esc(g?.unit||"kg")+'"></div>'
    +'<div><label>Loại</label><select name="cat">'+catOpts+'</select></div>'
    +'<div><label>Nhà cung cấp</label><select name="supplier">'+supOpts+'</select></div>'
    +'<div><label>Giá vốn bình quân (đ/đơn vị)</label><input name="price" type="number" min="0" value="'+(g?.price||0)+'"></div>'
    +'<div><label>Tồn kho</label><input name="stock" type="number" step="0.01" min="0" value="'+(g?.stock||0)+'"></div>'
    +'<div class="full"><label>Mức tồn tối thiểu (cảnh báo)</label><input name="min" type="number" step="0.01" min="0" value="'+(g?.min||0)+'"></div>'
    +'</div><div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Lưu</button></div></form>');
}
function supForm(s){
  const isNew=!s;
  openModal('<h3>'+(isNew?"Thêm nhà cung cấp":"Sửa nhà cung cấp")+'</h3><form id="supForm" data-id="'+(s?s.id:"")+'">'
    +'<label>Tên nhà cung cấp *</label><input name="name" required value="'+esc(s?.name||"")+'">'
    +'<label>Số điện thoại</label><input name="phone" value="'+esc(s?.phone||"")+'">'
    +'<label>Ghi chú</label><input name="note" value="'+esc(s?.note||"")+'">'
    +'<div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Lưu</button></div></form>');
}
function tableForm(){
  openModal('<h3>Thêm bàn</h3><form id="tableForm"><label>Tên bàn *</label><input name="name" required placeholder="VD: Bàn 21">'
    +'<label>Khu vực</label><input name="zone" value="Tầng 1 — Sảnh chính">'
    +'<label>Số ghế</label><input name="seats" type="number" min="1" value="6">'
    +'<div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Lưu</button></div></form>');
}
function countAddForm(){
  const opts=S.ingredients.map(g=>'<option value="'+g.id+'">'+esc(g.name)+' ('+esc(g.unit)+')</option>').join("");
  openModal('<h3>Thêm nguyên liệu kiểm kê</h3><form id="countAddForm"><label>Nguyên liệu</label><select name="ing">'+opts+'</select>'
    +'<label>Tồn thực tế (để trống = chưa đếm)</label><input name="actual" type="number" step="0.01" min="0" placeholder="Nhập số đã đếm">'
    +'<div class="btn-row"><button type="button" class="btn btn-ghost" data-act="close-modal">Hủy</button><button class="btn btn-primary" type="submit">Thêm</button></div></form>');
}

/* ================= RENDER DISPATCH ================= */
function render(){
  const V={dashboard:vDashboard,bookings:vBookings,orders:vOrders,purchase:vPurchase,receiving:vReceiving,kds:vKds,payment:vPayment,count:vCount,reports:vReports,catalog:vCatalog};
  $("#view").innerHTML=(V[view]||vDashboard)();
  refreshHeader(); // P0-8: tiêu đề phụ Tổng quan cập nhật live sau mọi thao tác
  window.scrollTo({top:0});
}

/* ================= SỰ KIỆN ================= */
document.addEventListener("click",e=>{
  const navBtn=e.target.closest("[data-nav]");
  if(navBtn){ go(navBtn.dataset.nav); return; }
  const actEl=e.target.closest("[data-act]");
  if(!actEl) return;
  const act=actEl.dataset.act, id=actEl.dataset.id;
  /* P0-7 — Chặn thao tác theo vai trò ở mức code (kể cả khi nút bị lộ ra ngoài menu). */
  if(!canAct(act)){ toast("Vai trò "+ROLE_NAMES[role]+" không được thực hiện thao tác này."); return; }
  switch(act){
    case "close-modal": closeModal(); break;
    case "go-receiving": go("receiving"); break;
    case "kds-goto": go("kds"); break;
    case "new-booking": bookingForm(null); break;
    case "edit-booking": bookingForm(booking(id)); break;
    case "open-order": case "order-detail": orderDetail(id); break;
    case "del-booking": if(confirm("Xóa booking này?")){ const nm=booking(id)?.name; S.bookings=S.bookings.filter(b=>b.id!==id); logAction("Xóa booking",nm||id); save(); render(); toast("Đã xóa booking."); } break;
    case "save-guests": {
      const b=booking(id); const g=parseInt($("#orderGuests").value,10);
      if(b && g>0){ const old=b.guests; b.guests=g; logAction("Đổi số khách",b.name+": "+old+" → "+g+" khách"); save(); closeModal(); render(); toast("Đã cập nhật số khách — mọi con số tính lại ngay."); }
      break;
    }
    case "new-receipt": receiptForm(); break;
    case "add-receipt-line": {
      const box=$("#receiptLines"); if(!box) break;
      const ingOpts=S.ingredients.map(g=>'<option value="'+g.id+'">'+esc(g.name)+' ('+esc(g.unit)+')</option>').join("");
      const row=document.createElement("div"); row.className="bom-row";
      row.innerHTML='<select name="ing">'+ingOpts+'</select><input name="qty" type="number" step="0.01" min="0" placeholder="Số lượng" value="1"><input name="price" type="number" min="0" placeholder="Giá/đơn vị">';
      box.appendChild(row); break;
    }
    case "kds-next": {
      const key=kdsKey(actEl.dataset.order, actEl.dataset.dish);
      const cur=S.kds[key]||"waiting";
      S.kds[key]=cur==="waiting"?"cooking":"done";
      logAction("Đổi trạng thái bếp",esc(dish(actEl.dataset.dish)?.name||"")+" → "+(S.kds[key]==="cooking"?"Đang nấu":"Đã xong"));
      save(); render(); toast("Đã chuyển trạng thái món."); break;
    }
    case "pay-detail": payDetail(id); break;
    case "edit-pay": payEditForm(id, actEl.dataset.pay); break;
    case "del-pay": {
      if(confirm("Xóa khoản thu này?")){
        const recs=paymentRecords(id);
        const rec=recs.find(r=>r.id===actEl.dataset.pay);
        S.payments[id]=recs.filter(r=>r.id!==actEl.dataset.pay);
        logAction("Xóa khoản thu",booking(id)?.name+" · "+money(rec?rec.total:0));
        save(); closeModal(); render(); toast("Đã xóa khoản thu.");
      }
      break;
    }
    case "add-count": countAddForm(); break;
    case "save-count": {
      /* P0-3 — Chốt tồn: chỉ các dòng ĐÃ ĐẾM mới chốt vào kho; lưu phiếu để xem lại; giá KHÔNG đổi. */
      const counted=S.counts.filter(c=>c.actual!=null);
      if(!counted.length){ toast("Chưa đếm nguyên liệu nào — nhập tồn thực tế trước khi lưu."); break; }
      const lines=counted.map(c=>{
        const g=ing(c.ing);
        const th=theoretical(c.ing);
        const diff=round2(c.actual-th);
        return {ing:c.ing,theoretical:th,actual:c.actual,diff,value:round0(diff*(g?g.price:0)),note:c.note||""};
      });
      const totalVar=lines.reduce((s,l)=>s+l.value,0);
      lines.forEach(l=>{ const g=ing(l.ing); if(g) g.stock=round2(l.actual); });
      S.countSheets.unshift({id:uid(),date:new Date().toLocaleString("vi-VN"),lines,totalVar});
      S.counts.forEach(c=>{ c.actual=null; c.note=""; });
      logAction("Lưu kiểm kê","Chốt tồn "+lines.length+" nguyên liệu, chênh lệch "+money(totalVar));
      save(); render(); toast("Đã lưu phiếu kiểm kê — tồn kho đã chốt theo số đếm."); break;
    }
    case "new-dish": dishForm(null); break;
    case "edit-dish": dishForm(dish(id)); break;
    case "del-dish": if(confirm("Xóa món này? Các set dùng món này sẽ mất món đó.")){ S.dishes=S.dishes.filter(d=>d.id!==id); S.sets.forEach(s=>s.dishes=s.dishes.filter(x=>x!==id)); save(); render(); toast("Đã xóa món."); } break;
    case "add-bom-row": {
      const box=$("#bomRows"); if(!box) break;
      const opts=S.ingredients.map(g=>'<option value="'+g.id+'">'+esc(g.name)+' ('+esc(g.unit)+')</option>').join("");
      const row=document.createElement("div"); row.className="bom-row";
      row.innerHTML='<select name="bom-ing">'+opts+'</select><input name="bom-qty" type="number" step="0.001" min="0" value="0" placeholder="Lượng/khách"><label style="display:flex;align-items:center;gap:5px;margin:0;font-weight:500"><input type="checkbox" name="bom-buf" style="width:auto"> +15% dự phòng</label><button type="button" class="btn btn-ghost btn-sm" data-act="del-bom-row">✕</button>';
      box.appendChild(row); break;
    }
    case "del-bom-row": actEl.closest(".bom-row")?.remove(); break;
    case "new-ing": ingForm(null); break;
    case "edit-ing": ingForm(ing(id)); break;
    case "del-ing": if(confirm("Xóa nguyên liệu này?")){ S.ingredients=S.ingredients.filter(g=>g.id!==id); save(); render(); toast("Đã xóa nguyên liệu."); } break;
    case "new-sup": supForm(null); break;
    case "edit-sup": supForm(supplier(id)); break;
    case "del-sup": if(confirm("Xóa nhà cung cấp này?")){ S.suppliers=S.suppliers.filter(s=>s.id!==id); save(); render(); toast("Đã xóa nhà cung cấp."); } break;
    case "new-table": tableForm(); break;
    case "del-table": if(confirm("Xóa bàn này?")){ S.tables=S.tables.filter(t=>t.id!==id); save(); render(); toast("Đã xóa bàn."); } break;
  }
});
document.addEventListener("click",e=>{
  const tab=e.target.closest("[data-tab]");
  if(tab){
    if(role==="warehouse" && (tab.dataset.tab==="dishes"||tab.dataset.tab==="tables")) return; // P0-7
    catalogTab=tab.dataset.tab; render();
  }
});
document.addEventListener("input",e=>{
  const t=e.target;
  if(t.id==="orderGuests"){ const b=S.bookings.find(x=>x.id===selectedOrderId)||S.bookings[0]; if(b) updateOrderCalcBox(b.id); }
  if(t.dataset.act==="count-input"){
    if(!canAct("count-input")){ toast("Vai trò "+ROLE_NAMES[role]+" không được sửa kiểm kê."); return; }
    const idx=parseInt(t.dataset.idx,10);
    const raw=t.value.trim();
    const v=raw===""?null:parseFloat(raw);
    S.counts[idx].actual=(v==null||isNaN(v))?null:round2(v);
    save();
    /* Cập nhật riêng dòng đó (không render lại toàn trang) để không mất focus khi gõ. */
    const row=t.closest("tr");
    if(row){
      const cells=countDiffCells(S.counts[idx]);
      const diffEl=row.querySelector(".count-diff"), valEl=row.querySelector(".count-val");
      if(diffEl){ diffEl.innerHTML=cells.diffHtml; diffEl.style.color=cells.color; }
      if(valEl){ valEl.innerHTML=cells.valHtml; valEl.style.color=cells.color; }
      const stEl=row.querySelector(".count-status");
      if(stEl) stEl.innerHTML=countStatusHtml(S.counts[idx]);
    }
    const totalVar=S.counts.reduce((s,ct)=>{ const g=ing(ct.ing); if(!g||ct.actual==null) return s; return s+round0(round2(ct.actual-theoretical(ct.ing))*g.price); },0);
    const totEl=$("#countTotal");
    if(totEl){ totEl.textContent=money(totalVar); totEl.style.color=totalVar<0?'var(--red)':'var(--green)'; }
  }
  if(t.dataset.act==="count-note"){
    if(!canAct("count-note")) return;
    const idx=parseInt(t.dataset.idx,10);
    S.counts[idx].note=t.value; save();
  }
});
document.addEventListener("submit",e=>{
  const f=e.target; e.preventDefault();
  /* P0-7 — Chặn submit theo vai trò (phòng khi form bị mở bằng cách khác). */
  const FORM_PERM={bookingForm:"edit-booking",receiptForm:"new-receipt",payForm:"pay-detail",payEditForm:"pay-detail",dishForm:"edit-dish",ingForm:"edit-ing",supForm:"edit-sup",tableForm:"new-table",countAddForm:"add-count"};
  const need=FORM_PERM[f.id];
  if(need && !canAct(need)){ toast("Vai trò "+ROLE_NAMES[role]+" không được thực hiện thao tác này."); return; }
  if(f.id==="bookingForm"){
    const fd=new FormData(f);
    const data={name:fd.get("name"),phone:fd.get("phone"),time:fd.get("time"),guests:parseInt(fd.get("guests"),10)||1,setId:fd.get("setId"),depositPaid:parseFloat(fd.get("depositPaid"))||0,note:fd.get("note"),date:"today",status:"confirmed"};
    const bid=f.dataset.id;
    if(bid){ Object.assign(booking(bid),data); logAction("Cập nhật booking",data.name+" · "+data.guests+" khách"); toast("Đã cập nhật booking."); }
    else { data.id=uid(); S.bookings.push(data); logAction("Thêm booking",data.name+" · "+data.guests+" khách"); toast("Đã thêm booking mới."); }
    save(); closeModal(); render(); return;
  }
  if(f.id==="receiptForm"){
    const fd=new FormData(f);
    const items=[];
    const rows=f.querySelectorAll("#receiptLines .bom-row");
    rows.forEach(r=>{
      const iid=r.querySelector('[name="ing"]').value;
      const q=parseFloat(r.querySelector('[name="qty"]').value)||0;
      const p=parseFloat(r.querySelector('[name="price"]').value)||0;
      if(q>0) items.push([iid,q,p]);
    });
    if(!items.length){ toast("Cần ít nhất 1 dòng nguyên liệu."); return; }
    S.receipts.unshift({id:"pn"+(S.receipts.length+1),supplier:fd.get("supplier"),date:"Vừa nhập",items,note:fd.get("note")});
    /* P0-2 — Tồn kho cộng thật + giá vốn bình quân gia quyền (không ghi đè giá). */
    items.forEach(([iid,q,p])=>{
      const g=ing(iid); if(!g) return;
      const oldStock=g.stock, oldPrice=g.price;
      g.price = (oldStock+q)>0 ? round0((oldStock*oldPrice + q*p)/(oldStock+q)) : p;
      g.stock = round2(oldStock+q);
      g.prices=[...g.prices.slice(-2),p]; // lịch sử giá = giá từng lần nhập
    });
    logAction("Nhập kho","Phiếu "+("pn"+S.receipts.length)+" · "+items.map(([iid,q])=>esc(ing(iid)?.name||iid)+" "+num(q)).join(", "));
    save(); closeModal(); render(); toast("Đã lưu phiếu nhập — tồn kho đã cộng, giá vốn tính bình quân."); return;
  }
  if(f.id==="payForm"){
    const fd=new FormData(f);
    const cash=parseFloat(fd.get("cash"))||0, bank=parseFloat(fd.get("bank"))||0;
    /* P0-6 — Không cho ghi khoản 0đ (chống ghi trùng / ghi nhầm). */
    if(cash+bank<=0){ toast("Số tiền thu phải lớn hơn 0đ."); return; }
    const bid=f.dataset.id;
    const recs=paymentRecords(bid);
    recs.push({id:uid(),date:new Date().toLocaleString("vi-VN"),cash:round0(cash),bank:round0(bank),total:round0(cash+bank),note:fd.get("note")||"",role});
    S.payments[bid]=recs;
    logAction("Thu tiền",booking(bid)?.name+" · "+money(cash+bank));
    save(); closeModal(); render(); toast("Đã ghi nhận thu tiền: "+money(cash+bank)+"."); return;
  }
  if(f.id==="payEditForm"){
    const fd=new FormData(f);
    const cash=parseFloat(fd.get("cash"))||0, bank=parseFloat(fd.get("bank"))||0;
    if(cash+bank<=0){ toast("Số tiền thu phải lớn hơn 0đ."); return; }
    const bid=f.dataset.id, recId=f.dataset.pay;
    const recs=paymentRecords(bid);
    const rec=recs.find(r=>r.id===recId);
    if(rec){ rec.cash=round0(cash); rec.bank=round0(bank); rec.total=round0(cash+bank); rec.note=fd.get("note")||""; rec.role=role; S.payments[bid]=recs; }
    logAction("Sửa khoản thu",booking(bid)?.name+" · "+money(cash+bank));
    save(); closeModal(); render(); toast("Đã cập nhật khoản thu."); return;
  }
  if(f.id==="dishForm"){
    const fd=new FormData(f);
    const bom=[];
    f.querySelectorAll("#bomRows .bom-row").forEach(r=>{
      bom.push([r.querySelector('[name="bom-ing"]').value, parseFloat(r.querySelector('[name="bom-qty"]').value)||0, r.querySelector('[name="bom-buf"]').checked]);
    });
    const data={name:fd.get("name"),cat:fd.get("cat"),bom};
    const did=f.dataset.id;
    if(did){ Object.assign(dish(did),data); logAction("Sửa món",data.name); } else { data.id=uid(); S.dishes.push(data); logAction("Thêm món",data.name); }
    save(); closeModal(); render(); toast("Đã lưu món ăn."); return;
  }
  if(f.id==="ingForm"){
    const fd=new FormData(f);
    const data={name:fd.get("name"),unit:fd.get("unit"),cat:fd.get("cat"),supplier:fd.get("supplier"),price:parseFloat(fd.get("price"))||0,stock:parseFloat(fd.get("stock"))||0,min:parseFloat(fd.get("min"))||0};
    const gid=f.dataset.id;
    if(gid){ const g=ing(gid); Object.assign(g,data); /* Sửa tay chỉ đổi giá vốn — không thêm vào lịch sử nhập. */ logAction("Sửa nguyên liệu",data.name); }
    else { data.id=uid(); data.prices=[data.price]; S.ingredients.push(data); logAction("Thêm nguyên liệu",data.name); }
    save(); closeModal(); render(); toast("Đã lưu nguyên liệu."); return;
  }
  if(f.id==="supForm"){
    const fd=new FormData(f);
    const data={name:fd.get("name"),phone:fd.get("phone"),note:fd.get("note")};
    const sid=f.dataset.id;
    if(sid){ Object.assign(supplier(sid),data); logAction("Sửa nhà cung cấp",data.name); } else { data.id=uid(); S.suppliers.push(data); logAction("Thêm nhà cung cấp",data.name); }
    save(); closeModal(); render(); toast("Đã lưu nhà cung cấp."); return;
  }
  if(f.id==="tableForm"){
    const fd=new FormData(f);
    S.tables.push({id:uid(),name:fd.get("name"),zone:fd.get("zone"),seats:parseInt(fd.get("seats"),10)||6});
    logAction("Thêm bàn",fd.get("name"));
    save(); closeModal(); render(); toast("Đã thêm bàn."); return;
  }
  if(f.id==="countAddForm"){
    const fd=new FormData(f);
    const iid=fd.get("ing");
    if(S.counts.some(c=>c.ing===iid)){ toast("Nguyên liệu này đã có trong phiếu kiểm kê."); return; }
    /* P0-3 — Dùng ĐÚNG số đã gõ (trước đây bỏ qua ô nhập, tự điền tồn lý thuyết). Trống = chưa đếm. */
    const raw=(fd.get("actual")||"").toString().trim();
    const typed=raw===""?null:parseFloat(raw);
    S.counts.push({ing:iid,actual:(typed==null||isNaN(typed))?null:round2(typed),note:""});
    save(); closeModal(); render(); toast("Đã thêm nguyên liệu vào phiếu kiểm kê."); return;
  }
});

/* ================= KHỞI TẠO ================= */
$("#roleSelect").value=role;
$("#roleSelect").addEventListener("change",e=>{ role=e.target.value; save(); go(view); });
$("#menuToggle").addEventListener("click",()=>{
  const open=$("#sidebar").classList.toggle("open");
  $("#sidebarBackdrop").hidden=!open;
});
$("#sidebarBackdrop").addEventListener("click",()=>{
  $("#sidebar").classList.remove("open"); $("#sidebarBackdrop").hidden=true;
});
$("#resetBtn").addEventListener("click",()=>{
  if(confirm("Đặt lại toàn bộ dữ liệu về dữ liệu mẫu?")){ localStorage.removeItem(KEY); S=seed(); save(); render(); toast("Đã đặt lại dữ liệu mẫu."); }
});
renderNav();
render();
})();
