(() => {
  const form=document.querySelector("[data-access-form]");
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    const d=new FormData(form);
    const subject="Deep Analytica technical review — "+(d.get("org")||"");
    const body=[
      "Nombre: "+d.get("name"),
      "Organización: "+d.get("org"),
      "Cargo / función: "+d.get("role"),
      "Email de trabajo: "+d.get("email"),
      "Motivo: "+d.get("reason"),
      "",
      "Decisión / problema:",
      d.get("problem")
    ].join("\n");
    location.href="mailto:contacto@deepanalytica.cl?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
  });
})();