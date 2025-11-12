import React from 'react';
const Pagination: React.FC<{ page:number, totalPages:number, onChange:(n:number)=>void }> = ({ page, totalPages, onChange }) => {
  const pages = Array.from({length: totalPages}, (_,i)=>i+1);
  return (
    <div style={{marginTop:12}}>
      <button onClick={()=>onChange(Math.max(1, page-1))} disabled={page<=1}>Previous</button>
      {pages.map(p=> <button key={p} onClick={()=>onChange(p)} style={{fontWeight: p===page? 'bold':'normal'}}>{p}</button>)}
      <button onClick={()=>onChange(Math.min(totalPages, page+1))} disabled={page>=totalPages}>Next</button>
    </div>
  );
};
export default Pagination;
