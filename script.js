const slides = [...document.querySelectorAll('.slide')];
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progressBar');
const slideNumber = document.getElementById('slideNumber');
const slideTotal = document.getElementById('slideTotal');
let current = 0;
slideTotal.textContent = String(slides.length).padStart(2,'0');

function showSlide(index){
  current = (index + slides.length) % slides.length;
  slides.forEach((s,i)=>s.classList.toggle('active', i===current));
  slideNumber.textContent = String(current+1).padStart(2,'0');
  progressBar.style.width = `${((current+1)/slides.length)*100}%`;
  document.title = `${slides[current].dataset.title} | Texto Dissertativo-Argumentativo`;
  slides[current].scrollTop = 0;
}
function next(){showSlide(current+1)}
function prev(){showSlide(current-1)}
nextBtn.addEventListener('click',next); prevBtn.addEventListener('click',prev);
document.querySelectorAll('.next-btn').forEach(b=>b.addEventListener('click',next));
document.addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();next()} if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();prev()} if(e.key==='Home'){e.preventDefault();showSlide(0)} if(e.key==='End'){e.preventDefault();showSlide(slides.length-1)}});

document.querySelectorAll('.connective-group button').forEach(btn=>btn.addEventListener('click',()=>{btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected')}));

const questions=[
 {q:'Qual elemento apresenta a ideia central que será defendida no texto?',options:['A conclusão','A tese','O conectivo','O exemplo'],answer:1,explain:'A tese é o posicionamento central que orienta a argumentação.'},
 {q:'Qual alternativa apresenta um conectivo de conclusão?',options:['Entretanto','Além disso','Portanto','Do mesmo modo'],answer:2,explain:'“Portanto” introduz uma conclusão ou consequência lógica.'},
 {q:'Em qual parte os argumentos são normalmente desenvolvidos?',options:['Na introdução','No título','No desenvolvimento','Apenas na conclusão'],answer:2,explain:'O desenvolvimento é o espaço principal para explicar e sustentar os argumentos.'},
 {q:'O que torna um repertório realmente útil para a argumentação?',options:['Ser difícil de entender','Aparecer sem explicação','Estar relacionado ao argumento','Ser o mais longo possível'],answer:2,explain:'A referência precisa ser pertinente e explicada em relação ao que está sendo defendido.'},
 {q:'Qual sequência representa melhor a construção de um argumento?',options:['Opinião → fim do texto','Afirmação → explicação → comprovação → conexão','Conectivo → título → conclusão','Exemplo → exemplo → exemplo'],answer:1,explain:'Um argumento ganha força quando a ideia é apresentada, explicada, sustentada e conectada à tese.'}
];
let qIndex=0,score=0,answered=false;
const qEl=document.getElementById('quizQuestion'),optsEl=document.getElementById('quizOptions'),feedback=document.getElementById('quizFeedback'),countEl=document.getElementById('quizCount'),scoreEl=document.getElementById('quizScore'),qNext=document.getElementById('nextQuestion');
function renderQuestion(){
  answered=false; feedback.className='quiz-feedback'; feedback.textContent=''; qNext.disabled=true;
  const q=questions[qIndex]; countEl.textContent=`QUESTÃO ${String(qIndex+1).padStart(2,'0')} / ${String(questions.length).padStart(2,'0')}`; scoreEl.textContent=`${score} acerto${score===1?'':'s'}`;
  qEl.innerHTML=`<h3>${q.q}</h3>`; optsEl.innerHTML='';
  q.options.forEach((option,i)=>{const b=document.createElement('button');b.className='quiz-option';b.textContent=option;b.addEventListener('click',()=>answer(i,b));optsEl.appendChild(b)});
}
function answer(i,button){
  if(answered)return; answered=true; const q=questions[qIndex];
  document.querySelectorAll('.quiz-option').forEach((b,j)=>{b.disabled=true;if(j===q.answer)b.classList.add('correct')});
  if(i===q.answer){score++;button.classList.add('correct');feedback.textContent=`✓ Correto! ${q.explain}`;feedback.className='quiz-feedback good'}else{button.classList.add('wrong');feedback.textContent=`✗ Ainda não. ${q.explain}`;feedback.className='quiz-feedback bad'}
  scoreEl.textContent=`${score} acerto${score===1?'':'s'}`;qNext.disabled=false;
}
qNext.addEventListener('click',()=>{
  if(qIndex<questions.length-1){qIndex++;renderQuestion()}
  else{qEl.innerHTML=`<h3>Mini-curso concluído. Você fez <span style="color:var(--accent)">${score}/${questions.length}</span>!</h3>`;optsEl.innerHTML='';feedback.className='quiz-feedback';feedback.textContent='Revise os pontos em que teve dúvida e tente novamente.';qNext.textContent='Refazer quiz ↻';qNext.disabled=false;qNext.onclick=()=>{qIndex=0;score=0;qNext.textContent='Próxima questão →';qNext.onclick=null;renderQuestion()}}
});
document.getElementById('restartBtn').addEventListener('click',()=>{qIndex=0;score=0;qNext.textContent='Próxima questão →';qNext.onclick=null;renderQuestion();showSlide(0)});
renderQuestion();showSlide(0);
