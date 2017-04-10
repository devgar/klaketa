// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const t0 = new Date();

let position = 0;

function render(curr, next, delta){
  const current_el = document.getElementById('current');
  const next_el = document.getElementById('next');
  console.log('RENDER', curr, next, delta);
  let currT = delta - curr.sum + curr-d
  let currStr = Math.floor(delta / 60) + ':' + Math.floor(delta % 60)
  current_el.innerHTML=curr.label + "<span>" + (delta - curr.sum).toFixed() +"</span>";
  next_el.innerHTML=next.label + "<span>" + (delta - next.sum).toFixed() +"</span>";
}

setInterval( ()=> {
  const delta = ( (new Date()) - t0) / 1000;
  let hrs = Math.floor(delta / 3600)
  let min = Math.floor(delta / 60)
  let sec = Math.floor(delta % 60)

  let current, next;

  for(var i= 0, l= ESCALETA.length, sum= 0; i<l; i++){
    let section = ESCALETA[i];
    sum+= section.d;
    if(position == i){
      current = section;
      if(ESCALETA[i+1])  next = ESCALETA[i+1];
      else next = null;
      break;
    }
  }
  render(current, next, delta);
}, 800);

const ESCALETA = [
  {label: 'Cabecera', d: 20, sum: 20},
  {label: 'Presentación', d: 60, sum: 80},
  {label: 'Sin. Actualidad', d: 30, sum: 110},
  {label: 'Debate Actualidad', d: 780, sum: 890}
];
