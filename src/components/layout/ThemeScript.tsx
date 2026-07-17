/** Runs before React hydrates to prevent theme flash and fix light/dark on first paint. */
export default function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('dsa_theme');var r=document.documentElement;r.classList.remove('dark','light');if(t==='light'){r.classList.add('light');r.style.colorScheme='light';}else{r.classList.add('dark');r.style.colorScheme='dark';}}catch(e){}})();`;

  return (
    <script
      id="dsa-theme-init"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
