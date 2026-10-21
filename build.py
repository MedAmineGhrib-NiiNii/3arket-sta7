"""Builds the two outputs from src/:
   preview/rooftop-rumble.html -> single-file preview (vs CPU only)
   app/www/index.html      -> the Android app (adds QR libs + Wi-Fi play)"""
import os,re
here=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(here,'src/game.html')).read()
stages=open(os.path.join(here,'src/stages.js')).read()
game=src.replace('/*@@STAGES@@*/',stages).replace('/*@@STORY@@*/',open(os.path.join(here,'src/story.js')).read()).replace('/*@@DERJA@@*/',open(os.path.join(here,'src/derja.js')).read())
# preview artifact: no app libs
os.makedirs(os.path.join(here,'preview'),exist_ok=True)
open(os.path.join(here,'preview/rooftop-rumble.html'),'w').write(game.replace('<!--APP_HEAD-->',''))
# app: full document, local libs, native flag, offline fonts fall back gracefully
head='''<script>window.RR_NATIVE=1</script>
<script src="lib/qrcode.js"></script>
<script src="lib/jsQR.js"></script>
<script src="lib/peerjs.min.js"></script>'''
doc='''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="theme-color" content="#0f1d38">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}</style>
'''+game.replace('<!--APP_HEAD-->',head).replace('<canvas id="c"','</head><body>\n<canvas id="c"',1)+'\n</body></html>\n'
os.makedirs(os.path.join(here,'app/www/lib'),exist_ok=True)
open(os.path.join(here,'app/www/index.html'),'w').write(doc)
# fonts bundled so the app looks right with no internet
GF='<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@700&family=Press+Start+2P&family=Pixelify+Sans:wght@400;700&family=Jersey+10&display=swap">'
assert GF in doc
faces=''.join(f"@font-face{{font-family:'{fam}';font-weight:{w};font-style:normal;font-display:swap;src:url(fonts/{fn}.woff2) format('woff2')}}" for fam,w,fn in [
  ('Press Start 2P',400,'press-start-2p-latin-400-normal'),
  ('Pixelify Sans',400,'pixelify-sans-latin-400-normal'),('Pixelify Sans',700,'pixelify-sans-latin-700-normal'),
  ('Aref Ruqaa',700,'aref-ruqaa-arabic-700-normal'),('Jersey 10',400,'jersey-10-latin-400-normal')])
doc=doc.replace(GF,'<style>'+faces+'</style>')
open(os.path.join(here,'app/www/index.html'),'w').write(doc)
os.makedirs(os.path.join(here,'app/www/fonts'),exist_ok=True)
import shutil
shutil.rmtree(os.path.join(here,'app/www/fonts'),ignore_errors=True);os.makedirs(os.path.join(here,'app/www/fonts'),exist_ok=True)
for f in [x for x in os.listdir(os.path.join(here,'fonts')) if x.endswith('.woff2')]:
    open(os.path.join(here,'app/www/fonts',f),'wb').write(open(os.path.join(here,'fonts',f),'rb').read())
for f in ('qrcode.js','jsQR.js','peerjs.min.js'):
    open(os.path.join(here,'app/www/lib',f),'w').write(open(os.path.join(here,'lib',f)).read())
print('built preview + app/www')
