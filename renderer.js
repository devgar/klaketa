// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const t0 = new Date();

let position = 0;
const current_el = document.getElementById('current');
const next_el = document.getElementById('next');

const btnNext = document.getElementById('nextBtn');
const btnPrev = document.getElementById('prevBtn');
const btnPause = document.getElementById('pauseBtn');

btnPause.onclick = function(){ console.log('Hello Pause')};
btnNext.onclick = function(){
  if(position+1 < ESCALETA.length) position += 1;
}
btnPrev.onclick = function(){
  if(position > 0 ) position -= 1;
}

Number.prototype.tt = function(){
  let sign = '';
  if(this < 0) sign = '-';
  let secs = Math.floor(Math.abs(this % 60)).toString();
  if(secs.length < 2) secs = '0' + secs;
  let mins = Math.floor(Math.abs(this / 60)).toString();
  if(mins.length < 2) mins = '0' + mins;
  return sign + mins + ':' + secs;
}

function render(curr, next, delta){
  current_el.innerHTML=curr.label + "<span>" + delta.tt() +"</span>";
  let currT = 0;
  if(delta <= curr.sum ){
    currT = (curr.sum - delta).tt();
    next_el.className ='';
  }  else {
    currT = '+' + (delta - curr.sum).tt();
    next_el.className = 'overflow';
  }

  if(next)
    next_el.innerHTML = next.label + "<span>" + currT +"</span>";
  else
    next_el.innerHTML = "FIN";
}

setInterval( ()=> {
  const delta = Math.floor( ( (new Date()) - t0) / 1000 );

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
}, 100);

function initialize(escaleta){
  for(let i=0, sum=0, l=escaleta.length; i<l; i++ ){
    sum += escaleta[i].d;
    escaleta[i].sum = sum;
  }
  return escaleta;
}

const ESCALETA = [
  {label: 'Cabecera', d: 20},
  {label: 'Presentación', d: 15},
  {label: 'Sin. Actualidad', d: 30},
  {label: 'Debate Actualidad', d: 780}
];



initialize(ESCALETA);
