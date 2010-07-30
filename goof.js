var i = 0;
gohere:for(i=0;i<10;i++){
  i++
  break gohere
}
console.log(i++);
if(i<5) {continue gohere}
